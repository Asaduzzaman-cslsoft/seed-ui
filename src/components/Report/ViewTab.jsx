import React from "react";
import {
    Button,
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
        const onAddClick = this.props.config.onAddClick;
        if (this.props.show) {       
        return(
        <div>
            <Row>
            <Col md={10}></Col>
            <Col md={2}>
              <Button onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '60px', height: "30px" }}>Add</Button>
              <Button style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Update</Button>
            </Col>

          </Row>
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
    }else{
        return null;
    }
    }
}
export default ViewTab;