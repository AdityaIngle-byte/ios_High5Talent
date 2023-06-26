import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { Icon } from 'react-native-elements';
import { dateFormatWithDDMonthYYYY, getDiffInDaysFromToday } from '../../utils/DateTimeValidations';
import { showAlert, showConfirmAlert } from '../../utils/Message';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import AcceptRejectButtons from '../components/AcceptRejectButtons';
import TagButton from '../components/TagButton';

const AppliedJobItem = props => {

    const {item,index,hasButtons,onPress,isRTR, isMatchedJob,fromHome} = props;

    const [isCollapsed, setIsCollapsed] = useState(true)

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
            {
               item.status === 'Applied'
               &&
               <TouchableOpacity
                    style={{marginTop:12,}}
                    // onPress={() => setIsCollapsed(prevState => !prevState)}
                    onPress={props.onPress}
                >
                <View style={[styles.parent,{width:fromHome && 300,height:fromHome && 160}]}>
                    <View style={styles.row}>
                        <TagButton 
                            title={'Applied'}
                            containerStyle={{height:24}}
                            disabled
                            disabledTitleStyle={{fontSize:12,color:'#fff'}}
                            disabledStyle={{height:24,backgroundColor:colors.appliedColor}}
                        />
                    </View>
                    <Text style={styles.title}>{item.jobTitle}</Text>
                    <Text style={styles.days}>Applied at: {dateFormatWithDDMonthYYYY(item.updatedDate)}</Text>
                    <Item 
                        title={item.jobType}
                        iconName='briefcase'
                        iconType='feather'
                    />
                    {item.location.address !== "" && <Item 
                        title={`${item.location.address}`}
                        iconName='map-pin'
                        iconType='feather'
                    />}
                    <Item 
                        title={`${item.minimumPay}-${item.maximumPay} ${item.placementCurrency}`}
                        iconName='piggy-bank'
                        iconType='font-awesome-5'
                    />
                    <Collapsible collapsed={isCollapsed}>
                        <Item 
                            title={item.jobType}
                            iconName='briefcase'
                            iconType='feather'
                        />
                        <Text 
                            style={styles.text1}

                        >{item.comments}</Text>
                    </Collapsible>
                </View>
                </TouchableOpacity>
            }

            

       </View>
    )
}

export default AppliedJobItem

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
        <View style={styles.itemRow}> 
            <Icon 
                name={iconName}
                type={iconType}
                color={colors.defaultTextColor}
                size={14}
            />
            {/* <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
            > */}
                <Text 
                    style={[styles.text1,{paddingLeft:4}]}
                    multiline={true}
                    numberOfLines={4}
                >{title}</Text>
            {/* </ScrollView> */}
        </View>
    )
}