import React from 'react';
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import { Services,AppConst } from '../../../util/Util';
import { Col, Row } from 'reactstrap';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import TextContainer from "components/FormInputs/TextContainer";
import DateContainer  from "components/FormInputs/DateContainer"
import NumericContainer from "components/FormInputs/NumericContainer";
import SelectContainer from "components/FormInputs/SelectContainer"
import CheckboxContainer from "components/FormInputs/CheckboxContainer";
import RadioContainer from "components/FormInputs/RadioContainer";
import InlineFinder from "components/Base/InlineFinder";

class TestViewer extends PageBase {
  constructor(props) {
    super(props)
     //let that = this;

    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();
     //ModelState=ModelState.Added;
 this.setConfig({
      serviceName: Services.Seed,
      keyField: "Id",
      //displayField: "PrimaryCode",
      newIdString: AppConst.IntMinValue,      
      createUrl: 'person/create',
      getUrl: 'person/Get',
      updateUrl: 'person/Update',
      deleteUrl: 'person/Delete',
      showCreate: true,
      showUpdate: true,
      showDelete: true
    });
  
  }
  
  render() {
    return (
      <div className='page-wrapper'>
        <Row>
        <Col md={12}>
          <Card style={{height:"400px"}}>
            <CardHeader title={"Person Information"}/>
               <CardContent>
                 <Row>
                   <Col sm={6}>
                     <TextContainer
                      label="Name"                      
                      {...this.useInput({ fieldName: "Name", validate: '["required"]' })}/>
                      <TextContainer
                      label="Father Name"                      
                      {...this.useInput({ fieldName: "FatherName", validate: '["required"]' })}/>
                      <DateContainer
                      label="Date of Birth"
                      isDate={true}
                      {...this.useInput({ fieldName: "DOB", validate: '["required"]', isDateTime: true })}/>
                      {/* <Select fieldName={"Gender"}>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Others"}>Others</option>
                      </Select> */}
                         <SelectContainer
                      label="Gender"                                         
                      source= {[
                          { id: "Male", text: "Male" },
                          { id: "Female", text: "Female" },
                          { id: "Others", text: "Otheres" }
                      ]}
                      mapper={{ valueMember: 'id', textMember: 'text' }}
                      {...this.useInput({ fieldName: "Gender",validate: '["required"]' })}/>
                       <RadioContainer
                      label="Type"
                      radios={[
                        { value: "Permanent", label: "Permanent" },
                        { value: "Probationary", label: "Probationary" }
                        
                      ]}
                      {...this.useInput({ fieldName: "Type" })}
                    />
                   </Col>
                   <Col sm={6}>
                   <TextContainer
                      label="Profession"                      
                      {...this.useInput({ fieldName: "Profession", validate: '["required"]' })}/>
                     <TextContainer
                      label="Mother Name"                      
                      {...this.useInput({ fieldName: "MotherName", validate: '["required"]' })}/>
                     <NumericContainer
                      label="Current Age"
                      {...this.useInput({ fieldName: "Age", validate: '["required"]' })}/>
                      <CheckboxContainer
                      label="Is Active?"
                      {...this.useInput({ fieldName: "IsActive" })}/>
                   </Col>
                 </Row>
               </CardContent>           
          </Card>
        </Col>
        </Row>
      <Row>
        <Col md={12}>
        <InlineFinder
              height="274px"
              ref={this.inlineFinder}
              config={{
                title: "Demos",
                url: `${AppConst.BaseUrl}/seed/Person/GetAll`,
                columns:
                  [
                    { field: 'Id', style: { display: 'none' } },
                    { field: 'Name', header: 'Name', filter: true, sortable: true },
                    { field: 'FatherName', header: 'Father Name', filter: true, sortable: true },
                    { field: 'MotherName', header: 'Mother Name', filter: true, sortable: true },
                    { field: 'Type', header: 'Type', filter: true, sortable: true },
                    { field: 'Gender', header: 'Gender', filter: true, sortable: true },
                    { field: 'Age', header: 'Age', filter: true, sortable: true },
                    { field: 'DOB', header: 'Date of Birth', filter: true, sortable: true }
                  ],
                scrollHeight: "150px",
                keyField: "PrimaryId",
                sortField: "",
                sortOrder: "ASC",
                lazy: true,
                limit: 10,
                onSelect: this.OnSelect,
                loadCompleted: () => {
                  this.inlineFinder.current.setSelection({ PrimaryId: this.state.Model.PrimaryId });
                }
              }} />
        </Col>
      </Row>
      </div>
    )
  }
}

export default withPageBase(TestViewer)