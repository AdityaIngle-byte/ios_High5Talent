import { ASSESSMENTS_LIST } from "./actionTypes"


export const setAssessmentsList = (list) => {
    return async dispatch => {
        dispatch({
            type : ASSESSMENTS_LIST,
            assessmentsList : list
        })
    }
}




export const getAssessmentsList = () => new Promise((resolve, reject) => {

    AxiosBase.get('CandidateDashboard/getAssessmentofCandidate')
        .then(response => {
            const res = response.data;
            console.log('[AssessmentActions.js] Get getAssessmentsList : ',res);
            resolve(res)
        })
        .catch(error => {
            console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})