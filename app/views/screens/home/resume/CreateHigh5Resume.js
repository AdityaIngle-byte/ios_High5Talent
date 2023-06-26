import React, { useEffect, useRef, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { setResumeViewFlags, uploadResumeFile } from '../../../../redux/actions/resumeActions'
import { showAlert } from '../../../../utils/Message'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import ButtonView from '../../../components/ButtonView'
import BaseView from '../../../hoc/BaseView'
import ProfileItemView from '../../../items/ProfileItemView'
import AddResumeName from '../../../modals/AddResumeName'
import ProfileTitleView from '../profile/items/ProfileTitleView'
import AwardsAndHonorsView from '../profile/preview/AwardsAndHonorView'
import CertificateView from '../profile/preview/CertificateView'
import CustomSectionsView from '../profile/preview/CustomSectionsView'
import EducationView from '../profile/preview/EducationView'
import ExperienceView from '../profile/preview/ExperienceView'
import LanguagesView from '../profile/preview/LanguagesView'
import LicenseView from '../profile/preview/LicenseView'
import SkillsView from '../profile/preview/SkillsView'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { checkStoragePermissions } from '../../../../utils/PermissionsCheck'

const CreateHigh5Resume = props => {

    const baseViewRef = useRef(null)
    const addResumeNameRef = useRef(null)

    const dispatch = useDispatch()

    const userPrefs = useSelector(state => state.login.userPrefs)
    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
    const profileSocialMedia = useSelector(state => state.profile.profileSocialMedia)
    const profileStory = useSelector(state => state.profile.profileStory)
    const profileSkills = useSelector(state => state.profile.profileSkills)
    const profileEducation = useSelector(state => state.profile.profileEducation)
    const profileExperiences = useSelector(state => state.profile.profileExperiences)
    const profileCertificates = useSelector(state => state.profile.profileCertificates)
    const profileAwardsAndHonorsList = useSelector(state => state.profile.profileAwardsAndHonorsList)
    const profileLanguages = useSelector(state => state.profile.profileLanguages)
    const profileLicenses = useSelector(state => state.profile.profileLicenses)
    const profileCustomSections = useSelector(state => state.profile.profileCustomSections)

    const [selectedResumeTemplate, setSelectedResumeTemplate] = useState(null)
    const [hasPersonalInfo, setHasPersonalInfo] = useState(false);
    const [hasSocialMedia, setHasSocialMedia] = useState(false);
    const [hasStoryInfo, setHasStoryInfo] = useState(false);
    const [hasSkillsData, setHasSkillsData] = useState(false);
    const [hasEducation, setHasEducation] = useState(false);
    const [hasWorkExperience, setHasWorkExperience] = useState(false);
    const [hasCertificates, setHasCertificates] = useState(false)
    const [hasAwardsAndHonors, setHasAwardsAndHonors] = useState(false);
    const [hasLanguages, setHasLanguages] = useState(false);
    const [hasLicenses, setHasLicenses] = useState(false);
    const [hasCustomSections, setHasCustomSections] = useState(false)

    const [isAndroidStoragePermissionsProvided, setIsAndroidStoragePermissionsProvided] = useState(false)

    const [data, setData] = useState(null)
    
    useEffect(() => {
        updateData()
        _checkStoragePermissions()
        return () => {  
        };
    }, [])


    const _checkStoragePermissions = () => {
        checkStoragePermissions()
            .then(response => {
                setIsAndroidStoragePermissionsProvided(true)
            })
    }


    const updateData = () => {
        setHasPersonalInfo(profilePersonalInfo !== null)
        setHasSocialMedia(profileSocialMedia !== null)
        setHasStoryInfo(profileStory !== '')
        setHasSkillsData(profileSkills !== null)
        setHasEducation(profileEducation.length > 0)
        setHasWorkExperience(profileExperiences.length > 0)
        setHasCertificates(profileCertificates.length > 0)
        setHasAwardsAndHonors(profileAwardsAndHonorsList.length > 0)
        setHasLanguages(profileLanguages.length > 0)
        setHasLicenses(profileLicenses.length > 0)
        setHasCustomSections(profileCustomSections.length > 0)
    }


    const _onAddResumeTemplate = () => {

        if(hasPersonalInfo === false){
            showAlert('error','Add Personal Info');
        }else {

            const flags = {
                hasPersonalInfo,
                hasStoryInfo,
                hasSocialMedia,
                hasSkillsData,
                hasEducation,
                hasWorkExperience,
                hasCertificates,
                hasAwardsAndHonors,
                hasLanguages,
                hasLicenses,
                hasCustomSections
            }
            
            dispatch(setResumeViewFlags(flags))
            props.navigation.navigate('ResumeTemplates',{
                onGoBack : _onSelectResume
            })
        }
    }


    const _onSelectResume = data => {
        console.log('[CreateHigh5Resume.js] on Select Resume: ',data)
        setSelectedResumeTemplate(data)
    }


    const _onSaveResume = async(title) => {
        // console.log('[CreateHigh5Resume.js] OnSave Resume : ',title,selectedResumeTemplate,RNHTMLtoPDF)

        let options = {
            html: selectedResumeTemplate.html_code,
            fileName: Platform.OS === 'android' ? title :  `${title}.pdf`,
            directory: 'Documents',
            base64 : true
        };
        

        if(Platform.OS === 'ios' || (Platform.OS === 'android' && isAndroidStoragePermissionsProvided)){
            console.log('[CreateHigh5Resume.js] OnSave Resume : ',options)
            let file = await RNHTMLtoPDF.convert(options)
            
            console.log('[CreateHigh5Resume.js] Create PDF : ',file);
            const uploadedData = {
                name : `${options.fileName}.pdf`,
                type : 'application/pdf',
                uri : Platform.OS === 'ios' ? file.filePath : `file://${file.filePath}`
            }

            if(baseViewRef !== null){
                baseViewRef.current.showLoader();
                uploadResumeFile(uploadedData)
                    .then(response => {
                        baseViewRef.current.hideLoader();
                        console.log('[CreateHigh5Resume.js] on Upload Resume : ',response)
                        showAlert('success','Resume Upload Successfully!')
                        props.route.params.onGoBack()
                        props.navigation.goBack()
                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader();
                        console.log('[CreateHigh5Resume.js] on Upload Resume : ',error)
                    })
            }
        }else if(Platform.OS === 'android' && !isAndroidStoragePermissionsProvided){
            showAlert('error', 'No Permissions Provided! Go to App Info and Provide Storage Permissions.')
        }else {
            showAlert('error', 'Something went wrong.')
        }
        

    }

    
    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='CREATE HIGH5 RESUME'
            navigation={props.navigation}
            hasNotification
            hasTitle
        >
        <ScrollView 
            style={styles.parent}
            contentContainerStyle={{paddingBottom:16}}
        >
            <View style={styles.view}>
                <Text style={styles.text}>Mark required sections to be added in your Resume</Text>
            </View>

            {
                hasPersonalInfo
                &&
                <TouchableOpacity
                    onPress={() => _onAddResumeTemplate()}
                >
                <View style={styles.addTemplateView}>
                    <Text style={[styles.text2,{flex:1}]}>Selected Template</Text>
                    <Text style={[styles.text2,{color:'#999',marginRight:8}]}>{
                        selectedResumeTemplate === null ? ' No Template Selected' : selectedResumeTemplate.title
                    }</Text>
                    <Icon 
                        name={'arrow-forward-ios'}
                        type={'material'}
                        color={'#999999'}
                        size={18}
                    />
                </View>
                </TouchableOpacity>
            }


            {/* set up contact info */}
            <ProfileTitleView 
                title='Contact Info'
                hasCheckIcon
                checked={hasPersonalInfo}
                onCheckPress={() => {
                    if(profilePersonalInfo !== null){
                        setHasPersonalInfo(prevState => !prevState)
                    }else{
                        showAlert('error','Add Personal Info')
                    }
                }}
                onPress={() => props.navigation.navigate('PersonalInfo')}
            >
                {
                    profilePersonalInfo !== null
                    &&
                    <Text style={[styles.text,{fontFamily:fonts.notoSansBold}]}>ADDED</Text>
                }
            </ProfileTitleView>

            {/* setup social media */}
            <ProfileTitleView 
                title='Social Media'
                hasCheckIcon
                checked={hasSocialMedia}
                onCheckPress={() => {
                    if(profileSocialMedia !== null){
                        setHasSocialMedia(prevState => !prevState)
                    }else{
                        showAlert('error','Add Social Info')
                    }
                }}
                onPress={() => props.navigation.navigate('SocialMedia')}
            >
                {
                    profileSocialMedia !== null
                    &&
                    <View>
                        {
                            profileSocialMedia.linkedIn !== '' 
                            &&
                            <ProfileItemView 
                                hasIcon
                                iconName='linkedin'
                                iconType='feather'
                                value={profileSocialMedia.linkedIn}
                            />
                        }
                        {
                            profileSocialMedia.website !== '' 
                            &&
                            <ProfileItemView 
                                hasIcon
                                iconName='link'
                                iconType='feather'
                                value={profileSocialMedia.website}
                            />
                        }
                    </View>
                }
            </ProfileTitleView>

            {/* setup story info */}
            <ProfileTitleView 
                title='Story Info'
                hasCheckIcon
                checked={hasStoryInfo}
                onCheckPress={() => {
                    if(profileStory !== null){
                        setHasStoryInfo(prevState => !prevState)
                    }else{
                        showAlert('error','Add Story Info')
                    }
                }}
                onPress={() => props.navigation.navigate('ProfileStory')}
            >
               {
                    profileStory !== '' 
                    &&
                    <ProfileItemView 
                        value={profileStory}
                    />
                }
            </ProfileTitleView>

            {/* set up skills */}
            <ProfileTitleView 
                title='Skills'
                hasCheckIcon
                checked={hasSkillsData}
                onCheckPress={() => {
                    if(profileSkills !== null){
                        setHasSkillsData(prevState => !prevState)
                    }else{
                        showAlert('error','Add Skills')
                    }
                }}
                onPress={() => props.navigation.navigate('Skills',{'flag' : 0})}
            >
                {
                    profileSkills !== null
                    &&
                    <SkillsView  
                        onMorePress={() => this.props.navigation.navigate('Skills',{'flag' : 0})}
                    />
                }
            </ProfileTitleView>

             {/* setup education  */}
             <ProfileTitleView 
                title='Education'
                hasCheckIcon
                checked={hasEducation}
                onCheckPress={() => {
                    if(profileEducation.length > 0){
                        setHasEducation(prevState => !prevState)
                    }else{
                        showAlert('error','Add Education')
                    }
                }}
                onPress={() => props.navigation.navigate('Education')}
            >
                <EducationView 
                    onMorePress={() => props.navigation.navigate('Education')}
                />
            </ProfileTitleView>

            {/* set up work experience */}
            <ProfileTitleView 
                title='Work Experience'
                hasCheckIcon
                checked={hasWorkExperience}
                onCheckPress={() => {
                    if(profileExperiences.length > 0){
                        setHasWorkExperience(prevState => !prevState)
                    }else{
                        showAlert('error','Add Work Experience')
                    }
                }}
                onPress={() => props.navigation.navigate('WorkExperience')}
            >
                <ExperienceView 
                    onMorePress={() => props.navigation.navigate('WorkExperience')}
                />
            </ProfileTitleView>

            
            {/* set up Certificates */}
            <ProfileTitleView 
                title='Certificates'
                hasCheckIcon
                checked={hasCertificates}
                onCheckPress={() => {
                    if(profileCertificates.length > 0){
                        setHasCertificates(prevState => !prevState)
                    }else{
                        showAlert('error','Add Certificate')
                    }
                }}
                onPress={() => props.navigation.navigate('Certificates')}
            >
                <CertificateView 
                    onMorePress={() => props.navigation.navigate('Certificates')}
                />
            </ProfileTitleView>

            {/* set up Awards & Honors */}
            <ProfileTitleView 
                title='Awards & Honors'
                hasCheckIcon
                checked={hasAwardsAndHonors}
                onCheckPress={() => {
                    if(profileAwardsAndHonorsList.length > 0){
                        setHasAwardsAndHonors(prevState => !prevState)
                    }else{
                        showAlert('error','Add Award or honor')
                    }
                }}
                onPress={() => props.navigation.navigate('AwardsAndHonors')}
            >
                <AwardsAndHonorsView 
                    onMorePress={() => props.navigation.navigate('AwardsAndHonors')}
                />
            </ProfileTitleView>

                {/* set up  Languages*/}
            <ProfileTitleView 
                title='Languages'
                hasCheckIcon
                checked={hasLanguages}
                onCheckPress={() => {
                    if(profileLanguages.length > 0) {
                        setHasLanguages(prevState => !prevState)
                    }else{
                        showAlert('error','Add Language')
                    }
                }}
                onPress={() => props.navigation.navigate('Languages')}
            >
                <LanguagesView 
                    onMorePress={() => props.navigation.navigate('Languages')}
                />
            </ProfileTitleView>
          
            
          {/* set up  Licenses*/}
            <ProfileTitleView 
                title='Licenses'
                hasCheckIcon
                checked={hasLicenses}
                onCheckPress={() => {
                    if(profileLicenses.length > 0){
                        setHasLicenses(prevState => !prevState)
                    }else{
                        showAlert('error','Add License')
                    }
                }}
                onPress={() => props.navigation.navigate('Licenses')}
            >
                <LicenseView 
                    onMorePress={() => props.navigation.navigate('Licenses')}
                />
            </ProfileTitleView>

            

            {/* set up  Custom Section*/}
            <ProfileTitleView 
                title='Custom Section'
                hasCheckIcon
                checked={hasCustomSections}
                onCheckPress={() => {
                    if(profileCustomSections.length > 0){
                        setHasCustomSections(prevState => !prevState)
                    }else{
                        showAlert('error','Add Custom Section')
                    }
                }}
                onPress={() => props.navigation.navigate('CustomSections')}
            >
                <CustomSectionsView 
                    onMorePress={() => props.navigation.navigate('CustomSections')}
                />
            </ProfileTitleView>
        </ScrollView>
            <View style={styles.row}>
                <ButtonView 
                    title='Reset'
                    containerStyle={{flex:1,marginRight:8}}
                    // buttonStyle={{height:40}}
                    titleStyle={{margin:0}}
                    outline
                    onPress={() => updateData()}
                />
                <ButtonView 
                    title={`${data !== null ? 'Update' : 'Save'} Resume`}
                    containerStyle={{flex:1,marginLeft:8}}
                    // buttonStyle={{height:40}}
                    titleStyle={{margin:0}}
                    onPress={() => {
                        if(addResumeNameRef !== null){
                            addResumeNameRef.current.baseModal.showModal()
                            if(data !== null){
                                addResumeNameRef.current.init(data.title)
                            }
                        }
                       
                    }}
                    disabled={selectedResumeTemplate === null}
                />
            </View>

            <AddResumeName 
                ref={addResumeNameRef}
                setResumeTitle={_onSaveResume}
            />
        </BaseView>
    )
}

export default CreateHigh5Resume

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    view : {
        backgroundColor: '#d3d3d3',
        marginHorizontal:16,
        marginTop:16,
        paddingHorizontal:16,
        paddingVertical:16,
        borderRadius:8,
    },
    text : {
        color:colors.defaultTextColor,
        fontSize:12,
        fontFamily:fonts.notoSansRegular,
        // paddingTop:4,
    },
    addTemplateView : {
        backgroundColor: '#d3d3d3',
        marginHorizontal:16,
        marginTop:16,
        paddingHorizontal:16,
        paddingVertical:16,
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
    },
    text2 : {
        color:colors.defaultTextColor,
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        // paddingTop:4,
    },
    row : {
        paddingBottom:24,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:16,
        backgroundColor: '#fff',
    }
})
