
import axios from "axios"
import { images } from "../../assets/images"
import { getCandidateId, saveTovutiUser } from "../../utils/UserPrefs"
import AxiosBase from "../networkRequests/AxiosBase"
import { errorHandler } from "../networkRequests/ErrorHandler"
import { domain } from "../networkRequests/NetworkConstants"
import { CURRENT_BOTTOM_TAB, MY_JOBS, MY_TODOS, UPCOMING_INTERVIEWS, EXTRA_DATA, 
    MATCHED_JOBS, RTR_JOBS, APPLIED_JOBS, FAV_JOBS, 
    ALL_TODOS, TODOS_RTR, TODOS_ASSESSMENTS, TODOS_INTERVIEW_SCHEDULING, LEARN_LIST, TOVUTI_USER_ID, INTERVIEWS_LIST, FAQS } from "./actionTypes"


export const setBottomTab = (tab) => {
    return async dispatch => {
        dispatch({
            type : CURRENT_BOTTOM_TAB,
            currentBottomTab : tab
        })
    }
}

export const setMyJobsList = (list) => {
    return async dispatch => {
        dispatch({
            type : MY_JOBS,
            myJobsList : list
        })
    }
}


export const setMatchedJobsList = (list) => {
    return async dispatch => {

        // let jobStatusCodes = [ "36"  ]
        // // const filteredMatchedJobs = list.filter(job => !jobStatusCodes.includes(job.jobStatus) && !job.favorited)
        // const filteredMatchedJobs = list.filter(job => (!appliedJobsId.includes(job.jobId)) && (!jobStatusCodes.includes(job.jobStatus)) && (!job.favorited))
        // // console.log('[HomeActions.js] MatchedJob List: ',filteredMatchedJobs)

        dispatch({
            type : MATCHED_JOBS,
            matchedJobsList : list
        })
    }
}


export const setRTRList = (list) => {
    return async dispatch => {
        const filteredList = list.filter(job => job.statusName === 'Submitted' || job.statusName === 'RTR Rejected')
        dispatch({
            type : RTR_JOBS,
            rtrJobsList : filteredList
        })
    }
}


export const setAppliedJobsList = (list) => {
    return async dispatch => {
        // const filteredList = list.filter(job => job.statusId === '36')
        dispatch({
            type : APPLIED_JOBS,
            appliedJobsList : list
        })
    }
}


export const setFavJobsList = (list) => {
    return async dispatch => {
        // let jobStatusCodes = [ "36"  ]
        // const filteredList = list.filter(job => !jobStatusCodes.includes(job.jobStatus) && job.favorited)
        dispatch({
            type : FAV_JOBS,
            favouritedJobsList : list
        })
    }
}


export const setUpcomingInterviewsList = (list) => {
    return async dispatch => {
        dispatch({
            type : UPCOMING_INTERVIEWS,
            upcomingInterviewsList : list
        })
    }
}


export const setMyTodosList = (list) => {
    return async dispatch => {
        const filteredList = list.filter(job => job.statusName === 'Sourced')
        dispatch({
            type : MY_TODOS,
            myTodosList : filteredList
        })
    }
}


export const setTodosAllList = (list) => {
    return async dispatch => {
        dispatch({
            type : ALL_TODOS,
            allTodosList : list
        })
    }
}


export const setTodosRTRList = (list) => {
    return async dispatch => {
        dispatch({
            type : TODOS_RTR,
            todosRTRList : list
        })
    }
}


export const setTodosAssessmentsList = (list) => {
    return async dispatch => {
        dispatch({
            type : TODOS_ASSESSMENTS,
            todosAssessmentsList : list.filter(i => i.status !== 'Rejected' && i.status !== 'Completed')
        })
    }
}


export const setTodosInterviewList = (list) => {
    return async dispatch => {
        dispatch({
            type : TODOS_INTERVIEW_SCHEDULING,
            todosInterviewList : list.filter(i => i.status !== 'Rejected' && i.status !== 'Completed')
        })
    }
}


export const setLearnCoursesList = (list) => {
    return async dispatch => {
        dispatch({
            type : LEARN_LIST,
            learnCoursesList : list
        })
    }
}

export const setTovutiUserId = (id) => {
    return async dispatch => {
        dispatch({
            type : TOVUTI_USER_ID,
            tovutiUserId : id
        })
    }
}



export const setExtraData = (flag) => {
    return async dispatch => {
        dispatch({
            type : EXTRA_DATA,
            extraData : flag
        })
    }
}

export const setInterviewsList = (list) => {
    return async dispatch => {
        dispatch({
            type : INTERVIEWS_LIST,
            interviewsList : list
        })
    }
}


export const setFaqs = (list) => {
    return async dispatch => {
        dispatch({
            type : FAQS,
            faqs : list
        })
    }
}



export const getHomeData = () => new Promise(async(resolve, reject) => {

    const data = {
        domain: domain,
        candidateId: await getCandidateId()
    }
   
    axios.all([
        AxiosBase.get('candidateProfile/fetchCandidateData'),
        AxiosBase.get('CandidateDashboard/postJobautomatchMatch'),
        AxiosBase.post('talentdata/searchtalentbyid',data),
        AxiosBase.get('talentrequests'),
        AxiosBase.post('CandidateDashboard/getProfileImage',data),
        // AxiosBase.post('/candidateProfile/getResume',data)
    ])
        .then(response => {
            console.log('[HomeActions.js] Home Response: ',response);

            const data = {
                profileDetail : null,
                matchedJobs : [],
                favouritedJobs : [],
                appliedJobs : [],
                assessments : null,
                resumeList : [],
                preferences : null,
                profileImage : response[4]?.data[0]?.ImageURL
                
            }

            //Get Candidate Profile
            const profileResponse = response[0].data;
            if(profileResponse.length > 0){
                data.profileDetail = profileResponse[0]
            }

            // Get matched Jobs
            const matchedJobsResponse = response[1].data;

            console.log('[HomeActions.js] getHomeData : ',matchedJobsResponse)
        
            // const appliedJobsResponse = response[3].data;
            // let appliedJobs = [];
            // let appliedJobIds = []
            // if(appliedJobsResponse !== undefined) {
            //     appliedJobs = appliedJobsResponse.filter(job => job.statusName === 'Self Applied')
            //     appliedJobIds=appliedJobs.map(i => i.jobId)
            //     data.appliedJobs = appliedJobs
            // }
            if(matchedJobsResponse.length > 0){
                // const jobStatusCodes = [ "37" ]
                // data.matchedJobs = matchedJobsResponse.filter(job => (!appliedJobIds.includes(job.jobId)) && (!jobStatusCodes.includes(job.jobStatus)) && (!job.favorited))
                // data.favouritedJobs = matchedJobsResponse.filter(job => (!appliedJobIds.includes(job.jobId)) && (!jobStatusCodes.includes(job.jobStatus)) && job.favorited)
                data.matchedJobs = matchedJobsResponse.filter((job) => (job.status !== "Applied" && !job.favorited))
                data.favouritedJobs = matchedJobsResponse.filter((job) => job.favorited)
                data.appliedJobs = matchedJobsResponse.filter(job => job.status === 'Applied')
            }

            const userResponse = response[2].data;
            if(userResponse !== undefined) {
                data.resumeList = userResponse.resumeURL !== undefined ? userResponse.resumeURL : []

                data.preferences = {
                    privacySettings: userResponse.Privacy,
                    positionTypeSettings: userResponse.preferredPositionType,
                    preferredLocations : userResponse.preferedLocations,
                    currencyAndRates : {
                        minContractRate : userResponse.minContractRate,
                        minContractRateCurrency : userResponse.minContractRateCurrency,
                        preferredSalaryCurrency : userResponse.preferredSalaryCurrency,
                        preferredSalary : userResponse.preferredSalary
                    }
                }

            }

            // const profileImageResponse = response[2].data;
            // if(profileImageResponse !== undefined) {

            // }

            resolve(data)

        })
        .catch(error => {
            console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})



export const getMatchedJobs = () => new Promise((resolve, reject) => {
   
    AxiosBase.get('CandidateDashboard/postJobautomatchMatch')
        .then(response => {     
            console.log('[MatchedJobs.js] : ',response) 
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


// export const getRTRJobs = () => new Promise((resolve, reject) => {
   
//     AxiosBase.post('CandidateDashboard/getMappedJobList')
//         .then(response => {           
//             resolve(response.data)
//         })
//         .catch(error => {
//             // console.log(error)
//             reject(error)
//             errorHandler(error)
            
//         })
// })

export const getRTRJobs = () => new Promise((resolve, reject) => {
    AxiosBase.post('CandidateDashboard/fetchRTR',{
        filterValue: 'Submitted'
      })
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const getAppliedJobs = () => new Promise((resolve, reject) => {
   
    AxiosBase.get('talentrequests')
        .then(response => {    
            console.log('[HomeActions.js] Applied List: ',response) 
            const res = response.data;
            const appliedJobs = res.filter(job => job.statusName === 'Self Applied')      
            resolve(appliedJobs)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const getFavouritedJobs = () => new Promise((resolve, reject) => {
   
    AxiosBase.post('CandidateDashboard/getMappedJobList')
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
        })
})



export const getRecruiterDetail = (tenantName) => new Promise((resolve, reject) => {

    const data = {
        "tenantName": tenantName,
        "domainName": domain
    }
   
    AxiosBase.post('CandidateJobApply/fetchRecruiterByTenant',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const makeJobFavorite = (data) => new Promise((resolve, reject) => {
   
    AxiosBase.post('CandidateDashboard/postFavorited',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const applyForJob = (data) => new Promise((resolve, reject) => {
   
    AxiosBase.post('CandidateJobApply/selfJobApplyByCandidate',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const getTodosRequests = () => new Promise((resolve, reject) => {
   
    // const candidateId = await getCandidateId();
    // console.log('[HomeActions.js] CandidateId: ',candidateId)
    axios.all([
        AxiosBase.get('CandidateDashboard/getModernHire'),
        AxiosBase.get('CandidateDashboard/getCodingTests'),
        AxiosBase.post('CandidateDashboard/fetchRTR',{
                "filterValue": "Sourced"
        }),
        AxiosBase.get('CandidateDashboard/getModernHireInterviews'),
    ])
        .then(response => {   
            console.log('[HomeActions.js] getTodosRequests: ',response) 
            const data = {
                assessments : [],
                rtrList : [],
                interviews : []
            }     
            
            const modernHireAssessments = response[0].data.filter(item => item.Status !== 'Completed');
            const codingTestAssessments = response[1].data.filter(item => item.Status !== 'Completed');
            if(modernHireAssessments !== null){
                modernHireAssessments.forEach(it => it.type = it.AssessmentType)
                data.assessments = [...modernHireAssessments];
            }

            if(codingTestAssessments !== null){
                codingTestAssessments.forEach(it => it.type = 'Coding Test')
                data.assessments = [...data.assessments, ...codingTestAssessments];
            }

            const rtrResponse = response[2].data;
            if(rtrResponse !== undefined){
                data.rtrList = rtrResponse;
            }

            const interviewsResponse = response[3].data;
            if(interviewsResponse !== undefined){
                data.interviews = interviewsResponse;
            }
            // .length > 0 ? rtrResponse.filter(it => it.statusName === 'Sourced') : []
            console.log('[HomeActions.js] getTodosRequests: ',data) 
            resolve(data)

            //     const oneWayInterviewsList = assessmentsResponse.oneWay;
            //     const tovutiList = assessmentsResponse.tovuti;
            //     const twoWayInterviewsList = assessmentsResponse.twoWay;

                

            //     if(oneWayInterviewsList.length > 0){
            //         oneWayInterviewsList.forEach(it => {
            //             it.interviewType = 'One Way Interview'
            //         })
                    
            //     }

            //     if(tovutiList.length > 0){
            //         tovutiList.forEach(it => {
            //             it.interviewType = 'MCQ'
            //         })
            //     }

            //     let _oneWayInterviewsList = []
            //     const list = [...oneWayInterviewsList, ...tovutiList]

            //     if(list.length > 0){
            //         const requestedList = list.filter(it => it.status === 'Requested')
            //         const openList = list.filter(it => it.status === 'Open')
            //         const completedList = list.filter(it => it.status === 'Completed')
            //         const rejectedList = list.filter(it => it.status === 'Rejected')
                    
            //         _oneWayInterviewsList=[...requestedList,...openList,...completedList,...rejectedList]
            //     }
            //     console.log('[HomeActions.js] Filtered List: ',list,_oneWayInterviewsList)

            //     if(twoWayInterviewsList.length > 0){
            //         twoWayInterviewsList.forEach(it => {
            //             it.interviewType = 'Two Way Interview'
            //         })
            //     }

            //     data.assessmentsData = {
            //         oneWay : _oneWayInterviewsList,
            //         twoWay : twoWayInterviewsList
            //     }
            // }


            
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const getInterviewsList = () => new Promise((resolve, reject) => {
    AxiosBase.get('CandidateDashboard/getModernHireInterviews')
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            // console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const rejectMCQ = (data) => new Promise((resolve, reject) => {
   
    AxiosBase.post('CandidateDashboard/rejectMCQ',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})


export const rejectOneWay = (data) => new Promise((resolve, reject) => {
    AxiosBase.post('CandidateDashboard/rejectOneWay',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})



export const getTovutiUsers = (email) => new Promise((resolve, reject) => {

    AxiosBase.get('tovuti/getUser')
        .then(response => {
            const list = response.data;
            if(list.length > 0){
                const filteredList = list.filter(user => user.Email === email);
                if(filteredList.length > 0){
                    const user = filteredList[0];
                    saveTovutiUser(user)
                    resolve(user)
                }
            }
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})



export const getTovutiIdFromIndex = (email) => new Promise((resolve, reject) => {

    AxiosBase.get('/candidateProfile/getTovutiUserFromIndex')
        .then(response => {
            if(response.data.length > 0){
                resolve(response.data[0])
            }else {
                reject({error : 'No Tovuti User Found.'})
            }
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})





export const getCoursesByUserId = data => new Promise((resolve, reject) => {
    // console.log('[HomeActions.js] getCoursesByUserId: ', data)
    AxiosBase.post('tovuti/getUsersTovutiCourses',data)
        .then(res => {           
            resolve(res.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})


export const rejectRTR = (data) => new Promise((resolve, reject) => {
   
    AxiosBase.post('AcceptRejectRtr/rtrRejectCandidate',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})


export const acceptRTR = (data) => new Promise((resolve, reject) => {
   
    AxiosBase.post('AcceptRejectRtr/rtrApproveCandidate',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })  
})



export const discardJob = (id) => new Promise((resolve, reject) => {
    const data = {
        id : id
    }
    AxiosBase.post('CandidateJobApply/selfJobDiscardByCandidate',data)
        .then(response => {           
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})




export const getStampVideoUrl = (url) => new Promise((resolve, reject) => {
    const data = {
        "input": [
          {
            "url": url
          },
          {
            "url": "http://high5ui.herokuapp.com/images/high5-std.svg",
            "overlay_settings": {
              "vertical_align": "top",
              "vertical_margin": "10%",
              "horizontal_align": "left",
              "horizontal_margin": "10%"
            }
          }
        ],
        "playback_policy": ["public"]
      }  

    const ACCESS_TOKEN_ID = '722d9cc1-727e-4f6d-88f7-08f929cea0ad'
    const SECRET_KEY = '1lLI3fzK4x0VqV1cRxPdo1rG2MCswU+vpHvzNJI37Ja3YAm0rQp4QI0ITu1C6CKEXNJPfAPIweg'

    axios.post('https://api.mux.com/video/v1/assets',  data,      
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json', 
            }
        },{
            auth: {
                username: ACCESS_TOKEN_ID,
                password: SECRET_KEY
            }
        })
        .then(response => {
            // debugger;
            console.log('[HomeActions.js] Stamp UID Response : ',response)
            resolve(response)
           
        })
        .catch(error => {
            // debugger;
            reject(error)
        })

})


export const getFaqs = () => new Promise((resolve, reject) => {
    AxiosBase.get('support')
        .then(response => {           
            resolve(response.data.filter(it => it.fk_role === "[2]"))
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})