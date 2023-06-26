
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../../values/colors';

const Indicators = props => {

    const {list,selectedIndex} = props;

    const renderItem = ({item,index}) => {
        if (selectedIndex === index ){
            return <View style={styles.selectedIndex}/>
        }else {
            return <View style={styles.index}/>
        }
    }

    return (
        <View style={styles.parent}>
            <FlatList 
                data={list}
                renderItem={renderItem}
                horizontal
            />
        </View>
    )
}

export default Indicators

const styles = StyleSheet.create({
    parent:{
        alignItems: 'center',
        marginTop:24
    },
    selectedIndex : {
        height:8,
        width:16,
        borderRadius:8,
        backgroundColor:colors.primary,
        marginRight:8
    },
    index : { 
        height:8,
        width:8,
        borderRadius:4,
        backgroundColor:colors.primary,
        marginRight:8
    }
})
