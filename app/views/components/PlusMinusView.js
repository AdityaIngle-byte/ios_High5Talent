import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts } from '../../values/fonts'

const PlusMinusView = props => {
    return (
        <View style={styles.parent}>
            <TouchableOpacity 
                style={styles.view}
                onPress={props.onMinus}
            >
                <Text style={styles.title}>-</Text>
            </TouchableOpacity>
            <View style={styles.titleView}>
                <Text style={styles.title}>{props.value}</Text>
            </View>
            <TouchableOpacity 
                style={styles.view}
                onPress={props.onPlus}
            >
                <Text style={styles.title}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PlusMinusView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        height:32,
        borderWidth:1,
        borderColor:'#c4c4c4',
        borderRadius:4
    },
    view : {
        height:32,
        width:32,
        alignItems:'center',
        justifyContent:'center'
    },
    titleView : {
        height:30,
        width:48,
        alignItems:'center',
        justifyContent:'center',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderLeftColor:'#c4c4c4',
        borderRightColor:'#c4c4c4'
    },
    title : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:'#888'
    }
})
