

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fonts } from '../../../../../values/fonts'

const JobTypeItem = props => {
    return (
        <View style={[styles.jobTypeView,props.parentStyle]}>
            <Text style={styles.jobTypeText}>{props.name}</Text>
        </View>
    )
}

export default JobTypeItem

const styles = StyleSheet.create({
    jobTypeView : {
        height:32,
        borderWidth:1,
        borderColor:'#EDEDED',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
        paddingHorizontal:16,
        marginRight:12
        
    },
    jobTypeText : {
        color:'#1B1B1B',
        fontFamily:fonts.notoSansMedium,
        fontSize:12,
        textTransform:'capitalize'
    },
})
