import React from "react";
import { Button, Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ReportField from "./ReportField";
import PageBase from "../Base/PageBase";
import { ListItemText } from "@material-ui/core";
import CardList from "../Base/CardList";
import { ShowMessageBox } from "../../util/Util";

class CardRow extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {},
      isreportFieldsForm:false,
      reportFieldList: [],
    };
     //Report Field Add
     this.reportFieldAdd = React.createRef();
     this.reportFieldAddLoading = {
         editDisabled: true,
         addDisabled: false,
         onAddClick: () => {        
             let model = this.reportFieldAdd.current.state.Model;
             let fieldFomating = this.reportFieldAdd.current.state.FieldFormatting;
             model.Formatting=fieldFomating;
             console.log(model)
             let vtList = this.state.reportFieldList;
             vtList.push(model);
             this.setState({ reportFieldList: vtList })
             this.reportFieldListRef.current.setSource(vtList);
             this.setState({ isreportFieldsForm: false });
             this.reportFieldAdd.current.ClearModel();
         },


         onUpdateClick: () => {
             let model = this.reportFieldAdd.current.state.Model;
             let pmList = this.state.reportFieldList;
             var foundIndex = pmList.findIndex(x => x.ViewID === model.ViewID);
             pmList[foundIndex] = model;
             this.setState({ reportFieldList: pmList })
             this.reportFieldListRef.current.setSource(this.state.reportFieldList);
             this.setState({ isreportFieldsForm: false });
             this.reportFieldAdd.current.ClearModel();
         },
         onCancelClick: () => {
             this.setState({ isreportFieldsForm: false });
             this.reportFieldAdd.current.ClearModel();
         },
     }
     //Report Field Add End
     //Report Field List
     this.reportFieldListRef = React.createRef();
     this.reportFieldListLoading = {
         title: "Report Field",
         keyField: "FieldID",
         skipInitialLoad: true,
         showEdit: true,
         showAdd: true,
         lazy: false,
         limit: 10,
         height: "200px",
         onEditClick: () => {
             //ShowMessageBox({ text: "Clicked worked" });
             let that = this;
             let allItems = this.reportFieldListRef.current.state.source;
             let selectedId = this.reportFieldListRef.current.state.selectedId;
             var result = allItems.filter(obj => {
                 return obj.FieldID === selectedId;
             })
             if (result[0]) {
                 this.setState({ isreportFieldsForm: true });
                 setTimeout(() => {
                    that.reportFieldAdd.current.props.config.editDisabled = false;
                    that.reportFieldAdd.current.props.config.addDisabled = true;
                    that.reportFieldAdd.current.Edit(result[0])
                 }, 100);
               
             } else {
                 ShowMessageBox({ text: "Select a View Tab first." });
             }
         },
         onAddClick: () => {
             this.setState({ isreportFieldsForm: true });               
         },
         onRender: (item) => {
             return (
                 <>
                        <Row style={{width:"100%"}}>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.FieldID} />
                         </Col>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.LabelName} />
                         </Col>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.ColumnName} />
                         </Col>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.ValueType} />
                         </Col>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.MaxNumberOfLines} />
                         </Col>
                         <Col md={2} style={{ textAlign: "center" }}>
                             <ListItemText primary={item.Position} />
                         </Col>
                         
                     </Row>
                 </>
             );
         },
     };
     //Report Field List End
  }
  Edit(model) {
    this.setState({
      Model: model,
      reportFieldList:model.Fields
    });  
    this.reportFieldListRef.current.setSource(model.Fields)
  }
  ClearModel() {
    this.setState({ Model: {} });
  }
  ClearReportFields() {
    this.setState({ reportFieldList: [] });
  }
  render() {
    const onAddClick = this.props.config.onAddClick;
    const onUpdateClick = this.props.config.onUpdateClick;
    const onCancelClick = this.props.config.onCancelClick;
    const addDisabled = this.props.config.addDisabled;
    const editDisabled = this.props.config.editDisabled;
    let isreportFieldsForm=this.state.isreportFieldsForm;
    if (this.props.show) {
      return (
        <div>
          <Row>
            <Col md={9}></Col>
            <Col md={3}>
              <Button
                disabled={addDisabled}
                onClick={onAddClick}
                style={{
                  margin: "0 4px 0 0",
                  paddingLeft: 0,
                  width: "60px",
                  height: "30px",
                }}
              >
                Add
              </Button>
              <Button
                disabled={editDisabled}
                onClick={onUpdateClick}
                style={{
                  margin: "0 4px 0 0",
                  paddingLeft: 0,
                  width: "65px",
                  height: "30px",
                }}
              >
                Update
              </Button>
              <Button
                onClick={onCancelClick}
                style={{
                  margin: "0 4px 0 0",
                  paddingLeft: 0,
                  width: "65px",
                  height: "30px",
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextContainer
                label="Row Number"
                {...this.useInput({ fieldName: "RowNumber" })}
              />

              <CheckboxContainer
                label="Divider End To End"
                {...this.useInput({ fieldName: "DividerEndToEnd" })}
              />
            </Col>
            <Col md={6}>
              <CheckboxContainer
                label="Divide After"
                {...this.useInput({ fieldName: "DivideAfter" })}
              />
            </Col>
          </Row>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Report Field
            </legend>
            <div>
              <CardList
                ref={this.reportFieldListRef}
                config={this.reportFieldListLoading}
                show={isreportFieldsForm}
              />
              <ReportField
                ref={this.reportFieldAdd}
                config={this.reportFieldAddLoading}
                show={isreportFieldsForm}
              />
            </div>
          </fieldset>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default CardRow;
