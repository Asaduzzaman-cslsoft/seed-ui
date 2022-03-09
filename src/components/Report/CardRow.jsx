import React from "react";
import {
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