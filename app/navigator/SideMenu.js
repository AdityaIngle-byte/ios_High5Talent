import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { images } from '../assets/images'
import { clearUserPrefs } from '../utils/UserPrefs'
import { colors } from '../values/colors'
import { fonts } from '../values/fonts'
import BaseView from '../views/hoc/BaseView'
import { SideMenuItem } from './items/SideMenuItem'


const SideMenu = (props,selectedTab,_setBottomTab,onLogout) => {


    _navigateTo = (screenName) => {
        props.navigation.navigate(screenName)
        props.navigation.closeDrawer()
        _setBottomTab(screenName)
    }


    const _onLogout = () => {
        clearUserPrefs()
        onLogout()
        props.navigation.replace('Splash')
    }

   
    return (
        
        <BaseView
            hasStatusBar
            statusBarColor={colors.accent}
            hasHeader
            headerTitle={'Menu'}
            hasBack
            onBackPress={() => props.navigation.closeDrawer()}
            hasNotification
            navigation={props.navigation}
        >
        <View style={styles.parent}>
        <ScrollView style={{flex:1}}>
            
            
            <SideMenuItem 
                hasImage
                source={images.interviewer}
                title='Interviewer'
                onPress={() => _navigateTo('Interviewer')}
            />

            <SideMenuItem 
                hasImage
                source={images.searchAgent}
                title='Job Search Agent'
                onPress={() => _navigateTo('SearchAgent')}
            />


            <SideMenuItem 
                hasIcon
                iconName='external-link'
                iconType='feather'
                title='See how High5 Hire Works'
                onPress={() => {
                    props.navigation.navigate('WebView',{
                        'url' : 'http://high5hire.com/',
                        'title' : `How High5Hire Works?`
                    })
                    props.navigation.closeDrawer()
                }}
            />

            <Text style={styles.accountText}>Account</Text>

            <SideMenuItem 
                hasIcon
                iconName='sliders'
                iconType='feather'
                title='Preferences'
                onPress={() => _navigateTo('Preferences')}
            />

            <SideMenuItem 
                hasIcon
                iconName='key'
                iconType='feather'
                title='Change Password'
                onPress={() => {
                        // _navigateTo('ChangePassword')
                        props.navigation.navigate('ChangePassword',{'type' : 0})
                        props.navigation.closeDrawer()
                        _setBottomTab('ChangePassword')
                    }}
            />

            <SideMenuItem 
                hasIcon
                iconName='bell'
                iconType='feather'
                title='Notifications'
                hasCheckBox
                onCheckPress={flag => {}}
            />


            <SideMenuItem 
                hasIcon
                iconName='log-out'
                iconType='feather'
                title='Logout'
                color={colors.alertColor}
                onPress={() => _onLogout()}
            />

            <TouchableOpacity
                style={{marginTop:8}}
                onPress={() => {
                        // _navigateTo('ChangePassword')
                        props.navigation.navigate('ChangePassword',{'type' : 1})
                        props.navigation.closeDrawer()
                        _setBottomTab('ChangePassword')
                    }}
            >
            {/* <View style={{borderBottomWidth:0.5,marginVertical:8,width:128}}> */}
                <Text style={styles.deactivateText}>Deactivate Account</Text>
            {/* </View> */}
            </TouchableOpacity>
            
        </ScrollView>
        </View>

            {/* <ChangePassword 
                // ref={ref=>this.changePassword=ref}
                // setPassword={this._onChangePassword}
            /> */}

        </BaseView>
        

    )
}

export default SideMenu

const styles = StyleSheet.create({
    parent : {
        flex:1,
        backgroundColor:'#FAFAFA',
        paddingHorizontal:12,
        // paddingTop:32
    },
    deactivateText : {
        fontSize:12,
        color:colors.defaultTextColor,
        paddingLeft:16,
        fontFamily:fonts.notoSansRegular,
        fontWeight:'400',
        
    },
    accountText : {
        fontSize:12,
        color:'#999',
        // paddingLeft:16,
        fontFamily:fonts.notoSansRegular,
        fontWeight:'400',
        marginTop:24
    }
});


