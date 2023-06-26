import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View,Platform} from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import BaseView from '../../../hoc/BaseView'
import ProfileItemView from '../../../items/ProfileItemView'
import UserView from '../../../items/UserView'
import ProfileTitleView from './items/ProfileTitleView'
import AwardsAndHonorsView from './preview/AwardsAndHonorView'
import CertificateView from './preview/CertificateView'
import CustomSectionsView from './preview/CustomSectionsView'
import EducationView from './preview/EducationView'
import ExperienceView from './preview/ExperienceView'
import LanguagesView from './preview/LanguagesView'
import LicenseView from './preview/LicenseView'
import SkillsView from './preview/SkillsView'

const Profile = props => {

    const baseViewRef = useRef(null)

    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
    const profileSocialMedia = useSelector(state => state.profile.profileSocialMedia)
    const profileStory = useSelector(state => state.profile.profileStory)
    const profileSkills = useSelector(state => state.profile.profileSkills)
    const personalInfo = useSelector(state => state.profile.profilePersonalInfo);
    console.log("This is Profile personal info");
    console.log(profilePersonalInfo);
    console.log("This Profile Social Media");
    console.log(profileSocialMedia);
    console.log("This Profile Story");
    console.log(profileStory);
    console.log("This Profile Skills");
    console.log(profileSkills);

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasProfileIcon
            hasSearchBar
            navigation={props.navigation}
            hasNotification
            hasFaq
            hasPreferences
            onPreferences={() => props.navigation.navigate('Preferences')} 
            headerParentStyle={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}
        >
             {/* 
            */}
        <ScrollView 
            style={styles.parent}
            contentContainerStyle={{paddingBottom:24}}
        >

            {/* <UserView 
                navigation={props.navigation}
                isUserDisabled
            /> */}
     

             {/* set up contact info */}
            <ProfileTitleView 
                title='Contact Info'
                hasIcon
                iconName='user'
                iconType='feather'
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
                hasIcon
                iconName='package'
                iconType='feather'
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
                hasIcon
                iconName='file-text'
                iconType='feather'
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
                hasIcon
                iconName='head-cog-outline'
                iconType='material-community'
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
                hasIcon
                iconName='book-open'
                iconType='feather'
                onPress={() => props.navigation.navigate('Education')}
            >
                <EducationView 
                    onMorePress={() => props.navigation.navigate('Education')}
                />
            </ProfileTitleView>

            {/* set up work experience */}
            <ProfileTitleView 
                title='Work Experience'
                hasIcon
                iconName='certificate-outline'
                iconType='material-community'
                onPress={() => props.navigation.navigate('WorkExperience')}
            >
                <ExperienceView 
                    onMorePress={() => props.navigation.navigate('WorkExperience')}
                />
            </ProfileTitleView>

            
            {/* set up Certificates */}
            <ProfileTitleView 
                title='Certificates'
                hasIcon
                iconName='file-minus'
                iconType='feather'
                onPress={() => props.navigation.navigate('Certificates')}
            >
                <CertificateView 
                    onMorePress={() => props.navigation.navigate('Certificates')}
                />
            </ProfileTitleView>

            {/* set up Awards & Honors */}
            <ProfileTitleView 
                title='Awards & Honors'
                hasIcon
                iconName='award'
                iconType='feather'
                onPress={() => props.navigation.navigate('AwardsAndHonors')}
            >
                <AwardsAndHonorsView 
                    onMorePress={() => props.navigation.navigate('AwardsAndHonors')}
                />
            </ProfileTitleView>

                {/* set up  Languages*/}
            <ProfileTitleView 
                title='Languages'
                hasIcon
                iconName='language'
                iconType='material'
                onPress={() => props.navigation.navigate('Languages')}
            >
                <LanguagesView 
                    onMorePress={() => props.navigation.navigate('Languages')}
                />
            </ProfileTitleView>
          
            
          {/* set up  Licenses*/}
            <ProfileTitleView 
                title='Licenses'
                hasIcon
                iconName='file-minus'
                iconType='feather'
                onPress={() => props.navigation.navigate('Licenses')}
            >
                <LicenseView 
                    onMorePress={() => props.navigation.navigate('Licenses')}
                />
            </ProfileTitleView>

            

            {/* set up  Custom Section*/}
                <ProfileTitleView 
                    title='Custom Section'
                    hasIcon
                    iconName='perm-data-setting'
                    iconType='material'
                    onPress={() => props.navigation.navigate('CustomSections')}
                >
                    <CustomSectionsView 
                        onMorePress={() => props.navigation.navigate('CustomSections')}
                    />
                </ProfileTitleView>

                <ProfileTitleView 
                    title='Resumes'
                    hasIcon
                    iconName='results-demographics'
                    iconType='foundation'
                    onPress={() => props.navigation.navigate('ResumeHome')}
                />


                <ProfileTitleView 
                    title='Change Password'
                    hasIcon
                    iconName='lock'
                    iconType='feather'
                    onPress={() => props.navigation.navigate('ChangePassword')}
                />
           
        </ScrollView>
        </BaseView>
    )
}

export default Profile

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    text : {
        color:colors.successColor,
        fontSize:12,
        fontFamily:fonts.notoSansRegular,
        paddingTop:4,
        marginLeft:36
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
