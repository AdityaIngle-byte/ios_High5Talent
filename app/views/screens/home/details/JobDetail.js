import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { discardJob, getMatchedJobs, getRecruiterDetail, makeJobFavorite, setFavJobsList, setMatchedJobsList } from '../../../../redux/actions/homeActions'
import { getDiffInDaysFromToday } from '../../../../utils/DateTimeValidations'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import { share } from '../../../../utils/Share'
import { getUserPref } from '../../../../utils/UserPrefs'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import ButtonView from '../../../components/ButtonView'
import BaseView from '../../../hoc/BaseView'
import ItemView from './items/ItemView'
import JobDetailBottomView from './items/JobDetailBottomView'
import JobDetailItem from './items/JobDetailItem'
import JobTypeItem from './items/JobTypeItem'
import RenderHTML from "react-native-render-html";


const JobDetail = props => {

    const baseViewRef = useRef(null)
    const dispatch = useDispatch()
    const { width } = useWindowDimensions();

    const matchedJobsList = useSelector(state => state.home.matchedJobsList)
    const favouritedJobsList = useSelector(state => state.home.favouritedJobsList)
    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
    const profileSocialMedia = useSelector(state => state.profile.profileSocialMedia)
    const profileStory = useSelector(state => state.profile.profileStory)
    const profileSkills = useSelector(state => state.profile.profileSkills)
    const preferences = useSelector(state => state.profile.preferences)
    const profileEducation = useSelector(state => state.profile.profileEducation)
    
   

    const [jobDetail, setJobDetail] = useState(null)
    const [recruiterDetail, setRecruiterDetail] = useState(null)
    const [type, setType] = useState('')
    const [isFavoriteJob, setIsFavoriteJob] = useState(false)

    useEffect(() => {
        init()
        return () => {
            
        };
    }, [setType,setJobDetail])

    
    const init = () => {
        const {detail,type} = props.route.params;

        console.log('[JobDetail.js] init : ',detail, type)
        if(detail !== undefined) {
            // alert(type + JSON.stringify(detail))
            setJobDetail(detail)
            setIsFavoriteJob(detail.favorited)
            
            setType(type)
            getRecruiterTenantDetail(detail.jobTenant)
            
        }
    }

    const getRecruiterTenantDetail = (jobTenant) => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader();
            getRecruiterDetail(jobTenant)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    console.log('[JobDetail.js] recruiterDetail : ', response)
                    if(response.length > 0){
                        setRecruiterDetail(response[0])
                    }
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[JobDetail.js] recruiterDetail : ', response)
                    if(response.length > 0){
                        setRecruiterDetail(response[0])
                    }
                })
        }
    }

    const _renderSkillItem = ({item,index}) => {
        return (
            <ItemView 
                value={item}
            />
        )
    }

    const _renderEducationItem = ({item,index}) => {
        return (
            <ItemView 
                value={item}
            />
        )
    }

    const _onShare = () => {
        const url = `https://high5devwebapp-react.azurewebsites.net/sharejob/Id:${jobDetail.jobId}`
        share(jobDetail.jobTitle,url,'')
            .then(response => {
                showAlert('success','Shared Successfully!')
            })
            .catch(error => {
                // showAlert('error','Error Occur!')
            })
    }

    const _onFavoritePress = async() => {
        if(baseViewRef !== null){

            const userPrefs = JSON.parse(await getUserPref())
            console.log('[JobDetail.js] On MakeJobFavorite : ',userPrefs)

            const data = {
                // "candidateId": userPrefs.candidateId,
                "id": jobDetail.id,
                "favorited": isFavoriteJob ? false : true
            }

            console.log('[JobDetail.js] Fav Data : ',data)

            baseViewRef.current.showLoader();
            makeJobFavorite(data)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    setIsFavoriteJob(prevState => !prevState)
                    console.log('[JobDetail.js] On MakeJobFavorite: ',response)
                    setTimeout(() =>{
                        baseViewRef.current.successModal.baseModal.showModal()
                        if(!isFavoriteJob){
                            baseViewRef.current.successModal.init('Favourited!',`Job Added to favourited jobs.`)
                        }else{
                            baseViewRef.current.successModal.init('Favourited!',`Job Removed From favourited jobs.`)
                        }
                    },500)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[JobDetail.js] On MakeJobFavorite: ',error)
                })
            
        }
    }

    const _onApplyJobPress = () => {
        if(jobDetail.weightage) {
            let condition = checkEligiblity()
            if(condition) {
                props.navigation.navigate('ApplyJob',{
                    'detail' : jobDetail,
                    'recruiter' : recruiterDetail,
                    onGoBack : _updateJob
                })
            }
            else {
                showAlert('error','You are not eligible to apply for this job!')
            }
        }
        else {
            props.navigation.navigate('ApplyJob',{
                'detail' : jobDetail,
                'recruiter' : recruiterDetail,
                onGoBack : _updateJob
            })
        }
    
    }

    const checkEligiblity = () => {
        debugger;
        const weightage = typeof(jobDetail.weightage) === 'string' ? JSON.parse(jobDetail.weightage) : jobDetail.weightage
        let user = {...profileSkills,...profilePersonalInfo,...profileSocialMedia,...profileStory,...preferences,'education':profileEducation}
        console.log(user);
        const {
          primarySkills,
          secondarySkills,
          jobTitle,
          education,
          experienceLevel,
          industries,
          location,
        } = weightage;                                   
        let condition = true;
        let unmatched = {
            primarySkills: false,
            secondarySkills: false,
            jobTitle: false,
            education: false,
            experienceLevel: false,
            industries: false,
            location: false
        }
    
        if (primarySkills && primarySkills.length > 0) {
          if (!primarySkills.every((item) => user.primarySkills.includes(item))) {
            condition = false;
            unmatched = { ...unmatched, primarySkills: true }
          }
        }
    
        if (secondarySkills && secondarySkills.length > 0) {
          if (
            !secondarySkills.every((item) => user.secondarySkills.includes(item))
          ) {
            condition = false;
            unmatched = { ...unmatched, secondarySkills: true }
          }
        }
    
        if (industries && industries.length > 0) {
          if (!industries.every((item) => user.skillSet.includes(item))) {
            condition = false;
            unmatched = { ...unmatched, industries: true }
          }
        }
    
        if (education && education.length > 0) {
          if (
            !user.education.map((item) => item.educationType.toLowerCase()).includes(education[0].toLowerCase())
          ) {
            condition = false;
            unmatched = { ...unmatched, education: true }
          }
        }
    
        if (location) {
            if(jobDetail.isRemote) {                                 
                if(!(user.preferredLocations.includes('Remote'))) {
                    condition = false
                    unmatched = { ...unmatched, location: true }
                }
            }
            else {
                if (
                    !([user.address.city, ...user.preferredLocations].map(i => i.toLowerCase()).includes(jobDetail.location.city.toLowerCase()))
                ) {
                    condition = false;
                    unmatched = { ...unmatched, location: true }
                } 
            }                                                    
        }
    
        if (jobTitle) {
          if (user.currentJobTitle?.trim().toLowerCase() !== jobDetail.jobTitle.trim().toLowerCase()) {
            condition = false;
            unmatched = { ...unmatched, jobTitle: true }
          }
        }
    
        if (experienceLevel) {                                      
          if (findRange(user.experienceYear, user.experienceMonth) !== jobDetail.experienceLevel) {
            condition = false;
            unmatched = { ...unmatched, experienceLevel: true }
          }
        }
    
        return condition
    }
    


    const _updateJob = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            getMatchedJobs()
                .then(response => {
                    baseViewRef.current.hideLoader()
                    dispatch(setMatchedJobsList(response))
                    dispatch(setFavJobsList(response))
                    setType('Applied')
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[JobDetail.js] MatchedJob List Error: ',error)
                })
        }
    }

    const _onDiscard = () => {
        showConfirmAlert(
            'Discard',
            'Are you sure you want to Discard this job? Job no longer will be visible to you.',
            () => {
                if(baseViewRef !== null){
                    baseViewRef.current.showLoader()
                    discardJob(jobDetail.id)
                        .then(response => {
                            baseViewRef.current.hideLoader()
                            console.log('[JobDetail.js] On Discard : ',response)
                            _updateJobAfterDiscarded()
                            showAlert('success',"Job Discarded! \n No Longer will be visible to you.")
                        })
                        .catch(error => {
                            baseViewRef.current.hideLoader()
                            console.log('[JobDetail.js] On Discard : ',response)
                            showAlert('success','Error while Discarding job.')
                        })
                }
            }
        )
    }

    const _updateJobAfterDiscarded = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            getMatchedJobs()
                .then(response => {
                    baseViewRef.current.hideLoader()
                    dispatch(setMatchedJobsList(response))
                    dispatch(setFavJobsList(response))
                    setType('Discarded')
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[JobDetail.js] MatchedJob List Error: ',error)
                })
        }
    }

    const html =jobDetail?.jobDescription;
    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='DETAIL'
            navigation={props.navigation}
            hasNotification
            hasTitle

        >

          
        {
            jobDetail !== null 
            &&
            <View style={{flex:1}}>
            <ScrollView
                style={{backgroundColor:'#F9F9FA'}}
                contentContainerStyle={{paddingBottom:32}}

            >
            <View style={styles.parent}>
                <View style={styles.borderView}>
                    <Text style={styles.jobTitle}>{jobDetail.fullText.jobTitle}</Text>
                    {/* <Text style={styles.address}>
                        {jobDetail.location.address !== "" ? `${jobDetail.location.address},` : ''} 
                        {jobDetail.location.city !== "" ? `${jobDetail.location.city},` : ''} 
                        {jobDetail.location.state !== "" ? `${jobDetail.location.state},` : ''}
                        {jobDetail.location.country !== "" ? `${jobDetail.location.country},` : ''}
                        {jobDetail.location.zipcode !== "" ? `${jobDetail.location.zipcode},` : ''}
                    </Text> */}
                    <View style={styles.row}>
                        <JobTypeItem 
                            name={jobDetail.jobType}
                        />
                        {
                            jobDetail.isRemote
                            &&
                            <JobTypeItem 
                                name={"Remote Working"}
                            />
                        }
                    </View>
                </View>

                <View style={styles.borderView}>
                    <Text style={[styles.heading,{paddingBottom:12}]}>General</Text>
                    <JobDetailItem 
                        value={jobDetail.jobType}
                        title={'Job Type'}
                        iconName={'briefcase'}
                        iconType={'feather'}
                    />
                    {/* <JobDetailItem 
                        value={`${jobDetail.location.city}, ${jobDetail.location.state}`}
                        iconName={'map-pin'}
                        iconType={'feather'}
                    /> */}
                    
                    <JobDetailItem 
                        title={'Target Start'}
                        // value={`Posted ${getDiffInDaysFromToday(jobDetail.activeFrom)} days ago`}
                        value={moment(jobDetail.prefferedStartDate).format('MMM D, YYYY')}
                        iconName={'clock'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        title={'Location'}
                        value={jobDetail.isRemote ? 'Remote' : jobDetail.location.city}
                        iconName={'map'}
                        iconType={'feather'}
                    />
                    {
                        jobDetail.workPlaceType === 'Hybrid' && (
                            <JobDetailItem 
                            title={'Work Place Type'}
                            value={`${jobDetail.workPlaceType}-${jobDetail.onsiteWorkDays}`}
                            iconName={'map'}
                            iconType={'feather'}
                            />
                        )
                    }
                    <JobDetailItem 
                        title={'Annual Salary'}
                        value={`${jobDetail.minimumPay}-${jobDetail.maximumPay} ${jobDetail.placementCurrency}`}
                        iconName={'money'}
                        iconType={'font-awesome'}
                    />
                </View>

                <View style={styles.borderView}>
                    <Text style={styles.heading}>Description</Text>
                    {jobDetail.jobDescription !== "" ?
                    <RenderHTML contentWidth={width} source={{ html }}/>
                    :<Text style={styles.descriptionText}>"Description not available."</Text>} 
                </View>

                {
                    jobDetail.primarySkills.length > 0
                    &&
                    <View style={styles.borderView}>
                        <Text style={styles.heading}>Primary Skills</Text>
                        <FlatList 
                            data={jobDetail.primarySkills}
                            renderItem={_renderSkillItem}
                            horizontal
                        />
                    </View>
                }

             

                {
                    jobDetail.education.length > 0
                    &&
                    <View style={styles.borderView}>
                        <Text style={styles.heading}>Education</Text>
                        <FlatList 
                            data={jobDetail.education}
                            renderItem={_renderEducationItem}
                            horizontal
                        />
                    </View>
                }


                {
                    jobDetail.certifications.length > 0
                    &&
                    <View style={styles.borderView}>
                        <Text style={styles.heading}>Certifications</Text>
                        <FlatList 
                            data={jobDetail.certifications}
                            renderItem={_renderEducationItem}
                            horizontal
                        />
                    </View>
                }


                {
                    jobDetail.industries.length > 0
                    &&
                    <View style={styles.borderView}>
                        <Text style={styles.heading}>Industries</Text>
                        <FlatList 
                            data={jobDetail.industries}
                            renderItem={_renderEducationItem}
                            horizontal
                        />
                    </View>
                }

                {/* <View style={[styles.row,{marginTop:0}]}>
                    <View style={[styles.borderView,{flex:1,marginRight:8}]}>
                        <Text style={styles.heading}>Working Hours</Text>
                        <JobTypeItem 
                            name={jobDetail.isFlexible ? 'Flexible' : 'Not Flexible'}
                            parentStyle={{width:120,marginTop:8}}
                        />
                    </View>
                    <View style={[styles.borderView,{flex:1,marginLeft:8}]}>
                        <Text style={styles.requiredSkillsText}>Travel</Text>
                        <JobTypeItem 
                            name={jobDetail.travel}
                            parentStyle={{width:120,marginTop:8}}
                        />
                    </View>
                </View> */}

                <View style={[styles.row,{marginTop:0}]}>
                    <View style={[styles.borderView,{flex:1,marginRight:8}]}>
                        <Text style={styles.heading}>Drug Test</Text>
                        <JobTypeItem 
                            name={jobDetail.drugTest ? 'Yes' : 'No'}
                            parentStyle={{width:120,marginTop:8,backgroundColor:'#ECFBD5'}}
                        />
                    </View>
                    <View style={[styles.borderView,{flex:1,marginLeft:8}]}>
                        <Text style={styles.heading}>Background Check</Text>
                        <JobTypeItem 
                            name={jobDetail.backgroundCheck ? 'Yes' : 'No'}
                            parentStyle={{width:120,marginTop:8,backgroundColor:'#ECFBD5'}}
                        />
                    </View>
                </View>

            </View>
            </ScrollView>
            </View>
        }

        {
                type === 'NotApplied'
                &&
                <JobDetailBottomView 
                    onShare={() => _onShare()}
                    onFav={() => _onFavoritePress()}
                    onApply={() => _onApplyJobPress()}
                    onDiscard={() => _onDiscard()}
                    // onDiscard={() => _updateJob()}
                    isFavoriteJob={isFavoriteJob}
                    style={{paddingVertical:16,paddingBottom:24,backgroundColor:'#fff'}}
                />
        }

            {
                type === 'Applied'
                &&
                <ButtonView 
                    title={'Applied'}
                    disabled
                    containerStyle={{margin:24}}
                    // buttonStyle={{paddingVertical:0,backgroundColor:colors.acceptBtn,borderRadius:4,borderColor:colors.acceptBtn}}
                    size='medium'
                    disabledStyle={{backgroundColor:colors.successColor,borderColor:colors.successColor}}
                    disabledTitleStyle={{color:'#fff'}}
                />
            }

            {
                type === 'Discarded'
                &&
                <ButtonView 
                    title={'Discarded'}
                    disabled
                    containerStyle={{margin:24}}
                    // buttonStyle={{paddingVertical:0,backgroundColor:colors.acceptBtn,borderRadius:4,borderColor:colors.acceptBtn}}
                    size='medium'
                    disabledStyle={{backgroundColor:colors.alertColor,borderColor:colors.successColor}}
                    disabledTitleStyle={{color:'#fff'}}
                />
            }
            
        </BaseView>
    )
}

export default JobDetail

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        // backgroundColor: '#F9F9FA'
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
        fontSize:16,
        fontFamily:fonts.notoSansBold,
        color:'#000000',     
        textTransform:'capitalize'   
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
})
