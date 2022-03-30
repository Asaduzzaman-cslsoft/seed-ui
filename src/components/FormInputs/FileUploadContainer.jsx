import React from "react";
class FileUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      uploadedFiles: []
    };
    this.selectFile = this.selectFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }
  selectFile(event) {
    var allFiles = this.state.uploadedFiles;
    var file = event.target.files;
    for (let i = 0; i < file.length; i++) {
      allFiles.push(file[i]);
    }
    this.setState({
      uploadedFiles: allFiles,
    });   
  }
  deleteFile(index){    
    var allFiles = this.state.uploadedFiles;
    allFiles.splice(index,1);
    this.setState({
      uploadedFiles: allFiles,
    });
  }  
  render() {
    let isMultiple = this.props.multiple;
    const {
      uploadedFiles
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-12">
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
        </div>
        {uploadedFiles.length !==0 &&
        <div className="row">          
            <table className="table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  uploadedFiles.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        <i className="pi pi-trash" onClick={() => this.deleteFile(index)}></i>
                      </td>                      
                    </tr>
                  ))
                }
              </tbody>
            </table>         
        </div>
  }
      </div>
    );
  }
}

// FileUploadContainer.propTypes = {
//     label: PropTypes.string.isRequired,
//     model: PropTypes.string.isRequired,
// };

export default FileUploadContainer;
