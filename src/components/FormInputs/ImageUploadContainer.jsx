import React from "react";
//import PropTypes from "prop-types";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { $http } from "../../util/HttpRequest";

class ImageUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      imageInfos: [],
      disabled: true,
      selectedImage: undefined,
    };
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.disabledTrue = this.disabledTrue.bind(this);
    this.DeleteConfirm = this.DeleteConfirm.bind(this);
  }
  selectFile(event) {
    var file = event.target.files[0];
    let listofImage = this.state.imageInfos;
    const listItem = {
      Id: listofImage.length + 1,
      source: URL.createObjectURL(file),
    };
    listofImage.push(listItem);
    this.setState({
      currentFile: file,
      imageInfos: listofImage,
    });
  }
  selectImage(id) {
    this.setState({
      disabled: false,
      selectedImage: id,
    });
  }
  disabledTrue() {
    this.setState({
      disabled: true,
      selectedImage: undefined,
    });
  }
  upload(event) {
    this.setState({
      progress: 0,
    });
    let url = this.props.config.uploadUrl;
    let formData = new FormData();
    formData.append("file", this.state.currentFile);
    $http
      .post(url, formData)
      .then((response) => {
        this.setState({
          progress: Math.round((100 * event.loaded) / event.total),
        });
        this.setState({
          message: response.message,
        });

        return response.Result;
        //return UploadService.getFiles();
      })
      .then((fileName) => {
        let listofImage = this.state.imageInfos;
        let file = this.props.config.fileLocation + fileName;
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
  // DeleteConfirm(name) {
  //   if (
  //     window.confirm("Are you sure you want to permanently delete this image?")
  //   ) {
  //     let deleteUrl = this.props.config.deleteUrl + name;
  //     $http.get(deleteUrl).then(() => {
  //       let listofImage = this.state.imageInfos;
  //       let resList = listofImage.filter((obj) => {
  //         return obj.name !== name;
  //       });
  //       this.setState({
  //         imageInfos: resList,
  //       });
  //     });

  //     //UploadService.deleteFile(name);
  //   }
  // }
  // DeleteConfirmdsfjds() {
  //   let listofImage = this.state.imageInfos;
  //   console.log(listofImage)
  // }

  DeleteConfirm() {
    let id = this.state.selectedImage;
    let listofImage = this.state.imageInfos;
    let resList = listofImage.filter((obj) => {
      return obj.Id !== id;
    });
    this.setState({
      imageInfos: resList,
      disabled: true,
      selectedImage: undefined,
    });
  }

  // componentDidMount() {
  //   UploadService.getFiles().then((response) => {
  //     this.setState({
  //       imageInfos: response.data,
  //     });
  //   });
  // }
  render() {
    const mystyle = {
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    const btnAddStyle = {
      background: "green",
      width: "150px",
      height: "30px",
      opacity: 1,
      lineheight: "90px",
      textAlign: "center",
    };
    const btnDeleteStyle = {
      width: "150px",
      height: "30px",
    };
    const divTextAlign = {
      textAlign: "right",
    };
    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
    } = this.state;

    return (
      <>
        <div className="card mt-3" height={200}>
          <AliceCarousel
            // autoPlay={true}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={true}
            disableAutoPlayOnAction={true}
            //onClick={this.ShowDelete}
            //autoPlayInterval={2000}
            ref={(el) => (this.Carousel = el)}
            onSlideChange={this.onSlideChange}
            onSlideChanged={this.onSlideChanged}
            renderPrevButton={() => (
              <p className="p-4 absolute right-0 top-0">Prev</p>
            )}
            renderNextButton={() => (
              <p className="p-4 absolute right-0 top-0">Next</p>
            )}
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
                  onClick={() => this.selectImage(img.Id)}
                />
              ))}
          </AliceCarousel>
          <div className="row">
            <div className="col-md-6" style={divTextAlign}>
              <button style={btnAddStyle}>Add New Image</button>
              <input style={mystyle} type="file" onChange={this.selectFile} />
            </div>
            <div className="col-md-6">
              <button
                disabled={this.state.disabled}
                style={btnDeleteStyle}
                className="btn btn-danger"
                onClick={this.DeleteConfirm}
              >
                Delete Current Slide
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// ImageUploadContainer.propTypes = {
//     label: PropTypes.string.isRequired,
//     model: PropTypes.string.isRequired,
// };

export default ImageUploadContainer;
