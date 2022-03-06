import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { $http } from "../../util/HttpRequest";
import { AppConst, ModelState, NumericKeyDown, NumericKeyPress, HasException, IsObject } from "../../util/Util";

import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


const defaults = {
    onAddClick: (newRow) => {
        return Promise.resolve(true);
    },
    onDeleteClick: (row) => {
        return Promise.resolve(true);
    },
    onBeforeCellUpdate: (field, cellValue, row, rows) => {
        return new Promise(function (resolve) {
            return resolve(true);
        });
    }
}

// const simulateTDClick = (event) => {
//     event.target.parentNode.parentNode.parentNode.click();
// }

const GridTextCell = props => {
    const { value, onChange, onFocus, readOnly } = props;
    return <input
        type="text"
        className="form-control form-control-sm"
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        value={value || ""}
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly}
    />;
}

const GridNumericCell = props => {
    const { value, onChange, onFocus, scale, readOnly } = props;
    return <input
        type="text"
        className="form-control form-control-sm text-right"
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        value={value || ""}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={NumericKeyDown}
        onKeyPress={NumericKeyPress}
        scale={scale}
        readOnly={readOnly}
    />;
}

const GridDateTimeCell = props => {
    const { value, onChange, onFocus, readOnly } = props;
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
            value={value || null}
            onChange={onChange}
            disabled={readOnly}
            onFocus={onFocus}
            InputProps={{ disableUnderline: true, readOnly: true }}
            helperText={''}
            // disableToolbar
            variant='inline'
            autoOk
            format={`${AppConst.DateFormat} ${AppConst.TimeFormat}`}
        />
    </MuiPickersUtilsProvider>
}

const GridDateCell = props => {
    const { value, onChange, onFocus, readOnly } = props;
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            value={value || null}
            onChange={onChange}
            disabled={readOnly}
            onFocus={onFocus}
            InputProps={{ disableUnderline: true, readOnly: true }}
            helperText={''}
            // disableToolbar
            variant='inline'
            autoOk
            format={AppConst.DateFormat}
        />
    </MuiPickersUtilsProvider>
}

const GridTimeCell = props => {
    const { value, onChange, onFocus, readOnly } = props;
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
            value={value || null}
            onChange={onChange}
            disabled={readOnly}
            onFocus={onFocus}
            InputProps={{ disableUnderline: true, readOnly: true }}
            helperText={''}
            // disableToolbar
            variant='inline'
            keyboardIcon={<AccessAlarmIcon />}
            autoOk
        />
    </MuiPickersUtilsProvider>
}

const GridCheckboxCell = props => {
    const { value, onChange, onFocus, readOnly } = props;
    return <div style={{ textAlign: "center", paddingTop: "5px" }}>
        <input
            type="checkbox"
            style={{ width: "16px", height: "16px", cursor: "pointer" }}
            checked={value || false}
            onChange={onChange}
            onFocus={onFocus}
            disabled={readOnly}
        />
    </div>
}

const GridRadioCell = props => {
    const { value, onChange, onFocus, radios, fieldName } = props;
    if (!radios) return "";
    const render = radios.map(function (radio, i) {
        return (
            <div key={i} style={{ marginLeft: "6px", paddingTop: "5px" }} >
                <input
                    type="radio"
                    style={{ width: "16px", height: "16px", cursor: "pointer" }}
                    name={fieldName}
                    value={radio.value}
                    checked={value === radio.value}
                    onChange={onChange}
                    onFocus={onFocus}
                />
                <label style={{ marginLeft: "4px", marginBottom: "0", position: "relative", top: "-4px" }}>{radio.label}</label>
            </div>
        );
    });

    return (
        <div style={{ display: "flex" }}>{render}</div>
    );
};

class GridSelectCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.islocal = false;
        if (props.source) this.islocal = true;
    }
    componentDidMount() {
        if (!this.props.source && this.props.url) {
            $http.get(this.props.url).then(res => {
                this.setState({ source: res.Result || [] });
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.url
            && prevProps.url !== this.props.url
            && !this.props.source) {
            $http.get(this.props.url).then(res => {
                this.setState({ source: res.Result || [] });
            });
        }
    }
    render() {
        const { value, onChange, onFocus, source, mapper, readOnly } = this.props;
        let data = this.islocal ? source : this.state.source;
        if (data && mapper && IsObject(mapper)
            && mapper.valueMember
            && mapper.textMember) {
            data = data.map(function (item, i) {
                return (
                    {
                        key: i,
                        id: item.id || item[mapper.valueMember],
                        text: item.text || item[mapper.textMember],
                        row: { ...item }
                    }
                );
            });
        }
        return <Select2
            ref={(e) => { this.tag = e; }}
            style={{ width: "100%" }}
            data={data}
            value={value || ""}
            onOpen={() => this.setState({ isSelectOpen: true })}
            onClose={() => this.setState({ isSelectOpen: false })}
            onChange={e => {
                if (this.state.isSelectOpen) {
                    if (this.tag && this.tag.el)
                        e.selectedValue = data.find(i => i.id.toString() === this.tag.el.val());
                    onChange(e);
                    this.setState({ isSelectOpen: false })
                }
            }}
            onFocus={onFocus}
            disabled={readOnly}
        />
    }
}

const GridButtonAddonsCell = props => {
    const { value, disabled, onClick } = props;
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        width: "100%"
    }}>
        <label style={{ width: '100%' }}>{value || ""}</label>
        {!disabled && <Button icon="pi pi-search" className="p-button-outlined" onClick={onClick} />}
    </div>
}

export class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            first: 0,
            totalRecords: props.source ? props.source.length : 0,
            source: props.source || [],
            allowSort: true,
            sortField: props.sortField || props.config.columns[0].field,
            sortOrder: props.sortOrder === "DESC" ? -1 : 1,
            selectedRow: props.config.selectedRows
        };

        this.gridRef = React.createRef();

        this.comboSources = {};
        this.deletedRows = [];
        this.maxNewRowId = 300000;
        this.Filters = {};
        this.onPage = this.onPage.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    handleInputFocus = (props) => {
        let row = props.value[props.rowIndex];
        this.setState({ selectedRow: row });
    };

    onEditorValueChange(props, value, e) {
        let source = [...this.state.source];
        const rowIndex = this.state.source.indexOf(props.rowData);
        let row = source[rowIndex];
        let { onBeforeCellUpdate, onAfterCellUpdate } = this.props.config;
        if (!onBeforeCellUpdate) onBeforeCellUpdate = defaults.onBeforeCellUpdate;
        const cursor = e && e.target && e.target.selectionStart;
        const input = e && e.target;
        Promise
            .resolve(onBeforeCellUpdate(props.field, value, row, source, e))
            .then((confirm) => {
                if (confirm) {
                    row[props.field] = value;
                    this.updateState(row);
                    this.setState({ source: source, allowSort: false }, () => {
                        if (input != null) input.selectionEnd = cursor;
                        if (onAfterCellUpdate) onAfterCellUpdate(props.field, value, row, source, e);
                    });
                }
            })
    }

    handleDateChange(props, date) {
        if (date instanceof Date && !isNaN(date.valueOf())) {
            date.setSeconds(0);
            date.setMilliseconds(0);
            this.onEditorValueChange(props, date);
        }
    }

    bindCellEditor(rowData, props) {
        if (this.props.config.beforeBindCell) {
            const cell = this.props.config.beforeBindCell(rowData, props);
            if (cell) return cell;
        }
        switch (props.type) {
            case 'numeric':
                return <GridNumericCell
                    value={rowData[props.field]}
                    scale={props.scale}
                    onChange={(e) => this.onEditorValueChange(props, e.target.value, e)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'datetime':
                return <GridDateTimeCell
                    value={rowData[props.field]}
                    onChange={(dateTime) => this.handleDateChange(props, dateTime)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'date':
                return <GridDateCell
                    value={rowData[props.field]}
                    onChange={(date) => this.handleDateChange(props, date)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'time':
                return <GridTimeCell
                    value={rowData[props.field]}
                    onChange={(time) => this.handleDateChange(props, time)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'checkbox':
                return <GridCheckboxCell
                    value={rowData[props.field]}
                    onChange={(e) => this.onEditorValueChange(props, e.target.checked)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'radio':
                return <GridRadioCell
                    value={rowData[props.field]}
                    radios={props.radios}
                    fieldName={props.field + props.rowIndex}
                    onChange={(e) => this.onEditorValueChange(props, e.target.value)}
                    onFocus={() => this.handleInputFocus(props)}
                />
            case 'combo':
                let url = props.dependsOn ? props.url + '/' + (props.rowData[props.dependsOn] ? props.rowData[props.dependsOn] : -1) : props.url;
                return <GridSelectCell
                    value={rowData[props.field]}
                    source={props.source || this.comboSources[props.field]}
                    url={url}
                    mapper={props.mapper}
                    onChange={(e) => this.onEditorValueChange(props, e.target.value, e)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
            case 'btnadd':
                return <GridButtonAddonsCell
                    value={rowData[props.field]}
                    onClick={props.onClick ? () => props.onClick(props.field, rowData) : null}
                    disabled={props.disabled}
                />
            default:
                return <GridTextCell
                    value={rowData[props.field]}
                    onChange={(e) => this.onEditorValueChange(props, e.target.value, e)}
                    onFocus={() => this.handleInputFocus(props)}
                    readOnly={props.readOnly}
                />
        }
    }

    bindPaginatorLeft = (config) => {
        const showRefresh = config.showRefresh === false ? false : true;
        const footer =
            <div className='p-clearfix' style={{ width: '100%' }}>
                {this.props.editMode && config.showAdd && <Button icon="pi pi-plus" className="p-button-primary p-button-rounded p-button-text" onClick={this.onAddClick.bind(this)} />}
                {this.props.editMode && config.showDelete && <Button icon="pi pi-trash" className="p-button-danger p-button-rounded p-button-text" onClick={this.onDeleteClick.bind(this)} />}
                {showRefresh && <Button icon="pi pi-refresh" className="p-button-success p-button-rounded p-button-text" onClick={this.refresh.bind(this)} />}
            </div>;
        return footer;
    }

    selectorTemplate(rowData) {
        if (rowData.ModelState === ModelState.Added)
            return <Button style={{ color: "blue" }} disabled icon="pi pi-plus state-icon" className="p-link" />;
        else if (rowData.ModelState === ModelState.Modified)
            return <Button style={{ color: "blue" }} disabled icon="pi pi-pencil state-icon" className="p-link" />;
        else if (rowData.ModelState === ModelState.Deleted)
            return <Button style={{ color: "blue" }} disabled icon="pi pi-ban state-icon" className="p-link" />;
        else return <Button style={{ color: "blue" }} disabled icon="pi pi-caret-right state-icon" className="p-link" />;
    }

    componentDidMount() {
        const { source } = this.props;
        const { url, lazy, columns, limit } = this.props.config;
        const { sortField, sortOrder } = this.state;
        let promises = [];
        let comboIndexes = {};
        let index = 0;
        columns
            .forEach((col) => {
                if (!col.source && !col.dependsOn && col.url) {
                    promises.push($http.get(col.url));
                    comboIndexes[`Index${index}`] = col.field;
                    index++;
                }
            });

        Promise.all(promises)
            .then(results => {
                for (let i = 0; i < results.length; i++) {
                    this.comboSources[comboIndexes[`Index${i}`]] = results[i].Result;
                }
                if (!source && url) {
                    const pagingConfig = { Offset: 0, Limit: limit || 10, ServerPagination: lazy || false, SortName: sortField, SortOrder: sortOrder };
                    this.loadData(pagingConfig, url);
                }
            });
    }
    componentDidUpdate(prevProps) {
        if (this.props.source !== prevProps.source) {
            this.setState({ source: this.props.source });
        }
    }
    loadData(pagingConfig, url) {
        let that = this;
        pagingConfig.SortOrder = pagingConfig.SortOrder === -1 ? "DESC" : "ASC";
        this.setState({ loading: true });
        let parameters = [];
        this.Filters = this.Filters || {};
        Object
            .keys(this.Filters)
            .filter(key => {
                return this.Filters[key].value
            })
            .reduce((obj, key) => {
                parameters.push({ name: key, operat: "cn", value: this.Filters[key].value });
                return obj;
            }, {});
        if (that.props.config.onPrepareParameter) that.props.config.onPrepareParameter(parameters);
        $http.post(url, { ...pagingConfig, Parameters: parameters }).then(res => {
            that.setState({ loading: false });
            if (HasException(res)) return;
            const data = res.Result;
            that.setState({
                first: pagingConfig.Offset,
                source: data.Rows ? data.Rows : data,
                totalRecords: data.Total ? data.Total : data.Rows ? data.Rows.length : data.length,
                selectedRow: that.props.config.selectedRows
            }, () => {
                if (that.props.config.loadCompleted) that.props.config.loadCompleted(data);
                this.deletedRows = [];
                this.maxNewRowId = 300000;
            });
        }, function () {
            that.setState({ loading: false });
        });
    }
    onPage(event) {
        const { lazy } = this.props.config;
        const { sortField, sortOrder } = this.state;
        const { first, rows } = event;
        const pagingConfig = { Offset: first, Limit: first + rows, ServerPagination: lazy || false, SortName: sortField, SortOrder: sortOrder };
        if (!pagingConfig.SortName) pagingConfig.SortName = this.props.config.columns[0].field;
        this.loadData(pagingConfig, this.props.config.url);
    }
    onSort = (event) => {
        const { lazy } = this.props.config;
        this.setState({ sortField: event.sortField, sortOrder: event.sortOrder, allowSort: true },
            () => {
                const pagingConfig = { Offset: 0, Limit: 10, ServerPagination: lazy || false, SortName: event.sortField, SortOrder: event.sortOrder };
                this.loadData(pagingConfig, this.props.config.url);
            });
    }
    onSortManual = (e) => {
        this.setState({ sortField: e.sortField, sortOrder: e.sortOrder, allowSort: true });
    }
    onFilter = (event) => {
        this.setState({ filters: event.filters })
        const eventFilters = event.filters;
        const currentFilter = Object
            .keys(eventFilters)
            .filter(key => {
                return eventFilters[key].value
            })
            .reduce((obj, key) => {
                obj[key] = eventFilters[key];
                return obj;
            }, {});

        this.Filters = Object
            .keys(this.Filters)
            .filter(key => {
                return Object.keys(eventFilters).includes(key);
            })
            .reduce((obj, key) => {
                obj[key] = this.Filters[key];
                return obj;
            }, {});

        this.Filters = { ...this.Filters, ...currentFilter };

        if (this.state.lazyRequestTimerID) {
            clearTimeout(this.state.lazyRequestTimerID);
        }

        var lazyRequestTimerID = setTimeout(() => {
            this.onPage({
                rows: 10,
                first: 0
            });
        }, 500);

        this.setState({ lazyRequestTimerID });
    }
    refresh = () => {
        this.onPage({
            rows: 10,
            first: 0
        });
    }
    filter = (name, value, matchMode = "startsWith") => {
        this.gridRef.current.filter(value, name, matchMode);
    }
    onAddClick = () => {
        let source = [...this.state.source];
        let newRow = { ModelState: ModelState.Added };
        if (this.props.dataKey) {
            newRow[this.props.dataKey] = this.maxNewRowId;
            this.maxNewRowId++;
        }

        let { onAddClick } = this.props.config;
        if (!onAddClick) onAddClick = defaults.onAddClick;
        Promise.resolve(onAddClick(newRow))
            .then((confirm) => {
                if (confirm) {
                    source.push(newRow);
                    this.setState({ source: source });
                }
            });
    }
    onDeleteClick = () => {
        const that = this;
        let { onDeleteClick } = that.props.config;
        const row = that.state.selectedRow && that.state.selectedRow.length ? [...that.state.selectedRow] : { ...that.state.selectedRow }
        if (!onDeleteClick) onDeleteClick = defaults.onDeleteClick;
        if (that.state.selectedRow) {
            Promise.resolve(onDeleteClick(row))
                .then((confirm) => {
                    if (confirm) {
                        const delList = that.state.selectedRow.length ? [...that.state.selectedRow] : [that.state.selectedRow];
                        const source = that.state.source.filter(e => !delList.includes(e))
                        delList.forEach((item) => {
                            if (item.ModelState !== ModelState.Added) {
                                item.ModelState = ModelState.Deleted;
                                that.deletedRows.push(item);
                            }
                        });
                        that.setState({ source: source, selectedRow: null });
                    }
                });
        }
    }
    clear = (afterClear) => {
        this.deletedRows = [];
        this.maxNewRowId = 300000;
        this.setState({ source: [], selectedRow: null }, () => {
            if (afterClear) afterClear();
        });
    }
    clearSelection = (afterClear) => {
        this.setState({ selectedRow: null }, () => {
            if (afterClear) afterClear();
        });
    }
    setSelection = (selectedRow, afterSelection) => {
        this.setState({ selectedRow: selectedRow }, () => {
            if (afterSelection) afterSelection();
        });
    }
    getSelectedRow = () => {
        let row = this.state.selectedRow && this.state.selectedRow.length ? this.state.selectedRow[0] : this.state.selectedRow;
        return row ? { ...row } : null;
    }
    getSelectedRows = () => {
        if (this.state.selectedRow)
            return [...this.state.selectedRow];
        else return [];
    }
    getRowById = (id) => {
        if (!this.props.dataKey) return null;
        const row = this.state.source.find(m => m[this.props.dataKey] === id);
        if (row) return { ...row };
        else return null;
    }
    getRows = () => {
        return [...this.state.source, ...this.deletedRows];
    }
    addRow = (newRow) => {
        if (!newRow) newRow = {};
        newRow.ModelState = ModelState.Added;
        if (this.props.dataKey && !newRow[this.props.dataKey]) {
            newRow[this.props.dataKey] = this.maxNewRowId;
            this.maxNewRowId++;
        }
        let source = [...this.state.source];
        source.push(newRow);
        this.setState({ source: source });
    }
    addRows = (newRows) => {
        const that = this;
        if (!Array.isArray(newRows)) return;
        let source = [...that.state.source];
        newRows.forEach(function (newRow) {
            if (!newRow) newRow = {};
            newRow.ModelState = ModelState.Added;
            if (that.props.dataKey && !newRow[that.props.dataKey]) {
                newRow[that.props.dataKey] = that.maxNewRowId;
                source.push(newRow);
                that.maxNewRowId++;
            }
        })
        that.setState({ source: source });
    }
    updateRow = (row) => {
        if (!IsObject(row) || !this.props.dataKey || !row[this.props.dataKey]) return;
        const index = this.state.source.findIndex(m => m[this.props.dataKey] === row[this.props.dataKey]);
        if (index === -1) return;
        if (row.ModelState !== ModelState.Added)
            row.ModelState = ModelState.Modified;
        const source = [
            ...this.state.source.slice(0, index),
            row,
            ...this.state.source.slice(index + 1),
        ];
        this.setState({ source: source });
    }
    updateCell = (id, field, value) => {
        if (!this.props.dataKey) return;
        let row = this.state.source.find(m => m[this.props.dataKey] === id);
        if (!row) return;
        row[field] = value;
        if (row.ModelState !== ModelState.Added)
            row.ModelState = ModelState.Modified;
        this.setState({ source: [...this.state.source] });
    }
    deleteRow = (id) => {
        if (!this.props.dataKey) return;
        const row = this.state.source.find(m => m[this.props.dataKey] === id);
        if (row) {
            const source = this.state.source.filter(m => m[this.props.dataKey] !== id)
            if (row.ModelState !== ModelState.Added) {
                row.ModelState = ModelState.Deleted;
                this.deletedRows.push(row);
            }
            this.setState({ source: source, selectedRow: null });
        }
    }
    deleteRows = (ids) => {
        if (!this.props.dataKey || !Array.isArray(ids)) return;
        const delList = this.state.source.filter(e => ids.includes(e[this.props.dataKey]))
        const source = this.state.source.filter(e => !delList.includes(e))
        delList.forEach((item) => {
            if (item.ModelState !== ModelState.Added) {
                item.ModelState = ModelState.Deleted;
                this.deletedRows.push(item);
            }
        });
        this.setState({ source: source, selectedRow: null });
    }
    changeState = (modelState) => {
        if (modelState < 1 || modelState > 6) return;
        this.state.source.forEach((item) => {
            if (item.ModelState !== ModelState.Added) {
                item.ModelState = modelState;
                if (modelState === ModelState.Deleted)
                    this.deletedRows.push(item);
            }
        });
        if (modelState === ModelState.Deleted)
            this.setState({ source: [] });
        else
            this.setState({ source: [...this.state.source] });
    }
    updateState = (rowData) => {
        if (!rowData.ModelState
            || rowData.ModelState === ModelState.Unchanged)
            rowData.ModelState = ModelState.Modified;
    }
    render() {
        const { source, totalRecords, first, filters, allowSort, sortField, sortOrder, loading } = this.state;
        const { config } = this.props;
        let newProps = { ...this.props };
        let sortMode = config.sortMode ? config.sortMode : "single";
        let paginator = config.paginator === false ? false : true;
        if (!allowSort) sortMode = "";
        delete newProps.config;
        delete newProps.sortField;
        delete newProps.sortOrder;
        delete newProps.source;
        const dynamicColumns = config.columns.map((col) => {
            // if (newProps.editMode && col.type)
            //     return <Column key={col.field} {...col} body={(rowData, props) => this.bindCellEditor(rowData, props)} />;
            if (col.type)
                return <Column key={col.field} {...col} body={(rowData, props) => this.bindCellEditor(rowData, props)} />;
            else
                return <Column key={col.field} {...col} body={col.cellformat ? (rowData, props) => col.cellformat(rowData, props) : null} />;
        });

        return (
            <DataTable ref={this.gridRef} filters={filters} sortField={sortField} sortOrder={sortOrder} {...newProps} value={source}
                paginator={paginator} rows={config.limit ? config.limit : 10} totalRecords={totalRecords}
                paginatorLeft={this.bindPaginatorLeft(config)}
                paginatorRight={<span />}
                first={first} onPage={newProps.lazy ? this.onPage : null}
                onSort={newProps.lazy ? this.onSort : this.onSortManual}
                onFilter={newProps.lazy ? this.onFilter : null}
                loading={loading}
                sortMode={sortMode}
                // onValueChange={sortedData => console.log(sortedData)}
                scrollable
                selectionMode={newProps.selectionMode ? newProps.selectionMode : "single"}
                selection={this.state.selectedRow}
                onSelectionChange={e => this.setState({ selectedRow: e.value }, () => {
                    if (config.onSelectionChange) config.onSelectionChange(e);
                })}>
                {config.multiSelect && <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>}
                {!config.multiSelect && newProps.editMode && <Column field="Selector" headerStyle={{ width: '3em' }} body={(rowData) => this.selectorTemplate(rowData)}></Column>}
                {dynamicColumns}
            </DataTable>
        );
    }
}
export default Grid;