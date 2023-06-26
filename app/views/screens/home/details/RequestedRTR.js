import React, {  } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { dateFormatWithDDMonthYYYY, getPreciseDateDiff } from '../../../../utils/DateTimeValidations'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import JobDetailItem from './items/JobDetailItem'
import RTRDetailBottomIcons from './items/RTRDetailBottomIcons'

const RequestedRTR = props => {

    const { rtrDetail,onAccept, onReject } = props;

    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
    
    const dateDiff = getPreciseDateDiff(new Date(), new Date(rtrDetail.jobPostDate))

    return (
        <View style={{flex:1}}>
            <ScrollView
                style={{backgroundColor:'#F9F9FA'}}
                contentContainerStyle={{paddingBottom:32}}
            >
            
                <View style={styles.headingView}>
                    <Text style={styles.jobTitle}>{rtrDetail.fullText.jobTitle}</Text>                    
                </View>
                <View style={styles.parent}>
                    <DetailView 
                        user={profilePersonalInfo}
                        jobData={rtrDetail}
                    />
                    
                <Text style={[styles.jobTitle,{color:'#000',fontSize:18,marginTop:24}]}>{rtrDetail.fullText.jobTitle}</Text>
                <Text style={[styles.jobTitle,{color:'#000',fontSize:16,marginBottom:12}]}>{rtrDetail.fullText.jobTenant}</Text>
                <JobDetailItem 
                    value={`Posted On : ${dateDiff}`}
                    iconName={'calendar'}
                    iconType={'feather'}
                />
                <JobDetailItem 
                    value={`Opening : ${rtrDetail.positionCount}`}
                    iconName={'folder-open-o'}
                    iconType={'font-awesome'}
                />

                <Text style={[styles.jobTitle,{color:'#000',fontSize:18,marginTop:24}]}>Job Description</Text>
                <Text style={[styles.description,{marginBottom:16}]}>{rtrDetail.jobDescription}</Text>
                <JobDetailItem 
                    value={`Job Title : ${rtrDetail.fullText.jobTitle}`}
                    iconName={'briefcase'}
                    iconType={'feather'}
                />
                <JobDetailItem 
                    value={`Position Type : ${rtrDetail.jobType}`}
                    iconName={'chair'}
                    iconType={'font-awesome-5'}
                />

                <ItemView 
                    title={'Skills'}
                    value={rtrDetail.fullText.primarySkills && rtrDetail.fullText.primarySkills.join(', ')}
                />

                <ItemView 
                    title={'Secondary Skills'}
                    value={rtrDetail.fullText.secondarySkills && rtrDetail.fullText.secondarySkills.join(', ')}
                />

                <ItemView 
                    title={'Skill set'}
                    value={rtrDetail.skillSet && rtrDetail.skillSet.join(', ')}
                />
               
                {/* <View style={styles.borderView}>
                    <Text style={[styles.heading,{paddingBottom:12}]}>General</Text>
                    <JobDetailItem 
                        value={rtrDetail.jobTenant}
                        iconName={'briefcase'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        value={`${rtrDetail.jobLocation}`}
                        iconName={'map-pin'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        value={`${rtrDetail.payRate}${rtrDetail.payRateCurrency}`}
                        iconName={'money'}
                        iconType={'font-awesome'}
                    />
                    <JobDetailItem 
                        value={`Posted on ${dateFormatWithDDMonthYYYY(rtrDetail.createdDate !== "" ? rtrDetail.createdDate : new Date())}`}
                        iconName={'clock'}
                        iconType={'feather'}
                    />
                </View> */}
                </View>
            </ScrollView>
            <RTRDetailBottomIcons 
                onReject={onReject}
                onAccept={onAccept}
                style={{paddingVertical:16,paddingBottom:24,backgroundColor:'#fff'}}
            />
        </View>
    );
};

export default RequestedRTR;

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        // backgroundColor: '#F9F9FA'
    },
    headingView : {
        backgroundColor:colors.primary,
        padding:16,
        height:144,
        alignItems:'center',
        justifyContent:'center'
    },
    borderView : {
        borderWidth:1,
        borderColor:'#EDEDED',
        backgroundColor:'#fff',
        padding:12,
        borderRadius:4,
        marginTop:16
    },
    jobTitle : {
        fontSize:24,
        fontFamily:fonts.notoSansBold,
        color:'#fff',     
        // textTransform:'capitalize'   
    },
    address : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:'#888',     
        textTransform:'capitalize'   
    },
    row : {
        flexDirection:'row',
        marginTop:8
    },
    heading : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:'#1B1B1B'
    },
    descriptionText : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        color:'#888',
        marginTop:8
    },
    detailView : {

    },
    name : {
        fontSize:16,
        fontFamily:fonts.notoSansRegular,
        color:'#000',
        marginTop:8
    },
    description : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        color:'#888',
        marginTop:8
    },
    strong : {
        fontSize:14,
        fontFamily:fonts.notoSansBold,
        color:'#000',
        // marginHorizontal:12
    },
    itemView : {
        marginTop:12,
        flexDirection:'row',
        alignItems: 'center',
    },
    itemTitle : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        color:'#888',
        // marginTop:8
    },
    itemValue : {
        fontSize:16,
        fontFamily:fonts.notoSansBold,
        color:'#000',
        // marginTop:8
    }
})



const DetailView = (props) => {

    const {user,jobData} = props;

    let jobLocation = '';
    if (Object.keys(jobData.fullText).length !== 0) {
        jobData.fullText.location.city && jobData.fullText.location.state ? (
            jobLocation = `${jobData.fullText.location.city}, ${jobData.fullText.location.state}`
        ) : jobData.fullText.location.state ? (
            jobLocation = `${jobData.fullText.location.state}`
        ) : jobData.fullText.location.city && (
            jobLocation = `${jobData.fullText.location.city}`
        )
    }

    if(jobLocation === ''){
        jobLocation = 'Unknown Location'
    }

    console.log('[RequestedRTR.js] DetailView : ',jobData)

    return (
        <View style={styles.detailView}>
            <Text style={styles.name}>Hi {user.firstName},</Text>
            <Text style={styles.description}>
                As per our conversation, I would like to submit your profile for the position of 
                <Text style={styles.strong}> {jobData.fullText.jobTitle} </Text> 
                with
                <Text style={styles.strong}> {jobData.fullText.jobTenant} </Text> 
                based in 
                <Text style={styles.strong}> {jobLocation} </Text> 
                on Payrate 
                <Text style={styles.strong}> {jobData.payRate} {jobData.payRateCurrency} </Text>.
                As a requirement, please read the email content carefully and approve the “right to 
                represent” your profile to the client In case you have applied for the same job earlier, 
                please inform us immediately.
            </Text>
        </View>
    )
}


const ItemView = props => {
    return (
        <View style={styles.itemView}>
            <Text style={styles.itemTitle}>{props.title} : </Text>
            <Text style={styles.itemValue}>{props.value}</Text>
        </View>
    )
}