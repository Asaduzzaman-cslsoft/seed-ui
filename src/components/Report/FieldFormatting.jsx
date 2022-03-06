import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";


class FieldFormatting extends Component {
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
                        label="Font"
                        {...this.useInput({ fieldName: "Font" })} />
                    <TextContainer
                        label="Color"
                        {...this.useInput({ fieldName: "Color" })} />                   
                    <CheckboxContainer
                        label="Italic"
                        {...this.useInput({ fieldName: "Italic" })} />
                        <TextContainer
                        label="Prefix"
                        {...this.useInput({ fieldName: "Prefix" })} />
                </Col>
                <Col md={6}>
                    <TextContainer
                        label="Size"
                        {...this.useInput({ fieldName: "Size" })} />
                      <CheckboxContainer
                        label="Bold"
                        {...this.useInput({ fieldName: "Bold" })} />
                        <CheckboxContainer
                        label="Underline"
                        {...this.useInput({ fieldName: "Underline" })} />
                        <TextContainer
                        label="Suffix"
                        {...this.useInput({ fieldName: "Suffix" })} />
                   
                </Col>
            </Row >
        </div >
        )
    }
}
export default FieldFormatting;