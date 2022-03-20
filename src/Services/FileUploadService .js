import http from "../http-common";
class FileUploadService {
  upload(file, onUploadProgress) {   
    let formData = new FormData();
    formData.append("file", file);
    return http
      .post("/FileUpload/Create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      })     
  }
  getFiles() {
    return http.get("/files");
  }
}
export default new FileUploadService();
