import React from "react";
import { Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ViewTab from "./ViewTab";
import SortField from "./SortField";
import ComponentView from "./ComponentView";
import PageBase from "../Base/PageBase";
import { Button } from 'primereact/button';
import CardList from "../Base/CardList";
import { ListItemText} from "@material-ui/core";
import { ShowMessageBox } from "../../util/Util";
class ReportView extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {},
      isviewTabForm: false,
      viewTabList: [],
    };
    //View Tab Add
    this.viewTabAdd = React.createRef();
    this.viewTabAddLoading = {
      onAddClick: () => {
        alert("view tab add working")
        let model = this.viewTabAdd.current.state.Model;
        let vtList = this.state.viewTabList;
        vtList.push(model);
        this.setState({ viewTabList: vtList })
        this.reportViewCard.current.setSource(vtList);
        this.setState({ isviewTabForm: false });
      },
    }
    //View Tab Add End
    //View Tab List
    this.viewTabList = React.createRef();
    this.viewTabListLoading = {
      title: "View Tab",
      keyField: "ViewID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        ShowMessageBox({ text: "Clicked worked" });
      },
      onAddClick: () => {
        this.setState({ isviewTabForm: true });
      },
      onRender: (item) => {
        return (
          <>
            <Row>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.ViewID} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.TabID} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.TabCaption} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.SeqNo} />
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
                <ListItemText primary={item.Visible} />
              </Col>
            </Row>
          </>
        );
      },
    };
    //View Tab List End

  }

  render() {
    const onAddClick = this.props.config.onAddClick;
    let isviewTabForm = this.state.isviewTabForm;
    console.log(isviewTabForm)
    if (this.props.show) {
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
            <div>
              <ViewTab ref={this.viewTabAdd} config={this.viewTabAddLoading} show={isviewTabForm} />
              <CardList ref={this.viewTabList} config={this.viewTabListLoading} show={isviewTabForm} />
            </div>
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
    } else {
      return null;
    }
  }
}
export default ReportView;
