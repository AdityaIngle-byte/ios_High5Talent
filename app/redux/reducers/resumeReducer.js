import { RESUME_LIST, RESUME_VIEW_FLAGS  } from "../actions/actionTypes";

let initialState = {
    resumeList : [],
    viewFlags : {
        hasPersonalInfo : true,
        hasStoryInfo : true,
        hasSocialMedia : true,
        hasSkillsData : true,
        hasEducation : true,
        hasWorkExperience : true,
        hasCertificates : true,
        hasAwardsAndHonors : true,
        hasLanguages : true,
        hasLicenses : true,
        hasCustomSections : true
    }
}


export default resumeReducer = (state = initialState, action) => {

    switch (action.type) {
        case RESUME_LIST:
            return{
                ...state,
                resumeList : action.resumeList
            }
        case RESUME_VIEW_FLAGS:
            return {
                ...state,
                viewFlags : action.viewFlags
            }
    }
    return state;
    
}



