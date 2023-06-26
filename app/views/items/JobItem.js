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

const JobItem = props => {

    const {item,index,hasButtons,onPress,isRTR, isMatchedJob,isFavouritedJob,fromHome} = props;

    console.log('[JobItem.js] Matched Job: ',item)

    const _onReject = () => {
        showConfirmAlert(
            'Reject',
            'Are you sure you want to reject?',
            () => {
                showAlert('message', 'Rejected Successfully!')
            })
    }


    return (
            <TouchableOpacity
                style={{marginTop:12}}
                onPress={onPress}
            >
            <View style={[styles.parent,{width:fromHome && 300,height:fromHome && 160}]}>
                <View style={styles.row}>
                    
                    {
                        isMatchedJob
                        &&
                        <View style={styles.matchedView}>
                            <Image 
                                style={{height:16,width:16,marginRight:4}}
                                source={images.matchedTagIcon}
                            />
                            <TagButton 
                                title={'Matched'}
                                containerStyle={{height:24,marginTop:0}}
                                disabled
                                disabledTitleStyle={{fontSize:12,color:'#fff',marginRight:0}}
                                disabledStyle={{height:24,backgroundColor:colors.primary,borderColor:'transparent',paddingHorizontal:0,}}
                            />
                        </View>
                    }
                    {
                        isFavouritedJob
                        &&
                        <TagButton 
                            title={'Favorite'}
                            containerStyle={{height:24}}
                            disabled
                            disabledTitleStyle={{fontSize:12,color:'#fff'}}
                            disabledStyle={{height:24,backgroundColor:colors.favouritedColor}}
                        />
                    }
                    {
                        (item.isHotJob && !isFavouritedJob)
                        &&
                        <TagButton 
                            title={'HOT'}
                            containerStyle={{height:24,marginTop:0,marginLeft:8}}
                            disabled
                            disabledTitleStyle={{fontSize:12,color:'#fff'}}
                            disabledStyle={{height:24,backgroundColor:colors.hotJobColor}}
                        />
                    }
                </View>
                <Text style={styles.title}>{item.fullText.jobTitle}</Text>
                <Text style={styles.days}>{moment(item.updatedDate).fromNow()}</Text>
            
                <View style={styles.row}>
                    <Item 
                        title={item.jobType}
                        iconName='briefcase'
                        iconType='feather'
                    />
                    {
                        item.location.address !== ""
                        &&
                        <Fragment>
                            <Text style={[styles.text1,{paddingHorizontal:8}]}>|</Text>
                            <Item 
                                title={`${item.location.address}`}
                                iconName='map-pin'
                                iconType='feather'
                                style={{flex:1}}
                            />
                        </Fragment>
                    }
                </View>
                <Item 
                    title={`${item.minimumPay}-${item.maximumPay} ${item.placementCurrency}`}
                    iconName='piggy-bank'
                    iconType='font-awesome-5'
                />
                {
                    hasButtons
                    &&
                    <AcceptRejectButtons 
                        onReject = {() => _onReject()}
                        // onAccept = {() => _onAccept()}
                        onAccept={props.onAccept}
                    />
                }
            </View>
            </TouchableOpacity>
    )
}

export default JobItem

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
        lineHeight:20,
        color:'#1B1B1B',
        fontFamily:fonts.notoSansBold,
        fontWeight:'700',
        paddingBottom:4,
        marginTop:4
    },
    days : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        position:'absolute',
        top:8,right:16
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
        lineHeight:20,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        paddingBottom:4,
        textAlignVertical:'center',
        marginTop:4
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