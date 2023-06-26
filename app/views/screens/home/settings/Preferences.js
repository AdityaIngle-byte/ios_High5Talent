import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { currencyList } from '../../../../json/currencyList'
import { setPreferences, updatePreferencesSettings, updatePrivacySettings } from '../../../../redux/actions/profileActions'
import { showAlert } from '../../../../utils/Message'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import CheckBoxView from '../../../components/CheckBoxView'
import TagButton from '../../../components/TagButton'
import BaseView from '../../../hoc/BaseView'

const Preferences = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()

    const userPrefs = useSelector(state => state.login.userPrefs)
    const preferences = useSelector(state => state.profile.preferences)
    const currencyAndRates = preferences.currencyAndRates;

    const [fullTimeJob, setFullTimeJob] = useState(false);
    const [contractJob, setContractJob] = useState(false);
    const [partTimeJob, setPartTimeJob] = useState(false);
    const [tempJob, setTempJob] = useState(false);
    const [volunteerJob, setVolunteerJob] = useState(false);
    const [locations, setLocations] = useState([])

    const [showContactInfo, setShowContactInfo] = useState(false);
    const [showSocialMedia, setShowSocialMedia] = useState(false);
    const [showStoryInfo, setShowStoryInfo] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showLicenses, setShowLicenses] = useState(false);
    const [showCustomSections, setShowCustomSections] = useState(false);
    const [showAwards, setShowAwards] = useState(false);
    const [showResumes, setShowResumes] = useState(false);
    const [showCertificates, setShowCertificates] = useState(false);

    


    useEffect(() => {
        _init()
        // _updateCurrency()
        return () => {
            
        };
    }, [])


    // const _updateCurrency = () => {
    //     const list = [];
    //     Object.keys(currencyList)
    //         .forEach(key => {
    //             const data = {
    //                 ...currencyList[key],
    //                 short_name : key
    //             }
    //             list.push(data);
    //         })
    //     console.log('[Preferences.js] CurrencyList : ',JSON.stringify(list));
    // }


    const _init = () => {
        // console.log('[Preferences.js] init : ',preferences)
        if(preferences !== null){

            const positionTypes = preferences.positionTypeSettings;
            positionTypes.forEach(it => {
                if(it === 'Fulltime'){
                    setFullTimeJob(true)
                }

                if(it === 'Part Time'){
                    setPartTimeJob(true)
                }

                if(it === 'Contract'){
                    setContractJob(true)
                }

                if(it === 'Temp to Hire'){
                    setTempJob(true)
                }

                if(it === 'Volunteer'){
                    setVolunteerJob(true)
                }
            })

            setLocations(preferences.preferredLocations)

            const privacy = preferences.privacySettings
            privacy.forEach(it => {
                if(it.name === 'Contact Info'){
                    setShowContactInfo(it.status)
                }
    
                if(it.name === 'Social Media Details'){
                    setShowSocialMedia(it.status)
                }
    
                if(it.name === 'Story Info'){
                    setShowStoryInfo(it.status)
                }
    
                if(it.name === 'Skills'){
                    setShowSkills(it.status)
                }
    
                if(it.name === 'Experience'){
                    setShowExperience(it.status)
                }
    
                if(it.name === 'Education Details'){
                    setShowEducation(it.status)
                }
    
                if(it.name === 'Languages'){
                    setShowLanguages(it.status)
                }
    
                if(it.name === 'Licences'){
                    setShowLicenses(it.status)
                }
    
                if(it.name === 'Custom Section'){
                    setShowCustomSections(it.status)
                }
    
                if(it.name === 'Awards and Honors'){
                    setShowAwards(it.status)
                }
    
                if(it.name === 'Resumes'){
                    setShowResumes(it.status)
                }
    
                if(it.name === 'Certificates'){
                    setShowCertificates(it.status)
                }
            })

        }
    }


    const _renderLocationItem = (item,index) => {
        return (
            <View style={styles.locationView}>
                <Text style={styles.locationText}>{item}</Text>
                <TouchableOpacity
                    style={{padding:4}}
                    onPress={() => _onDeleteLocation(item)}
                >
                    <Icon 
                        name='close'
                        type='ant-design'
                        size={14}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    const _onDeleteLocation = item => {
        const list = locations.filter(it => it !== item)
        setLocations(list)
    }


    const _onAddLocation = () => {
        props.navigation.navigate('SelectAddress',{
            onGoBack : _setAddress
        })
    }


    const _setAddress = address => {
        console.log('[Preferences.js] on Set Address : ',address)
        // setAddress(address)
        const list = [`${address.city}, ${address.state} ,${address.country}`, ...locations]
        setLocations(list)
    }


    const _savePositionTypes = () => {

        const preferredPositionTypesJson = [];

        if(volunteerJob) preferredPositionTypesJson.push("Volunteer")
        if(tempJob) preferredPositionTypesJson.push("Temp to Hire")
        if(partTimeJob) preferredPositionTypesJson.push("Part Time")
        if(contractJob) preferredPositionTypesJson.push("Contract")
        if(fullTimeJob) preferredPositionTypesJson.push("Fulltime")


        const updatedData =  {
            "createdby": "204",
            "clickName" :"candidatePreferences",
            "candidateID": userPrefs.candidateId,
            "preferredLocations":locations,
            "preferredPositionTypes": preferredPositionTypesJson
         }  

        //  console.log('[Preferences.js] Update _savePositionTypes : ',updatedData)
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            updatePreferencesSettings(updatedData)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    showAlert('success',response.Result)
                    const data = preferences;
                    data.positionTypeSettings = updatedData.preferredPositionTypes;
                    data.preferredLocations = updatedData.preferredLocations;
                    console.log('[Preferences.js] Update preferences settings : ',response,data)
                    dispatch(setPreferences(data))

                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[Preferences.js] Update preferences settings : ',error)
                })
        }
    }


    const _savePrivacySettings = () => {
        const updatePrivacyData = {
            "candidateId": userPrefs.candidateId,
            "clickName" :"privacy",
            "userPrivacyInfo": [
                {"name": "Contact Info",  "status": showContactInfo},
                {"name": "Social Media Details", "status": showSocialMedia},
                {"name": "Story Info","status": showStoryInfo},
                {"name": "Skills","status": showSkills},
                {"name": "Experience","status": showExperience},
                {"name": "Education Details","status": showEducation},
                {"name": "Languages","status": showLanguages},
                {"name": "Licences","status": showLicenses},
                {"name": "Custom Section","status": showCustomSections},
                {"name": "Awards and Honors","status": showAwards},
                {"name": "Resumes","status": showResumes},
                {"name": "Certificates","status": showCertificates}
            ]
        }

        // console.log('[Preferences.js] On update Privacy Settings : ',updatePrivacyData)
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            updatePrivacySettings(updatePrivacyData)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    
                    showAlert('success',response.Result)
                    const data = preferences;
                    data.privacySettings = updatePrivacyData.userPrivacyInfo;
                    console.log('[Preferences.js] Update privacy settings : ',response,data)
                    dispatch(setPreferences(data))

                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[Preferences.js] Update privacy settings : ',error)
                })
        }
    }



    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasTitle
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='PREFERENCES'
            navigation={props.navigation}
        >
        <ScrollView 
            style={styles.parent}
            contentContainerStyle={{paddingBottom:48}}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.headingView}>
                <Text style={styles.headingText}>Preferences</Text>
                <TagButton 
                    title='Save'
                    containerStyle={{marginTop:0}}
                    buttonStyle={{backgroundColor:colors.acceptBtn}}
                    titleStyle={{color:'#fff'}}
                    parentStyle={{marginRight:0}}
                    onPress={() => _savePositionTypes()}
                />
            </View>
            <View style={styles.view}>
                <CheckBoxView 
                    title={`I'm interested in Full-Time Jobs`}
                    checked={fullTimeJob}
                    onPress={() => setFullTimeJob(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`I'm interested in Contract Jobs`}
                    checked={contractJob}
                    onPress={() => setContractJob(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`I'm interested in Part-Time Jobs`}
                    checked={partTimeJob}
                    onPress={() => setPartTimeJob(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`I'm interested in Temp to Hire Jobs`}
                    checked={tempJob}
                    onPress={() => setTempJob(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`I'm interested in Volunteer Jobs`}
                    checked={volunteerJob}
                    onPress={() => setVolunteerJob(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
                    <Text style={styles.text}>Preferred Locations</Text>
                    <TagButton 
                        title='Add Location'
                        size='small'
                        onPress={() => _onAddLocation()}
                    />
                    
                </View>
                <ScrollView
                    horizontal
                >
                    {locations.map((item,index) => _renderLocationItem(item,index))}
                </ScrollView>
            </View>


            <View style={styles.headingView}>
                <Text style={styles.headingText}>Currency and Rates</Text>
                <TagButton 
                    title='Edit'
                    parentStyle={{marginRight:0}}
                    containerStyle={{marginTop:0}}
                    buttonStyle={{backgroundColor:colors.acceptBtn}}
                    titleStyle={{color:'#fff'}}
                    onPress={() => props.navigation.navigate('UpdateCurrencyAndRates')}
                />
            </View>
            <View style={styles.view}>
                <CheckBoxView 
                    title={`Preferred Currency`}
                    hasCheckView={false}
                    value={currencyAndRates.preferredSalaryCurrency}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Minimum Hourly Rate`}
                    hasCheckView={false}
                    value={currencyAndRates.minContractRate}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Minimum Annual Salary`}
                    hasCheckView={false}
                    value={currencyAndRates.preferredSalary}
                    parentStyle={styles.checkParentStyle}
                />
            </View>
                


            <View style={styles.headingView}>
                <Text style={styles.headingText}>Privacy Settings</Text>
                <TagButton 
                    title='Save'
                    parentStyle={{marginRight:0}}
                    containerStyle={{marginTop:0}}
                    buttonStyle={{backgroundColor:colors.acceptBtn}}
                    titleStyle={{color:'#fff'}}
                    onPress={() => _savePrivacySettings()}
                />
            </View>
            <View style={styles.view}>
                <CheckBoxView 
                    title={`Show My Contact Info to Recruiters and Companies`}
                    checked={showContactInfo}
                    onPress={() => setShowContactInfo(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Social Media Details to Recruiters and Companies`}
                    checked={showSocialMedia}
                    onPress={() => setShowSocialMedia(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Story Info to Recruiters and Companies`}
                    checked={showStoryInfo}
                    onPress={() => setShowStoryInfo(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Skills to Recruiters and Companies`}
                    checked={showSkills}
                    onPress={() => setShowSkills(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Experience to Recruiters and Companies`}
                    checked={showExperience}
                    onPress={() => setShowExperience(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Education Details to Recruiters and Companies`}
                    checked={showEducation}
                    onPress={() => setShowEducation(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Languages to Recruiters and Companies`}
                    checked={showLanguages}
                    onPress={() => setShowLanguages(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Licenses to Recruiters and Companies`}
                    checked={showLicenses}
                    onPress={() => setShowLicenses(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Custom Section to Recruiters and Companies`}
                    checked={showCustomSections}
                    onPress={() => setShowCustomSections(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Awards and Honors to Recruiters and Companies`}
                    checked={showAwards}
                    onPress={() => setShowAwards(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Resumes to Recruiters and Companies`}
                    checked={showResumes}
                    onPress={() => setShowResumes(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
                <CheckBoxView 
                    title={`Show My Certificates to Recruiters and Companies`}
                    checked={showCertificates}
                    onPress={() => setShowCertificates(prevState => !prevState)}
                    parentStyle={styles.checkParentStyle}
                />
            </View>

            

        </ScrollView>
        </BaseView>
    )
}

export default Preferences

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:12

    },
    headingView : {
        marginTop:16,
        backgroundColor: '#e0e0e0',
        paddingVertical:8,
        paddingHorizontal:12,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    headingText : {
        fontSize:18,
        fontFamily:fonts.notoSansBold,
        color:colors.defaultTextColor
    },
    checkParentStyle : {
        borderBottomWidth:1,
        borderBottomColor:'#e0e0e0'
    },
    view : {
        backgroundColor:'#fff',
        paddingHorizontal:12,
        paddingBottom:8,
        borderRadius:4,
        marginTop:12
    },
    locationView : {
        backgroundColor:'#DEEDFF',
        paddingLeft:8,
        paddingRight:4,
        paddingVertical:2,
        marginBottom:8,
        marginRight:8,
        marginTop:4,
        borderRadius:4,
        flexDirection:'row',
        alignItems:'center'
    },
    locationText : {
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        fontSize:12,
        textTransform:'capitalize'
    },
    text : {
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        fontSize:14,
        
    }
})






