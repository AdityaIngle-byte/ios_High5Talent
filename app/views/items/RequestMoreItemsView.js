import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'

const RequestMoreItemsView = props => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={props.style}
        >
        <View style={[styles.parent,props.parentStyle]}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default RequestMoreItemsView

const styles = StyleSheet.create({
    parent : {
        height:32,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems:'center',
        marginTop:16,marginHorizontal:16
    },
    text : {
        fontSize:12,
        fontWeight:'700',
        fontFamily:fonts.notoSansRegular,
        color:colors.primary
    }
})
