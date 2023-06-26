import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAppliedJobs, getMatchedJobs, getRTRJobs, setAppliedJobsList, setBottomTab, 
    setFavJobsList, setMatchedJobsList, setRTRList } from '../../../../redux/actions/homeActions'
import NoDataView from '../../../components/NoDataView'
import JobItem from '../../../items/JobItem'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'

const MyJobsView = props => {

    const dispatch = useDispatch()
    
    const matchedJobsList = useSelector(state => state.home.matchedJobsList);

    const _matchedJobsList = matchedJobsList.length > 2 ? matchedJobsList.slice(0,5) : matchedJobsList;
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


    const _renderJobItem = (item,index) => {
        return (
            <JobItem 
                item={item}
                index={index}
                // hasButtons
                isMatchedJob={selectedIndex === 0}
                isFavouritedJob={selectedIndex === 1}
                onPress={() => props.navigation.navigate('JobDetail', {'detail' : item,'type' : 'NotApplied'})}
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
          
            {
                isRefreshing
                &&
                <ActivityIndicator 
                    size='small'
                    style={{marginTop:12}}
                />
            }
            

            {
                selectedIndex === 0 &&
                _matchedJobsList.map((item,index) => _renderJobItem(item,index))
            }


            {
                selectedIndex === 0 && 
                (_matchedJobsList < 1
                ?
                !isRefreshing && noJobsView('No Matched Jobs Found.')
                :
                viewMoreView())
            }

        </View>

            
    )
}

export default MyJobsView
