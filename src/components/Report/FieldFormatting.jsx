import React from "react";
import {
    Button,
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
      ClearModel(){
        this.setState({
            Model: {}
          });  
      }
     LoadData(model){
        this.setState({
            Model: model
          });  
     }
    render() {
        const onAddClick = this.props.config.onAddClick;
        return(
        <div>
            <Row>
          <Col md={10}></Col>
          <Col md={2}>
           <Button onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '60px', height: "30px" }}>Add</Button>
          </Col>
        </Row>
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