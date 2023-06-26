import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet,Text, Image,ScrollView, TouchableOpacity, Alert, Platform } from 'react-native'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'
import InputView from '../../components/InputView'
import ForgotPassword from '../../modals/ForgotPasswordModal'
import { Formik } from 'formik'
import {loginValidationSchema} from '../../../utils/formikValidations'
import { images } from '../../../assets/images'
import BottomView from './items/BottomView'
import BaseView from '../../hoc/BaseView'
import { Icon } from 'react-native-elements'
import LoginViewSelect from './items/LoginViewSelect'
import { fonts } from '../../../values/fonts'
import InterviewCode from './InterviewCode'
import { forgotPassword, loginUser } from '../../../redux/actions/loginActions'
import { clearRememberMe, getRememberMe, setRememberMe } from '../../../utils/UserPrefs'
import LinkedIN from './LinkedIN'
import GoogleSignIN from './GoogleSignIN'
import FacebookSignIn from './FacebookSignIn'

const Login = props => {

    const baseViewRef = useRef(null)
    const forgotPasswordModalRef = useRef(null)

    // https://high5devwebapp-react.azurewebsites.net/high5Hire
    const [email, setEmail] = useState('')  // hsmith999@yopmail.com   davidwarner@yopmail.com JhonJeffry@yopmail.com
    const [password, setPassword] = useState('')   // password : 'Test@123',           //'Test@123',
    const [showPassword, setShowPassword] = useState(false);
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const [viewType, setViewType] = useState(0)
    const [rememberMe, setIsRememberMe] = useState(false)
    

    useEffect(() => {
        _init()
      return () => {
        
      };
    }, [setEmail,setPassword,setIsRememberMe])


    const _init = async() => {
        const rememberMeData = await getRememberMe();
        console.log('[Login.js] init : ',rememberMeData)
        if(rememberMeData !== null){
            const jsonData = JSON.parse(rememberMeData);
            setEmail(jsonData.email)
            setPassword(jsonData.password)
            setIsRememberMe(true)
        }
    }
    


    const _onLogin = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader();
            loginUser(email,password)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] Login Response : ',response)
                    _onRememberMe();
                    props.navigation.replace('DrawerStack')
                    // props.navigation.replace('FillProfileInfo');
                    
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] Login Error : ',error)
                })
        }
    }

    const _onForgotPassword = email => {
        console.log('[Login.js] Forgot Password : ',email)
        if(baseViewRef !== null){
            baseViewRef.current.showLoader();
            forgotPassword(email)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] ForgotPassword Response : ',response)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] ForgotPassword Error : ',error)
                })
        }
    }

    const _onRememberMe = () => {
        // console.log('[Login.js] Remember me:',rememberMe)
        if(rememberMe){
            const data = {
                'email' : email,
                'password' : password
            }

            setRememberMe(JSON.stringify(data))
        }else{
            clearRememberMe()
        }
    }

    const replaceScreen=(firstName,lastName,emailId,ProfilePic,Social,userInfo,_signOut)=>{
        props.navigation.replace("FillContact", {
            FName: firstName,
            LName: lastName,
            EmailId: emailId,
            ImageUri:ProfilePic,
            From: Social,
            userInfo:userInfo,
            _signOut:_signOut
        });
        // alert();
    }
    
    return (
        <BaseView
            ref={baseViewRef}
        >
        <ScrollView
            style={{flex:1,backgroundColor:'#fff'}}
        >
        <View style={styles.parent}>
            <Image 
                source={images.cornerImage}
                style={styles.cornerImage}
                resizeMode='stretch'
            />
            <View style={styles.topView}>
                <Image 
                    source={images.logo}
                    style={styles.logoImage}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.loginView}>
            <LoginViewSelect 
                onUpdateIndex={index => setViewType(index)}
            />
            
            {
                viewType === 0
                &&
                <View>
                <Formik
                    initialValues={{
                        email : email,
                        password : password
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={() =>_onLogin()}
                    enableReinitialize
                >
                    {
                        ({handleSubmit,errors,touched}) => (
                            
                            <ScrollView style={{marginTop:16}}>

                                {/* <Text style={[styles.loginText,{marginTop:0}]}>Log in to your account</Text> */}
                                <InputView 
                                    label='Email Address'
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    keyboardType='email-address'
                                    placeholder='Email Address'
                                    parentStyle={{marginTop:8}}
                                    // isRequired
                                    error={errors.email}
                                    touched={touched.email}
                                    // hasIcon
                                />
                                <InputView 
                                    label='Password'
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    // secureTextEntry
                                    placeholder='*********'
                                    parentStyle={{marginTop:20}}
                                    secureTextEntry={showPassword ? false : true}
                                    hasIcon
                                    maxLength={24}
                                    iconName={showPassword ? 'eye' : 'eye-with-line'}
                                    iconType={'entypo'}
                                    onIconPress={() => setShowPassword(prevState => !prevState)}
                                    // isRequired
                                    error={errors.password}
                                    touched={touched.password}
                                />
                                <View style={styles.row2}>
                                    <TouchableOpacity 
                                        style={{}}
                                        onPress={() => setIsRememberMe(prevState => !prevState)}
                                    >
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Icon 
                                                name={rememberMe ? 'check-square' : 'square'}
                                                type='feather'
                                                color={rememberMe ? colors.primary : '#888'}
                                                size={18}
                                                containerStyle={{marginRight:8}}
                                            />
                                            <Text style={[styles.forgotPassword,{color:rememberMe ? colors.primary : '#888'}]}>Remember</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={{}}
                                        onPress={() => {
                                            if(forgotPasswordModalRef !== null){
                                                forgotPasswordModalRef.current.baseModal.showModal()
                                            }
                                        }}
                                    >
                                        <Text style={styles.forgotPassword}>Forgot?</Text>
                                    </TouchableOpacity>
                                </View>
                                <ButtonView 
                                    title='Login'
                                    onPress={() => handleSubmit()}
                                />
                                <View style={styles.row3}>
                                    <View style={styles.bar} />
                                    <Text style={styles.description2}>OR</Text>
                                    <View style={styles.bar} />
                                </View>
                                {/* <TouchableOpacity style={styles.linkedInbutton} activeOpacity={0.7}>
                                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", borderRadius:6}}>
                                    <Image 
                                        source={images.linkedIN_logo}
                                        style={styles.linkedIN_logo}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.linkedInText}>Sign in with LinkedIn</Text>
                                    </View>
                                </TouchableOpacity> */}
                                <LinkedIN replaceScreen={replaceScreen}/>
                                <GoogleSignIN replaceScreen={replaceScreen}/>
                                <FacebookSignIn replaceScreen={replaceScreen}/>
                            </ScrollView>
                            
                        )
                    }
                </Formik>
                </View>
            }

            {
                viewType === 1
                &&
                <InterviewCode
                    {...props}
                />
            }

            </View>
            
            
            {/* </BaseView> */}
            
            <ForgotPassword 
                ref={forgotPasswordModalRef}
                setEmail={_onForgotPassword}
            />
        </View>
        </ScrollView>
        {/* {
            viewType === 0
            &&
            <BottomView 
                text1={"Don't have an account? "}
                button1='Register'
                onButtonPress={() => props.navigation.navigate('SignUp')}
            />
        } */}
    </BaseView>
    )
}

export default Login


const styles = StyleSheet.create({
    parent : {
        flex:1,
        backgroundColor: colors.accent,
        marginBottom:Platform.OS==='ios'?30:0
    },
    topView : {
        height:240,
        // flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    description2: {
        fontSize:14,
        color: colors.accent,
        fontFamily: fonts.notoSans700,
        paddingHorizontal:  16,
        textAlign: 'center',
        // marginVertical: 16,
      },
    logoImage : {
        height:80,
        width:200
    },
    cornerImage : {
        position: 'absolute',
        height:320,
        width:360,
        top:0,right:0,
        // bottom:0
    },
    bar: {
        width: '40%',
        height: 1,
        backgroundColor: colors.gray,
    },
    
    loginView : {
        flex:1,
        backgroundColor: '#fff',
        // height:'100%',
        borderTopRightRadius:24,
        borderTopLeftRadius:24,
        paddingHorizontal:20,
        // paddingTop:16
    },
    loginText : {
        fontSize:20,
        fontWeight:'500',
        marginTop:8,
        fontFamily:fonts.notoSansBold,
        fontWeight:'900',
        color:'#000'
    },
    forgotPassword : {
        fontFamily:fonts.notoSansBold,
        fontSize:14,
        color:colors.primary
    },
    interview : {
        fontFamily:fonts.notoSansBold,
        fontSize:14,
        color:colors.accent,
        textAlign:'center'
    },
    row : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:16,
        // marginTop:16
    },
    socialView : {
        height:48,
        width:84,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    orView : {
        flexDirection:'row',
        alignItems:'center', 
        paddingHorizontal:16,
        marginVertical:36,
        // marginBottom:16
    },
    divider : {
        height:2,
        backgroundColor: '#e0e0e0',
        flex:1
    },
    row2 : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
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
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 14,
    },

});
