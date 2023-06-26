import { View, Text,StyleSheet,Alert,TouchableOpacity,Image,ActivityIndicator} from 'react-native'
import React,{useState,useCallback} from 'react'
import LinkedInModal from '@smuxx/react-native-linkedin'
import { images } from '../../../assets/images';
import { colors } from '../../../values/colors';

export default function LinkedIN(props) {
    const [email, setEmail] = useState('');
    const [payload, setPayload] = useState('');
    const [loading,setloading] = useState(false);
    const {replaceScreen}=props;

    const getUser = async (data,emailcheck) => {

        const {access_token, authentication_code} = data;
        if (!authentication_code) {
            const response = await fetch(
            "https://api.linkedin.com/v2/me?projection= (id,firstName,lastName,profilePicture(displayImage~:playableStreams) )",
            {
                method: "GET",
                headers: {
                Authorization: "Bearer " + access_token,
                },
                },
            );
            const apipayload = await response.json();
            setPayload(apipayload);
            handleGetUser(apipayload,emailcheck);
        }
        else {
            alert(`authentication_code = ${authentication_code}`);
        }
        console.log(payload);
        // handleGetUser();
    };


    const getUserEmailId = async data => {
      setloading(true);
        const {access_token, authentication_code} = data;
        if (!authentication_code) {
            const response = await fetch(
            "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
            {
            method: "GET",
            headers: {
            Authorization: "Bearer " + access_token,
            },
            },
            );
            const emailpayload = await response.json();
        
            setEmail(emailpayload.elements[0]["handle~"].emailAddress);
            getUser(data,emailpayload.elements[0]["handle~"].emailAddress);
        }
         else {
            Alert.alert(`authentication_code = ${authentication_code}`);
         }
    };

    const _handleLinkedInLogin=()=>{
      return(
        <View style={styles.linkedInbutton}>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", borderRadius:6}}>
                <Image 
                source={images.linkedIN_logo}
                style={styles.linkedIN_logo}
                resizeMode='contain'
                />
                <Text style={styles.linkedInText}>Sign in with LinkedIn</Text>
            </View>
        </View>
      )
    }
    const handleGetUser = (payload,emailcheck) => {
      setloading(false);
        if (payload) {
            console.log(payload);
            if (emailcheck) {
                replaceScreen(payload.firstName.localized.en_US,payload.lastName.localized.en_US,emailcheck,payload.profilePicture["displayImage~"].elements[3].identifiers[0].identifier,'LinkedIN');
            }
        }
        }

        if(loading==true){
          return(
            <ActivityIndicator animating={true}/>
          )
         
        }

    return (
        <View>
            <LinkedInModal
                renderButton={_handleLinkedInLogin}
                style={{borderWidth:1, fontSize: 20}}
                clientID="77if6lxmcmwajm"
                clientSecret="oaNguNzJlhIYXYAQ"
                redirectUri="https://www.google.com/"
                onSuccess={token => {
                    console.log(token)
                    getUserEmailId(token);
                }}
                onError={() => {
                    console.log("Error");
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    linkedIN_logo:{
        height:30,
        width:80,
        borderColor:colors.linkedInColor
    },
    linkedInbutton:{
        backgroundColor:colors.linkedInColor,
        marginHorizontal:5,
        borderColor:colors.linkedInColor,
        borderRadius:6
    },
    linkedInText:{
        color:'#fff'
    },
  })


