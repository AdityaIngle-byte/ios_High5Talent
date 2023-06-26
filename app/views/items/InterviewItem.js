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

const InterviewItem = props => {

    const {item,onPress,index,type,fromHome} = props;


    // const _onReject = () => {
    //     showConfirmAlert(
    //         'Reject',
    //         'Are you sure you want to reject?',
    //         () => {
    //             showAlert('message', 'Rejected Successfully!')
    //         })
    // }

    const _onItemPress = () => {
        showConfirmAlert(
            'Start',
            'Are you sure you want to start?',
            () => {
                openUrl(item.SchedulingUrl) 
            })
    }


    return (
            <TouchableOpacity
                style={{marginTop:12,}}
                onPress={() => _onItemPress()}
            >
            <View style={[styles.parent,{width:fromHome && 300}]}>
                {
                    type !== undefined &&
                    <View style={styles.row}>
                        <TagButton 
                            title={type}
                            containerStyle={{height:24,marginTop:0}}
                            disabled
                            disabledTitleStyle={{fontSize:12,color:'#fff',}}
                            disabledStyle={{height:24,backgroundColor:colors.interviewColor,borderColor:'transparent'}}
                        />
                    </View>
                }
                <Text style={styles.title}>{item.reqTitle}</Text>
                {/* <Item 
                    title={item.interviewType}
                    iconName='briefcase'
                    iconType='feather'
                /> */}
                <Text style={styles.days}>Scheduled On: <Text style={{fontFamily:fonts.notoSansBold,color:'#000'}}>{moment(item.created_date).format('MM/DD/YYYY h:mm:ss a')}</Text></Text>
                <Text style={styles.days}>Assigned By: <Text style={{fontFamily:fonts.notoSansBold,color:'#000'}}>{item.RecruiterFname + ' ' + item.RecruiterLname}</Text></Text>
                {/* {
                    item.status === 'Requested'
                    &&
                    <AcceptRejectButtons 
                        onReject = {() => _onReject()}
                        // onAccept = {() => _onAccept()}
                        
                        onAccept={props.onAccept}
                    />
                }

                {
                    item.status === 'Open'
                    &&
                    <AcceptRejectButtons 
                        onReject = {() => _onReject()}
                        // onAccept = {() => _onAccept()}
                        acceptButtonText='Start'
                        onAccept={props.onAccept}
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

export default InterviewItem

const styles = StyleSheet.create({
    parent : {
        marginHorizontal:16,
        backgroundColor:'#fff',
        paddingHorizontal:12,
        paddingVertical:12,
        borderRadius:6,
        width:300
    },
    title : {
        fontSize:16,
        color:'#1B1B1B',
        fontFamily:fonts.notoSansBold,
        fontWeight:'700',
        paddingBottom:4
    },
    days : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        // position:'absolute',
        // top:8,right:16
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
        paddingBottom:4
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


const BottomStatusView = props => {
    return (
        <View style={styles.statusView}>
            <Text style={[styles.statusText,props.statusText]}>{props.status}</Text>
        </View>
    )
}