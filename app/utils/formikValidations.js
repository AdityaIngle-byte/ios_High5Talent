
// import { Formik } from 'formik'
import * as yup from 'yup'

const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const passwordError = 'Min 8 Characters, one number and one special, one upper case and one lower case Character required'


export const loginValidationSchema = yup.object().shape({
    email : yup.string().email('Enter Valid Email').required('Please Enter your Email.'),
    password : yup.string().required('Please Enter your Password.')
})


export const signupValidationSchema = yup.object().shape({
    email : yup.string().email('Enter Valid Email').required('Please Enter your Email.'),
    fullName : yup.string().required(errorMessage),
    phone : yup.string().required(errorMessage),
    address : yup.object().required(errorMessage).nullable(true),
    password : yup.string().required('Please Enter your Password.').matches(passwordCheck,passwordError),
    // confirmPassword : yup.string().when("password", {
    //     is: val => (val && val.length > 0 ? true : false),
    //         then: yup.string().oneOf(
    //             [yup.ref("password")],
    //                 "Both password need to be the same"
    //             )
    //     })
})


const errorMessage = 'Required'


export const setupProfileValidationSchema = yup.object().shape({
    fullName : yup.string().required(errorMessage),
    address : yup.object().required(errorMessage).nullable(true),
    mobile : yup.string().required(errorMessage),
    email : yup.string().email('Enter Valid Email').required(errorMessage),
    jobTitle : yup.string().required(errorMessage),
})

export const profilePersonalInfoValidationSchema = yup.object().shape({
    firstName : yup.string().required(errorMessage),
    lastName : yup.string().required(errorMessage),
    address : yup.object().required(errorMessage).nullable(true),
    mobile : yup.string().required(errorMessage),
    email : yup.string().email('Enter Valid Email').required(errorMessage),
    // designation : yup.string().required(errorMessage),
    // workExperience : yup.string().required(errorMessage)
})


export const profileSkillsValidationSchema = yup.object().shape({
    skill : yup.string().required(errorMessage),
})



// export const profileEducationValidationSchema = yup.object().shape({
//     degree : yup.string().required(errorMessage),
//     college : yup.string().required(errorMessage),
//     city : yup.string().required(errorMessage),
//     marks : yup.string().required(errorMessage),
//     endDate : yup.string().required(errorMessage),
// })


export const profileEducationValidationSchema = yup.object().shape({
    graduatedYear : yup.string().required(errorMessage),
    educationType : yup.string().required(errorMessage),
    educationProgram : yup.string().required(errorMessage),
    school : yup.string().required(errorMessage),
    major : yup.string().required(errorMessage),
})



export const profileCertificateValidationSchema = yup.object().shape({
    certificateName : yup.string().required(errorMessage),
    certificateNumber : yup.string().required(errorMessage),
    issuedBy : yup.string().required(errorMessage),
    issueDate : yup.string().required(errorMessage),
    expiryDate : yup.string().required(errorMessage)
})


export const profileAwardsAndHonorSchema = yup.object().shape({
    awardOrHonorName : yup.string().required(errorMessage),
    issuedBy : yup.string().required(errorMessage),
    issueDate : yup.string().required(errorMessage),
})


export const profileExperienceValidationSchema = yup.object().shape({
    employerName : yup.string().required(errorMessage),
    designation : yup.string().required(errorMessage),
})



export const profileLicenseValidationSchema = yup.object().shape({
    licenseName : yup.string().required(errorMessage),
    licenseNumber : yup.string().required(errorMessage),
    state : yup.string().required(errorMessage),
    startDate : yup.string().required(errorMessage),
    expiryDate : yup.string().required(errorMessage),
})




//Interviewer apply validations
export const interviewerValidationSchema = yup.object().shape({
    personalInfo : yup.object().required(errorMessage).nullable(true),
    skillsList : yup.array().min(1,errorMessage),
    timeZonesList : yup.array().min(1,errorMessage),
    // expiryDate : yup.string().required(errorMessage),
})


const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

//Social Media Validations
export const socialMediaValidationSchema = yup.object().shape({
    linkedIn : yup.string().matches(URL,'Must be valid url'),
    facebookId : yup.string().matches(URL,'Must be valid url'),
    twitterId : yup.string().matches(URL,'Must be valid url'),
    // jobTitle : yup.string().required(errorMessage),
    // preferredLocation : yup.string().required(errorMessage),

    
})



//Resume Validations
export const resumePersonalInfoValidationSchema = yup.object().shape({
    firstName : yup.string().required(errorMessage),
    lastName : yup.string().required(errorMessage),
    address : yup.object().required(errorMessage).nullable(true),
    mobile : yup.string().required(errorMessage).length(10,'Enter valid contact number.'),
    email : yup.string().email('Enter Valid Email').required(errorMessage),
    designation : yup.string().required(errorMessage),
})


export const resumeObjectiveValidationSchema = yup.object().shape({
    objective : yup.string().required(errorMessage)
})


export const resumeEducationValidationSchema = yup.object().shape({
    degree : yup.string().required(errorMessage),
    college : yup.string().required(errorMessage),
})


export const resumeExperienceValidationSchema = yup.object().shape({
    jobTitle : yup.string().required(errorMessage),
    employer : yup.string().required(errorMessage),
})



export const resumeSkillsValidationSchema = yup.object().shape({
    skill : yup.string().required(errorMessage)
})


export const resumeCertificateValidationSchema = yup.object().shape({
    certificateName : yup.string().required(errorMessage),
    certificateNumber : yup.string().required(errorMessage),
})


export const resumeLanguageValidationSchema = yup.object().shape({
    language : yup.string().required(errorMessage),
})


export const resumeInterestValidationSchema = yup.object().shape({
    interest : yup.string().required(errorMessage),
})

export const resumeProjectsValidationSchema = yup.object().shape({
    projectName : yup.string().required(errorMessage),
})



export const resumeReferenceValidationSchema = yup.object().shape({
    relationship : yup.string().required(errorMessage),
    contactPerson : yup.string().required(errorMessage),
    // referenceType : yup.string().required(errorMessage),
})


export const resumeLicenseValidationSchema = yup.object().shape({
    licenseName : yup.string().required(errorMessage),
    licenseNumber : yup.string().required(errorMessage),
})


export const resumeSignatureValidationSchema = yup.object().shape({
    signature : yup.object().required(errorMessage).nullable(true),
})


export const resumeActivityValidationSchema = yup.object().shape({
    activity : yup.string().required(errorMessage),
})


export const resumeCustomSectionValidationSchema = yup.object().shape({
    name : yup.string().required(errorMessage),
    description : yup.string().required(errorMessage),
})


export const profileCustomSectionValidationSchema = yup.object().shape({
    heading : yup.string().required(errorMessage),
    description : yup.string().required(errorMessage),
})



//Apply Job 
export const jobApplyValidationSchema = yup.object().shape({
    whyMe : yup.string().required(errorMessage),
    payRate : yup.string().required(errorMessage),
})



//create assessment
export const createAssessmentValidationSchema = yup.object().shape({
    interviewType : yup.string().required(errorMessage),
    interviewSkill : yup.object().required(errorMessage).nullable(true),
    // interviewersList : yup.string().when("interviewType",interviewType => {
    //         if(interviewType === '2-Way Interview'){
    //             return yup.array().min(1,errorMessage)
    //         }
    //     }),
    // // timeZone : yup.string().when("interviewType",interviewType => {
    // //         if(interviewType === '2-Way Video Interview'){
    // //             return yup.object().required(errorMessage).nullable(true)
    // //         }
    // //     }),
    // date1 : yup.string().when("interviewType",interviewType => {
    //         if(interviewType === '2-Way Interview'){
    //             return yup.string().required(errorMessage)
    //         }
    //     }),
    // startTime1 : yup.string().when("interviewType",interviewType => {
    //         if(interviewType === '2-Way Interview'){
    //             return yup.string().required(errorMessage)
    //         }
    //     }),
    // endTime1 : yup.string().when("interviewType",interviewType => {
    //         if(interviewType === '2-Way Interview'){
    //             return yup.string().required(errorMessage)
    //         }
    //     }),
})


//create job 
export const createJobValidationSchema = yup.object().shape({
    jobType : yup.string().required(errorMessage),
    designation : yup.string().required(errorMessage),
    expYears : yup.string().required(errorMessage),
    expMonths : yup.string().required(errorMessage),
    salaryExpectationMinimum : yup.string().required(errorMessage),
    period : yup.string().required(errorMessage),
    phone : yup.string().required(errorMessage).length(10,'Enter valid contact number.'),
    email : yup.string().email('Enter Valid Email').required(errorMessage),
    skillsList : yup.array().min(1,'Add at least 1 Skill.'),
    preferredLocations : yup.array().min(1,'Add at least 1 Location.'),
})


// Forgot password
export const forgotPasswordValidationSchema = yup.object().shape({
    email : yup.string().email('Enter Valid Email').required('Please Enter your Email.'),
})


// Change password
export const changePasswordValidationSchema = yup.object().shape({
    // oldPassword : yup.string().required(errorMessage),
    newPassword : yup.string().required('Please Enter your Password.').matches(passwordCheck,passwordError),
    confirmPassword : yup.string().required('Please Enter confirm Password.')
            .oneOf([yup.ref('newPassword'), null], 'Both Passwords must match')
})

// Preferences
export const preferencesCurrencyRateValidationSchema = yup.object().shape({
    // oldPassword : yup.string().required(errorMessage),
    preferredCurrency : yup.object().required('Select your preferred currency').nullable(true),
    minimumHourlyRate : yup.string().required('Enter minimum hourly rate.'),
    minimumAnnualSalary : yup.string().required('Enter minimum annual salary.'),
})


// Change password Deactivate Profile
export const deactivateProfileValidationSchema = yup.object().shape({
    password : yup.string().required('Please Enter your Password.').matches(passwordCheck,passwordError),
})



// Screen wizard
// export const setUpProfileValidationSchema = yup.object().shape({
//     firstName : yup.string().required(errorMessage),
//     lastName : yup.string().required(errorMessage),
//     phone : yup.string().required(errorMessage).length(10,'Enter valid contact number.'),
//     address : yup.object().required(errorMessage).nullable(true),
// })




export const setUpSkillsAndLocationsValidationSchema = yup.object().shape({
    skillsList : yup.array().min(1,'Add at least 1 Skill.'),
    preferredLocations : yup.array().min(1,'Add at least 1 Location.'),
})


export const setUpExperienceValidationSchema = yup.object().shape({
    experiencesList : yup.array().min(1,'Add at least 1 Experience.'),
})




// Interviewer module 
export const placeBidValidationSchema = yup.object().shape({
    currency : yup.object().required(errorMessage).nullable(true),
    rate : yup.string().required(errorMessage)
})


export const addPaymentValidationSchema = yup.object().shape({
    fullName : yup.string().required(errorMessage),
    accountNumber : yup.string().required(errorMessage),
    ifscode : yup.string().required(errorMessage),
})



// Request Interviewer modal
export const requestInterviewerValidationSchema = yup.object().shape({
    name : yup.string().required(errorMessage),
    email : yup.string().required(errorMessage)
})


//Search Agent - Create Job Request
export const createJobRequestValidationSchema = yup.object().shape({
    jobType : yup.string().required(errorMessage),
    designation : yup.string().required(errorMessage),
    skillsList : yup.array().min(1,errorMessage),
    payRate : yup.string().required(errorMessage),
    period : yup.object().required(errorMessage).nullable(true),
    preferredLocationsList : yup.array().min(1,errorMessage),
    email : yup.string().required(errorMessage).email('Enter valid email'),
    phone : yup.string().required(errorMessage).length(10,'Enter valid contact number.'),
})


//Resume - Add Video resume script validaiton scheme
export const videoResumeScriptValidationSchema = yup.object().shape({
    title : yup.string().required(errorMessage),
    script : yup.string().required(errorMessage)
})
