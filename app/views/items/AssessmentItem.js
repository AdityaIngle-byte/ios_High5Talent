import moment from 'moment';
import React, { Fragment } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { images } from '../../assets/images';
import { getDiffInDaysFromToday } from '../../utils/DateTimeValidations';
import { showAlert, showConfirmAlert } from '../../utils/Message';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import AcceptRejectButtons from '../components/AcceptRejectButtons';
import TagButton from '../components/TagButton';
import { openUrl } from '../screens/common/InAppBrowser';

const AssessmentItem = props => {

    const {item,onPress,index,fromHome} = props;


    // const _onReject = () => {
    //     showConfirmAlert(
    //         'Reject',
    //         'Are you sure you want to reject?',
    //         props.onReject)
    // }


    const _onStart = () => {
        showConfirmAlert(
            'Start',
            'Are you sure you want to start?',
            () => {
                if(item.type === 'Coding Test'){
                    openUrl(item.InvitationUrl)    
                }else{
                    openUrl(item.InterviewUrl)
                }
                
            })
    }


    return (
            <TouchableOpacity
                style={{marginTop:12,}}
                onPress={onPress}
                disabled
            >
            <View style={[styles.parent,{width:fromHome && 300}]}>
                <View style={styles.row}>
                    <TagButton 
                        title={'Assessment'}
                        containerStyle={{height:24,marginTop:0}}
                        disabled
                        disabledTitleStyle={{fontSize:12,color:colors.defaultTextColor,}}
                        disabledStyle={{height:24,backgroundColor:colors.assessmentColor,borderColor:'transparent'}}
                    />
                </View>
                <Text style={styles.title}>{item.type === 'Coding Test' ? item.reqNumber : item.reqTitle}</Text>
                <Item 
                    title={item.type}
                    iconName='briefcase'
                    iconType='feather'
                />
                <Text style={styles.days}>{moment(item.created_date, "YYYYMMDD").format('MM/DD/YYYY')} By {item.RecruiterFname + ' ' + item.RecruiterLname}</Text>
                <TagButton 
                    title={'Start'}
                    buttonStyle={{width:96,backgroundColor:colors.acceptBtn}}
                    containerStyle={{marginRight:8,marginTop:8}}
                    titleStyle={{color:'#fff'}}
                    size='medium'
                    onPress={() => _onStart()}
                />
                {/* {
                    (item.status === 'Requested'  ||  item.status === 'Open')
                    && 
                    <AcceptRejectButtons 
                        onReject = {() => _onReject()}
                        onAccept = {props.onStart}
                        acceptButtonText='Start'
                    />
                }

                {
                    item.status === 'Rejected'
                    &&
                    <BottomStatusView 
                        status={`Rejected`}
                        statusText={{color:colors.alertColor}}
                    />
                }

                {
                    item.status === 'Completed'
                    &&
                    <BottomStatusView 
                        status={`Completed`}
                        statusText={{color:colors.successColor}}
                    />
                } */}
            </View>

            </TouchableOpacity>
    )
}

export default AssessmentItem

const styles = StyleSheet.create({
    parent : {
        marginHorizontal:16,
        backgroundColor:'#fff',
        paddingHorizontal:12,
        paddingVertical:12,
        borderRadius:6,
    },
    title : {
        fontSize:16,
        color:'#1B1B1B',
        fontFamily:fonts.notoSansBold,
        // fontWeight:'700',
        paddingBottom:4,
        lineHeight:20,
    },
    days : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        // position:'absolute',
        // top:8,right:16,
        lineHeight:20,
    },
    matchedView : {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:colors.primary,
        paddingHorizontal:12,
        borderRadius:2
    },
    text1 : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        paddingBottom:4,
        lineHeight:20,
    },
    new : {
        fontSize:14,
        color:'#61C46D',
        fontFamily:fonts.notoSansRegular,
        fontWeight:'900',
        paddingBottom:4
    },
    row : {
        flexDirection:'row',
        alignItems: 'center',
    },
    itemRow : {
        flexDirection:'row',
        alignItems: 'center',

    },
    statusView : {
        justifyContent:'center',
        borderTopWidth:0.5,
        borderTopColor:colors.borderColor,
        marginTop:12,
        paddingTop:8
    },
    statusText : {
        fontSize:16,
        color:colors.defaultTextColor,
        fontFamily:fonts.notoSansBold,
    }
})



const Item = props => {
    const {iconName,iconType,title} = props;
    return (
        <View style={[styles.itemRow,props.style]}> 
            <Icon 
                name={iconName}
                type={iconType}
                color={colors.defaultTextColor}
                size={14}
            />
            <Text 
                style={[styles.text1,{paddingLeft:4}]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{title}</Text>
        </View>
    )
}


// const BottomStatusView = props => {
//     return (
//         <View style={styles.statusView}>
//             <Text style={[styles.statusText,props.statusText]}>{props.status}</Text>
//         </View>
//     )
// }