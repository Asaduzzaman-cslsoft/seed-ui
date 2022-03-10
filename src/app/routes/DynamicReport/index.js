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
import TextContainer from "components/FormInputs/TextContainer";
import CheckboxContainer from "components/FormInputs/CheckboxContainer";
import ReportParameter from "components/Report/ReportParameter";
// import ViewTab from "components/Report/ViewTab";
// import SortField from "components/Report/SortField";
// import CardRow from "components/Report/CardRow";
// import ComponentView from "components/Report/ComponentView";
// import FieldFormatting from "components/Report/FieldFormatting";
// import ReportField from "components/Report/ReportField";
import ReportView from "components/Report/ReportView";
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
import CardList from "components/Base/CardList";
// import SelectContainer from "components/FormInputs/SelectContainer";
import MultiSelectContainer from "components/FormInputs/MultiSelectContainer";
import { Button } from "primereact/button";
import { $http } from "../../../util/HttpRequest";
import { ModelState } from "../../../util/Util";

class DynamicReport extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      source: [],
      // parametersArray: [],
      QueryName: "",
      //Model:{},
      gridConfig: {
        columns: [{ field: "PrimaryKey", style: { display: "none" } }],
        lazy: false,
        showRefresh: false,
        limit: 20,
      },
      //jsonModel:{},
      //All condition goes here
      reportMenuId: 1,
      isReportParameterForm: false,
      isReportViewForm: false,
      // isViewTabForm:false,



      //All array goes here
      parameterList: [],
      reportViewList: [],
      //viewTabList: [],
    };
    //event listner
    this.SaveMasterData = this.SaveMasterData.bind(this);
    // this.UpdateMasterData = this.UpdateMasterData.bind(this);
    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();
    //this.parametersArray = this.state.parametersArray;
    this.reportMenuId = this.state.reportMenuId;

    this.setConfig({
      serviceName: Services.Seed,
    });
    //Paremeters Card List
    this.parametersCard = React.createRef();
    this.parameterLoading = {
      title: "Parameters",
      keyField: "ParameterID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      //enableEdit: true,
      //enableEdit: that.state.Model.DiscountPolicyMasterId && !that.state.Model.AllProducts,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        let that = this;
        let allItems = this.parametersCard.current.state.source;
        let selectedId = this.parametersCard.current.state.selectedId;
        var result = allItems.filter(obj => {
          return obj.ParameterID === selectedId;
        })       
        if (result[0]) {
          this.setState({ isReportParameterForm: true });
          that.parametersAddRef.current.props.config.editDisabled=false;
          that.parametersAddRef.current.props.config.addDisabled=true;                 
          that.parametersAddRef.current.Edit(result[0])
        } else {
          ShowMessageBox({ text: "Select a Parameter first." });
        }
      },
      onAddClick: () => {
        this.setState({ isReportParameterForm: true });
      },
     
      onRender: (item) => {
        return (
          <>
            <Row>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Name} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.EntryType} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.LookupQuery} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Mandatory} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.ValueType} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.MultiSelect} />
              </Col>
            </Row>
          </>
        );
      },
    };
    //Paremeters Card List End
    //Paremeters Card Entry Start
    this.parametersAddRef = React.createRef();
    this.parametersAdd = {
      editDisabled:true,
      addDisabled:false,      
      onAddClick: () => {
        let model = this.parametersAddRef.current.state.Model;
        let pmList = this.state.parameterList;
        pmList.push(model);
        this.setState({ parameterList: pmList })
        this.parametersCard.current.setSource(this.state.parameterList);
        this.setState({ isReportParameterForm: false });
      },
      onUpdateClick:()=>{
        let model = this.parametersAddRef.current.state.Model;
        let pmList = this.state.parameterList;        
        var foundIndex = pmList.findIndex(x => x.ParameterID === model.ParameterID);
        pmList[foundIndex] = model;       
        this.setState({ parameterList: pmList })
        this.parametersCard.current.setSource(this.state.parameterList);
        this.setState({ isReportParameterForm: false });
      },
      onCancelClick:()=>{       
        this.setState({ isReportParameterForm: false });
      },
    };
    //Paremeters Card Entry End
    //Report View Card List Start
    this.reportViewCard = React.createRef();
    this.reportViewLoading = {
      title: "Report View",
      keyField: "ViewID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        ShowMessageBox({ text: "Report view list edit clcik" });
      },
      onAddClick: () => {
        this.setState({ isReportViewForm: true });
      },
      onRender: (item) => {
        return (
          <>
            <Row>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.ViewID} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.SeqNo} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Type} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Title} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.NumberOfTabs} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.NumberOfComponents} />
              </Col>
            </Row>
          </>
        );
      },
    };
    //Report View Card List End
    //Report View Card Add Start
    this.reportViewAddRef = React.createRef();
    this.reportViewAdd = {
      onAddClick: () => {
        alert("working working")
        let model = this.reportViewAddRef.current.state.Model;
        let rpList = this.state.reportViewList;
        rpList.push(model);
        this.setState({ reportViewList: rpList })
        this.reportViewCard.current.setSource(this.state.reportViewList);
        this.setState({ isReportViewForm: false });
      },
    };
  }
  SaveMasterData() {
    let model = { ...this.state.Model };
    if (model.ReportID) {
      model.ModelState = ModelState.Modified;
      const url = `${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Update`;
      $http.put(url, model);
    } else {
      model.ModelState = ModelState.Added;
      const url = `${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Create`;
      $http.post(url, model);
    }
  }

  componentDidMount() {
    if (this.state.reportMenuId !== "") {
      $http
        .get(
          `${AppConst.BaseUrl}${Services.Seed}/DynamicReport/Get/${this.state.reportMenuId}`
        )
        .then((res) => {
          this.setState({ Model: res.Result, loader: false });
          var jData = JSON.parse(res.Result.ReportSchema);
          //this.setState({jsonModel:jData});
          var pSource = jData.Parameters;
          this.setState({ parameterList: pSource })
          this.parametersCard.current.setSource(pSource);
          var rvSource = jData.Views;
          this.setState({ reportViewList: rvSource });
          this.reportViewCard.current.setSource(rvSource);


        })
        .then(() => this.render())
        .catch(() => {
          this.setState({ loader: false });
        });
    } else {
      this.setState({ Model: {}, loader: false });
    }
  }
  render() {
    let isReportParameterForm = this.state.isReportParameterForm;
    let isReportViewForm = this.state.isReportViewForm;
    return (
      <div className="page-wrapper" style={{ overflow: "auto" }}>
        {/* Mian Report */}
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>
            Report
          </legend>
          <Row>
            <Col md={10}></Col>
            <Col md={2}>
              <Button
                onClick={this.SaveMasterData}
                style={{
                  margin: "0 4px 0 0",
                  paddingLeft: 0,
                  width: "120px",
                  height: "30px",
                }}
              >
                Add or Update
              </Button>
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
          {/* User Permission */}
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
          {/* Report Parameters */}
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Report Parameter
            </legend>
            <div>
              <ReportParameter ref={this.parametersAddRef} config={this.parametersAdd} show={isReportParameterForm} />
              <CardList ref={this.parametersCard} config={this.parameterLoading} show={isReportParameterForm} />
            </div>
          </fieldset>
          {/* Report View */}
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Report View
            </legend>
            <div>
              <ReportView ref={this.reportViewAddRef} config={this.reportViewAdd} show={isReportViewForm} />
              <CardList ref={this.reportViewCard} config={this.reportViewLoading} show={isReportViewForm} />
            </div>
            {/* View Tab */}

          </fieldset>
        </fieldset>
      </div>
    );
  }
}
export default withPageBase(DynamicReport);
