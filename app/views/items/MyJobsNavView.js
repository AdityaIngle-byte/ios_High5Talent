import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { NAV_TAG_SIZE } from '../../values/strings';
import TagButton from '../components/TagButton';



const MyJobsNavView = props => {

    const {selectedIndex, onUpdateIndex} = props;

    const matchedJobsList = useSelector(state => state.home.matchedJobsList);
    const favouritedJobsList = useSelector(state => state.home.favouritedJobsList)
    const rtrJobsList = useSelector(state => state.home.rtrJobsList)
    const appliedJobsList = useSelector(state => state.home.appliedJobsList)

    return (
        <View style={styles.parent}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
            <TagButton 
                title={`Matched (${matchedJobsList.length})`}
                onPress={() => onUpdateIndex(0)}
                isSelected={selectedIndex===0}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Favorited (${favouritedJobsList.length})`}
                onPress={() => onUpdateIndex(1)}
                isSelected={selectedIndex===1}
                hasNotifications={false}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Approval History (${rtrJobsList.length})`}
                onPress={() => onUpdateIndex(2)}
                isSelected={selectedIndex===2}
                hasNotifications={true}
                containerStyle={{marginTop:0}}
                size={NAV_TAG_SIZE}
            />
            <TagButton 
                title={`Applied (${appliedJobsList.length})`}
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

export default MyJobsNavView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        marginLeft:16
    }
})
