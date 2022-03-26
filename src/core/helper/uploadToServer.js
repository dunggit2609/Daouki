import uploadService from 'core/API/uploadService.js'
import { RESULT_TYPE_IMAGE } from 'features/Course/constant/resultType';

export const uploadToServer = async (file, type) => { 
    let rs
    if (type === RESULT_TYPE_IMAGE) {
        rs = await uploadService.uploadToServer(file)

    } else {
        rs = await uploadService.uploadExcel(file)
    }
    if (!rs || !rs.success) {
        return false
    }
    return rs.data.path
}