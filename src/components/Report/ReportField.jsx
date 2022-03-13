import React from "react";
import { Button, Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import FieldFormatting from "./FieldFormatting"
import PageBase from "../Base/PageBase";

class ReportField extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {},
    };
    this.fieldFormatingRef=React.createRef();
   
  }
  Edit(model) {
    this.setState({
        Model: model
    });
    if(model.Formatting){
      this.fieldFormatingRef.current.LoadData(model.Formatting)
    }
    
}
ClearModel() {
  this.setState({ Model: {} });
}
  render() {
    const onAddClick = this.props.config.onAddClick;
        const onUpdateClick = this.props.config.onUpdateClick;
        const onCancelClick = this.props.config.onCancelClick;
        const addDisabled = this.props.config.addDisabled;
        const editDisabled = this.props.config.editDisabled;
        if (this.props.show) {
    return (
      <div>
        <Row>
          <Col md={9}></Col>
          <Col md={3}>
           <Button disabled={addDisabled} onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '60px', height: "30px" }}>Add</Button>
           <Button disabled={editDisabled} onClick={onUpdateClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Update</Button>
           <Button onClick={onCancelClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextContainer
              label="Field ID"
              {...this.useInput({ fieldName: "FieldID" })}
            />
            <TextContainer
              label="Column Name"
              {...this.useInput({ fieldName: "ColumnName" })}
            />
              <TextContainer
              label="Max Number Of Lines"
              {...this.useInput({ fieldName: "MaxNumberOfLines" })}
            />
             <CheckboxContainer
              label="Show Label"
              {...this.useInput({ fieldName: "ShowLabel" })}
            />
            <CheckboxContainer
              label="Send As Parameter For Card Action"
              {...this.useInput({ fieldName: "SendAsParameterForCardAction" })}
            />
            
          </Col>
          <Col md={6}>
            <TextContainer
              label="Label Name"
              {...this.useInput({ fieldName: "LabelName" })}
            />
            <TextContainer
              label="Value Type"
              {...this.useInput({ fieldName: "ValueType" })}
            />
             <TextContainer
              label="Position"
              {...this.useInput({ fieldName: "Position" })}
            />
           
            <CheckboxContainer
              label="Show Value"
              {...this.useInput({ fieldName: "ShowValue" })}
            />
            
            <CheckboxContainer
              label="Special Formatting"
              {...this.useInput({ fieldName: "SpecialFormatting" })}
            />
          </Col>
        </Row>
        <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Field Formatting</legend>
            <FieldFormatting ref={this.fieldFormatingRef} />
          </fieldset>
      </div>
    );
  }else{
      return null;
    }
  }
}
export default ReportField;
