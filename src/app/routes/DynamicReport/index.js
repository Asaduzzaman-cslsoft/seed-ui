import React from "react";
import {
  Col,
  Row,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import Grid from "components/Base/Grid";
import InlineFinder from "components/Base/InlineFinder";
import TextContainer from "components/FormInputs/TextContainer";
import CheckboxContainer from "components/FormInputs/CheckboxContainer";
import ButtonAddonContainer from "components/FormInputs/ButtonAddonContainer";
import ReportParameter from "components/Report/ReportParameter";
import { AppConst, Services, ShowMessageBox } from "../../../util/Util"
import { Avatar, Badge, Card, CardHeader, CardContent, Checkbox, ListItemAvatar, ListItemText } from '@material-ui/core';
import XlsExport from "../../../util/xls-export";
import ReportView from "../../../components/Report/ReportView";
import CardList from "components/Base/CardList";
import SelectContainer from "components/FormInputs/SelectContainer";
import MultiSelectContainer from "components/FormInputs/MultiSelectContainer";


class DynamicReport extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      source: [],
      QueryName: "",
     // options: [{name: 'Option 1️⃣', id: 1},{name: 'Option 2️⃣', id: 2}],
      gridConfig: {
        columns:
          [
            { field: 'PrimaryKey', style: { display: 'none' } }
          ],
        lazy: false,
        showRefresh: false,
        limit: 20
      }
    }
    
    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();

    this.setConfig({
      serviceName: Services.Seed
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

      onRender: (item) => {
        return (
          <>
            <Row>
              <Col md={3} style={{ textAlign: "center" }}>
                <ListItemText
                  primary={item.Name}

                />
              </Col>
              <Col md={3}>
                <ListItemText
                  secondary={item.DOB}
                />
              </Col>
              <Col md={3}>
                <ListItemText
                  secondary={item.FatherName}
                />
              </Col>
              <Col md={3}>
                <ListItemText
                  secondary={item.MotherName}
                />
              </Col>
            </Row>
          </>
        );
      },
    };
  }
  // usersPermissionAddFormClick = event => {
  //   alert("add form clicked")
  // };
  // componentDidMount() {
  //   $http.get(`${AppConst.BaseUrl}${Services.Security}/User/GetAll`)
  //     .then(res => this.setState({ menuList: res.Result, loader: false }))
  //     .catch(() => {
  //       this.setState({ loader: false })
  //     });
  // }
  render() {
    let intForm = 1;
    return (
      <div className="page-wrapper" style={{ overflow: "auto" }}>
        <fieldset className="border p-2">
          <legend className="w-auto" style={{ width: "inherit" }}>Report</legend>
          <Row>
            <Col md={6}>
              <TextContainer
                label="Report ID"
                {...this.useInput({ fieldName: "ReportID" })} />
              <TextContainer
                label="Report Title"
                {...this.useInput({ fieldName: "ReportTitle" })} />
              <TextContainer
                label="Sequnece No"
                {...this.useInput({ fieldName: "SeqNo" })} />
              <CheckboxContainer
                label="Is Hamburger Menu"
                {...this.useInput({ fieldName: "IsHamburgerMenu" })} />
              <CheckboxContainer
                label="User Parameter"
                {...this.useInput({ fieldName: "UserParameter" })} />
            </Col>
            <Col md={6}>
              <TextContainer
                label="Report Name"
                {...this.useInput({ fieldName: "ReportName" })} />
              <TextContainer
                label="Icon Url"
                {...this.useInput({ fieldName: "IconUrl" })} />
              <TextContainer
                label="Number Of Views"
                {...this.useInput({ fieldName: "NumberOfViews" })} />
              <CheckboxContainer
                label="Is Landing Page Menu"
                {...this.useInput({ fieldName: "IsLandingPageMenu" })} />
            </Col>
          </Row>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Users Permission</legend>
            <Row style={{ margin: '0', padding: '0' }}>

              {/* <Multiselect
                options={this.state.options} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              /> */}
              <MultiSelectContainer
                      label="Select User"
                      url={`${AppConst.BaseUrl}${Services.Security}/User/GetAll`}
                      mapper={{ valueMember: 'UserId', textMember: 'Name' }}                     
                      {...this.useInput({ fieldName: "userId", validate: '["required"]' })}
                    />
            </Row>
            {/* <button className="btn btn-primary" onClick={this.usersPermissionAddFormClick}>Add integer form</button> */}

          </fieldset>

          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Report Parameter</legend>
            {/* <ReportParameter /> */}
            <CardList ref={this.viewTabList} config={this.testItemLoading} />
          </fieldset>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>Report View</legend>
            <ReportView />
          </fieldset>

        </fieldset>
      </div>

    )
  }
}
export default withPageBase(DynamicReport);