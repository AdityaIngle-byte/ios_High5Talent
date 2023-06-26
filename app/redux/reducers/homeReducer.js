import { CURRENT_BOTTOM_TAB, EXTRA_DATA, 
    MATCHED_JOBS, RTR_JOBS, APPLIED_JOBS, FAV_JOBS, 
    ALL_TODOS, TODOS_ASSESSMENTS, TODOS_INTERVIEW_SCHEDULING, TODOS_RTR, LEARN_LIST, TOVUTI_USER_ID, INTERVIEWS_LIST, FAQS } from "../actions/actionTypes";

let initialState = {
    currentBottomTab : 'Home',
    // myJobsList : [],
    // myTodosList : [],
    // upcomingInterviewsList : [],
    extraData : false,
    matchedJobsList : [],
    rtrJobsList : [],
    appliedJobsList : [],
    favouritedJobsList : [],
    allTodosList : [],
    todosRTRList : [],
    todosAssessmentsList : [],
    todosInterviewList : [],
    learnCoursesList : [],
    tovutiUserId : null,
    interviewsList : [],
    faqs : [],
}


export default homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENT_BOTTOM_TAB:
            return{
                ...state,
                currentBottomTab : action.currentBottomTab
            }
        // case MY_JOBS:
        //     return{
        //         ...state,
        //         myJobsList : action.myJobsList
        //     }
        case FAQS:
            return{
                ...state,
                faqs : action.faqs
            }
        case INTERVIEWS_LIST:
            return {
                ...state,
                interviewsList : action.interviewsList
            }
        case EXTRA_DATA:
            return {
                ...state,
                extraData : action.extraData
            }
        case MATCHED_JOBS:
            return {
                ...state,
                matchedJobsList : action.matchedJobsList
            }
        case RTR_JOBS:
            return {
                ...state,
                rtrJobsList : action.rtrJobsList
            }
        case APPLIED_JOBS:
            return {
                ...state,
                appliedJobsList : action.appliedJobsList
            }
        case FAV_JOBS:
            return {
                ...state,
                favouritedJobsList : action.favouritedJobsList
            }
        case ALL_TODOS:
            return {
                ...state,
                allTodosList : action.allTodosList
            }
        case TODOS_RTR:
            return {
                ...state,
                todosRTRList : action.todosRTRList
            }
        case TODOS_ASSESSMENTS:
            return {
                ...state,
                todosAssessmentsList : action.todosAssessmentsList
            }
        case TODOS_INTERVIEW_SCHEDULING:
            return {
                ...state,
                todosInterviewList : action.todosInterviewList
            }
        case LEARN_LIST:
            return {
                ...state,
                learnCoursesList : action.learnCoursesList
            }
        case TOVUTI_USER_ID:
            return {
                ...state,
                tovutiUserId : action.tovutiUserId
            }

        
    }
    return state;
    
}