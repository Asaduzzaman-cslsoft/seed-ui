import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent } from '@material-ui/core';
import FinderBase from "../Base/FinderBase";

class InlineFinder extends React.Component {
    constructor(props) {
        super(props);

        this.baseFinder = React.createRef();
    }
    clearSelection = () => {
        this.baseFinder.current.clearSelection();
    }
    setSelection = (selectedRow) => {
        this.baseFinder.current.setSelection(selectedRow);
    }
    refresh = () => {
        this.baseFinder.current.refresh();
    }
    render() {
        const { title } = this.props.config;
        return (
            <Card>
                <CardHeader title={title} />
                <CardContent style={{ height: this.props.height }}>
                    <FinderBase ref={this.baseFinder} config={this.props.config} />
                </CardContent>
            </Card>
        );
    }
}

InlineFinder.propTypes = {
    height: PropTypes.string.isRequired,
    config: PropTypes.shape({
        url: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired
    }).isRequired
};

export default InlineFinder;