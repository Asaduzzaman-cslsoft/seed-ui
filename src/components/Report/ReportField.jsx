import React from "react";
import { Col, Row } from "reactstrap";
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
   
  }
 
  render() {
    return (
      <div>
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
              label="Value Type"
              {...this.useInput({ fieldName: "ValueType" })}
            />
            <CheckboxContainer
              label="Send As Parameter For Card Action"
              {...this.useInput({ fieldName: "SendAsParameterForCardAction" })}
            />
             <TextContainer
              label="Position"
              {...this.useInput({ fieldName: "Position" })}
            />
          </Col>
          <Col md={6}>
            <TextContainer
              label="Label Name"
              {...this.useInput({ fieldName: "LabelName" })}
            />
            <CheckboxContainer
              label="Show Label"
              {...this.useInput({ fieldName: "ShowLabel" })}
            />
            <CheckboxContainer
              label="Show Value"
              {...this.useInput({ fieldName: "ShowValue" })}
            />
             <TextContainer
              label="Max Number Of Lines"
              {...this.useInput({ fieldName: "MaxNumberOfLines" })}
            />
            <CheckboxContainer
              label="Special Formatting"
              {...this.useInput({ fieldName: "SpecialFormatting" })}
            />
          </Col>
        </Row>
        <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Field Formatting</legend>
            <FieldFormatting />
          </fieldset>
      </div>
    );
  }
}
export default ReportField;
