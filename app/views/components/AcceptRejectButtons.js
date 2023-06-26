import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import ButtonView from './ButtonView'
import TagButton from './TagButton'

const AcceptRejectButtons = props => {
    return (
        <View style={styles.parent}>
            <TagButton 
                title={props.acceptButtonText ? props.acceptButtonText : 'Accept'}
                buttonStyle={styles.acceptButtonStyle}
                containerStyle={{marginRight:8,marginTop:8}}
                titleStyle={{color:'#fff'}}
                size='medium'
                onPress={props.onAccept}
            />
            <TagButton 
                title={'Reject'}
                buttonStyle={{paddingHorizontal:20,borderColor:colors.acceptBtn}}
                containerStyle={{marginRight:8,marginTop:8}}
                size='medium'
                titleStyle={{color:colors.acceptBtn}}
                onPress={props.onReject}
            />
        </View>
    )
}

export default AcceptRejectButtons

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        borderTopWidth:0.5,
        borderTopColor:colors.borderColor,
        marginTop:8
    },
    
    acceptButtonStyle : {
        paddingHorizontal:20,
        borderColor:colors.acceptBtn,
        backgroundColor:colors.acceptBtn
    }
})
