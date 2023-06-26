import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'

const BottomView = props => {
    return (
        <View style={[styles.bottomView,props.parentStyle]}>
            <Text style={[styles.text1,props.text1Style]}>{props.text1}</Text>
            <TouchableOpacity onPress={props.onButtonPress} >
                <Text style={styles.text2}>{props.button1}</Text>
            </TouchableOpacity>
           {/* <View  style={styles.divider}/>

            <TouchableOpacity onPress={props.onGuestLogin} >
                <Text style={styles.text2}>Guest Login</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default BottomView

const styles = StyleSheet.create({
    bottomView : {
        // position: 'absolute',
        // bottom:0, left:0, right:0,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:64,
        backgroundColor:'#fff',
        paddingBottom:16
    },
    divider : {
        height:20,
        width:2,
        backgroundColor:'#e0e0e0',
        marginHorizontal:16

    },
    // text1 : {
    //     fontSize:14,
    //     color:'#1B1B1B',
    //     fontFamily:fonts.notoSansRegular
    // },
    text2 : {
        fontSize:18,
        color:colors.primary,
        fontFamily:fonts.notoSansBold
    },
})
