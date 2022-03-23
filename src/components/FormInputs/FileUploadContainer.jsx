import React from "react";
// import { AppConst, Services } from "../../util/Util";
import { $http } from "../../util/HttpRequest";

class FileUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      uploadedFiles:[]
    };
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
  }
  selectFile(event) {
    var file = event.target.files;
    this.setState({
      currentFile: file,
    });
  }
  upload() {
    let url = this.props.config.uploadUrl;
    let formData = new FormData();
    let files = this.state.currentFile;
    if (files.length > 0) {
      for (var x = 0; x < files.length; x++) {       
        formData.append('files', files.item(x));
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
    let isMultiple = this.props.config.multiple;
    const {
      currentFile
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              {isMultiple ? (
                <input
                  type="file"
                  multiple
                  onChange={this.selectFile}
                />
              ) : (
                <input
                  type="file"
                  onChange={this.selectFile}
                />
              )}
            </label>
          </div>
          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// FileUploadContainer.propTypes = {
//     label: PropTypes.string.isRequired,
//     model: PropTypes.string.isRequired,
// };

export default FileUploadContainer;
