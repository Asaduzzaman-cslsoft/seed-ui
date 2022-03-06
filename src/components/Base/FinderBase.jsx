import React from "react";
import PropTypes from "prop-types";
import Grid from "../Base/Grid";

class FinderBase extends React.Component {
    constructor(props) {
        super(props);
        this.grid = React.createRef();
    }
    clearSelection = () => {
        this.grid.current.clearSelection();
    }
    setSelection = (selectedRow) => {
        this.grid.current.setSelection(selectedRow);
    }
    refresh = () => {
        this.grid.current.refresh();
    }
    onSelect = (data) => {
        let onSelect = this.props.onSelect || this.props.config.onSelect;
        if (onSelect) {
            if (data) onSelect(data);
            else {
                let selectedRow;
                if (this.props.config.multiSelect)
                    selectedRow = this.grid.current.getSelectedRows();
                else
                    selectedRow = this.grid.current.getSelectedRow();
                if (selectedRow) onSelect(selectedRow);
            }
        }
    }

    render() {
        const { keyField, multiSelect, lazy, sortField, sortOrder, scrollHeight } = this.props.config;
        return (
            <Grid ref={this.grid} config={this.props.config}
                lazy={lazy || true}
                dataKey={keyField}
                sortField={sortField}
                sortOrder={sortOrder}
                className="p-datatable-gridlines p-datatable-sm"
                scrollHeight={scrollHeight ? scrollHeight : "250px"}
                selectionMode={multiSelect ? "multiple" : "single"}
                metaKeySelection={false}
                onRowDoubleClick={(e) => {
                    if (!multiSelect) this.onSelect(e.data)
                }}>
            </Grid>
        );
    }
}

FinderBase.propTypes = {
    config: PropTypes.shape({
        url: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired
    }).isRequired
};

export default FinderBase;