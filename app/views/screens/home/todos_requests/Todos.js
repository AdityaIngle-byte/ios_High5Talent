import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { todosJson } from '../../../../json/todosJson'
import { getCoursesByUserId, getTodosRequests, rejectMCQ, rejectOneWay, setLearnCoursesList, setTodosAllList, setTodosAssessmentsList, setTodosInterviewList, setTodosRTRList } from '../../../../redux/actions/homeActions'
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

const Todos = props => {

    const baseViewRef = useRef(null)
    const dispatch = useDispatch();

    // const allTodosList = useSelector(state => state.home.allTodosList);


    const tovutiUserId = useSelector(state => state.home.tovutiUserId)
    const learnCoursesList = useSelector(state => state.home.learnCoursesList)

    const todosAssessmentsList = useSelector(state => state.home.todosAssessmentsList)
    const todosInterviewList = useSelector(state => state.home.interviewsList)
    const todosRTRList = useSelector(state => state.home.todosRTRList)
    const userPrefs = useSelector(state => state.login.userPrefs)

    const allLength = todosAssessmentsList.length + todosInterviewList.length + todosRTRList.length;
    console.log('[Todos.js] allLength ; ',allLength)

    // const _todosAssessmentsList = todosAssessmentsList.length > 2 ? todosAssessmentsList.slice(0,2) : todosAssessmentsList;
    // const _todosInterviewList = todosInterviewList.length > 2 ? todosInterviewList.slice(0,2) : todosInterviewList;
    // const _todosRTRList = todosRTRList.length > 2 ? todosRTRList.slice(0,2) : todosRTRList;

    const [selectedIndex, setSelectedIndex] = useState(0);
    // const [list, setList] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)


    useEffect(() => {
        init()
      return () => {
      };
    }, [])


    const init = () => {
        // dispatch(setMyTodosList(todosJson))
        // setList(todosJson[0].data)
        _getAllTodos()
    }


    const _getAllTodos = () => {
        setIsRefreshing(true)
        getTodosRequests()
            .then(response => {
                setIsRefreshing(false)
                console.log('[Todos.js] : ',response)
                // const assessments = response.assessmentsData;
                dispatch(setTodosRTRList(response.rtrList))
                dispatch(setTodosAssessmentsList(response.assessments))
                dispatch(setInterviewsList(response.interviews))
                // dispatch(setTodosInterviewList([...assessments.twoWay]))
                // _getUserCourses(assessments.oneWay)
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[Todos.js] : ',error)
            })
    }


    // const _getUserCourses = (list) => {
    //     console.log('[Todos.js] _getUserCourses: ',list,learnCoursesList,tovutiUserId)
    //     if(learnCoursesList.length<1){
    //         if(tovutiUserId !== null){
    //             const _data = {
    //                 userId : tovutiUserId
    //             }
    //             getCoursesByUserId(_data)
    //                 .then(response => {
    //                     console.log('[Todos.js] Courses : ',response)
    //                     dispatch(setLearnCoursesList(response))
    //                     _updateAssessmentsList(response,list)
                        
    //                 })
    //                 .catch(error => {
    //                     setIsRefreshing(false)
    //                     console.log('[Todos.js] Courses : ',error)
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

    //     console.log('[Todos.js] On Update Assessments : ',list)
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

        
        // if(_list.length > 3){
        //     _list = _list.slice(0,3)
        // }
        // console.log('[MyTodos.js] Get Jobs List Render : ',_list,myTodosList)

        
        // if(_list.length > 0){
        //     setList(_list[0].data);
        // }else {
        //     setList(_list)
        // }
        
    }

    const _renderRTRItem = ({item,index}) => {
        return (
            <RTRItem 
                item={item}
                index={index}
                // hasStatusView
                hasButtons
                onPress={() => props.navigation.navigate('RTRDetail', {'detail' : item})}
            />
        )
    }

    const _renderAssessmentItem = ({item,index}) => {
        return (
            <AssessmentItem 
                item={item}
                index={index}
                // onPress={() => {}}
                // onReject={() => onRejectAssessment(item)}
                // onStart={() => _onAssessmentStart(item)}
                // onAccept={() => {}}
            />
        )
    }

    // const _onAssessmentStart = item => {
        // if(item.interviewType === 'One Way Interview'){
        //     openMonjinUrl(item.inviteCode)
        // }else if(item.interviewType === 'MCQ'){
            
        //     if(item.courseUrl !== undefined){
        //         openUrl(item.courseUrl)
        //     }else {
        //         _getUserCourses(todosAssessmentsList)
        //         showAlert('message','Please wait! Updating List')
        //     }

        // }
    // }


    // const onRejectAssessment = item => {

    //     if(item.interviewType === 'One Way Interview'){
    //         const data = {
    //             id_InterviewApplication : item.id_InterviewApplication
    //         }
    //         console.log('[Todos.js] On Reject Assessment : ',data)

    //         if(baseViewRef !== null){
    //             baseViewRef.current.showLoader();
    //             rejectOneWay(data)
    //                 .then(response => {
    //                     baseViewRef.current.hideLoader()
    //                     console.log('[Todos.js] Reject One Way Success: ',response)
    //                     showAlert('success','One Way Assessment Rejected Successfully!')
    //                     _getAllTodos()
    //                 })
    //                 .catch(error => {
    //                     baseViewRef.current.hideLoader()
    //                     console.log('[Todos.js] Reject One Way: ',error)
    //                 })
    //         }

    //     }else if(item.interviewType === 'MCQ'){
    //         const data = {
    //             userId : item.userId,
    //             id_candidatecourse : item.id_candidatecourse
    //         }
    //         baseViewRef.current.showLoader();
    //         console.log('[Todos.js] On Reject Assessment : ',data)
    //         rejectMCQ(data)
    //             .then(response => {
    //                 baseViewRef.current.hideLoader()
    //                 console.log('[Todos.js] Reject MCQ: ',response)
    //                 showAlert('success','MCQ Assessment Rejected Successfully!')
    //                 _getAllTodos()
    //             })
    //             .catch(error => {
    //                 baseViewRef.current.hideLoader()
    //                 console.log('[Todos.js] Reject MCQ: ',error)
    //             })
    //     }
    // }


    const _renderInterviewItem = ({item,index}) => {
        return (
            <InterviewItem 
                item={item}
                index={index}
                type={'Upcoming'}
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
                parentStyle={{position: 'absolute',top:64,alignSelf:'center'}}
            />
        )
    }


    // const viewMoreView = () => {
    //     return (
    //         <RequestMoreItemsView 
    //             title='View More'
    //             onPress={() => {
    //                 dispatch(setBottomTab('Jobs'))
    //                 props.navigation.navigate('Jobs')
                    
    //             }}
    //         />
    //     )
    // }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasSearchBar
            hasProfileIcon
            // hasMenu
            headerTitle='TODOS'
            navigation={props.navigation}
            hasNotification
            hasFaq
        >
        <View
            style={{flex:1}}
        >
        <TodosNavView 
            selectedIndex={selectedIndex}
            onUpdateIndex={_onUpdateIndex}
            parent={{paddingTop:12}}
        />
        <ScrollView
            contentContainerStyle={{paddingBottom:24}}
            refreshControl={
                <RefreshControl 
                    refreshing={isRefreshing}
                    onRefresh={() => _getAllTodos()}
                />
            }
            style={{flex:1}}
        >
            

            {/* {
                (selectedIndex === 0 || selectedIndex === 1)
                &&
                <FlatList 
                    data={todosRTRList}
                    renderItem={_renderRTRItem}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            onRefresh={() => _getAllTodos()}
                        />
                    }
                    contentContainerStyle={{paddingBottom:16}}
                />
            }
            
            {
                (selectedIndex === 0 || selectedIndex === 2)
                &&
                <FlatList 
                    data={todosAssessmentsList}
                    renderItem={_renderAssessmentItem}
                    refreshControl={
                        <RefreshControl 
                            refreshing={selectedIndex === 2 ? isRefreshing : false}
                            onRefresh={() => _getAllTodos()}
                        />
                    }
                    contentContainerStyle={{paddingBottom:16}}
                />
            }

            {
                (selectedIndex === 0 || selectedIndex === 3)
                &&
                <FlatList 
                    data={todosInterviewList}
                    renderItem={_renderInterviewItem}
                    refreshControl={
                        <RefreshControl 
                            refreshing={selectedIndex === 3 ? isRefreshing : false}
                            onRefresh={() => _getAllTodos()}
                        />
                    }
                    contentContainerStyle={{paddingBottom:16}}
                />
            } */}
            {
                (selectedIndex === 0 || selectedIndex === 1)
                &&
                todosRTRList.map((item,index) => _renderRTRItem({item,index}))
            }
            
            {
                (selectedIndex === 0 || selectedIndex === 2)
                &&
                todosAssessmentsList.map((item,index) => _renderAssessmentItem({item,index}))
            }

            {
                (selectedIndex === 0 || selectedIndex === 3)
                &&
                todosInterviewList.map((item,index) => _renderInterviewItem({item,index}))
            }

            {
                selectedIndex === 0 && 
                (allLength < 1  && !isRefreshing) && noJobsView('No Todos Found.')
            }

            {
                selectedIndex === 1 && 
                (todosRTRList < 1  && !isRefreshing) && noJobsView('No Approval History Found.')
            }

            {
                selectedIndex === 2 && 
                (todosAssessmentsList < 1 && !isRefreshing) && noJobsView('No Assessments Found.')
            }

            {
                selectedIndex === 3 && 
                (todosInterviewList < 1 && !isRefreshing) && noJobsView('No Interviews Applied.')
            }

        </ScrollView>
        </View>
        </BaseView>
    )
}

export default Todos

const styles = StyleSheet.create({})
