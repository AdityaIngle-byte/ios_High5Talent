import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMatchedJobs, getRecruiterDetail, makeJobFavorite, setFavJobsList, setMatchedJobsList } from '../../../../redux/actions/homeActions'
import { getDiffInDaysFromToday } from '../../../../utils/DateTimeValidations'
import { showAlert } from '../../../../utils/Message'
import { share } from '../../../../utils/Share'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import ButtonView from '../../../components/ButtonView'
import BaseView from '../../../hoc/BaseView'
import ItemView from './items/ItemView'
import JobDetailBottomView from './items/JobDetailBottomView'
import JobDetailItem from './items/JobDetailItem'
import JobTypeItem from './items/JobTypeItem'

const JobDetail = props => {

    const baseViewRef = useRef(null)
    const dispatch = useDispatch()

    const userPrefs = useSelector(state => state.login.userPrefs)

    const matchedJobsList = useSelector(state => state.home.matchedJobsList)
    const favouritedJobsList = useSelector(state => state.home.favouritedJobsList)

    const [jobDetail, setJobDetail] = useState(null)
    const [recruiterDetail, setRecruiterDetail] = useState(null)
    const [type, setType] = useState('')
    const [isFavoriteJob, setIsFavoriteJob] = useState(false)

    useEffect(() => {
        init()
      return () => {
        
      };
    }, [])

    
    const init = () => {
        const {detail,type} = props.route.params;

        console.log('[JobDetail.js] init : ',detail, type)
        if(detail !== undefined) {
            setJobDetail(detail)
            // setIsFavoriteJob()
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
                value={JSON.stringify(item)}
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

    const _onFavoritePress = () => {
        if(baseViewRef !== null){

            const data = {
                "candidateId": userPrefs.candidateId,
                "jobId": jobDetail.id,
                "favorites": isFavoriteJob ? false : true
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
        props.navigation.navigate('ApplyJob',{
            'detail' : jobDetail,
            'recruiter' : recruiterDetail,
            onGoBack : _updateJob
        })
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

    const _onDiscard = () => {}


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
                    <Text style={styles.address}>
                        {jobDetail.location.address !== "" ? `${jobDetail.location.address},` : ''} 
                        {jobDetail.location.city !== "" ? `${jobDetail.location.city},` : ''} 
                        {jobDetail.location.state !== "" ? `${jobDetail.location.state},` : ''}
                        {jobDetail.location.country !== "" ? `${jobDetail.location.country},` : ''}
                        {jobDetail.location.zipcode !== "" ? `${jobDetail.location.zipcode},` : ''}
                    </Text>
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
                        value={jobDetail.jobTenant}
                        iconName={'briefcase'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        value={`${jobDetail.location.city}, ${jobDetail.location.state}`}
                        iconName={'map-pin'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        value={`${jobDetail.annualSalary}/annually`}
                        iconName={'money'}
                        iconType={'font-awesome'}
                    />
                    <JobDetailItem 
                        value={`Posted ${getDiffInDaysFromToday(jobDetail.activeFrom)} days ago`}
                        iconName={'clock'}
                        iconType={'feather'}
                    />
                    <JobDetailItem 
                        value={`${jobDetail.allowedSubmittals} Openings`}
                        iconName={'user'}
                        iconType={'feather'}
                    />
                </View>


                {
                    jobDetail.primarySkills.length > 0
                    &&
                    <View style={styles.borderView}>
                        <Text style={styles.heading}>Required Skills</Text>
                        <FlatList 
                            data={jobDetail.primarySkills}
                            renderItem={_renderSkillItem}
                            horizontal
                        />
                    </View>
                }

                <View style={styles.borderView}>
                    <Text style={styles.heading}>Description</Text>
                    <Text style={styles.descriptionText}>{jobDetail.jobDescription !== "" ? jobDetail.jobDescription : "No Description Available."}</Text>
                </View>

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

                <View style={[styles.row,{marginTop:0}]}>
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
                </View>

                <View style={[styles.row,{marginTop:0}]}>
                    <View style={[styles.borderView,{flex:1,marginRight:8}]}>
                        <Text style={styles.heading}>Drug Test</Text>
                        <JobTypeItem 
                            name={jobDetail.drugTest ? 'Yes' : 'No'}
                            parentStyle={{width:120,marginTop:8}}
                        />
                    </View>
                    <View style={[styles.borderView,{flex:1,marginLeft:8}]}>
                        <Text style={styles.heading}>Background Check</Text>
                        <JobTypeItem 
                            name={jobDetail.backgroundCheck ? 'Yes' : 'No'}
                            parentStyle={{width:120,marginTop:8}}
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
