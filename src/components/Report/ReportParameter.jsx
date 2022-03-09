import React from "react";
import {
    Col,
    Row
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import { Button } from 'primereact/button';
import PageBase from "../Base/PageBase";

class ReportParameter extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            Model: {},
            errors: {}
        };    
    } 
    
    render() {
      const  onAddClick = this.props.config.onAddClick;
        if(this.props.show){         
        return (
            <div>
                <Row>
                    <Col md={10}></Col>
                    <Col md={2}>
                    <Button  onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft:0, width: '60px', height: "30px" }}>Add</Button>
                    <Button  style={{ margin: '0 4px 0 0', paddingLeft:0, width: '65px', height: "30px" }}>Update</Button>
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6}>    
                    <TextContainer
                            label="Parameter ID"
                            {...this.useInput({ fieldName: "ParameterID" })} />                    
                        <TextContainer
                            label="Name"
                            {...this.useInput({ fieldName: "Name" })} />
                        <TextContainer
                            label="Lookup Query"
                            {...this.useInput({ fieldName: "LookupQuery" })} />
                        <CheckboxContainer
                            label="Mandatory"
                            {...this.useInput({ fieldName: "Mandatory" })} />


                    </Col>
                    <Col md={6}>
                        <TextContainer
                            label="Value Type"
                            {...this.useInput({ fieldName: "ValueType" })} />
                        <TextContainer
                            label="Entry Type"
                            {...this.useInput({ fieldName: "EntryType" })} />
                        <CheckboxContainer
                            label="MultiSelect"
                            {...this.useInput({ fieldName: "MultiSelect" })} />
                    </Col>
                </Row >
            </div >

        )}else{
            return null;
        }
    }
}
export default ReportParameter;