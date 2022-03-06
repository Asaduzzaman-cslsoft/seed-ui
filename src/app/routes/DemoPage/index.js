import React from "react";
import {
  Col,
  Row
} from "reactstrap";
import { Card, CardHeader, CardContent } from '@material-ui/core';

import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import Grid from "components/Base/Grid";
import InlineFinder from "components/Base/InlineFinder";

import TextContainer from "components/FormInputs/TextContainer";
import TextareaContainer from "components/FormInputs/TextareaContainer";
import DateTimeContainer from "components/FormInputs/DateTimeContainer";
import DateContainer from "components/FormInputs/DateContainer";
import TimeContainer from "components/FormInputs/TimeContainer";
import NumericContainer from "components/FormInputs/NumericContainer";
import SelectContainer from "components/FormInputs/SelectContainer";
import CheckboxContainer from "components/FormInputs/CheckboxContainer";
import RadioContainer from "components/FormInputs/RadioContainer";
import { Services, AppConst, ObjectAssign, ShowMessageBox, ShowConfirmBox, DateCellFormat, TimeCellFormat } from "../../../util/Util"

class Demo extends PageBase {
  constructor(props) {
    super(props);
    let that = this;

    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();

    this.setConfig({
      serviceName: Services.Seed,
      keyField: "PrimaryId",
      displayField: "PrimaryCode",
      newIdString: AppConst.IntMinValue,
      getUrl: 'Demo/Get',
      createUrl: 'Demo/Create',
      updateUrl: 'Demo/Update',
      deleteUrl: 'Demo/Delete',
      showPrint: false,
      showNew: true,
      showSearch: true,
      showCreate: true,
      showUpdate: true,
      showDelete: true,
      showClear: true,
      onPrint: function () {
        console.log("Prnting.......");
      },
      // buttons: [{ text: "Dummy", icon: "pi pi-filter", class: "p-button-raised", onClick: this.dummyClick }],
      finder: {
        title: "Select Demo Information",
        url: `${AppConst.BaseUrl}/seed/Search/GetDemoTables`,
        columns:
          [
            { field: 'PrimaryId', style: { display: 'none' } },
            { field: 'PrimaryCode', header: 'Primary Code', filter: true, sortable: true },
            { field: 'TextValue', header: 'Text Value', filter: true, sortable: true },
            { field: 'IntValue', header: 'Int Value', style: { textAlign: 'right' }, filter: true, sortable: true },
            { field: 'DateValue', header: 'Date Value', filter: true, sortable: true, cellformat: DateCellFormat },
            { field: 'TimeValue', header: 'Time Value', filter: true, sortable: true, cellformat: TimeCellFormat }
          ],
        keyField: "PrimaryId",
        sortField: "PrimaryCode",
        sortOrder: "ASC",
        lazy: true,
        limit: 10,
        onPrepareParameter: (parameters) => {
          // console.log("onPrepareParameter", parameters);
        },
        onSelect: this.OnSelect,
        // multiSelect: false,
        // selectedRows: [{ PrimaryId: 1 }]
      },
      afterNew: function () { },
      beforeFill: function (model) {
        return true;
      },
      beforeLoad: function (model) { },
      afterLoad: function (model) {
        that.childGrid.current.refresh();
        that.inlineFinder.current.setSelection({ PrimaryId: model.PrimaryId });
      },
      beforeSave: function (model) {
        return new Promise(function (resolve) {
          const children = that.childGrid.current.getRows();
          ObjectAssign(model, { Master: { ...model }, Children: children });
          return resolve(true);
        })
      },
      afterSave: function (model, state) {
        that.childGrid.current.refresh();
        that.inlineFinder.current.refresh();
      },
      beforeDelete: function (primaryId, model) {
        return new Promise(function (resolve) {
          const children = that.childGrid.current.getRows();
          ObjectAssign(model, { Master: { ...model }, Children: children });
          return resolve(true);
        })
      },
      afterDelete: function (primaryId) {
        that.childGrid.current.clear();
        that.inlineFinder.current.refresh();
      },
      afterClear: function () {
        that.childGrid.current.clear();
        that.inlineFinder.current.clearSelection();
      }
    });
    this.gridConfig = {
      url: `${AppConst.BaseUrl}/seed/Demo/GetDemoChildren`,
      columns:
        [
          { field: 'ChildId', style: { display: 'none' } },
          { field: 'PrimaryId', style: { display: 'none' } },
          // {
          //     field: 'ButtonAddons', header: 'Button Addons', type: 'btnadd', style: { width: '200px' },
          //     onClick: (field, row) => {
          //         // console.log(field, row);
          //     }
          // },
          { field: 'TextValue', header: 'Text Value', type: 'text' },
          { field: 'IntValue', header: 'Int Value', type: 'numeric' },
          { field: 'NumericValue', header: 'Numeric Value', type: 'numeric', scale: 2 },
          { field: 'DateValue', header: 'Date Value', type: 'date' },
          { field: 'TimeValue', header: 'Time Value', type: 'time' },
          { field: 'BooleanValue', header: 'Is Active?', type: 'checkbox' },
          {
            field: 'OptionValue', header: 'Option Value', type: 'radio',
            radios:
              [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" }
              ],
            style: { width: '200px' }
          },
          {
            field: 'ComboValue', header: 'Combo Value', type: 'combo',
            url: `${AppConst.BaseUrl}/seed/Combo/GetDemoStatus`
            // source: [
            //   { id: "", text: "" },
            //   { id: "Active", text: "Active" },
            //   { id: "InActive", text: "In Active" },
            //   { id: "Seperated", text: "Seperated" }
            // ],
            // mapper:{ valueMember: 'id', textMember: 'text' }
          }
        ],
      onPrepareParameter: (parameters) => {
        parameters.push({
          name: "PrimaryId",
          operat: "=",
          value: this.state.Model.PrimaryId || -1
        });
      },
      onAddClick: (newRow) => {
        return new Promise(function (resolve) {
          if (that.state.Model.PrimaryId) {
            newRow.PrimaryId = that.state.Model.PrimaryId;
            return resolve(true);
          }
          else
            ShowMessageBox({ text: "Primary Code can't be blank!" });
        })
      },
      onDeleteClick: (row) => {
        return new Promise(function (resolve) {
          ShowConfirmBox({
            title: "Delete Confirmation",
            text: "Are you sure you want to permanently delete info?",
            onOkClick: function () {
              return resolve(true);
            }
          });
        });
      },
      onBeforeCellUpdate: (field, cellValue, row, rows) => {
        return new Promise(function (resolve) {
          return resolve(true);
        });
      },
      onAfterCellUpdate: (field, cellValue, row, rows) => {

      },
      showAdd: true,
      showDelete: true,
      showRefresh: true,
      lazy: false,
      limit: 20
    }
  }

  dummyClick = () => {
    // console.log("Model : ", this.state.Model);
    // console.log(this.childGrid.current.getRowById(5));
    // this.childGrid.current.addRow();
    // this.childGrid.current.deleteRow(2);   
    // this.childGrid.current.deleteRows([1,2]);
    // this.childGrid.current.addRows([{},{}]);
    // this.childGrid.current.updateRow({ ChildId: 1, TextValue: "Updated" });
    // this.childGrid.current.updateCell(2, "TextValue", "Cell Updated");
    // this.childGrid.current.changeState(ModelState.Added);        
  }

  render() {
    return (
      <div className="page-wrapper">
        <Row>
          <Col md={3}>
            <InlineFinder
              height="274px"
              ref={this.inlineFinder}
              config={{
                title: "Demos",
                url: `${AppConst.BaseUrl}/seed/Search/GetDemoTables`,
                columns:
                  [
                    { field: 'PrimaryId', style: { display: 'none' } },
                    { field: 'PrimaryCode', header: 'Primary Code', filter: true, sortable: true },
                    { field: 'TextValue', header: 'Text Value', filter: true, sortable: true }
                  ],
                scrollHeight: "150px",
                keyField: "PrimaryId",
                sortField: "PrimaryCode",
                sortOrder: "ASC",
                lazy: true,
                limit: 10,
                onSelect: this.OnSelect,
                loadCompleted: () => {
                  this.inlineFinder.current.setSelection({ PrimaryId: this.state.Model.PrimaryId });
                }
              }} />
          </Col>
          <Col md={9}>
            <Card style={{ height: "304px" }}>
              <CardHeader title="Demo Information" />
              <CardContent>
                <Row>
                  <Col sm={4}>
                    <TextContainer
                      label="Primary Code"
                      readOnly
                      {...this.useInput({ fieldName: "PrimaryCode", validate: '["required"]' })}
                    />
                    <TextareaContainer
                      label="Text Value"
                      maxLength={250}
                      rows={4}
                      {...this.useInput({ fieldName: "TextValue", validate: '["required"]' })}
                    />
                    <NumericContainer
                      label="Int Value"
                      {...this.useInput({ fieldName: "IntValue", validate: '["required"]' })}
                    />
                  </Col>
                  <Col sm={4}>
                    <NumericContainer
                      label="Numeric Value"
                      scale="2"
                      {...this.useInput({ fieldName: "NumericValue", validate: '["required"]' })}
                    />
                    <DateTimeContainer
                      label="Date Time"
                      {...this.useInput({ fieldName: "DateTimeValue", isDateTime: true })}
                    />
                    <DateContainer
                      label="Date Only"
                      isDate={true}
                      {...this.useInput({ fieldName: "DateValue", validate: '["required"]', isDateTime: true })}
                    />
                    <TimeContainer
                      label="Time Only"
                      isTime={true}
                      {...this.useInput({ fieldName: "TimeValue", isDateTime: true })}
                    />
                  </Col>
                  <Col sm={4}>
                    <SelectContainer
                      label="Combo Parent"
                      url={`${AppConst.BaseUrl}/seed/Combo/GetDemoStatus`}
                      // source={ [
                      //     { id: "", text: "" },
                      //     { id: "Active", text: "Active" },
                      //     { id: "InActive", text: "In Active" },
                      //     { id: "Seperated", text: "Seperated" }
                      // ]}
                      // mapper={{ valueMember: 'id', textMember: 'text' }}
                      {...this.useInput({ fieldName: "ComboParent", validate: '["required"]' })}
                    />
                    <SelectContainer
                      label="Combo Child"
                      url={`${AppConst.BaseUrl}/seed/Combo/GetChildStatus/${this.state.Model.ComboParent || -1}`}
                      // source= {[
                      //     { id: "", text: "" },
                      //     { id: "Child", text: "Child" },
                      //     { id: "Dummy", text: "Dummy" }
                      // ]}
                      // mapper={{ valueMember: 'id', textMember: 'text' }}
                      {...this.useInput({ fieldName: "ComboChild" })}
                    />
                    <CheckboxContainer
                      label="Is Active?"
                      {...this.useInput({ fieldName: "BooleanValue" })}
                    />
                    <RadioContainer
                      label="Option Value"
                      radios={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" }
                      ]}
                      {...this.useInput({ fieldName: "OptionValue" })}
                    />
                  </Col>
                </Row>
              </CardContent>
            </Card >
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader title="Demo Children" />
              <CardContent>
                <Grid ref={this.childGrid} editMode="cell"
                  config={this.gridConfig}
                  dataKey="ChildId"
                  className="p-datatable-gridlines editable-cells-table p-datatable-sm cc-grid"
                  scrollHeight="240px"
                >
                </Grid>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}

export default withPageBase(Demo);
