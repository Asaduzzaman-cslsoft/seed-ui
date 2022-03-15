import React from "react";
import { Col, Row } from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import NumericContainer from "../FormInputs/NumericContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import ViewTab from "./ViewTab";
import SortField from "./SortField";
import ComponentView from "./ComponentView";
import PageBase from "../Base/PageBase";
import { Button } from 'primereact/button';
import CardList from "../Base/CardList";
//import { ListItemText } from "@material-ui/core";
import { ShowMessageBox } from "../../util/Util";
class ReportView extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      viewTabList: [],
      sortFieldList: [],
      componentViewList: [],
      //cardRowList:[],
      Model: {},
      errors: {},
      isviewTabForm: false,
      isSortFieldForm: false,
      isComponentForm: false,
      //Reserve data
     

    };
    //View Tab Add
    this.viewTabAdd = React.createRef();
    this.viewTabAddLoading = {
      editDisabled: true,
      addDisabled: false,
      onAddClick: () => {
        let model = this.viewTabAdd.current.state.Model;
        let vtList = this.state.viewTabList;
        vtList.push(model);
        this.setState({ viewTabList: vtList })        
        this.viewTabListRef.current.setSource(vtList);
        this.setState({ isviewTabForm: false });
        this.viewTabAdd.current.ClearModel();
      },


      onUpdateClick: () => {
        let model = this.viewTabAdd.current.state.Model;
        let pmList = this.state.viewTabList;
        var foundIndex = pmList.findIndex(x => x.ViewID === model.ViewID);
        pmList[foundIndex] = model;
        this.setState({ viewTabList: pmList })
        this.viewTabListRef.current.setSource(this.state.viewTabList);
        this.setState({ isviewTabForm: false });
        this.viewTabAdd.current.ClearModel();
      },
      onCancelClick: () => {
        this.setState({ isviewTabForm: false });
        this.viewTabAdd.current.ClearModel();
      },
    }
    //View Tab Add End
    //View Tab List
    this.viewTabListRef = React.createRef();
    this.viewTabListLoading = {
      title: "View Tab",
      keyField: "ViewID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      showDelete:true,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        //ShowMessageBox({ text: "Clicked worked" });
        let that = this;
        let allItems = this.viewTabListRef.current.state.source;
        let selectedId = this.viewTabListRef.current.state.selectedId;
        var result = allItems.filter(obj => {
          return obj.ViewID === selectedId;
        })
        if (result[0]) {
          this.setState({ isviewTabForm: true });
          that.viewTabAdd.current.props.config.editDisabled = false;
          that.viewTabAdd.current.props.config.addDisabled = true;
          that.viewTabAdd.current.Edit(result[0])
        } else {
          ShowMessageBox({ text: "Select a View Tab first." });
        }
      },
      onAddClick: () => {
        this.setState({ isviewTabForm: true });
      },
      onDeleteClick: () => {
        let selectedId = this.viewTabListRef.current.state.selectedId;       
        if (selectedId) {
          let allItems = this.viewTabListRef.current.state.source;
          var result = allItems.filter(obj => {
            return obj.ViewID !== selectedId;
          })
          this.setState({ viewTabList: result })
          this.viewTabListRef.current.setSource(result)
         
        }
      },
      onRender: (item) => {
        return (
          <>
              <Row style={{width:"100%"}}>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.ViewID}
                {/* <ListItemText primary={item.ViewID} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.TabID}
                {/* <ListItemText primary={item.TabID} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.TabCaption}
                {/* <ListItemText primary={item.TabCaption} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.SeqNo}
                {/* <ListItemText primary={item.SeqNo} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.Visible}
                {/* <ListItemText primary={item.Visible} /> */}
              </Col>
            </Row>
          </>
        );
      },
    };
    //View Tab List End
    //Sort Field Add
    this.sortFieldAdd = React.createRef();
    this.sortFiledAddLoading = {
      editDisabled: true,
      addDisabled: false,
      onAddClick: () => {
        let model = this.sortFieldAdd.current.state.Model;
        let vtList = this.state.sortFieldList;
        vtList.push(model);
        this.setState({ sortFieldList: vtList })
        this.sortFiledListRef.current.setSource(vtList);
        this.setState({ isSortFieldForm: false });
        this.sortFieldAdd.current.ClearModel();
      },


      onUpdateClick: () => {
        let model = this.sortFieldAdd.current.state.Model;
        let pmList = this.state.sortFieldList;
        var foundIndex = pmList.findIndex(x => x.FieldID === model.FieldID);
        pmList[foundIndex] = model;
        this.setState({ sortFieldList: pmList })
        this.sortFiledListRef.current.setSource(this.state.sortFieldList);
        this.setState({ isSortFieldForm: false });
        this.sortFieldAdd.current.ClearModel();
      },
      onCancelClick: () => {
        this.setState({ isSortFieldForm: false });
        this.sortFieldAdd.current.ClearModel();
      },
    }
    //Sort Field Add End
    //Sort Field List
    this.sortFiledListRef = React.createRef();
    this.sortFieldListLoading = {
      title: "Sort Field",
      keyField: "FieldID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      showDelete:true,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        //ShowMessageBox({ text: "Clicked worked" });
        let that = this;
        let allItems = this.sortFiledListRef.current.state.source;
        let selectedId = this.sortFiledListRef.current.state.selectedId;
        var result = allItems.filter(obj => {
          return obj.FieldID === selectedId;
        })
        if (result[0]) {
          this.setState({ isSortFieldForm: true });
          that.sortFieldAdd.current.props.config.editDisabled = false;
          that.sortFieldAdd.current.props.config.addDisabled = true;
          that.sortFieldAdd.current.Edit(result[0])


        } else {
          ShowMessageBox({ text: "Select a Sort Filed first." });
        }
      },
      onAddClick: () => {
        this.setState({ isSortFieldForm: true });
      },
      onDeleteClick: () => {
        let selectedId = this.sortFiledListRef.current.state.selectedId;       
        if (selectedId) {
          let allItems = this.sortFiledListRef.current.state.source;
          var result = allItems.filter(obj => {
            return obj.FieldID !== selectedId;
          })
          this.setState({ sortFieldList: result })
          this.sortFiledListRef.current.setSource(result)
         
        }
      },
      onRender: (item) => {
        return (
          <>
               <Row style={{width:"100%"}}>
              <Col md={4} style={{ textAlign: "center" }}>
              {item.FieldID}
                {/* <ListItemText primary={item.FieldID} /> */}
              </Col>
              <Col md={4} style={{ textAlign: "center" }}>
              {item.ComponentID}
                {/* <ListItemText primary={item.ComponentID} /> */}
              </Col>
              <Col md={4} style={{ textAlign: "center" }}>
              {item.DefaultSorting}
                {/* <ListItemText primary={item.DefaultSorting} /> */}
              </Col>              
            </Row>
          </>
        );
      },
    };
    //Sort Filed List End
    //Component View Add
    this.componentViewAdd = React.createRef();
    this.componentViewAddLoading = {
      editDisabled: true,
      addDisabled: false,
      onAddClick: () => {       
        let model = this.componentViewAdd.current.state.Model;
        let cardList = this.componentViewAdd.current.state.cardRowList;
        model.CardRows=cardList;       
        let vtList = this.state.componentViewList;
        vtList.push(model);
        this.setState({ componentViewList: vtList })
        this.componentViewListRef.current.setSource(vtList);
        this.setState({ isComponentForm: false });
        this.componentViewAdd.current.ClearModel();
        this.componentViewAdd.current.ClearCardRows();
      },


      onUpdateClick: () => {
        let model = this.componentViewAdd.current.state.Model;
        let pmList = this.state.componentViewList;
        let cardList = this.componentViewAdd.current.state.cardRowList;            
        var foundIndex = pmList.findIndex(x => x.ComponentID === model.ComponentID);
        pmList[foundIndex] = model;
        model.CardRows=cardList;  
        this.setState({ componentViewList: pmList })
        this.componentViewListRef.current.setSource(this.state.componentViewList);
        this.setState({ isComponentForm: false });
        this.componentViewAdd.current.ClearModel();
      },
      onCancelClick: () => {
        this.setState({ isComponentForm: false });
        this.componentViewAdd.current.ClearModel();
      },
    }
    //Component View Add End
    //Component View List
    this.componentViewListRef = React.createRef();
    this.componentViewListLoading = {
      title: "Components",
      keyField: "ComponentID",
      skipInitialLoad: true,
      showEdit: true,
      showAdd: true,
      showDelete:true,
      lazy: false,
      limit: 10,
      height: "200px",
      onEditClick: () => {
        //ShowMessageBox({ text: "Clicked worked" });
        let that = this;
        let allItems = this.componentViewListRef.current.state.source;
        let selectedId = this.componentViewListRef.current.state.selectedId;
        var result = allItems.filter(obj => {
          return obj.ComponentID === selectedId;
        })
        if (result[0]) {
          this.setState({ isComponentForm: true });
          setTimeout(() => {
            that.componentViewAdd.current.props.config.editDisabled = false;
            that.componentViewAdd.current.props.config.addDisabled = true;
            that.componentViewAdd.current.Edit(result[0])
          }, 100);
      


        } else {
          ShowMessageBox({ text: "Select a Sort Filed first." });
        }
      },
      onAddClick: () => {
        this.setState({ isComponentForm: true });
      },
      onDeleteClick: () => {
        let selectedId = this.componentViewListRef.current.state.selectedId;       
        if (selectedId) {
          let allItems = this.componentViewListRef.current.state.source;
          var result = allItems.filter(obj => {
            return obj.ComponentID !== selectedId;
          })
          this.setState({ componentViewList: result })
          this.componentViewListRef.current.setSource(result)
         
        }
      },
      onRender: (item) => {
        return (
          <>
               <Row style={{width:"100%"}}>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.ComponentID}
                {/* <ListItemText primary={item.ComponentID} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.ParentTabID}
                {/* <ListItemText primary={item.ParentTabID} /> */}
              </Col>
              <Col md={2} style={{ textAlign: "center" }}>
              {item.SeqNo}
                {/* <ListItemText primary={item.SeqNo} /> */}
              </Col> 
              <Col md={2} style={{ textAlign: "center" }}>
              {item.Query}
                {/* <ListItemText primary={item.Query} /> */}
              </Col> 
              <Col md={2} style={{ textAlign: "center" }}>
              {item.CardAction}
                {/* <ListItemText primary={item.CardAction} /> */}
              </Col> 
              <Col md={2} style={{ textAlign: "center" }}>
              {item.CardActionReportID}
                {/* <ListItemText primary={item.CardActionReportID} /> */}
              </Col>              
            </Row>
          </>
        );
      },
    };
    //Component View List End
  }
  Edit(model) {
    this.setState({
      Model: model,
      viewTabList: model.Tabs,
      sortFieldList: model.SortFields,
      componentViewList: model.Components
    });
    this.viewTabListRef.current.setSource(model.Tabs)
    this.sortFiledListRef.current.setSource(model.SortFields)
    this.componentViewListRef.current.setSource(model.Components)
  }
  ClearModel() {
    this.setState({ Model: {} });
  }
  ClearAllList(){
    this.setState({viewTabList: [],sortFieldList: [],componentViewList: [] });    
  }

  render() {
    const onAddClick = this.props.config.onAddClick;
    const onUpdateClick = this.props.config.onUpdateClick;
    const onCancelClick = this.props.config.onCancelClick;
    const addDisabled = this.props.config.addDisabled;
    const editDisabled = this.props.config.editDisabled;
    let isviewTabForm = this.state.isviewTabForm;
    let isSortFieldForm = this.state.isSortFieldForm;
    let isComponentForm = this.state.isComponentForm;
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
                label="View ID"
                {...this.useInput({ fieldName: "ViewID" })}
              />
              <TextContainer
                label="Type"
                {...this.useInput({ fieldName: "Type" })}
              />
              <NumericContainer
                label="Number Of Tabs"
                {...this.useInput({ fieldName: "NumberOfTabs" })}
              />
              <CheckboxContainer
                label="Sorting Facility"
                {...this.useInput({ fieldName: "SortingFacility" })}
              />
            </Col>
            <Col md={6}>
              <NumericContainer
                label="Seq No"
                {...this.useInput({ fieldName: "SeqNo" })}
              />
              <TextContainer
                label="Title"
                {...this.useInput({ fieldName: "Title" })}
              />
              <NumericContainer
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
              <CardList ref={this.viewTabListRef} config={this.viewTabListLoading} show={isviewTabForm} />
              <ViewTab ref={this.viewTabAdd} config={this.viewTabAddLoading} show={isviewTabForm} />

            </div>
          </fieldset>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Sort Feild
            </legend>
            <div>
            <CardList ref={this.sortFiledListRef} config={this.sortFieldListLoading} show={isSortFieldForm} />
            <SortField ref={this.sortFieldAdd} config={this.sortFiledAddLoading} show={isSortFieldForm} />
            </div>            
          </fieldset>
          <fieldset className="border p-2">
            <legend className="w-auto" style={{ width: "inherit" }}>
              Component
            </legend>
            <div>
            <CardList ref={this.componentViewListRef} config={this.componentViewListLoading} show={isComponentForm} />
            <ComponentView  ref={this.componentViewAdd} config={this.componentViewAddLoading} show={isComponentForm} />

            </div> 
            
          </fieldset>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default ReportView;
