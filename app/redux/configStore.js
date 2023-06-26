import { createStore, combineReducers,applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { LOGOUT } from './actions/actionTypes';
import assessmentReducer from './reducers/assessmentReducer';
// import assessmentReducer from './reducers/assessmentReducer';
// import commonReducers from './reducers/commonReducers';
import homeReducer from './reducers/homeReducer';
// import interviewerReducer from './reducers/interviewerReducer';
// import jobFiltersReducer from './reducers/jobFiltersReducer';
// import learningReducer from './reducers/learningReducer';
import loginReducer from './reducers/loginReducer';
import profileReducer from './reducers/profileReducer';
import resumeReducer from './reducers/resumeReducer';
// import notificationReducer from './reducers/notificationReducer';
// // import paymentReducer from './reducers/paymentReducer';
// // import referralReducer from './reducers/referralReducer';
// import resumeReducer from './reducers/resumeReducer';
// import searchAgentReducer from './reducers/searchAgentReducer';
// import settingReducer from './reducers/settingReducer';

const appReducer = combineReducers({
    login : loginReducer,
    home : homeReducer,
    // jobFilters : jobFiltersReducer,
    profile : profileReducer,
    resume : resumeReducer,
    assessment : assessmentReducer,
    // setting : settingReducer,
    // learnings : learningReducer,
    // notifications : notificationReducer,
    // common : commonReducers,
    // // referrals : referralReducer,
    // interviewer : interviewerReducer,
    // searchAgent : searchAgentReducer,
    // payments : paymentReducer,
})


const rootReducer = (state,action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return appReducer(state,action)
}


let middleware = [thunk];

if (__DEV__) {
//   const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}



const configStore = createStore(rootReducer,applyMiddleware(...middleware))

export default configStore;