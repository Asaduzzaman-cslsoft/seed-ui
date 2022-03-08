import React, { Component } from "react";
import {
    Col,
    Row
    
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import PageBase from "../Base/PageBase";


class ViewTab extends PageBase {
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