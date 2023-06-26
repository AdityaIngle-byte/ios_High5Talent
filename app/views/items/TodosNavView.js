import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { NAV_TAG_SIZE } from '../../values/strings';
import TagButton from '../components/TagButton';

const TodosNavView = props => {

    const {selectedIndex,onUpdateIndex} = props;

    const todosAssessmentsList = useSelector(state => state.home.todosAssessmentsList)
    const todosInterviewList = useSelector(state => state.home.interviewsList)
    const todosRTRList = useSelector(state => state.home.todosRTRList)

    return (        
    <View style={[styles.parent,props.parent]}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <TagButton 
                title={`ALL (${todosRTRList.length + todosAssessmentsList.length + todosInterviewList.length})`}
                onPress={() => onUpdateIndex(0)}
                isSelected={selectedIndex===0}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Approval History (${todosRTRList.length})`}
                onPress={() => onUpdateIndex(1)}
                isSelected={selectedIndex===1}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Assessments (${todosAssessmentsList.length})`}
                onPress={() => onUpdateIndex(2)}
                isSelected={selectedIndex===2}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Interviews (${todosInterviewList.length})`}
                onPress={() => onUpdateIndex(3)}
                isSelected={selectedIndex===3}
                hasNotifications={true}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
        
        </ScrollView>
        </View>
    )
}

export default TodosNavView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        marginLeft:16
    }
})
