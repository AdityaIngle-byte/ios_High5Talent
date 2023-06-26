// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/
 
// Import React in our code
import React, {useState, useEffect} from 'react';
 
// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
 
// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { colors } from '../../../values/colors';
import { images } from '../../../assets/images';
 
const GoogleSignIN = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const  {replaceScreen}=props;
 
  useEffect(() => {
      
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '877733614344-pb4jmv90iohk80shpdj07p4urn3amspq.apps.googleusercontent.com',
    });
    // Check if user is already signed in

    // _isSignedIn();
  }, []);
 
  // const _isSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (isSignedIn) {
  //       debugger;
  //     // Set User Info if user is already signed in
  //     _getCurrentUserInfo();

  //     replaceScreen(userInfo.user.givenName,userInfo.user.familyName,userInfo.user.email,userInfo.user.photo,'Google',userInfo,_signOut);
  //   } else {
  //     console.log('Please Login');
  //   }
  //   setGettingLoginStatus(false);
  // };
 
  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };
 
  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
      replaceScreen(userInfo.user.givenName,userInfo.user.familyName,userInfo.user.email,userInfo.user.photo,'Google',userInfo,_signOut);

    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };
 
  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };
 
 
    return (

       
          <View style={styles.container}>
            {
              Platform.OS==='android'?
                <GoogleSigninButton
                  style={{width: 350, height: 50,borderRadius:6,backgroundColor:'#F8F8F8'}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={_signIn}
                />
              :
                <TouchableOpacity  onPress={_signIn} style={styles.GoogleButton}>
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", borderRadius:6}}>
                    <Image 
                    source={images.googleLogo}
                    style={styles.googleLogo}
                    resizeMode='contain'
                    />
                    <Text style={styles.linkedInText}>Sign in with Google</Text>
                  </View>
                </TouchableOpacity> 
            }
          </View>
          

    );

};
 
export default GoogleSignIN;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  googleLogo:{
    height:25,
    width:80,
    borderColor:colors.linkedInColor
  },
  GoogleButton:{
      backgroundColor:colors.white,
      marginHorizontal:5,
      borderColor:'lightgray',
      borderWidth:1,
      borderRadius:6,
      width:330
  },
  linkedInText:{
      color:colors.black
  },
});
