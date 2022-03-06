import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { Button } from 'primereact/button';
import FinderBase from "../Base/FinderBase";

class Finder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        this.baseFinder = React.createRef();
    }

    toggleFinder = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    onSelect = (data) => {
        this.setState({ visible: false });
        if (this.props.config.onSelect) this.props.config.onSelect(data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(!nextState.visible && !this.state.visible);
    }

    render() {
        const { title } = this.props.config;
        return (
            <Drawer open={this.state.visible} style={{ height: 'auto', padding: "0" }} anchor="top" onClose={() => this.setState({ visible: false })}>
                <Card>
                    <CardHeader title={title} />
                    <CardContent style={{ height: "350px" }}>
                        <FinderBase ref={this.baseFinder} config={this.props.config} onSelect={this.onSelect} />
                    </CardContent>
                    <CardActions style={{ display: "block", textAlign: "right" }}>
                        <Button style={{ width: "94px", height: "32px", marginRight: '.25em' }} onClick={() => this.baseFinder.current.onSelect()} label="OK" icon="pi pi-check-circle" className="p-button-raised" />
                        <Button style={{ width: "94px", height: "32px", }} onClick={() => this.setState({ visible: false })} label="Cancel" icon="pi pi-times-circle" className="p-button-raised p-button-danger" />
                    </CardActions>
                </Card>
            </Drawer>
        );
    }
}

Finder.propTypes = {
    config: PropTypes.shape({
        url: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired
    }).isRequired
};

export default Finder;