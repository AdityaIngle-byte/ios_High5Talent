import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../../values/colors'
import ButtonView from '../../../../components/ButtonView'

const RTRDetailBottomIcons = props => {

    const {style, onReject, onAccept} = props;

    return (
        <View style={[styles.parent,style]}>
            
            <ButtonView 
                title={'Reject'}
                titleStyle={{color:colors.acceptBtn}}
                containerStyle={{marginTop:0,flex:1,marginRight:8}}
                buttonStyle={{paddingVertical:0,borderRadius:4,borderColor:colors.acceptBtn}}
                onPress={onReject}
                size='medium'
                outline
            />
             <ButtonView 
                title={'Approve'}
                containerStyle={{marginTop:0,flex:1,marginLeft:8}}
                buttonStyle={{paddingVertical:0,backgroundColor:colors.acceptBtn,borderRadius:4,borderColor:colors.acceptBtn}}
                onPress={onAccept}
                size='medium'
            />
        </View>
    )
}

export default RTRDetailBottomIcons

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:12,
        paddingVertical:0,
        paddingHorizontal:16
    },
    iconView : {
        height:32,
        width:32,
        borderRadius:16,
        backgroundColor: '#EDEDED',
        alignItems:'center',
        justifyContent:'center'
    }
})
