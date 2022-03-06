import React, { Component } from "react";
import {
    Col,
    Row  
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";


class ReportParameter extends Component {
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
                        label="ParameterID"
                        {...this.useInput({ fieldName: "ParameterID" })} />
                    <TextContainer
                        label="Value Type"
                        {...this.useInput({ fieldName: "ValueType" })} />
                    <TextContainer
                        label="Lookup Query"
                        {...this.useInput({ fieldName: "LookupQuery" })} />
                    <CheckboxContainer
                        label="Mandatory"
                        {...this.useInput({ fieldName: "Mandatory" })} />


                </Col>
                <Col md={6}>
                    <TextContainer
                        label="Name"
                        {...this.useInput({ fieldName: "Name" })} />
                    <TextContainer
                        label="Entry Type"
                        {...this.useInput({ fieldName: "EntryType" })} />
                    <CheckboxContainer
                        label="MultiSelect"
                        {...this.useInput({ fieldName: "MultiSelect" })} />
                </Col>
            </Row >
        </div >
        )
    }
}
export default ReportParameter;