import { ASSESSMENTS_LIST } from "../actions/actionTypes";

let initialState = {
    assessmentsList : []
}


export default assessmentReducer = (state = initialState, action) => {

    switch (action.type) {
        case ASSESSMENTS_LIST:
            return{
                ...state,
                assessmentsList : action.assessmentsList
            }
    }
    return state;
    
}