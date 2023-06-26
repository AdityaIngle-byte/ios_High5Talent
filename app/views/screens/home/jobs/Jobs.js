import React, { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAppliedJobs, getMatchedJobs, getRTRJobs, setAppliedJobsList, setFavJobsList, setMatchedJobsList, setRTRList } from '../../../../redux/actions/homeActions'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import AppliedJobItem from '../../../items/AppliedJobItem'
import JobItem from '../../../items/JobItem'
import MyJobsNavView from '../../../items/MyJobsNavView'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'
import RTRItem from '../../../items/RTRItem'

const Jobs = props => {

    const baseViewRef = useRef(null)


    const dispatch = useDispatch()

    const matchedJobsList = useSelector(state => state.home.matchedJobsList);
    const favouritedJobsList = useSelector(state => state.home.favouritedJobsList)
    const rtrJobsList = useSelector(state => state.home.rtrJobsList)
    const appliedJobsList = useSelector(state => state.home.appliedJobsList)

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false)
    
    useEffect(() => {
        // _getMatchedJobsList()
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            _getMatchedJobsList()
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {
            unsubscribe();
        }
    }, [])
   
    const _onUpdateIndex = index => {
        setSelectedIndex(index)
        if(index === 0){
            // if(matchedJobsList.length<1){
                _getMatchedJobsList()
            // }
        }else if(index === 1){
            if(favouritedJobsList.length<1){
                _getMatchedJobsList()
            }
        }else if(index === 2){
            // if(rtrJobsList.length<1){
                _getRTRList()
            // }
        }else if(index === 3){
            // if(appliedJobsList.length<1){
                // _getAppliedJobsList()
                _getMatchedJobsList()
            // }
        }
    }

    const _getMatchedJobsList = () => {
        setIsRefreshing(true)
        getMatchedJobs()
            .then(response => {
                setIsRefreshing(false)
                console.log('[Jobs.js] MatchedJob List: ',response)
                let appliedJobIds = []
                if(appliedJobsList.length > 0) {
                    appliedJobIds=appliedJobsList.map(i => i.jobId)
                }
                if(response.length > 0){
                    const jobStatusCodes = [ "37" ]
                    // const matchedJobs = response.filter(job => (!appliedJobIds.includes(job.jobId)) && (!jobStatusCodes.includes(job.jobStatus)) && (!job.favorited))
                    // const favouritedJobs = response.filter(job => (!appliedJobIds.includes(job.jobId)) && (!jobStatusCodes.includes(job.jobStatus)) && job.favorited)
                    const matchedJobs = response.filter(job => (job.status !== "Applied" && !job.favorited))
                    const favouritedJobs = response.filter(job => job.favorited)
                    const appliedJobs = response.filter(job => job.status === 'Applied')
                    dispatch(setMatchedJobsList(matchedJobs))
                    dispatch(setFavJobsList(favouritedJobs))
                    dispatch(setAppliedJobsList(appliedJobs))
                }
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[Jobs.js] MatchedJob List Error: ',error)
            })
    }


    const _getRTRList = () => {
        setIsRefreshing(true)
        getRTRJobs()
            .then(response => {
                setIsRefreshing(false)
                console.log('[Jobs.js] RTR List: ',response)
                dispatch(setRTRList(response))
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[Jobs.js] RTR List Error: ',error)
            })
    }



    // const _getAppliedJobsList = () => {
    //     setIsRefreshing(true)
    //     getAppliedJobs()
    //         .then(response => {
    //             setIsRefreshing(false)
    //             console.log('[Jobs.js] Applied List: ',response)
    //             dispatch(setAppliedJobsList(response))
    //         })
    //         .catch(error => {
    //             setIsRefreshing(false)
    //             console.log('[Jobs.js] Applied List Error: ',error)
    //         })
    // }


    const _renderJobItem = ({item,index}) => {
        return (
            <JobItem 
                item={item}
                index={index}
                isMatchedJob={selectedIndex === 0}
                isFavouritedJob={selectedIndex === 1}
                onPress={() => props.navigation.navigate('JobDetail', {'detail' : item,'type' : 'NotApplied'})}
            />
        )
    }

    const _renderRTRItem = ({item,index}) => {
        return (
            <RTRItem 
                item={item}
                index={index}
                hasStatusView
                onPress={() => props.navigation.navigate('RTRDetail', {'detail' : item})}
            />
        )
    }


    const _renderAppliedJobItem = ({item,index}) => {
        return (
            <AppliedJobItem 
                item={item}
                index={index}
                onPress={() => props.navigation.navigate('JobDetail', {'detail' : item,'type' : 'Applied'})}
            />
        )
    }

    const noJobsView = (msg) => {
        return (
            <NoDataView 
                hasImage
                msg={msg}
                parentStyle={{position: 'absolute',top:64,alignSelf:'center'}}
                hasTryAgain
                onTryAgain={() => _onUpdateIndex(selectedIndex)}
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
            // hasMenu
            // hasLogout
            hasProfileIcon
            headerTitle='JOBS'
            navigation={props.navigation}
            hasNotification
            hasFaq
            headerParentStyle={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}
        >
        <View style={styles.parent}>
            <MyJobsNavView 
                selectedIndex={selectedIndex}
                onUpdateIndex={_onUpdateIndex}
            />

                {
                    selectedIndex === 0 &&
                    <FlatList 
                        data={matchedJobsList}
                        renderItem={_renderJobItem}
                        refreshControl={
                            <RefreshControl 
                                refreshing={isRefreshing}
                                onRefresh={() => _getMatchedJobsList()}
                            />
                        }
                        contentContainerStyle={{paddingBottom:16}}
                    />
                }


                {
                    selectedIndex === 1 &&
                    <FlatList 
                        data={favouritedJobsList}
                        renderItem={_renderJobItem}
                        refreshControl={
                            <RefreshControl 
                                refreshing={isRefreshing}
                                onRefresh={() => _getMatchedJobsList()}
                            />
                        }
                        contentContainerStyle={{paddingBottom:16}}
                    />
                }


                {
                    selectedIndex === 2 &&
                    <FlatList 
                        data={rtrJobsList}
                        renderItem={_renderRTRItem}
                        refreshControl={
                            <RefreshControl 
                                refreshing={isRefreshing}
                                onRefresh={() => _getRTRList()}
                            />
                        }
                        contentContainerStyle={{paddingBottom:16}}
                    />
                }

                {
                    selectedIndex === 3 &&
                    <FlatList 
                        data={appliedJobsList}
                        renderItem={_renderAppliedJobItem}
                        refreshControl={
                            <RefreshControl 
                                refreshing={isRefreshing}
                                onRefresh={() => _getRTRList()}
                            />
                        }
                        contentContainerStyle={{paddingBottom:16}}
                    />
                }

                {
                selectedIndex === 0 && 
                (matchedJobsList < 1
                    &&
                !isRefreshing && noJobsView('No Matched Jobs Found.'))
            }

            {
                selectedIndex === 1 && 
                (
                favouritedJobsList < 1 
                &&
                !isRefreshing && noJobsView('No Favorited Jobs Found.'))
            }

            {
                selectedIndex === 2 && 
                (rtrJobsList < 1
                    &&
                !isRefreshing && noJobsView('No Approval History Found.'))
            }

            {
                selectedIndex === 3 && 
                (appliedJobsList < 1
                    &&
                !isRefreshing && noJobsView('No Jobs Applied.'))
            }


        </View>
        </BaseView>
    )
}

export default Jobs

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingTop:12
    }
})
