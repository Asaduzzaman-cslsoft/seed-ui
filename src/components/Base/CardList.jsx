import React, { Component } from 'react';
import PropTypes from "prop-types";
import { $http } from "../../util/HttpRequest";
import { HasException, ModelState } from "../../util/Util";

import { List, ListItem, ListItemText, Divider, Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from '@material-ui/styles';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';
import { Button } from 'primereact/button';

const styles = () => ({
    paginator: {
        justifyContent: "center",
        padding: "5px"
    }
});

const defaults = {
    onAddClick: () => {
    },
    onEditClick: (primaryId, model) => {
    },
    onDeleteClick: (primaryId, model) => {
    }
};

export class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            currPage: 1,
            totalRecords: props.source ? props.source.length : 0,
            source: props.source || [],
            sortField: props.config.sortField,
            sortOrder: props.config.sortOrder || "ASC",
            selectedId: props.config.selectedId
        };

        this.loadData = this.loadData.bind(this);
        this.onPage = this.onPage.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onEditorChange(value, rowData, field) {
        let source = [...this.state.source];
        const rowIndex = this.state.source.indexOf(rowData);
        let row = source[rowIndex];
        row[field] = value;
        this.updateState(row);
        this.setState({ source: source });
    }

    updateState = (rowData) => {
        if (!rowData.ModelState
            || rowData.ModelState === ModelState.Unchanged)
            rowData.ModelState = ModelState.Modified;
    }

    clearSelection = () => {
        this.setState({ selectedId: null });
    }

    getSelection = () => {
        return this.state.source.find(m => m[this.props.config.keyField] === this.state.selectedId);
    }

    setSelection = (id) => {
        this.setState({ selectedId: id });
    }

    getRows = () => {
        return [...this.state.source];
    }

    refresh = () => {
        const { url, lazy, limit } = this.props.config;
        const { sortField, sortOrder, currPage } = this.state;
        const pagingConfig = { Offset: (currPage - 1) * (limit || 10), Limit: limit || 10, ServerPagination: lazy || false, SortName: sortField, SortOrder: sortOrder };
        this.loadData(pagingConfig, url, currPage);
    }

    componentDidMount() {
        const { source } = this.props;
        const { skipInitialLoad, url, lazy, limit } = this.props.config;
        const { sortField, sortOrder, currPage } = this.state;
        if (!skipInitialLoad && !source && url) {
            const pagingConfig = { Offset: 0, Limit: limit || 10, ServerPagination: lazy || false, SortName: sortField, SortOrder: sortOrder };
            this.loadData(pagingConfig, url, currPage);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.source !== prevProps.source) {
            this.setState({ source: this.props.source });
        }
    }

    loadData(pagingConfig, url, currPage) {
        console.log(url)
        this.setState({ loading: true });
        let that = this;
        let parameters = [];
        if (that.props.config.onPrepareParameter) that.props.config.onPrepareParameter(parameters);
        $http.post(url, { ...pagingConfig, Parameters: parameters })
            .then(res => {
                that.setState({ loading: false });
                if (HasException(res)) return;
                const data = res.Result;
                that.setState({
                    currPage: currPage,
                    source: data.Rows ? data.Rows : data,
                    totalRecords: data.Total ? data.Total : data.Rows ? data.Rows.length : data.length,
                    selectedId: that.props.config.selectedId
                }, () => {
                    if (that.props.config.loadCompleted) that.props.config.loadCompleted(data);
                });
            }, () => {
                that.setState({ loading: false });
            });
    }

    onPage(event, currPage) {
        const { url, lazy, limit } = this.props.config;
        if (lazy) {
            const { sortField, sortOrder } = this.state;
            const pagingConfig = { Offset: (currPage - 1) * (limit || 10), Limit: limit || 10, ServerPagination: lazy || false, SortName: sortField, SortOrder: sortOrder };
            this.loadData(pagingConfig, url, currPage);
        }
        else {
            const source = this.state.source;
            this.setState({
                currPage: currPage,
                source: source,
                totalRecords: source.Total ? source.Total : source.Rows ? source.Rows.length : source.length,
                selectedId: this.props.config.selectedId
            });
        }
    }

    onSelect = (data, selectedId) => {
        let onSelect = this.props.config.onSelect;
        if (onSelect && data) onSelect(data);
        this.setState({ selectedId: selectedId });
    }

    render() {
        const { classes } = this.props;
        const { source, totalRecords, currPage, selectedId, loading } = this.state;
        const { lazy, limit, keyField, displayField, title, height, onRender,
            showAdd, showEdit, showDelete, onAddClick, onEditClick, onDeleteClick, showRefresh, enableEdit } = this.props.config;
        const noOfPages = Math.ceil(totalRecords / limit);
        let renderSource = source;
        if (!lazy) renderSource = renderSource.slice((currPage - 1) * limit, currPage * limit);
        const model = this.getSelection();
        let editDisabled = !model;
        if (enableEdit === true) editDisabled = false;
        let buttons = [];
        if (showAdd) buttons.push({ onClick: onAddClick ? onAddClick : defaults.onAddClick, title: "Add", icon: "pi pi-plus", class: "p-button-rounded p-button-info" });
        if (showEdit) buttons.push({ onClick: () => onEditClick ? onEditClick(model ? model[keyField] : {}, model) : defaults.onEditClick(), title: "Edit", icon: "pi pi-pencil", class: "p-button-rounded p-button-success", disabled: editDisabled });
        if (showDelete) buttons.push({ onClick: () => onDeleteClick ? onDeleteClick(model ? model[keyField] : {}, model) : defaults.onDeleteClick(), title: "Delete", icon: "pi pi-trash", class: "p-button-rounded p-button-danger", disabled: !model });
        if (showRefresh) buttons.push({ onClick: this.refresh, title: "Refresh", icon: "pi pi-refresh", class: "p-button-rounded p-button-help" });
        return (
            <LoadingOverlay
                active={loading}
                spinner={<BounceLoader size={30} color={"#0F94F1"} />}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(244, 244, 244, 0.6)'
                    })
                }}>
                <Card>
                    <CardHeader
                        title={title}
                        style={{ backgroundColor: "#F1F1F1" }}
                        action={
                            buttons.map((btn, i) => {
                                return (
                                    <Button
                                        key={i}
                                        className={btn.class}
                                        style={{ margin: '0 4px 0 0', width: '30px', height: "30px" }}
                                        icon={btn.icon}
                                        title={btn.title || btn.text}
                                        onClick={btn.onClick}
                                        disabled={btn.disabled}
                                    />
                                );
                            })
                        } />
                    <CardContent style={{ height: height, overflowY: "auto" }}>
                        <List dense compoent="span">
                            {renderSource
                                .map((item) => {
                                    return (
                                        <div
                                            className="list-Div"
                                            key={item[keyField]}>
                                            <ListItem
                                                button onClick={() => this.onSelect(item, item[keyField])}
                                                selected={selectedId === item[keyField]}
                                            >
                                                {onRender ? onRender(item, this.onEditorChange) : <ListItemText
                                                    primary={item[displayField]}
                                                />}
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    );
                                })}
                        </List>
                    </CardContent>
                    <CardActions style={{ display: "block" }}>
                        <Pagination
                            count={noOfPages}
                            page={currPage}
                            onChange={this.onPage}
                            defaultPage={1}
                            siblingCount={0}
                            color="primary"
                            showFirstButton
                            showLastButton
                            size="small"
                            classes={{ ul: classes.paginator }}
                        />
                    </CardActions>
                </Card>
            </LoadingOverlay>
        );
    }
}

CardList.propTypes = {
    config: PropTypes.shape({
        keyField: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(CardList);