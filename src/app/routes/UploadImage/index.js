import React from "react";
import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import ImageUploadContainer from "components/FormInputs/ImageUploadContainer"

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
                <ImageUploadContainer/>
            </div>
            </>
        )
    }
}

export default withPageBase(UploadImage);
