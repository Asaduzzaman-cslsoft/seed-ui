import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";


class ViewTab extends Component {
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
                        label="View ID"
                        {...this.useInput({ fieldName: "ViewID" })} />
                    <TextContainer
                        label="Tab Caption"
                        {...this.useInput({ fieldName: "TabCaption" })} />                   
                    <CheckboxContainer
                        label="Visible"
                        {...this.useInput({ fieldName: "Visible" })} />
                </Col>
                <Col md={6}>
                    <TextContainer
                        label="Tab ID"
                        {...this.useInput({ fieldName: "TabID" })} />
                    <TextContainer
                        label="Seq No"
                        {...this.useInput({ fieldName: "SeqNo" })} />
                   
                </Col>
            </Row >
        </div >
        )
    }
}
export default ViewTab;