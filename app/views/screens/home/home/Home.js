import React, { useEffect, useRef, useState } from 'react'
import { Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getHomeData, setAppliedJobsList, setFavJobsList, setMatchedJobsList, setTovutiUserId } from '../../../../redux/actions/homeActions'
import { setPreferences, setProfileAwardsAndHonors, setProfileCertificates, setProfileCustomSections, setProfileEducation, setProfileExperiences, setProfileImage, setProfileLanguages, setProfileLicenses, setProfilePersonalInfo, setProfileSkills, setProfileSocialMedia, setProfileStory } from '../../../../redux/actions/profileActions'
import { setResumeList } from '../../../../redux/actions/resumeActions'
import { saveTovutiUser } from '../../../../utils/UserPrefs'
import { colors } from '../../../../values/colors'
import BaseView from '../../../hoc/BaseView'
import UserView from '../../../items/UserView'
import InterviewsView from './InterviewsView'
import ItemView from './items/ItemView'
import MyJobsView from './MyJobsView'
import MatchedJobsView from './MatchedJobsView'
import MyTodosView from './MyTodosView'
import ResumeView from './ResumeView'
import ShortProfileView from '../../../items/ShortProfileView'
import { images } from '../../../../assets/images'

const Home = props => {

    const baseViewRef = useRef(null)
    
    const dispatch = useDispatch();
    
    const [refreshing, setRefreshing] = useState(false)
    const [percentageProfile,setPercentageProfile] = useState(0);
    const [searchQuery, setSearchQuery] =useState('');
    const personalInfo = useSelector(state => state.profile.profilePersonalInfo);
    const profileImage = useSelector(state => state.profile.profileImage);
    const resumeList = useSelector(state => state.resume.resumeList);
    const [isprofileImageNull,setIsProfileImageNull] = useState(true);

    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            debugger;
            _getHomeData();
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {
            unsubscribe();
        }
    }, [percentageProfile])


    const _getHomeData = () => {
        setRefreshing(true);
        getHomeData()
            .then(response => {
                setRefreshing(false);
                console.log('[Home.js] [Aditya] Get Home Data: ',response)
                updateProfile(response.profileDetail,response.resumeList)
                dispatch(setMatchedJobsList(response.matchedJobs))
                dispatch(setFavJobsList(response.favouritedJobs))
                dispatch(setAppliedJobsList(response.appliedJobs))
                dispatch(setResumeList(response.resumeList))
                dispatch(setPreferences(response.preferences))
                if(response.profileImage !== null && response.profileImage!==undefined){
                    dispatch(setProfileImage(response.profileImage))
                    setIsProfileImageNull(false)
                } 
            })
            .catch(error => {
                setRefreshing(false);
                setIsProfileImageNull(true)
                dispatch(setProfileImage(images.userImage))
                console.log('[Home.js] Get Home Data Error: ',error)
            })
    }

    function isNullEmptyBlank(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    const updateProfile = (profile,resume) => {
        var percentage = 0;
        if(profile !== null){
            //update tovuti userId
            // dispatch(setTovutiUserId(profile.tovutiUserId))
            // saveTovutiUser(profile.tovutiUserId)

            //update contact info
            const contactInfo = {
                firstName : profile.firstName,
                lastName : profile.lastName,
                address : {
                    addressLine1 : profile.address,
                    addressLine2 : '',
                    city : profile.addressCity,
                    country : profile.country,
                    state : profile.addressState,
                    postalCode : profile.zipCode,
                    county : ''
                },
                primaryCountryCode : {
                    name: profile.country, 
                    flag: ' ', 
                    code: ' ', 
                    dial_code: profile.mobilePhoneCode
                },
                primaryPhone : profile.mobilePhone, 
                alternateCountryCode: {
                    name: profile.country, 
                    flag: ' ', 
                    code: ' ', 
                    dial_code: profile.workPhoneCode
                }, 
                alternatePhone : profile.workPhone,
                email : profile.email,
                imageURL : profile.ImageURL,
                designation : profile.designation,
                currentJobTitle:profile.currentJobTitle,
                experienceYear:profile.experienceYear,
                experienceMonth:profile.experienceMonth,
            }
            debugger;
            if (!isNullEmptyBlank(profile.firstName)) {
                percentage = percentage + 6.67;
            }
            if (!isNullEmptyBlank(profile.lastName)) {
                percentage = percentage + 6.67;
            }
            if (!isNullEmptyBlank(profile.mobilePhone)) {
                percentage = percentage + 6.67;
            }
            if (!isNullEmptyBlank(profile.email)) {
                percentage = percentage + 6.67;
            }
            if (!isNullEmptyBlank(profile.address)) {
                percentage = percentage + 6.67;
            }else if(!isNullEmptyBlank(profile.addressCity)){
                percentage = percentage + 6.67;
            }else if(!isNullEmptyBlank(profile.country)){
                percentage = percentage + 6.67;
            }else if(!isNullEmptyBlank(profile.state)){
                percentage = percentage + 6.67;
            }
          
           
            dispatch(setProfilePersonalInfo(contactInfo))



            //update Story info
            if(profile.storyInfo !== null){
                dispatch(setProfileStory(profile.storyInfo))
            }
            if (!isNullEmptyBlank(profile.storyInfo)) {
                percentage = percentage + 6.67;
            }

            //update social media
            const socialMedia = {
                linkedIn : (profile.linkedIn !== ' ' && profile.linkedIn !== null) ? profile.linkedIn : ' ',
                website : (profile.website !== ' ' && profile.website !== null) ? profile.website : ' '
            }

            if (!isNullEmptyBlank(socialMedia.linkedIn)) {
                percentage = percentage + 6.67;
            }else if(!isNullEmptyBlank(socialMedia.linkedIn)){ 
                percentage = percentage + 6.67;
            } 
            
            dispatch(setProfileSocialMedia(socialMedia))


            //update skills
            const skillsData = {
                primarySkills : profile.primarySkills,
                skillSet : profile.skillSet,
                secondarySkills:profile.secondarySkills
            }

            if (profile.primarySkills.length>0) {
                percentage = percentage + 6.67;
            }else if(profile.skillSet.length>0){ 
                percentage = percentage + 6.67;
            } 

            dispatch(setProfileSkills(skillsData))
            debugger;
            //update Education
            dispatch(setProfileEducation(profile.education))
        
            if (profile.education.length>0) {
                percentage = percentage + 6.67;
            }
           
            //update experience
            dispatch(setProfileExperiences(profile.experience))
          
            if (profile.experience.length>0) {
                percentage = percentage + 6.67;
            }

            //update certificates
            dispatch(setProfileCertificates(profile.certificates))
           
            if (profile.certificates.length>0) {
                percentage = percentage + 6.67;
            }

            //update awards and honors
            dispatch(setProfileAwardsAndHonors(profile.AwardsandHonors))
          
            if (profile.AwardsandHonors.length>0) {
                percentage = percentage + 6.67;
            }

            //update languages
            dispatch(setProfileLanguages(profile.language))

            if (profile.language.length>0) {
                percentage = percentage + 6.67;
            }

            //update licenses
            dispatch(setProfileLicenses(profile.license))

            if (profile.license.length>0) {
                percentage = percentage + 6.67;
            }

            //Check resume if present

            if (resume.length>0) {
                percentage = percentage + 6.67;
            }

            setPercentageProfile(percentage/100);
            //update custom sections
            dispatch(setProfileCustomSections(profile.customsection))

        }

    }
    

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasProfileIcon
            hasSearchBar
            onChangeSearch={onChangeSearch}
            navigation={props.navigation}
            hasNotification
            hasFaq
            headerParentStyle={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}
        >
        <View style={{flex:1,backgroundColor: '#F5F7FB'}}>
        <ScrollView 
            contentContainerStyle={{paddingBottom:64}}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={() => _getHomeData()}
                />
            }
        >

            {/* <UserView 
                hasData
                // onSearchJobPress={() => props.navigation.navigate('SearchJobs')}
                navigation={props.navigation}
            /> */}

            <View style={styles.welcomeParent}>
                <View>
                    <Text style={styles.welcomeChild1}>Hi. 👋 Welcome Back</Text>
                    <View style={styles.welcomeChild2}>
                        <Text  style={styles.welcomeChild3}> What can we help you work on today?</Text>
                    </View>
                </View>
            </View>
 
                <ShortProfileView
                index={0}
                item={personalInfo}
                profileImage={profileImage}
                percentage={percentageProfile}
                isprofileImageNull={isprofileImageNull}
                edit={()=>props.navigation.navigate('PersonalInfo')}
                />

        
            <ItemView 
                title='My Resumes'
                isCollapsed={true}
            >

                <ResumeView 
                    {...props}
                />

            </ItemView>
             {/* <ItemView 
                title='Upcoming Interviews'
            >
                <InterviewsView {...props}/>
            </ItemView> 

            {/*   <ItemView 
                title='Continue Learning'
            >
                
            </ItemView> */}

            {/* My Todos View */}
            <ItemView 
                title='My Todos'
                isCollapsed={true}
            >
                <MyTodosView 
                    {...props}
                    fromHome={true}
                />   
            </ItemView> 

            {/* My Jobs View */}
            <ItemView 
                title='My Jobs'
                isCollapsed={true}
            >
                <MyJobsView 
                    {...props}
                    fromHome={true}
                />
            </ItemView>

            <View style={{margin:5}}>
                <Text style={{fontSize:20,fontWeight:"bold",margin:10}}>Recommended Jobs</Text>
                <MatchedJobsView 
                    {...props}
                />
            </View>


        </ScrollView>
        </View>
        </BaseView>
    )
}

export default Home

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    welcomeParent:{
        justifyContent:"center",
        alignItems:"center",
        height:100
    },
    welcomeChild1:{
        fontSize:20,
        fontWeight:'bold',
        fontFamily: Platform.OS=='android'?'notoserif':null,
        textAlign:"center"
    },
    welcomeChild2:{
        justifyContent:"center",
        alignItems:"center"
    },
    welcomeChild3:{
        fontSize:13,
        fontFamily: Platform.OS=='android'?'notoserif':null,
    }
})
