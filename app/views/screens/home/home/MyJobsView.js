import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View,ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAppliedJobs, getMatchedJobs, getRTRJobs, setAppliedJobsList, setBottomTab, 
        setFavJobsList, setMatchedJobsList, setRTRList } from '../../../../redux/actions/homeActions'
import NoDataView from '../../../components/NoDataView'
import AppliedJobItem from '../../../items/AppliedJobItem'
import JobItem from '../../../items/JobItem'
import MyJobsNavView from '../../../items/MyJobsNavView'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'
import RTRItem from '../../../items/RTRItem'

const MyJobsView = props => {

    const dispatch = useDispatch()
    
    const matchedJobsList = useSelector(state => state.home.matchedJobsList);
    const favouritedJobsList = useSelector(state => state.home.favouritedJobsList)
    const rtrJobsList = useSelector(state => state.home.rtrJobsList)
    const appliedJobsList = useSelector(state => state.home.appliedJobsList)


    const _matchedJobsList = matchedJobsList.length > 2 ? matchedJobsList.slice(0,5) : matchedJobsList;
    const _favouritedJobsList = favouritedJobsList.length > 2 ? favouritedJobsList.slice(0,5) : favouritedJobsList;
    const _rtrJobsList = rtrJobsList.length > 2 ? rtrJobsList.slice(0,5) : rtrJobsList;
    const _appliedJobsList = appliedJobsList.length > 2 ? appliedJobsList.slice(0,5) : appliedJobsList;

    // console.log('[MyJobsView.js] _appliedJobsList : ',_appliedJobsList)

    const [selectedIndex, setSelectedIndex] = useState(0)
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
            // }
            _getMatchedJobsList()
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
                    // const jobStatusCodes = [ "37" ]
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
                console.log('[MyJobsView.js] MatchedJob List Error: ',error)
            })
    }


    const _getRTRList = () => {
        setIsRefreshing(true)
        getRTRJobs()
            .then(response => {
                setIsRefreshing(false)
                console.log('[MyJobsView.js] RTR List: ',response)
                dispatch(setRTRList(response))
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[MyJobsView.js] RTR List Error: ',error)
            })
    }


    // const _getFavJobsList = () => {
    //     setIsRefreshing(true)
    //     getRTRJobs()
    //         .then(response => {
    //             setIsRefreshing(false)
    //             console.log('[MyJobsView.js] RTR List: ',response)
    //             dispatch(setRTRList(response.value))
    //         })
    //         .catch(error => {
    //             setIsRefreshing(false)
    //             console.log('[MyJobsView.js] RTR List Error: ',error)
    //         })
    // }


    // const _getAppliedJobsList = () => {
    //     setIsRefreshing(true)
    //     getAppliedJobs()
    //         .then(response => {
    //             setIsRefreshing(false)
    //             console.log('[MyJobsView.js] Applied List: ',response)
    //             dispatch(setAppliedJobsList(response))
    //         })
    //         .catch(error => {
    //             setIsRefreshing(false)
    //             console.log('[MyJobsView.js] Applied List Error: ',error)
    //         })
    // }



    const _renderJobItem = (item,index) => {
        return (
            <JobItem 
                item={item}
                index={index}
                fromHome={props.fromHome}
                // hasButtons
                isMatchedJob={selectedIndex === 0}
                isFavouritedJob={selectedIndex === 1}
                onPress={() => props.navigation.navigate('JobDetail', {'detail' : item,'type' : 'NotApplied'})}
            />
        )
    }


    const _renderRTRItem = (item,index) => {
        return (
            <RTRItem 
                item={item}
                index={index}
                hasStatusView
                fromHome={props.fromHome}
                onPress={() => props.navigation.navigate('RTRDetail', {'detail' : item})}
            />
        )
    }

    const _renderAppliedJobItem = (item,index) => {
        return (
            <AppliedJobItem 
                item={item}
                index={index}
                {...props}
                onPress={() => props.navigation.navigate('JobDetail', {'detail' : item,'type' : 'Applied'})}
                fromHome={props.fromHome}
                // hasButtons
                // isMatchedJob={selectedIndex === 0}
                // onPress={() => props.navigation.navigate('AppliedJobDetail', {'detail' : item})}
            />
        )
    }


    const noJobsView = (msg) => {
        return (
            <NoDataView 
                hasImage
                msg={msg}
                hasTryAgain
                onTryAgain={() => _onUpdateIndex(selectedIndex)}
            />
        )
    }


    const viewMoreView = () => {
        return (
            <RequestMoreItemsView 
                title='View More'
                onPress={() => {
                    dispatch(setBottomTab('Jobs'))
                    props.navigation.navigate('Jobs')
                }}
                
            />
        )
    }


    return (
        
        <View>
            <MyJobsNavView 
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
            
            <ScrollView horizontal={props.fromHome===true?true:false}>
            {
                selectedIndex === 0 &&
                _matchedJobsList.map((item,index) => _renderJobItem(item,index))
            }

            {
                selectedIndex === 1 &&
                _favouritedJobsList.map((item,index) => _renderJobItem(item,index))
            }

            {
                selectedIndex === 2 &&
                _rtrJobsList.map((item,index) => _renderRTRItem(item,index))
            }


            {
                selectedIndex === 3 &&
                _appliedJobsList.map((item,index) => _renderAppliedJobItem(item,index))
            }
            </ScrollView>
            

            {
                selectedIndex === 0 && 
                (_matchedJobsList < 1
                ?
                !isRefreshing && noJobsView('No Matched Jobs Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 1 && 
                (
                _favouritedJobsList < 1 
                ?
                !isRefreshing && noJobsView('No Favorited Jobs Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 2 && 
                (_rtrJobsList < 1
                ?
                !isRefreshing && noJobsView('No Approval History Found.')
                :
                viewMoreView())
            }

            {
                selectedIndex === 3 && 
                (_appliedJobsList < 1
                ?
                !isRefreshing && noJobsView('No Jobs Applied.')
                :
                viewMoreView())
            }

           
        </View>

            
    )
}

export default MyJobsView
