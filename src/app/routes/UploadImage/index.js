import React from "react";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import ImageUploadContainer from "components/FormInputs/ImageUploadContainer";
import { Col, Row } from "reactstrap";
import FileUploadContainer from "components/FormInputs/FileUploadContainer";
import { AppConst, Services } from "../../../util/Util";

class UploadImage extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,        
        }
        this.ButtonClickHandle=this.ButtonClickHandle.bind(this);
        this.ImageUploadRef=React.createRef();
        this.FileUploadConfig={
            multiple:true,
            uploadUrl:"/abc",
        };
        this.ImageUploadConfig={
            multiple:true,
            uploadUrl: AppConst.BaseUrl + Services.Seed + "/FileUpload/Create",
            imageLocation:AppConst.BaseUrl + Services.Seed + "/files/",
            deleteUrl:AppConst.BaseUrl + Services.Seed + "/FileUpload/Delete?fileName="                    
        }
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
                            <ImageUploadContainer config={this.ImageUploadConfig} ref={this.ImageUploadRef}/>
                        </Col>
                        <Col md={6}>
                            <FileUploadContainer config={this.FileUploadConfig}/>
                            <button onClick={this.ButtonClickHandle}>Click Me</button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default withPageBase(UploadImage);
