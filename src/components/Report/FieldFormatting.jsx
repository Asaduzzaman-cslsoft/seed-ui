import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import PageBase from "../Base/PageBase";


class FieldFormatting extends PageBase {
    constructor(props) {
        super(props);     
        this.state = {
            Model: {},
            errors: {}
          };
      
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