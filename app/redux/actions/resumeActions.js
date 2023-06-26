import { getCandidateId } from "../../utils/UserPrefs"
import AxiosBase from "../networkRequests/AxiosBase"
import { errorHandler } from "../networkRequests/ErrorHandler"
import { domain } from "../networkRequests/NetworkConstants"
import { RESUME_LIST, RESUME_VIEW_FLAGS } from "./actionTypes"


export const setResumeList = (list) => {
    return async dispatch => {
        dispatch({
            type : RESUME_LIST,
            resumeList : list
        })
    }
}



export const setResumeViewFlags = (data) => {
    return async dispatch => {
        dispatch({
            type : RESUME_VIEW_FLAGS,
            viewFlags : data
        })
    }
}




export const uploadResumeFile = (data) => new Promise((resolve, reject) => {
    
    const formData = new FormData();
    formData.append('file',data)

    console.log('[ResumeActions.js] uploadResumeFile : ',data,formData)
   
    AxiosBase.post('CandidateDashboard/uploadfile',formData)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})



export const getResumeList = () => new Promise(async(resolve, reject) => {

    const data = {
        domain: domain,
        candidateId: await getCandidateId()
    }
   
    AxiosBase.post('talentdata/searchtalentbyid',data)
        .then(response => {           
            // resolve(response.data)
            const res = response.data
            console.log("Adi");
            console.log(res);
            const list = res.resumeURL !== undefined ? res.resumeURL : []
            resolve(list)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})



export const deleteResume = (fileName) => new Promise(async(resolve, reject) => {

    const data = {
        domain: domain,
        candidateId: await getCandidateId(),
        fileName: fileName
    }
   
    AxiosBase.post('CandidateDashboard/resumeDelete',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
            
        })
})