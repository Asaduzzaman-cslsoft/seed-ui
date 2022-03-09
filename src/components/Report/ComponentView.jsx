import React from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import CardRow from "./CardRow";
import PageBase from "../Base/PageBase";


class ComponentView extends PageBase {
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
            {/* <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Card Row</legend>
            <CardRow />
          </fieldset> */}
        </div >
        )
    }
}
export default ComponentView;