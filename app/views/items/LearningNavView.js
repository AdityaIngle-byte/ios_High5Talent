import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TagButton from '../components/TagButton';

const LearningNavView = props => {

    const {selectedIndex, onUpdateIndex} = props;

    return (
        <View style={styles.parent}>
            <TagButton 
                title='Active'
                onPress={() => onUpdateIndex(0)}
                isSelected={selectedIndex===0}
                hasNotifications={false}
            />
            <TagButton 
                title='Assigned'
                onPress={() => onUpdateIndex(1)}
                isSelected={selectedIndex===1}
                hasNotifications={false}
            />
            <TagButton 
                title='Completed'
                onPress={() => onUpdateIndex(2)}
                isSelected={selectedIndex===2}
                hasNotifications={false}
            />
        </View>
    )
}

export default LearningNavView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        marginLeft:16
    }
})
