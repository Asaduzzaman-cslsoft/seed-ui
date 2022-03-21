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
        this.ButtonClickHandle=this.ButtonClickHandle.bind(this);
        this.ImageUploadRef=React.createRef();
    }
    ButtonClickHandle(){
        console.log(this.ImageUploadRef.current.state.imageInfos)
    }
    render() {
        return (
            <>
                <div className="page-wrapper">
                    <Row>
                        <Col md={6}>
                            <ImageUploadContainer ref={this.ImageUploadRef}/>
                        </Col>
                        <Col md={6}>
                            <button onClick={this.ButtonClickHandle}>Click Me</button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default withPageBase(UploadImage);
