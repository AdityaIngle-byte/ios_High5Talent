import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getInterviewsList, setBottomTab, setInterviewsList } from '../../../../redux/actions/homeActions'
import NoDataView from '../../../components/NoDataView'
import InterviewItem from '../../../items/InterviewItem'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'

const InterviewsView = props => {

    const dispatch = useDispatch()

    const interviewsList = useSelector(state => state.home.interviewsList)
    const _interviewsList = interviewsList.length > 2 ? interviewsList.slice(0,2) : interviewsList;

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)


    useEffect(() => {
        _getInterviews()
        return () => {
        }
    }, [])

    const _getInterviews = () => {
        setIsRefreshing(true)
        getInterviewsList()
            .then(response => {
                setIsRefreshing(false)
                console.log('[InterviewsView.js] getInterviewsList: ',response)
                dispatch(setInterviewsList(response))
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[InterviewsView.js] : ',error)
            })
    }

    
    const _onUpdateIndex = index => {
        setSelectedIndex(index)
        if(index === 0){
        }else if(index === 1){
        }
    }

    const _renderInterviewItem = (item,index) => {
        return (
            <InterviewItem 
                item={item}
                index={index}
            />
        )
    }

    const noJobsView = (msg) => {
        return (
            <NoDataView 
                hasImage
                msg={msg}
                hasTryAgain
                onTryAgain={() => _getInterviews()}
            />
        )
    }


    const viewMoreView = () => {
        return (
            <RequestMoreItemsView 
                title='View More'
                onPress={() => {
                    dispatch(setBottomTab('Interviews'))
                    props.navigation.navigate('Interviews')
                }}
                
            />
        )
    }


    return (
        
        <View>
            {/* <InterviewsNavView 
                selectedIndex={selectedIndex}
                onUpdateIndex={_onUpdateIndex}
            /> */}

            {
                isRefreshing
                &&
                <ActivityIndicator 
                    size='small'
                    style={{marginTop:12}}
                />
            }
            {_interviewsList.map((item,index) => _renderInterviewItem(item,index))}

            

            {
                _interviewsList < 1
                ?
                !isRefreshing && noJobsView('No upcoming interviews.')
                :
                viewMoreView()
            }

            

           
        </View>

            
    )
}

export default InterviewsView
