import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../../values/colors'
import ButtonView from '../../../../components/ButtonView'

const JobDetailBottomView = props => {

    const {hasFavIcon, hasShareIcon, style, onShare, onFav, onDiscard, onApply} = props;

    return (
        <View style={[styles.parent,style]}>
            
            <TouchableOpacity 
                style={{marginRight:12}}
                onPress={onShare}
            >
            <View style={styles.iconView}>
                <Icon 
                    name='share-variant'
                    type='material-community'
                    size={20}
                />
            </View>
            </TouchableOpacity>
        
            <TouchableOpacity 
                style={{marginRight:12}}
                onPress={onFav}
            >
            <View style={styles.iconView}>
                <Icon 
                    name={props.isFavoriteJob ? 'heart' : 'heart-outline'}
                    type='material-community'
                    size={20}
                />
            </View>
            </TouchableOpacity>
           
            <ButtonView 
                title={'Discard'}
                titleStyle={{color:colors.acceptBtn}}
                containerStyle={{marginTop:0,flex:1,marginRight:8}}
                buttonStyle={{paddingVertical:0,borderRadius:4,borderColor:colors.acceptBtn}}
                onPress={onDiscard}
                size='medium'
                outline
            />
             <ButtonView 
                title={'Apply'}
                containerStyle={{marginTop:0,flex:1,}}
                buttonStyle={{paddingVertical:0,backgroundColor:colors.acceptBtn,borderRadius:4,borderColor:colors.acceptBtn}}
                onPress={onApply}
                size='medium'
            />
        </View>
    )
}

export default JobDetailBottomView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:12,
        paddingVertical:0,
        paddingHorizontal:12
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
