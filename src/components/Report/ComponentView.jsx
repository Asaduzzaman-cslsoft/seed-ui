import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import CardRow from "./CardRow";


class ComponentView extends Component {
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
                        label="component ID"
                        {...this.useInput({ fieldName: "componentID" })} />
                         <TextContainer
                        label="Seq No"
                        {...this.useInput({ fieldName: "SeqNo" })} /> 
                         <TextContainer
                        label="Query"
                        {...this.useInput({ fieldName: "Query" })} />                                 
                    <CheckboxContainer
                        label="Card Action"
                        {...this.useInput({ fieldName: "CardAction" })} />
                </Col>
                <Col md={6}>
                    <TextContainer
                        label="Parent Tab ID"
                        {...this.useInput({ fieldName: "ParentTabID" })} />
                         <TextContainer
                        label="Type"
                        {...this.useInput({ fieldName: "Type" })} /> 
                         <TextContainer
                        label="Query"
                        {...this.useInput({ fieldName: "Query" })} />
                         <TextContainer
                        label="Card Action Report ID"
                        {...this.useInput({ fieldName: "CardActionReportID" })} />                 
                   
                </Col>
            </Row >
            <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Card Row</legend>
            <CardRow />
          </fieldset>
        </div >
        )
    }
}
export default ComponentView;