import React from "react";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import ImageUploadContainer from "components/FormInputs/ImageUploadContainer";
import { Col, Row } from "reactstrap";
import FileUploadContainer from "components/FormInputs/FileUploadContainer";
import { AppConst, Services } from "../../../util/Util";
import { $http } from "../../../util/HttpRequest";

class UploadImage extends PageBase {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        }
        this.ButtonClickHandle = this.ButtonClickHandle.bind(this);
        this.ImageUploadRef = React.createRef();
        this.FileUploadRef = React.createRef();
    }

    ButtonClickHandle() {
        var images = this.ImageUploadRef.current.state.imageInfos;
        var files = this.FileUploadRef.current.state.uploadedFiles;
        let url = AppConst.BaseUrl + Services.Seed + "/FileUpload/CreateFiles"
        let formData = new FormData();
        if (files.length > 0) {
          for (var x = 0; x < files.length; x++) {       
            formData.append('files', files[x]);
          }
        }
        if (images.length > 0) {
            for (var y = 0; y < images.length; y++) {  
                 
              formData.append('files', images[y].file);
            }
          } 
        
        $http.post(url, formData)
          .then((response) => {
            this.setState({
              message: response.message,
            });
    
            return response.Result;
          })
          .then((fileNameList) => {              
            this.setState({
              uploadedFiles: fileNameList,
            });
          })
          .catch((err) => {
            this.setState({         
              message: "Could not upload the image!",
              currentFile: undefined,
            });
          });

    }
    render() {
        return (
            <>
                <div className="page-wrapper">
                    <Row>
                        <Col md={6}>
                            <ImageUploadContainer ref={this.ImageUploadRef} />
                        </Col>
                        <Col md={6}>
                            <FileUploadContainer ref={this.FileUploadRef} multiple={true} />
                            <button onClick={this.ButtonClickHandle}>Click Me</button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default withPageBase(UploadImage);
