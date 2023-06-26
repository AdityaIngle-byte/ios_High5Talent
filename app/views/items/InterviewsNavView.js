import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TagButton from '../components/TagButton';

const InterviewsNavView = props => {

    const {selectedIndex, onUpdateIndex} = props;

    return (
        <View style={styles.parent}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
            <TagButton 
                title='All'
                onPress={() => onUpdateIndex(0)}
                isSelected={selectedIndex===0}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
            />
            <TagButton 
                title='Upcoming'
                onPress={() => onUpdateIndex(1)}
                isSelected={selectedIndex===1}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
            />
           </ScrollView>
        </View>
    )
}

export default InterviewsNavView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        marginLeft:16
    }
})
