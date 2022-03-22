import React from "react";
// import { AppConst, Services } from "../../util/Util";
// import { $http } from "../../util/HttpRequest";

class FileUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
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
  upload(){
    var file = this.state.currentFile;
    console.log(file)
    console.log(this.props.config.uploadUrl)
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
