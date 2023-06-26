import moment from 'moment';
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { dateFormatWithDDMonthYYYY, getDiffInDaysFromToday } from '../../utils/DateTimeValidations';
import { showAlert, showConfirmAlert } from '../../utils/Message';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import AcceptRejectButtons from '../components/AcceptRejectButtons';
import TagButton from '../components/TagButton';

const RTRItem = props => {

    const {item,index,hasButtons,onPress,hasStatusView,fromHome} = props;

    const _onReject = () => {
        showConfirmAlert(
            'Reject',
            'Are you sure you want to reject?',
            () => {
                showAlert('message', 'Rejected Successfully!')
            })
    }


    return (
       <View>
            {/* {
               item.jobStatus === 'active'
               && */}
               <TouchableOpacity
                    style={{marginTop:12,}}
                    onPress={onPress}
                    disabled
                >
                <View style={[styles.parent,{width:fromHome && 300,height:fromHome && 160}]}>
                    <View style={styles.row}>
                        
                        <TagButton 
                            title={'Right To Represent'}
                            containerStyle={{height:24}}
                            disabled
                            disabledTitleStyle={{fontSize:12,color:'#fff'}}
                            disabledStyle={{height:24,backgroundColor:colors.rtrColor}}
                        />
                    </View>
                    <Text style={styles.title}>{item.jobTitle}</Text>
                    <Text style={styles.days}>{moment(item.updatedDate, "YYYYMMDD").fromNow()} </Text>
                
                    <View style={styles.row}>
                        <Item 
                            title={item.jobTenant}
                            iconName='briefcase'
                            iconType='feather'
                        />
                        <Text style={[styles.text1,{paddingHorizontal:8}]}>|</Text>
                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                        <Item 
                            title={`${item.jobLocation}`}
                            iconName='map-pin'
                            iconType='feather'
                            parentStyle={{flex:1}}
                        />
                        </ScrollView>
                    </View>
                    <Item 
                        title={`${item.payRate}${item.payRateCurrency}`}
                        iconName='piggy-bank'
                        iconType='font-awesome-5'
                    />
                    {
                        hasButtons
                        &&
                        <TagButton 
                            title={'View Approval History'}
                            buttonStyle={styles.acceptButtonStyle}
                            containerStyle={{marginRight:8,marginTop:8,alignSelf:'flex-start'}}
                            titleStyle={{color:'#fff'}}
                            size='medium'
                            onPress={props.onPress}
                        />
                    }

                     {/* <AcceptRejectButtons 
                            onReject = {() => _onReject()}
                            // onAccept = {() => _onAccept()}
                            onAccept={props.onAccept}
                        /> */}

                    {
                        hasStatusView
                        &&
                        <BottomStatusView 
                            status={`Approval ${item.statusName === 'Submitted' ? 'Accepted' : `Rejected - ${moment(item.rtrRejectedDate, "YYYYMMDD").fromNow()}`}`}
                        />
                    }
                </View>
                </TouchableOpacity>
            {/* } */}
       </View>
    )
}

export default RTRItem

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
        paddingBottom:4,
        lineHeight:20,
    },
    days : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        position:'absolute',
        top:8,right:16
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
        paddingBottom:4,
        
    },
    row : {
        flexDirection:'row',
        alignItems: 'center',
    },
    itemRow : {
        flexDirection:'row',
        alignItems: 'center',
        // flex:1
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
    },
    acceptButtonStyle : {
        paddingHorizontal:20,
        borderColor:colors.acceptBtn,
        backgroundColor:colors.acceptBtn
    }
})



const Item = props => {
    const {iconName,iconType,title} = props;
    return (
        <View style={[styles.itemRow,props.parentStyle]}> 
            <Icon 
                name={iconName}
                type={iconType}
                color={colors.defaultTextColor}
                size={14}
            />
            <Text  
                style={[styles.text1,{paddingLeft:4},props.titleStyle]}
                numberOfLines={2}
            >{title}</Text>
        </View>
    )
}


const BottomStatusView = props => {
    return (
        <View style={styles.statusView}>
            <Text style={styles.statusText}>{props.status}</Text>
        </View>
    )
}