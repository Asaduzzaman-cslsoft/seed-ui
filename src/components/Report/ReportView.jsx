import React from "react";
import { Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ViewTab from "./ViewTab";
import SortField from "./SortField";
import ComponentView from "./ComponentView";
import PageBase from "../Base/PageBase";
import { Button } from 'primereact/button';
class ReportView extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {},
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
            <Button onClick={onAddClick} style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '60px', height: "30px" }}>Add</Button>
            <Button style={{ margin: '0 4px 0 0', paddingLeft: 0, width: '65px', height: "30px" }}>Update</Button>
          </Col>

        </Row>
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
  }else{
    return null;
  }
  }
}
export default ReportView;
