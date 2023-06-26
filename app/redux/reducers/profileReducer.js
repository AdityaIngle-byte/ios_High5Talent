import { images } from "../../assets/images";
import { 
    PROFILE_PERSONAL_INFO, PROFILE_EDUCATION, PROFILE_SOCIAL_MEDIA, PROFILE_STORY,PROFILE_SKILLS,
    PROFILE_EXPERIENCES, PROFILE_CERTIFICATES, PROFILE_CUSTOM_SECTIONS, PROFILE_LICENSES,PROFILE_LANGUAGES, 
    PROFILE_AWARDS_AND_HONORS,
    PREFERENCES, PROFILE_IMAGE

} from "../actions/actionTypes";

let initialState = {
    profilePersonalInfo : null,
    profileSocialMedia : null,
    profileStory : '',
    profileSkills : null,
    profileEducation : [],
    profileCertificates : [],
    profileExperiences : [],
    profileLicenses : [],
    profileLanguages : [],
    profileCustomSections : [],
    profileAwardsAndHonorsList : [],
    preferences : null,
    profileImage :null,
}


export default profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case PROFILE_PERSONAL_INFO:
            return{
                ...state,
                profilePersonalInfo : action.profilePersonalInfo
            }
        case PROFILE_SOCIAL_MEDIA:
            return{
                ...state,
                profileSocialMedia : action.profileSocialMedia
            }
        case PROFILE_STORY:
            return{
                ...state,
                profileStory : action.profileStory
            }
        case PROFILE_SKILLS:
            return{
                ...state,
                profileSkills : action.profileSkills
            }
        case PROFILE_EDUCATION:
            return{
                ...state,
                profileEducation : action.profileEducation
            }
        case PROFILE_EXPERIENCES:
            return{
                ...state,
                profileExperiences : action.profileExperiences
            }
        case PROFILE_CERTIFICATES:
            return{
                ...state,
                profileCertificates : action.profileCertificates
            }
       
        case PROFILE_LICENSES:
            return{
                ...state,
                profileLicenses : action.profileLicenses
            }
        case PROFILE_LANGUAGES:
            return{
                ...state,
                profileLanguages : action.profileLanguages
            }
        case PROFILE_CUSTOM_SECTIONS:
            return {
                ...state,
                profileCustomSections : action.profileCustomSections
            }
        case PROFILE_AWARDS_AND_HONORS:
            return {
                ...state,
                profileAwardsAndHonorsList : action.profileAwardsAndHonorsList
            }
        case PREFERENCES:
            return {
                ...state,
                preferences : action.preferences
            }
        case PROFILE_IMAGE:
            return {
                ...state,
                profileImage : action.profileImage
            }
        
    }
    return state;
    
}