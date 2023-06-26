import { showAlert } from "../../utils/Message"

export const errorHandler = (error) => {

    // console.log('[Errorhandler.js] Error handler called',JSON.stringify(error))

    const status = error.response !== undefined ? error.response.status : null;
    
    if(status !== null && status === 403  || status === 500){
        const response = error.response.data;
        console.log('[Errorhandler.js] Error handler called',JSON.stringify(response))

        if(response.errMessage){
            showAlert('error',response.errMessage);
        }else if(response.Message){
            showAlert('error',response.Message);
        }
        
    }else {
        if(error.message === 'Network Error'){
            showAlert('error','Network or Server Error');
        }else{
            showAlert('error',error.message || error.Message);
        }
    }
}