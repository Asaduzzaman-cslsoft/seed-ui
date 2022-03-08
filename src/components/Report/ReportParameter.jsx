import React from "react";
import {
    Col,
    Row
} from "reactstrap";
import TextContainer from "../FormInputs/TextContainer";
import CheckboxContainer from "../FormInputs/CheckboxContainer";
import { Button } from 'primereact/button';
import PageBase from "../Base/PageBase";

const defaults = {
    onAddClick: () => {
        alert("here")
    }    
};
class ReportParameter extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            Model: {},
            errors: {}
        };    
    } 
    
    render() {
        // const{showAdd,showEdit, showDelete,showRefresh,onAddClick,onEditClick,onDeleteClick} = this.props.config;;
        // let buttons = [];
        // if (showAdd) buttons.push({ onClick: onAddClick ? onAddClick : defaults.onAddClick, title: "Add", icon: "pi pi-plus", class: "p-button-rounded p-button-info" });
        // if (showEdit) buttons.push({ onClick: () => onEditClick ? onEditClick(model ? model[keyField] : {}, model) : defaults.onEditClick(), title: "Edit", icon: "pi pi-pencil", class: "p-button-rounded p-button-success", disabled: editDisabled });
        // if (showDelete) buttons.push({ onClick: () => onDeleteClick ? onDeleteClick(model ? model[keyField] : {}, model) : defaults.onDeleteClick(), title: "Delete", icon: "pi pi-trash", class: "p-button-rounded p-button-danger", disabled: !model });
        // if (showRefresh) buttons.push({ onClick: this.refresh, title: "Refresh", icon: "pi pi-refresh", class: "p-button-rounded p-button-help" });
        const  onParameterAddClick = this.props.config;
        console.log(onParameterAddClick)
        return (
            <div>
                <Row>
                    <Col md={10}></Col>
                    <Col md={2}>
                    <Button  onClick={this.onParameterAddClick} style={{ margin: '0 4px 0 0', paddingLeft:0, width: '60px', height: "30px" }}>Add</Button>
                    <Button  style={{ margin: '0 4px 0 0', paddingLeft:0, width: '65px', height: "30px" }}>Update</Button>
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={6}>                        
                        <TextContainer
                            label="Name"
                            {...this.useInput({ fieldName: "Name" })} />
                        <TextContainer
                            label="Lookup Query"
                            {...this.useInput({ fieldName: "LookupQuery" })} />
                        <CheckboxContainer
                            label="Mandatory"
                            {...this.useInput({ fieldName: "Mandatory" })} />


                    </Col>
                    <Col md={6}>
                        <TextContainer
                            label="Value Type"
                            {...this.useInput({ fieldName: "ValueType" })} />
                        <TextContainer
                            label="Entry Type"
                            {...this.useInput({ fieldName: "EntryType" })} />
                        <CheckboxContainer
                            label="MultiSelect"
                            {...this.useInput({ fieldName: "MultiSelect" })} />
                    </Col>
                </Row >
            </div >

        )
    }
}
export default ReportParameter;