import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator,ScrollView } from 'react-native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { todosJson } from '../../../../json/todosJson'
import { getCoursesByUserId, getTodosRequests, rejectMCQ, rejectOneWay, setBottomTab, setInterviewsList, setLearnCoursesList, setTodosAllList, setTodosAssessmentsList, setTodosInterviewList, setTodosRTRList } from '../../../../redux/actions/homeActions'
import { showAlert } from '../../../../utils/Message'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import AssessmentItem from '../../../items/AssessmentItem'
import InterviewItem from '../../../items/InterviewItem'
import JobItem from '../../../items/JobItem'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'
import RTRItem from '../../../items/RTRItem'
import TodosNavView from '../../../items/TodosNavView'
import { openMonjinUrl, openUrl } from '../../common/InAppBrowser'

const MyTodosView = props => {

    const dispatch = useDispatch();

    // const allTodosList = useSelector(state => state.home.allTodosList);

    // const tovutiUserId = useSelector(state => state.home.tovutiUserId)
    // const learnCoursesList = useSelector(state => state.home.learnCoursesList)
    const todosAssessmentsList = useSelector(state => state.home.todosAssessmentsList)
    const todosInterviewList = useSelector(state => state.home.interviewsList)
    const todosRTRList = useSelector(state => state.home.todosRTRList)
    const userPrefs = useSelector(state => state.login.userPrefs)

    const _todosAssessmentsList = todosAssessmentsList.length > 2 ? todosAssessmentsList.slice(0,2) : todosAssessmentsList;
    const _todosInterviewList = todosInterviewList.length > 2 ? todosInterviewList.slice(0,2) : todosInterviewList;
    const _todosRTRList = todosRTRList.length > 2 ? todosRTRList.slice(0,2) : todosRTRList;

    const [selectedIndex, setSelectedIndex] = useState(0);
    // const [list, setList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)


    useEffect(() => {
        // init()
        _getAllTodos()
      return () => {
      };
    }, [])


    // const init = () => {
    //     // dispatch(setMyTodosList(todosJson))
    //     // setList(todosJson[0].data)
    //     _getAllTodos()
    // }


    const _getAllTodos = () => {
        setIsRefreshing(true)
        getTodosRequests()
            .then(response => {
                setIsRefreshing(false)
                console.log('[MyTodosView.js] : ',response)
                // const assessments = response.assessmentsData;
                dispatch(setTodosRTRList(response.rtrList))
                dispatch(setTodosAssessmentsList(response.assessments))
                dispatch(setInterviewsList(response.interviews))
                // _getUserCourses(assessments.oneWay)

            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[MyTodosView.js] : ',error)
            })
    }


    // const _getUserCourses = (list) => {
    //     console.log('[MyTodosView.js] _getUserCourses: ',list,learnCoursesList,tovutiUserId)
    //     if(learnCoursesList.length<1){
    //         if(tovutiUserId !== null){
    //             const _data = {
    //                 userId : tovutiUserId
    //             }
    //             getCoursesByUserId(_data)
    //                 .then(response => {
    //                     console.log('[MyTodosView.js] Courses : ',response)
    //                     dispatch(setLearnCoursesList(response))
    //                     _updateAssessmentsList(response,list)
                        
    //                 })
    //                 .catch(error => {
    //                     setIsRefreshing(false)
    //                     console.log('[MyTodosView.js] Courses : ',error)
    //                 })
    //         }
    //     }else {
    //         _updateAssessmentsList(learnCoursesList,list)
    //     }
    // }

    // const _updateAssessmentsList = (learnCourses,list) => {
        
    //     list.forEach(it =>{
    //         learnCourses.forEach(course => {
    //             if(it.courseId === course.CourseId){
    //                 it.courseUrl = course.CourseUrl
    //             }
    //         })
    //     })

    //     console.log('[MyTodosView.js] On Update Assessments : ',list)
    //     dispatch(setTodosAssessmentsList(list))
    // }





    const _onUpdateIndex = index => {
        setSelectedIndex(index)
        // let _list = [];
        if(index === 0){
            // _list = myTodosList;
        }else if(index === 1){
            // _list = myTodosList.filter(it => it.type === 1)
        }else if(index === 2){
            // _list = myTodosList.filter(it => it.type === 2)
            if(todosAssessmentsList.length < 1){
                _getAllTodos()
            }
        }else if(index === 3){
            // _list = myTodosList.filter(it => it.type === 4)
        }
        
    }

    const _renderRTRItem = (item,index) => {
        return (
            <RTRItem 
                item={item}
                index={index}
                // hasStatusView
                hasButtons
                fromHome={props.fromHome}
                onPress={() => props.navigation.navigate('RTRDetail', {'detail' : item})}
            />
        )
    }

    const _renderAssessmentItem = (item,index) => {
        return (
            <AssessmentItem 
                item={item}
                index={index}
                {...props}
                fromHome={props.fromHome}
                // onPress={() => {}}
                // onReject={() => onRejectAssessment(item)}
                // onAccept={() => {}}
                // onStart={() => _onAssessmentStart(item)}
            />
        )
    }


    // const _onAssessmentStart = item => {
    //     // if(item.interviewType === 'One Way Interview'){
    //     //     openMonjinUrl(item.inviteCode)
    //     // }else if(item.interviewType === 'MCQ'){
            
    //     //     if(item.courseUrl !== undefined){
    //     //         openUrl(item.courseUrl)
    //     //     }else {
    //     //         _getUserCourses(todosAssessmentsList)
    //     //         showAlert('message','Please wait! Updating List')
    //     //     }

    //     // }
    // }


    const _renderInterviewItem = (item,index) => {
        return (
            <InterviewItem 
                item={item}
                index={index}
                type={'Upcoming'}
                fromHome={props.fromHome}
                // onPress={() => {}}
            />
        )
    }


    const noJobsView = (msg) => {
        return (
            <NoDataView 
                hasImage
                msg={msg}
                hasTryAgain
                onTryAgain={() => _getAllTodos()}
            />
        )
    }


    const viewMoreView = () => {
        return (
            <RequestMoreItemsView 
                title='View More'
                onPress={() => {
                    dispatch(setBottomTab('Todos'))
                    props.navigation.navigate('Todos')
                }}
            />
        )
    }

    // const onStart = () => {

    // }

    // const rejectRTR = () => {}

    // const onRejectAssessment = item => {

    //     if(item.interviewType === 'One Way Interview'){
    //         const data = {
    //             id_InterviewApplication : item.id_InterviewApplication
    //         }

    //         if(baseViewRef !== null){
    //             baseViewRef.current.showLoader();
    //             rejectOneWay(data)
    //                 .then(response => {
    //                     baseViewRef.current.hideLoader()
    //                     console.log('[MyTodosView.js] Reject One Way Success: ',response)
    //                     showAlert('success','One Way Assessment Rejected Successfully!')
    //                     _getAllTodos()
    //                 })
    //                 .catch(error => {
    //                     baseViewRef.current.hideLoader()
    //                     console.log('[MyTodosView.js] Reject One Way: ',error)
    //                 })
    //         }

    //     }else if(item.interviewType === 'MCQ'){
    //         const data = {
    //             userId : userPrefs.candidateId,
    //             id_candidatecourse : item.id_candidatecourse
    //         }
    //         baseViewRef.current.showLoader();
    //         rejectMCQ(data)
    //             .then(response => {
    //                 baseViewRef.current.hideLoader()
    //                 console.log('[MyTodosView.js] Reject MCQ: ',response)
    //                 showAlert('success','MCQ Assessment Rejected Successfully!')
    //                 _getAllTodos()
    //             })
    //             .catch(error => {
    //                 baseViewRef.current.hideLoader()
    //                 console.log('[MyTodosView.js] Reject MCQ: ',error)
    //             })
    //     }
    // }


    


    // const rejectTwoWay = () => {}


    return (
        <View>
            <TodosNavView 
                selectedIndex={selectedIndex}
                onUpdateIndex={_onUpdateIndex}
            />

            {
                isRefreshing
                &&
                <ActivityIndicator 
                    size='small'
                    style={{marginTop:12}}
                />
            }
            <ScrollView  horizontal={props.fromHome===true?true:false}>
                {
                    (selectedIndex === 0 || selectedIndex === 1)
                    &&
                    _todosRTRList.map((item,index) => _renderRTRItem(item,index))
                }
                
                {
                    (selectedIndex === 0 || selectedIndex === 2)
                    &&
                    _todosAssessmentsList.map((item,index) => _renderAssessmentItem(item,index))
                }

                {
                    (selectedIndex === 0 || selectedIndex === 3)
                    &&
                    _todosInterviewList.map((item,index) => _renderInterviewItem(item,index))
                }
            </ScrollView>
           
            {
                selectedIndex === 0 && 
                (_todosAssessmentsList < 1
                ?
                !isRefreshing && noJobsView('No Todos Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 1 && 
                (
                    _todosRTRList < 1 
                ?
                !isRefreshing && noJobsView('No Approval History Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 2 && 
                (todosAssessmentsList < 1
                ?
                !isRefreshing && noJobsView('No Assessment Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 3 && 
                (todosInterviewList < 1
                ?
                !isRefreshing && noJobsView('No Interviews Applied.')
                :
                viewMoreView())
            }

        </View>
    )
}

export default MyTodosView

const styles = StyleSheet.create({})
