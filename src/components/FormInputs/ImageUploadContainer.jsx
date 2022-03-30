import React from "react";
//import PropTypes from "prop-types";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
//import { $http } from "../../util/HttpRequest";

class ImageUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,     
      imageInfos: [],
      disabled: true
    };
    this.selectFile = this.selectFile.bind(this);
    this.DeleteConfirm = this.DeleteConfirm.bind(this);
  }
  selectFile(event) {
    var file = event.target.files[0];
    let listofImage = this.state.imageInfos;
    const listItem = {
      Id: listofImage.length + 1,
      source: URL.createObjectURL(file),
      file:file
    };
    listofImage.push(listItem);
    this.setState({
      currentFile: file,
      imageInfos: listofImage,
    });
  }  

  DeleteConfirm() {
    var activeIndex=this.Carousel.state.activeIndex;
    let listofImage = this.state.imageInfos;
    var activeSlide=listofImage[activeIndex];    
    
    let resList = listofImage.filter((obj) => {
      return obj.Id !== activeSlide.Id;
    });
    this.setState({
      imageInfos: resList,
      disabled: true,
      selectedImage: undefined,
    });
  }

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
      imageInfos,
    } = this.state;
    const imageCount = imageInfos.length
    return (
      <>
        <div className="card mt-3" height={200}>
          <AliceCarousel            
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            playButtonEnabled={true}
            disableAutoPlayOnAction={true}
            
            ref={(el) => (this.Carousel = el)}
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
                disabled={imageCount===0}
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
