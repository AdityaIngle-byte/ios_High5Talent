import React, { Component} from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import {transitionConfig} from './ScreenAnim'

import Splash from '../views/screens/auth/Splash';
import Login from '../views/screens/auth/Login';
import { BottomTabNavigator } from './BottomTabNavigator';
import ChangePassword from '../views/screens/home/settings/ChangePassword';
import WebViewScreen from '../views/screens/common/WebViewScreen';
import PersonalInfo from '../views/screens/home/profile/PersonalInfo';
import SelectAddress from '../views/screens/common/SelectAddress';
import Education from '../views/screens/home/profile/Education';
import SocialMedia from '../views/screens/home/profile/SocialMedia';
import ProfileStory from '../views/screens/home/profile/ProfileStory';
import Skills from '../views/screens/home/profile/Skills';
import WorkExperience from '../views/screens/home/profile/WorkExperience';
import Certificates from '../views/screens/home/profile/Certificates';
import Languages from '../views/screens/home/profile/Languages';
import Licenses from '../views/screens/home/profile/Licenses';
import CustomSections from '../views/screens/home/profile/CustomSections';
import AwardsAndHonors from '../views/screens/home/profile/AwardsAndHonors';
import JobDetail from '../views/screens/home/details/JobDetail';
import RTRDetail from '../views/screens/home/details/RTRDetail';
import ApplyJob from '../views/screens/home/details/ApplyJob';
import ResumeHome from '../views/screens/home/resume/ResumeHome';
import CreateHigh5Resume from '../views/screens/home/resume/CreateHigh5Resume';
import ResumeTemplates from '../views/screens/home/resume/template/ResumeTemplates';
import ResumePreview from '../views/screens/home/resume/template/ResumePreview';
import Preferences from '../views/screens/home/settings/Preferences';
import VideoResumeInstructions from '../views/screens/home/resume/VideoResumeInstructions';
import CreateScript from '../views/screens/home/resume/CreateScript';
import RecordVideoResume from '../views/screens/home/resume/RecordVideoResume';
import VideoPreview from '../views/screens/common/VideoPreview';
import AppliedJobDetail from '../views/screens/home/details/AppliedJobDetail';
import Notifications from '../views/screens/home/notifications/Notifications';
import PDFViewer from '../views/screens/common/PDFViewer';
import { Platform } from 'react-native';
import ViewCertificate from '../views/screens/home/learn/ViewCertificate';
import UpdateCurrencyAndRates from '../views/screens/home/settings/UpdateCurrencyAndRates';
import Faqs from '../views/screens/home/settings/Faqs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './items/CustomDrawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../values/colors';
import SearchView from '../views/screens/home/home/SearchView';
import FillContact from '../views/screens/socialMedia/FillContact';
import FillProfileInfo from '../views/screens/socialMedia/FillProfileInfo';
import FillSkills from '../views/screens/socialMedia/FillSkills';
import FillWorkExperience from '../views/screens/socialMedia/FillWorkExperience';
import FillEducation from '../views/screens/socialMedia/FillEducation';
import FillCertificates from '../views/screens/socialMedia/FillCertificates';
import FillLicenses from '../views/screens/socialMedia/FillLicenses';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Routes extends Component {


    render() {
        return (
            <NavigationContainer 
            >
                <Stack.Navigator
                    initialRouteName='Splash'
                    
                    screenOptions={{ 
                            transitionSpec : transitionConfig,
                            headerShown : false,
                            headerMode : 'float',
                            animationEnabled:Platform.OS === 'ios'?true:false
                        }}
                >
                    <Stack.Screen name={'Splash'} component={Splash} />
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'FillContact'} component={FillContact} />
                    <Stack.Screen name={'FillProfileInfo'} component={FillProfileInfo} />
                    <Stack.Screen name={'FillSkills'} component={FillSkills} />
                    <Stack.Screen name={'FillWorkExperience'} component={FillWorkExperience} />
                    <Stack.Screen name={'FillEducation'} component={FillEducation} />
                    <Stack.Screen name={'FillCertificates'} component={FillCertificates} />
                    <Stack.Screen name={'FillLicenses'} component={FillLicenses} />
                    <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
                    <Stack.Screen name={'WebView'} component={WebViewScreen} />
                    <Stack.Screen name={'ChangePassword'} component={ChangePassword} />
                    <Stack.Screen name={'SelectAddress'} component={SelectAddress} />

                    {/* Apply Job */}
                    <Stack.Screen name={'ApplyJob'} component={ApplyJob} />

                    {/* Profile Views */}
                    <Stack.Screen name={'PersonalInfo'} component={PersonalInfo} />
                    <Stack.Screen name={'Education'} component={Education} />
                    <Stack.Screen name={'SocialMedia'} component={SocialMedia} />
                    <Stack.Screen name={'ProfileStory'} component={ProfileStory} />
                    <Stack.Screen name={'Skills'} component={Skills} />
                    <Stack.Screen name={'WorkExperience'} component={WorkExperience} />
                    <Stack.Screen name={'AwardsAndHonors'} component={AwardsAndHonors} />
                    <Stack.Screen name={'Certificates'} component={Certificates} />
                    <Stack.Screen name={'Languages'} component={Languages} />
                    <Stack.Screen name={'Licenses'} component={Licenses} />
                    <Stack.Screen name={'CustomSections'} component={CustomSections} />
                    <Stack.Screen name={'UpdateCurrencyAndRates'} component={UpdateCurrencyAndRates}/>

                    <Stack.Screen name={'ResumePreview'} component={ResumePreview} />
                    {
                        Platform.OS === 'android'
                        &&
                        <Stack.Screen name={'PDFViewer'} component={PDFViewer} />
                    }

                    <Stack.Screen name={'VideoResumeInstructions'} component={VideoResumeInstructions} />
                    <Stack.Screen name={'VideoPreview'} component={VideoPreview} />

                    <Stack.Screen name={'ViewCertificate'} component={ViewCertificate} />
                    <Stack.Screen name={'Faqs'} component={Faqs} />
                    

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const DrawerStack=()=>{
    return(
        <Drawer.Navigator 
            drawerContent={props=><CustomDrawer {...props} />} 
            initialRouteName="MainRoutes" 
            screenOptions={{
                drawerActiveBackgroundColor:colors.accent,
                drawerActiveTintColor:colors.whiteColor,
                drawerInactiveTintColor:colors.accent,
            }}
        >
        <Drawer.Screen 
            name="MainRoutes" 
            component={MainRoutes} 
            options={{
                drawerItemStyle: { display: 'none' },
                headerShown:false,
                drawerIcon:({focused})=>(
                <FontAwesome5 name='home' size={20} color={focused?colors.whiteColor:colors.accent}/>  
                ),
            }}
        />

        </Drawer.Navigator>
    )
}
const MainRoutes = () => {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Home'
            screenOptions={{ transitionSpec : transitionConfig }}
        >
            {/* <Stack.Screen name={'Splash'} component={Splash} />
            <Stack.Screen name={'Login'} component={Login} /> */}
            <Stack.Screen name={'Home'} component={BottomTabNavigator} />
            <Stack.Screen name={'SearchView'} component={SearchView} />
            <Stack.Screen name={'JobDetail'} component={JobDetail} />
            <Stack.Screen name={'RTRDetail'} component={RTRDetail} />
            <Stack.Screen name={'AppliedJobDetail'} component={AppliedJobDetail} />

            <Stack.Screen name={'ResumeHome'} component={ResumeHome} />
            <Stack.Screen name={'CreateHigh5Resume'} component={CreateHigh5Resume} />
            <Stack.Screen name={'ResumeTemplates'} component={ResumeTemplates} />
            <Stack.Screen name={'Preferences'} component={Preferences} />
            <Stack.Screen name={'CreateScript'} component={CreateScript} />
            <Stack.Screen name={'RecordResume'} component={RecordVideoResume} />
            <Stack.Screen name={'Notifications'} component={Notifications} />

        </Stack.Navigator>
    )
}





{/* <Drawer.Screen name="Home" component={MainStackScreen}
        options={{
                  drawerItemStyle: { display: 'none' }
        }}
/> */}