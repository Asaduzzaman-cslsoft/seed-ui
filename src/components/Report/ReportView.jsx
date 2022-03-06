import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ViewTab from "./ViewTab";
import SortField from "./SortField";
import ComponentView from "./ComponentView";
class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {},
    };
    this.useInput = this.useInput.bind(this);
    
  }
  useInput = (props) => {   
    props.modelName = props.modelName || "Model";
    props.validate = props.validate || "[]";
    const value = this.state[props.modelName][props.fieldName];
    return {
      model: props.fieldName,
      modelName: props.modelName,
      value: value,
      onChange: props.isDateTime
        ? (e) =>
            this.handleDateChange(
              e,
              props.fieldName,
              props.modelName,
              props.onChange
            )
        : (e) => this.handleChange(e, props.modelName, props.onChange),
      hasError: this.hasError,
      validate: props.validate,
    };
  };
  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <TextContainer
              label="View ID"
              {...this.useInput({ fieldName: "ViewID" })}
            />
            <TextContainer
              label="Type"
              {...this.useInput({ fieldName: "Type" })}
            />
            <TextContainer
              label="Number Of Tabs"
              {...this.useInput({ fieldName: "NumberOfTabs" })}
            />
            <CheckboxContainer
              label="Sorting Facility"
              {...this.useInput({ fieldName: "SortingFacility" })}
            />
          </Col>
          <Col md={6}>
            <TextContainer
              label="Seq No"
              {...this.useInput({ fieldName: "SeqNo" })}
            />
            <TextContainer
              label="Title"
              {...this.useInput({ fieldName: "Title" })}
            />
            <TextContainer
              label="Number Of Components"
              {...this.useInput({ fieldName: "NumberOfComponents" })}
            />
          </Col>
        </Row>
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>
            View Tab
          </legend>
          <ViewTab />
         
        </fieldset>
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>
            Sort Feild
          </legend>
          <SortField />
        </fieldset>
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>
            Component
          </legend>
          <ComponentView />
        </fieldset>
      </div>
    );
  }
}
export default ReportView;
