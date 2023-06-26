import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { showAlert } from '../../../utils/Message'
import { colors } from '../../../values/colors'
import { fonts } from '../../../values/fonts'
import ButtonView from '../../components/ButtonView'
import InputView from '../../components/InputView'
import BaseView from '../../hoc/BaseView'
import { openMonjinUrl } from '../common/InAppBrowser'

const InterviewCode = props => {

    const [code, setCode] = useState('UOWFM6')


    const _onContinue = () => {
        if(code === ''){
            showAlert('error','Please enter your 6 digit code.')
            
        }else if(code.length < 6){
            showAlert('error','Please enter valid 6 digit code.')
        }else {
            // showAlert('success','Ready for Interview Assessment')
            // props.navigation.navigate('MonjinHome',{'code' : code})
            openMonjinUrl(code)
        }
    }


    return (
        <BaseView
            hasStatusBar
            statusBarColor={'#fff'}
        >
        <View style={styles.parent}>
            <Text style={[styles.msg,{fontSize:20}]}>Welcome!</Text>
            <Text style={[styles.msg,{color:'#000'}]}>If You have received an invite, return to the invite and click the link that was included in the email.</Text>
            <Text style={[styles.msg,{color:'#000',marginTop:12}]}>Or, You may enter the interview code:</Text>

            {/* <TextInput 
                value={code}
                onChangeText={text => setCode(text)}
                style={styles.textInput}
                placeholder={'Interview Code'}
                placeholderTextColor={'#88888833'}
                maxLength={6}
            />  */}
            <InputView 
                style={{flex:1}}
                parentStyle={{borderWidth:0}}
                textInputStyle={styles.textInput}
                placeholder={'Interview Code'}
                value={code.toUpperCase()}
                onChangeText={text => setCode(text)}
                maxLength={6}
            />
            
        </View>
        <View style={styles.bottomView}>
            {/* <TouchableOpacity 
                style={{flexWrap:'wrap'}}
            >
            <View style={{borderBottomWidth:1,borderBottomColor:'#fff',}}>
                <Text style={styles.msg}>Don't know what's interview code?</Text>
            </View>
            </TouchableOpacity> */}
            <ButtonView 
                title='Continue'
                containerStyle={styles.buttonContainer}
                // buttonStyle={{borderRadius:0,height:64}}
                // titleStyle={{paddingBottom:8}}
                onPress={() => _onContinue()}
            />
            <Text style={[styles.msg,{marginTop:24}]}>Instructions: </Text>
            <Text style={styles.msg}>Lorem Ipsum</Text>
        </View>
        </BaseView>
    )
}

export default InterviewCode

const styles = StyleSheet.create({
    parent : {
        flex:1,
        backgroundColor:'#fff',
        // paddingTop:24,
        // paddingHorizontal:24,
    },
    // cancelIcon: {
    //     padding:16,
    //     position:'absolute',
    //     right:0,top:0
    // },
    msg : {
        color:colors.accent,
        fontSize:14,
        fontFamily:fonts.notoSansMedium,
        // marginTop:24
    },
    textInput : {
        // color:'#fff',
        fontSize:36,
        fontFamily:fonts.notoSansMedium,
        marginTop:8,
        borderBottomWidth:1,
        borderBottomColor:'#88888833',
        paddingLeft:4,
        paddingVertical:0,
        marginVertical:0,
        height:72
        
    },
    buttonContainer : {
        // marginTop:16,
        // height:64,
        
    },
    bottomView : {
        // backgroundColor: colors.accent,
        marginTop:16
    }
})
