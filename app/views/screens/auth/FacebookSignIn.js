// // import React, { Fragment } from 'react';
// // import LoginController from './LoginController';
// // const FacebookHome = () => {return (<LoginController/>);};
// // export default FacebookHome;


// // Example of Facebook Sign In integration in React Native
// // https://aboutreact.com/react-native-facebook-login/
 
// // Import React in our code
// import React, {useState} from 'react';
 
// // Import all the components we are going to use
// import {
//   SafeAreaView,
//   View,
//   StyleSheet,
//   Text,
//   Image
// } from 'react-native';
 
// // Import FBSDK
// import {
//   LoginButton,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
 
// const FacebookHome = () => {
//   const [userName, setUserName] = useState('');
//   const [token, setToken] = useState('');
//   const [profilePic, setProfilePic] = useState('');
 
//   const getResponseInfo = (error, result) => {
//     if (error) {
//       //Alert for the Error
//       alert('Error fetching data: ' + error.toString());
//     } else {
//       //response alert
//       console.log(JSON.stringify(result));
//       setUserName('Welcome ' + result.name);
//       setToken('User Token: ' + result.id);
//       setProfilePic(result.picture.data.url);
//     }
//   };
 
//   const onLogout = () => {
//     //Clear the state after logout
//     setUserName(null);
//     setToken(null);
//     setProfilePic(null);
//   };
 
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Text style={styles.titleText}>
//         Example of Facebook Sign In integration in React Native
//       </Text>
//       <View style={styles.container}>
//         {profilePic ? (
//           <Image
//             source={{uri: profilePic}}
//             style={styles.imageStyle}
//           />
//         ) : null}
//         <Text style={styles.textStyle}> {userName} </Text>
//         <Text style={styles.textStyle}> {token} </Text>
//         <LoginButton
//         permissions={["email"]}
//           onLoginFinished={(error, result) => {
//             if (error) {
//               alert(error);
//               console.log('Login has error: ' + result.error);
//             } else if (result.isCancelled) {
//               alert('Login is cancelled.');
//             } else {
//               AccessToken.getCurrentAccessToken().then((data) => {
//                 console.log(data.accessToken.toString());
//                 const processRequest = new GraphRequest(
//                   '/me?fields=name,email,picture.type(large)',
//                   null,
//                   getResponseInfo,
//                 );
//                 // Start the graph request.
//                 new GraphRequestManager()
//                   .addRequest(processRequest).start();
//               });
//             }
//           }}
//           onLogoutFinished={onLogout}
//         />
//       </View>
//       <Text style={styles.footerHeading}>
//         Facebook Sign In integration in React Native
//       </Text>
//       <Text style={styles.footerText}>
//         www.aboutreact.com
//       </Text>
//     </SafeAreaView>
//   );
// };
 
// export default FacebookHome;
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     fontSize: 20,
//     color: '#000',
//     textAlign: 'center',
//     padding: 10,
//   },
//   imageStyle: {
//     width: 200,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 20,
//   },
//   footerHeading: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   footerText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'grey',
//   },
// });

import React, { useState } from 'react'
import { Button, TouchableOpacity,StyleSheet,View,Text } from 'react-native'
import { colors } from '../../../values/colors';


import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';

const  FacebookHome =()=> {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');

    const getResponseInfo = (error, result) => {
        if (error) {
        //Alert for the Error
         alert('Error fetching data: ' + error.toString());
        } else {
        //response alert
            console.log(JSON.stringify(result));
            setUserName('Welcome ' + result.name);
            setToken('User Token: ' + result.id);
            setProfilePic(result.picture.data.url);
        }
    };

  
  const handleFacebookLogin =()=> {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log(data.accessToken.toString());
            const processRequest = new GraphRequest(
                '/me?fields=name,email,picture.type(large)',
                null,
                getResponseInfo,
            );
            // Start the graph request.
            new GraphRequestManager()
                .addRequest(processRequest).start();
            });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }

    return (
        <TouchableOpacity style={styles.linkedInbutton} onPress={handleFacebookLogin}>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", borderRadius:6}}>
                <Text style={styles.fLogo}>f  </Text>
                <Text style={styles.linkedInText}>  Sign in with Facebook</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FacebookHome;

const styles = StyleSheet.create({
    linkedInbutton:{
        backgroundColor:'#4267b2',
        marginHorizontal:5,
        borderColor:colors.linkedInColor,
        borderRadius:6,
        height:30
    },
    fLogo:{
      color:"#fff",
      fontSize:22,
      fontWeight:"bold",
    },
    linkedInText:{
        color:'#fff'
    },
  })