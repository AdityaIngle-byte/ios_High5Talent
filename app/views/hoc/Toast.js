import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../values/colors';
import { SCREEN_WIDTH } from '../../values/dimens';
import { fonts } from '../../values/fonts';
import TagButton from '../components/TagButton';

export const toastConfig = {
   
    success: ({ text1, props }) => (
        <View style={styles.successParent}>
            <Icon 
                name='done'
                type='material'
                color='#fff'
            />
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),
  
    error: ({ text1, props }) => (
        <View style={styles.errorParent}>
            <Icon 
                name='error'
                type='material'
                color='#fff'
                size={20}
            />
            <Text style={styles.text}>{text1}</Text>
        </View>
    ),

    message : ({ text1, props }) => (
        <View style={styles.messageParent}>
            <Text style={[styles.text]}>{text1}</Text>
        </View>
    ),

    confirm: ({ text1, props }) => (
        <View style={styles.confirmParent}>
            <View style={styles.row}>
                <Icon 
                    name='alert'
                    type='foundation'
                    color='#fff'
                    size={24}
                />
                <Text style={[styles.text,{fontSize:14}]}>{text1}</Text>
            </View>
            <View style={[styles.row,{justifyContent:'flex-end'}]}>
                <TagButton 
                    title={props.buttonTitle} 
                    onPress={props.onButtonPress}
                    buttonStyle={{backgroundColor:colors.primary,borderColor:colors.primary}}
                    titleStyle={{color:'#fff'}}
                />
                <TagButton 
                    title={'Cancel'} 
                    onPress={props.onCancel}
                />
            </View>
        </View>
    ),

    choiceConfirm: ({ text1, props }) => (
        <View style={styles.confirmParent}>
            <View style={styles.row}>
                <Icon 
                    name='alert'
                    type='foundation'
                    color='#fff'
                    size={24}
                />
                <Text style={[styles.text,{fontSize:14}]}>{text1}</Text>
            </View>
            <View style={[styles.row,{justifyContent:'flex-end'}]}>
                <TagButton 
                    title={props.buttonTitle} 
                    onPress={props.onButtonPress}
                    buttonStyle={{backgroundColor:colors.primary,borderColor:colors.primary}}
                    titleStyle={{color:'#fff'}}
                />
                <TagButton 
                    title={props.buttonTitle2} 
                    onPress={props.onButtonPress2}
                    buttonStyle={{backgroundColor:colors.primary,borderColor:colors.primary}}
                    titleStyle={{color:'#fff'}}
                />
                <TagButton 
                    title={'Cancel'} 
                    onPress={props.onCancel}
                />
            </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
      successParent : {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'#53A653',
        height:48,
        width:SCREEN_WIDTH-32,
        borderRadius:8,
        paddingHorizontal:16
      },
      errorParent : {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'#ff3333',
        height:48,
        width:SCREEN_WIDTH-32,
        borderRadius:8,
        paddingHorizontal:16,
      },
      messageParent : {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:colors.primary,
        height:48,
        width:SCREEN_WIDTH-32,
        borderRadius:8,
        paddingHorizontal:16
      },
      text : {  
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:'#fff',
        paddingLeft:8
      },
      confirmParent : {
        width:SCREEN_WIDTH-32,
        backgroundColor:colors.accent,
        borderRadius:8,
        paddingHorizontal:16,
        paddingVertical:12
      },
      row : {
        flexDirection:'row',
        alignItems: 'center',
      }
  });