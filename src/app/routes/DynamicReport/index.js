import React from "react";
import {
  Col,
  Row,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
//import Grid from "components/Base/Grid";
//import InlineFinder from "components/Base/InlineFinder";
import TextContainer from "components/FormInputs/TextContainer";
import CheckboxContainer from "components/FormInputs/CheckboxContainer";
//import ButtonAddonContainer from "components/FormInputs/ButtonAddonContainer";
import ReportParameter from "components/Report/ReportParameter";
import { AppConst, Services, ShowMessageBox } from "../../../util/Util";
import {
  // Avatar,
  // Badge,
  // Card,
  // CardHeader,
  // CardContent,
  // Checkbox,
  // ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
//import XlsExport from "../../../util/xls-export";
import ReportView from "../../../components/Report/ReportView";
import CardList from "components/Base/CardList";
// import SelectContainer from "components/FormInputs/SelectContainer";
import MultiSelectContainer from "components/FormInputs/MultiSelectContainer";
import { Button } from 'primereact/button';
import { $http } from "../../../util/HttpRequest";
import {  ModelState } from "../../../util/Util";

class DynamicReport extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      source: [],
      QueryName: "",
      //Model:{},
      gridConfig: {
        columns: [{ field: "PrimaryKey", style: { display: "none" } }],
        lazy: false,
        showRefresh: false,
        limit: 20,
      },
      //All condition goes here
      reportMenuId: 1,
      isReportParameterForm: false,
      
    };
    //event listner
    this.SaveMasterData = this.SaveMasterData.bind(this);
    // this.UpdateMasterData = this.UpdateMasterData.bind(this);
    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();

    this.setConfig({
      serviceName: Services.Seed,
    });
    this.viewTabList = React.createRef();

    this.testItemLoading = {
      title: "Items",
      url: `${AppConst.BaseUrl}/seed/Person/GetAll`,
      keyField: "Id",
      skipInitialLoad: false,
      showEdit: true,
      showAdd: true,
      //enableEdit: true,
      //enableEdit: that.state.Model.DiscountPolicyMasterId && !that.state.Model.AllProducts,
      lazy: false,
      limit: 10,
      height: "360px",
      onEditClick: () => {
        ShowMessageBox({ text: "Clicked worked" });
        // if (that.state.Model.DiscountPolicyMasterId) {
        //   if (that.state.Model.AllProducts) {
        //     ShowMessageBox({
        //       text:
        //         "The applicable item list is not editable for this Discount Policy.",
        //     });
        //   } else {
        //     that.discountPolicyProductForm.current.Edit(
        //       that.state.Model.DiscountPolicyMasterId,
        //       "Items"
        //     );
        //   }
        // } else {
        //   ShowMessageBox({ text: "Select a Discount Policy first." });
        // }
      },
      onAddClick: () => {
        this.setState({ isReportParameterForm: true });
      },

      onRender: (item) => {
        return (
          <>
            <Row>
              <Col md={3} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Name} />
              </Col>
              <Col md={3}>
                <ListItemText secondary={item.DOB} />
              </Col>
              <Col md={3}>
                <ListItemText secondary={item.FatherName} />
              </Col>
              <Col md={3}>
                <ListItemText secondary={item.MotherName} />
              </Col>
            </Row>
          </>
        );
      },
    };
  }
  SaveMasterData() {
    let model = { ...this.state.Model };
    if(model.ReportID){
      model.ModelState=ModelState.Modified;
      const url=`${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Update`
      $http.put(url,model)    
    }else{
      model.ModelState=ModelState.Added;
      const url=`${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Create`
      $http.post(url,model)
    }   
  };
  // UpdateMasterData() {
  //   alert("update clicked")
  // };
  componentDidMount() {
    if (this.state.reportMenuId !== "") {
      $http
        .get(
          `${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Get/${this.state.reportMenuId}`
        )
        .then((res) => this.setState({ Model: res.Result, loader: false }))
        .catch(() => {
          this.setState({ loader: false });
        });
    }
  }
  render() {    
    let isReportParameterForm = this.state.isReportParameterForm;
    return (
      <div className="page-wrapper" style={{ overflow: "auto" }}>
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>
            Report
          </legend>
          <Row>
            <Col md={10}></Col>
            <Col md={2}>
              <Button  onClick={this.SaveMasterData} style={{margin: "0 4px 0 0", paddingLeft: 0, width: "120px", height: "30px"}}>Add or Update</Button>
              {/* <Button  onClick={this.UpdateMasterData} style={{ margin: "0 4px 0 0", paddingLeft: 0,width: "65px", height: "30px",}}>Update</Button> */}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextContainer
                label="CategoryID"
                {...this.useInput({ fieldName: "CategoryID" })}
              />
              <TextContainer
                label="Report Title"
                {...this.useInput({ fieldName: "ReportTitle" })}
              />
              <TextContainer
                label="Sequnece No"
                {...this.useInput({ fieldName: "SeqNo" })}
              />              
              <TextContainer
                label="Number Of Views"
                {...this.useInput({ fieldName: "NumberOfViews" })}
              />
              <CheckboxContainer
                label="Is Hamburger Menu"
                {...this.useInput({ fieldName: "IsHamburgerMenu" })}
              />
              <CheckboxContainer
                label="User Parameter"
                {...this.useInput({ fieldName: "UserParameter" })}
              />
              
            </Col>
            <Col md={6}>
              <TextContainer
                label="Report Name"
                {...this.useInput({ fieldName: "ReportName" })}
              />
               <TextContainer
                label="Parent Report ID"
                {...this.useInput({ fieldName: "ParentReportID" })}
              />
              <TextContainer
                label="Icon Url"
                {...this.useInput({ fieldName: "IconUrl" })}
              />              
              <CheckboxContainer
                label="Is Visible"
                {...this.useInput({ fieldName: "IsVisible" })}
              />
               <CheckboxContainer
                label="Is MultiTab"
                {...this.useInput({ fieldName: "IsMultiTab" })}
              />
               <CheckboxContainer
                label="Is Sorting Facility"
                {...this.useInput({ fieldName: "IsSortingFacility" })}
              />
            </Col>
          </Row>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Users Permission
            </legend>
            <Row style={{ margin: "0", padding: "0" }}>
              <MultiSelectContainer
                label="Select User"
                url={`${AppConst.BaseUrl}${Services.Security}/User/GetAll`}
                mapper={{ valueMember: "UserId", textMember: "Name" }}
                {...this.useInput({
                  fieldName: "userId",
                  validate: '["required"]',
                })}
              />
            </Row>
            {/* <button className="btn btn-primary" onClick={this.usersPermissionAddFormClick}>Add integer form</button> */}
          </fieldset>

          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Report Parameter
            </legend>
            <div>
              {isReportParameterForm ? (
                <ReportParameter />
              ) : (
                <CardList
                  ref={this.viewTabList}
                  config={this.testItemLoading}
                />
              )}
            </div>
          </fieldset>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Report View
            </legend>
            <ReportView />
          </fieldset>
        </fieldset>
      </div>
    );
  }
}
export default withPageBase(DynamicReport);
