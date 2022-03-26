import axiosClient from "./axiosClient";

const url = "/upload/cloudinary-upload";


const uploadService = {

    uploadToServer(fileToUpload) {
        return axiosClient.post(url, fileToUpload)
    },
    uploadExcel(file) {
        return axiosClient.post('/upload/cloudinary-upload-excel', file)
    }

};

export default uploadService;
