import React from "react";
//import PropTypes from "prop-types";
import UploadService from "../../Services/FileUploadService ";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AppConst, Services, ShowConfirmBox } from "../../util/Util";

class ImageUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      progress: 0,
      message: "",
      imageInfos: [],
    };
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
  }
  selectFile(event) {
    var file = event.target.files[0];
    this.setState({
      currentFile: file,
      previewImage: URL.createObjectURL(file),
      progress: 0,
      message: "",
    });
  }
  upload() {
    this.setState({
      progress: 0,
    });
    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return response.data.Result;
        //return UploadService.getFiles();
      })
      .then((fileName) => {
        let listofImage = this.state.imageInfos;
        let file = AppConst.BaseUrl + Services.Seed + "/files/" + fileName;
        const listItem = {
          Id: listofImage.length + 1,
          source: file,
          name: fileName,
        };
        listofImage.push(listItem);
        this.setState({
          imageInfos: listofImage,
        });
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
        });
      });
  }
  DeleteConfirm(name) {
    if (window.confirm("Are you sure you want to permanently delete this image?")) {
      let listofImage = this.state.imageInfos;
      console.log(listofImage);
      let resList = listofImage.filter((obj) => {
        return obj.name !== name;
      });
      this.setState({
        imageInfos: resList,
      });
    }
    UploadService.deleteFile(name);
  }

  // ShowDelete(name) {
  //   ShowConfirmBox({
  //     title: "Delete Confirmation",
  //     text: "Are you sure you want to permanently delete this image?",
  //     onOkClick:function(){
  //       Promise.resolve(
  //      this.DeleteConfirm(name))
  //     },

  //   },async () => {
  //     alert("geee")
  //   })

  // }
  // componentDidMount() {
  //   UploadService.getFiles().then((response) => {
  //     this.setState({
  //       imageInfos: response.data,
  //     });
  //   });
  // }
  render() {
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={this.selectFile} />
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
        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
        {previewImage && (
          <div>
            <img
              className="preview"
              src={previewImage}
              height={100}
              width={100}
              alt=""
            />
          </div>
        )}
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div>
        )}
        <div className="card mt-3" height={200}>
          <div className="card-header">List of Files</div>

          <AliceCarousel
            autoPlay={true}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={true}
            disableAutoPlayOnAction={true}
            //onClick={this.ShowDelete}
            autoPlayInterval={2000}
          >
            {imageInfos &&
              imageInfos.map((img, index) => (
                <img
                  key={img.Id}
                  src={img.source}
                  className="slider-img"
                  height={200}
                  width="100%"
                  alt=""
                  onClick={() => this.DeleteConfirm(img.name)}
                />
              ))}
          </AliceCarousel>
        </div>
      </div>
    );
  }
}

// ImageUploadContainer.propTypes = {
//     label: PropTypes.string.isRequired,
//     model: PropTypes.string.isRequired,
// };

export default ImageUploadContainer;
