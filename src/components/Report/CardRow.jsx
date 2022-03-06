import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ReportField from './ReportField';

class CardRow extends Component {
    constructor(props) {
        super(props);     
        this.state = {
            Model: {},
            errors: {}
          };
        this.useInput = this.useInput.bind(this);
        
      }
      useInput = (props) => {      
        props.modelName = props.modelName || "Model";
        props.validate = props.validate || '[]';
        const value = this.state[props.modelName][props.fieldName];
        return {
          model: props.fieldName,
          modelName: props.modelName,
          value: value,
          onChange: props.isDateTime ? e => this.handleDateChange(e, props.fieldName, props.modelName, props.onChange) : e => this.handleChange(e, props.modelName, props.onChange),
          hasError: this.hasError,
          validate: props.validate
        }
      }
    render() {
        return(
        <div>
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
    }
}
export default CardRow;