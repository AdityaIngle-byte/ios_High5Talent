import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../../values/colors'
import { fonts } from '../../../../../values/fonts'

const JobDetailTopView = props => {

    const {isPromptedJob,isNewJob,showApplicants,isUrgentHiring} = props;
    let bgColor = 'transparent'

    if(isNewJob) {
        bgColor='#3AB54A'
    }else if(showApplicants){
        bgColor='#EDEDED'
    }else if(isUrgentHiring){
        bgColor='#EDEDED'
    }else if(isPromptedJob){
        bgColor = '#FF5F57'
    }

    return (
        <View style={[styles.parent,{backgroundColor:bgColor}]}>
            <View 
                style={styles.topView}
            />

            {
                isPromptedJob &&
                <View style={[styles.view,{backgroundColor:bgColor}]}>
                    <Text style={styles.text}>PROMOTED</Text>
                </View>
            }

            {
                isNewJob &&
                <View style={[styles.view,{backgroundColor:bgColor}]}>
                    <Text style={styles.text}>PROMOTED</Text>
                </View>
            }

            {
                showApplicants &&
                <View style={[styles.view,{backgroundColor:bgColor}]}>
                    <Text style={[styles.text,{color:colors.accent}]}>20 Applicants</Text>
                </View>
            }
            {
                isUrgentHiring &&
                <View style={[styles.view,{backgroundColor:bgColor,alignItems:'flex-start',paddingLeft:12,height:40}]}>
                    <Text style={[styles.text,{color:colors.primary,textAlign:'left'}]}>🔥 Urgent Hiring</Text>
                </View>
            }
        </View>
    )
}

export default JobDetailTopView

const styles = StyleSheet.create({
    parent : {
        // height : 32,
        backgroundColor: '#FF5F57',
    },
    topView : {
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
        height:8,
        backgroundColor:colors.accent,
    },
    view : {
        height:24,
        alignItems:'center',
        justifyContent:'center',
    },
    text : {
        fontSize:12,
        color:'#fff',
        fontFamily:fonts.notoSansRegular,
        fontWeight:'700',
    },
})
