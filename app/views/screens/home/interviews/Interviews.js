import React, { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getInterviewsList, setInterviewsList } from '../../../../redux/actions/homeActions'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import InterviewItem from '../../../items/InterviewItem'
import InterviewsNavView from '../../../items/InterviewsNavView'

const Interviews = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()

    const interviewsList = useSelector(state => state.home.interviewsList)

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

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
    }

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
                onTryAgain={() => _getInterviews()}
            />
        )
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasLogout
            headerTitle='INTERVIEWS'
            navigation={props.navigation}
            hasNotification
            hasFaq
           
        >
        <View style={styles.parent}>
            {/* <Text style={styles.title}>Upcoming Interviews</Text> */}
            <InterviewsNavView 
                selectedIndex={selectedIndex}
                onUpdateIndex={_onUpdateIndex}
            />
            <FlatList 
                data={interviewsList}
                renderItem={_renderInterviewItem}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={() => _getInterviews()}
                    />
                }
            />

            {
                interviewsList.length < 1 && !isRefreshing
                &&
                noJobsView('No upcoming interviews.')
            }

        </View>
        </BaseView>
    )
}

export default Interviews

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingTop:16
    },
    title : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:colors.defaultTextColor,
        paddingHorizontal:16,
        paddingTop:16
    }
})
