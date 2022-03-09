import React from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import PageBase from "../Base/PageBase";


class SortField extends PageBase {
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
                        label="component ID"
                        {...this.useInput({ fieldName: "componentID" })} />                                     
                    <CheckboxContainer
                        label="Default Sorting"
                        {...this.useInput({ fieldName: "DefaultSorting" })} />
                </Col>
                <Col md={6}>
                    <TextContainer
                        label="Field ID"
                        {...this.useInput({ fieldName: "FieldID" })} />                   
                   
                </Col>
            </Row >
        </div >
        )
    }
}
export default SortField;