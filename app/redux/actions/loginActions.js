
import AxiosBase from "../networkRequests/AxiosBase";
import { showAlert } from "../../utils/Message";
import { errorHandler } from "../networkRequests/ErrorHandler";
import { saveToken, saveUserPref } from "../../utils/UserPrefs";
import { LOGOUT, USER_PREFS } from "./actionTypes";
import { domain, redirectToLoginRtR } from "../networkRequests/NetworkConstants";

export const setUserPrefs = (data) => {
    return async dispatch => {
        dispatch({
            type : USER_PREFS,
            userPrefs : data
        })
    }
}


export const setLogoutUser = () => {
    return async dispatch => {
        dispatch({
            type : LOGOUT,
            data : null
        })
    }
}


export const loginUser = (email,password) => new Promise((resolve, reject) => {

    const data = {
        userName: email,
        password: password,
        domain : domain ,
        redirectTologinRtR : redirectToLoginRtR
    }
    console.log('[loginAction.js]Body of Login : ',data)
    AxiosBase.post('login',data)
        .then(response => {
            const res = response.data;
            if(res.role === 'Candidate'){
                // this.props.navigation.replace('Home')  
                saveUserPref(res)
                saveToken(res.token)
                showAlert('success','Login Successfully.') 
                resolve(res)
            }else {
                const msg = 'Oops! This is not a candidate login Credentials.';
                showAlert('error',msg) 
                reject({error : msg})
            }
        })
        .catch(error => {
            console.log(error)
            reject(error)
            errorHandler(error)
            
        })
})


export const forgotPassword = (email) => new Promise((resolve, reject) => {

    const data = {
        email : email,
        domain : domain
    }

    AxiosBase.post('forgotpassword',data)
        .then(response => {
            const res = response.data;
            showAlert('success',res.msg)
            resolve(res)
            
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})



export const changePassword = (userId,password) => new Promise((resolve, reject) => {

    const data = {
        "userid": userId,
        "newPassword": password,
        "domain" : "https://www.high5hire.com" 
    }

    AxiosBase.post('resetpassword/userid',data)
        .then(response => {
            const res = response.data;
            showAlert('success',res.msg)
            resolve(res)
        })
        .catch(error => {
            reject(error)
            errorHandler(error)
        })
})

