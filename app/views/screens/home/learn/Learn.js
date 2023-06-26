import React, { useEffect, useRef, useState } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getCoursesByUserId, getTovutiIdFromIndex, getTovutiUsers, setLearnCoursesList, setTovutiUserId } from '../../../../redux/actions/homeActions'
import { getProfileDetail } from '../../../../redux/actions/profileActions'
import { saveTovutiUser } from '../../../../utils/UserPrefs'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import LearningItem from '../../../items/LearningItem'
import LearningNavView from '../../../items/LearningNavView'
import { openUrl } from '../../common/InAppBrowser'

const Learn = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()

    const tovutiUserId = useSelector(state => state.home.tovutiUserId)
    // const personalProfile = useSelector(state => state.profile.profilePersonalInfo)
    const learnCoursesList = useSelector(state => state.home.learnCoursesList)

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [list, setList] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)


    useEffect(() => {
        init()
      return () => {
        
      };
    }, [])


    const init = async() => {

        if(tovutiUserId === null){
            _getTovutiUserId()
        }else {
            setIsRefreshing(true)
            _getUserCourses(tovutiUserId)
        }
    }


    const _getTovutiUserId = () => {
        setIsRefreshing(true)
        // getProfileDetail()
        //     .then(response => {
        //         // setIsRefreshing(false)
        //         console.log('[Learn.js] Get Tovuti Id : ',response)
        //         dispatch(setTovutiUserId(response.tovutiUserId))
        //         _getUserCourses(response.tovutiUserId)
        //         saveTovutiUser(response.tovutiUserId)
        //     })
        //     .catch(error => {
        //         setIsRefreshing(false)
        //         console.log('[Learn.js] Get Learn Courses : ',error)
        //     })
        getTovutiIdFromIndex()
            .then(response => {
                console.log('[Learn.js] Get Tovuti Id : ',response)
                dispatch(setTovutiUserId(response.id))
                _getUserCourses(response.id)
                saveTovutiUser(response.id)
            })
            .catch(error => {
                console.log('[Learn.js] Get Tovuti Id : ',response)
            })
    }

    const _getUserCourses = (id) => {
        
        const _data = {
            userId : id
        }
        
        getCoursesByUserId(_data)
            .then(response => {
                console.log('[Learn.js] Courses : ',response)
                dispatch(setLearnCoursesList(response))
                setTimeout(() => {
                    setIsRefreshing(false)
                    _onUpdateIndex(selectedIndex)
                }, 500);
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[Learn.js] Courses : ',error)
            })
    }


    const _onUpdateIndex = index => {
        setSelectedIndex(index)

        let coursesList = []

        if(index === 0){
            coursesList = learnCoursesList.filter(it => it.PercentComplete !== 0 && it.PercentComplete !== 100)
        }else if(index === 1){
            coursesList = learnCoursesList.filter(it => it.PercentComplete === 0)
        }else if(index === 2){
            coursesList = learnCoursesList.filter(it => it.PercentComplete === 100)
        }

        setList(coursesList)

    }


    const _renderItem = ({item,index}) => {
        return (
            <LearningItem 
                item={item}
                index={index}
                onStart={() => _onLearnItemPress(item)}
                onResume={() => _onLearnItemPress(item)}
                onGetCertificate={() => props.navigation.navigate('ViewCertificate',{'item' : item})}
            />
        )
    }

    const _onLearnItemPress = item => {
        // props.navigation.navigate('WebView',{
        //     'url' : item.CourseUrl,
        //     'title' : `${item.CourseName}`
        // })
        openUrl(item.CourseUrl)
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            // hasMenu
            hasLogout
            headerTitle='LEARN'
            navigation={props.navigation}
            hasNotification
        >
        <LearningNavView 
            selectedIndex={selectedIndex}
            onUpdateIndex={index =>_onUpdateIndex(index)}
        />
        <View style={styles.parent}>
            <FlatList 
                data={list}
                renderItem={_renderItem}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={() => init()}
                    />
                }
            />

            {
                list.length < 1 && !isRefreshing
                &&
                <NoDataView 
                    hasImage
                    msg={'No Course Found'}
                    parentStyle={{position:'absolute',top:64,alignSelf:'center'}}
                />
            }
        </View>
        </BaseView>
    )
}

export default Learn

const styles = StyleSheet.create({
    parent : {
        flex:1
    }
})
