import React from "react";
import {
    Button,
    Col,
    Row

} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ReportField from './ReportField';
import PageBase from "../Base/PageBase";

class CardRow extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            Model: {},
            errors: {}
        };


    }
    Edit(model) {
        this.setState({
            Model: model
        });
    }
    render() {
        const onAddClick = this.props.config.onAddClick;
        const onUpdateClick = this.props.config.onUpdateClick;
        const onCancelClick = this.props.config.onCancelClick;
        const addDisabled = this.props.config.addDisabled;
        const editDisabled = this.props.config.editDisabled;       
        if (this.props.show) {
            return (
                <div>
                    <Row>
                        <Col md={9}></Col>
                        <Col md={3}>
                            <Button disabled={addDisabled} onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '60px', height: "30px" }}>Add</Button>
                            <Button disabled={editDisabled} onClick={onUpdateClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Update</Button>
                            <Button onClick={onCancelClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Cancel</Button>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={6}>
                            <TextContainer
                                label="Row Number"
                                {...this.useInput({ fieldName: "RowNumber" })} />

                            <CheckboxContainer
                                label="Divider End To End"
                                {...this.useInput({ fieldName: "DividerEndToEnd" })} />
                        </Col>
                        <Col md={6}>
                            <CheckboxContainer
                                label="Divide After"
                                {...this.useInput({ fieldName: "DivideAfter" })} />

                        </Col>
                    </Row >
                    <fieldset className="border p-2">
                        <legend className="w-auto" style={{ width: "inherit" }}>Report Field</legend>
                        <ReportField />
                    </fieldset>
                </div >
            )
        } else {
            return null;
        }
    }
}
export default CardRow;