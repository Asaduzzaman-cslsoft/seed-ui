import React from "react";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import ImageUploadContainer from "components/FormInputs/ImageUploadContainer";
import { Col, Row } from "reactstrap";

class UploadImage extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        }
    }
    render(){
        return(
            <>
            <div className="page-wrapper">
            <Row>
              <Col md={6}>
              <ImageUploadContainer/>
              </Col>
              <Col md={6}></Col>              
               </Row>
            </div>
            </>
        )
    }
}

export default withPageBase(UploadImage);
