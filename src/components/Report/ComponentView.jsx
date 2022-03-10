import React from "react";
import {
    Button,
    Col,
    Row

} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import CardRow from "./CardRow";
import PageBase from "../Base/PageBase";
import { ListItemText } from "@material-ui/core";
import { ShowMessageBox } from "../../util/Util";
import CardList from "../Base/CardList";


class ComponentView extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            Model: {},
            errors: {},
            isCardRowsForm: false,
            cardRowList: [],
        };
        //Card Row Add
        this.cardRowAdd = React.createRef();
        this.cardRowAddLoading = {
            editDisabled: true,
            addDisabled: false,
            onAddClick: () => {
                let model = this.cardRowAdd.current.state.Model;
                let vtList = this.state.cardRowList;
                vtList.push(model);
                this.setState({ cardRowList: vtList })
                this.cardRowListRef.current.setSource(vtList);
                this.setState({ isCardRowsForm: false });
            },


            onUpdateClick: () => {
                let model = this.cardRowAdd.current.state.Model;
                let pmList = this.state.cardRowList;
                var foundIndex = pmList.findIndex(x => x.ViewID === model.ViewID);
                pmList[foundIndex] = model;
                this.setState({ cardRowList: pmList })
                this.cardRowListRef.current.setSource(this.state.cardRowList);
                this.setState({ isCardRowsForm: false });
            },
            onCancelClick: () => {
                this.setState({ isCardRowsForm: false });
            },
        }
        //Card Row Add End
        //Card Row List
        this.cardRowListRef = React.createRef();
        this.cardRowListLoading = {
            title: "Card Row",
            keyField: "RowNumber",
            skipInitialLoad: true,
            showEdit: true,
            showAdd: true,
            lazy: false,
            limit: 10,
            height: "200px",
            onEditClick: () => {
                //ShowMessageBox({ text: "Clicked worked" });
                let that = this;
                let allItems = this.cardRowListRef.current.state.source;
                let selectedId = this.cardRowListRef.current.state.selectedId;
                var result = allItems.filter(obj => {
                    return obj.RowNumber === selectedId;
                })
                if (result[0]) {
                    this.setState({ isCardRowsForm: true });
                    that.cardRowAdd.current.props.config.editDisabled = false;
                    that.cardRowAdd.current.props.config.addDisabled = true;
                    that.cardRowAdd.current.Edit(result[0])
                } else {
                    ShowMessageBox({ text: "Select a View Tab first." });
                }
            },
            onAddClick: () => {                
                this.setState({ isCardRowsForm: true });               
            },
            onRender: (item) => {
                return (
                    <>
                        <Row>
                            <Col md={4} style={{ textAlign: "center" }}>
                                <ListItemText primary={item.RowNumber} />
                            </Col>
                            <Col md={4} style={{ textAlign: "center" }}>
                                <ListItemText primary={item.DivideAfter} />
                            </Col>
                            <Col md={4} style={{ textAlign: "center" }}>
                                <ListItemText primary={item.DividerEndToEnd} />
                            </Col>
                            
                        </Row>
                    </>
                );
            },
        };
        //View Tab List End
    }
    Edit(model) {
        this.setState({
            Model: model,
            cardRowList:model.CardRows
        });
        this.cardRowListRef.current.setSource(model.CardRows)
    }

    render() {
        const onAddClick = this.props.config.onAddClick;
        const onUpdateClick = this.props.config.onUpdateClick;
        const onCancelClick = this.props.config.onCancelClick;
        const addDisabled = this.props.config.addDisabled;
        const editDisabled = this.props.config.editDisabled;
        let isCardRowsForm = this.state.isCardRowsForm;       
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
                                label="component ID"
                                {...this.useInput({ fieldName: "ComponentID" })} />
                            <TextContainer
                                label="Seq No"
                                {...this.useInput({ fieldName: "SeqNo" })} />
                            <TextContainer
                                label="Query"
                                {...this.useInput({ fieldName: "Query" })} />
                            <CheckboxContainer
                                label="Card Action"
                                {...this.useInput({ fieldName: "CardAction" })} />
                        </Col>
                        <Col md={6}>
                            <TextContainer
                                label="Parent Tab ID"
                                {...this.useInput({ fieldName: "ParentTabID" })} />
                            <TextContainer
                                label="Type"
                                {...this.useInput({ fieldName: "Type" })} />
                            <TextContainer
                                label="Card Action Report ID"
                                {...this.useInput({ fieldName: "CardActionReportID" })} />

                        </Col>
                    </Row >
                    <fieldset className="border p-2">
                        <legend className="w-auto" style={{ width: "inherit" }}>Card Row</legend>
                        <div>
                            <CardList ref={this.cardRowListRef} config={this.cardRowListLoading} show={isCardRowsForm} />
                            <CardRow ref={this.cardRowAdd} config={this.cardRowAddLoading} show={isCardRowsForm} />

                        </div>
                      
                    </fieldset>
                </div >
            )
        } else {
            return null;
        }
    }
}
export default ComponentView;