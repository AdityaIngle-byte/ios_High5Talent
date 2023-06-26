import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setProfilePersonalInfo, updateContactInfo } from '../../../../redux/actions/profileActions'
import { profilePersonalInfoValidationSchema } from '../../../../utils/formikValidations'
import { acceptOnlyCharacters } from '../../../../utils/Validations'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import AddAddressView from '../../../components/AddAddressView'
import ButtonView from '../../../components/ButtonView'
import InputView from '../../../components/InputView'
import PhoneView from '../../../components/PhoneView'
import BaseView from '../../../hoc/BaseView'
import AddAddress from '../../common/AddAddress'

const PersonalInfo = props => {

    const baseViewRef = useRef(null)
    const addAddressModalRef = useRef(null)

    const dispatch = useDispatch()

    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState(null);
    const [primaryCountryCode, setPrimaryCountryCode] = useState(null);
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [alternateCountryCode, setAlternateCountryCode] = useState(null);
    const [alternatePhone, setAlternatePhone] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('')


    useEffect(() => {
        // _setInitialData()

        _init()
      return () => {
        
      };
    }, [])


    const _init = () => {
        if(profilePersonalInfo !== null){
            setFirstName(profilePersonalInfo.firstName)
            setLastName(profilePersonalInfo.lastName)
            setAddress(profilePersonalInfo.address)
            setEmail(profilePersonalInfo.email)
            setPrimaryCountryCode(profilePersonalInfo.primaryCountryCode)
            setPrimaryPhone(profilePersonalInfo.primaryPhone);
            setAlternateCountryCode(profilePersonalInfo.alternateCountryCode);
            setAlternatePhone(profilePersonalInfo.alternatePhone);
            setDesignation(profilePersonalInfo.designation)
           
        }
    }

    // const _setInitialData = () => {
    //     setFirstName('John')
    //     setLastName('Doe')
    //     setAddress({addressLine1 : '713 Clay Street',addressLine2: "Bush Street Tenderloin",county : 'San Francisco', city: "San Francisco", state: "California", postalCode: "94102", country: "United States"})
    //     setEmail('johmsmith@dow.com')
    // }


    const _onSave = () => {
        if(baseViewRef !== null){
            const data = {
                firstName,
                lastName,
                address,
                primaryCountryCode,
                primaryPhone, 
                alternateCountryCode, 
                alternatePhone,
                email,
            }
    
            console.log('[PersonalInfo.js] : ',data,profilePersonalInfo)
            baseViewRef.current.showLoader()
            updateContactInfo(data)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    dispatch(setProfilePersonalInfo(data));
                    // props.navigation.goBack()
                    setTimeout(() =>{
                        baseViewRef.current.successModal.baseModal.showModal()
                        baseViewRef.current.successModal.init('Updated!',`Contact Info Updated Successfully!`)
                    },500)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                })
            
    
            
        }

    }



    const _onChooseLocationFromMap = () => {
        props.navigation.navigate('SelectAddress',{
            onGoBack : _setAddress
        })
    }

    const _setAddress = (address) => {
        console.log('[ProfilePersonalInfo.js] on Set Address : ',address)
        setAddress(address)
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='CONTACT INFO'
            hasTitle
        >
        <Formik
                initialValues={{
                    firstName : firstName,
                    lastName : lastName,
                    address : address,
                    mobile : primaryPhone, 
                    email : email,
                    // designation : designation
                }}
                validationSchema={profilePersonalInfoValidationSchema}
                onSubmit={() => _onSave()}
                enableReinitialize
            >
                {
                    ({handleSubmit,errors,touched}) => (
                        <View style={{flex:1}}>
                        <ScrollView 
                            contentContainerStyle={{paddingBottom:96}}
                        >
                        <View style={styles.parent}>
                            <View style={[styles.row,{marginTop:0}]}>
                                <InputView 
                                    label={'First Name'}
                                    placeholder={'First Name'}
                                    value={firstName}
                                    onChangeText={text => setFirstName(acceptOnlyCharacters(text))}
                                    error={errors.firstName}
                                    touched={touched.firstName}
                                    style={styles.rightMargin}
                                />
                                <InputView 
                                    label={'Last Name'}
                                    placeholder={'Last Name'}
                                    style={[styles.leftMargin]}
                                    value={lastName}
                                    onChangeText={text => setLastName(acceptOnlyCharacters(text))}
                                    error={errors.lastName}
                                    touched={touched.lastName}
                                />
                            </View>

                           <PhoneView 
                                countryCode={primaryCountryCode}
                                label={primaryPhone === '' ? '' : 'Primary Phone'}
                                placeholder={'Primary Phone'}
                                setCountry={code => setPrimaryCountryCode(code)}
                                value={primaryPhone}
                                onChangeText={text => setPrimaryPhone(text)}
                                error={errors.mobile}
                                touched={touched.mobile}
                            />

                            <PhoneView 
                                countryCode={alternateCountryCode}
                                label={alternatePhone === '' ? '' : 'Alternate Phone'}
                                placeholder={'Alternate Phone'}
                                setCountry={code => setAlternateCountryCode(code)}
                                value={alternatePhone}
                                onChangeText={text => setAlternatePhone(text)}
                            />

                            <InputView 
                                label={'Email'}
                                placeholder={'Email'}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                keyboardType='email-address'
                                error={errors.email}
                                touched={touched.email}
                                style={styles.topMargin}
                                editable={false}
                            />

                            <AddAddressView 
                                address={address}
                                error={errors.address}
                                touched={touched.address}
                                onAddAddress={() => _onChooseLocationFromMap()}
                                onEdit={() => {
                                    if(addAddressModalRef !== null){
                                        addAddressModalRef.current.baseModal.showModal();
                                        addAddressModalRef.current.init(address)
                                    }
                                }}
                            />

                            {/* <InputView 
                                label={'Designation'}
                                placeholder={'Designation'}
                                value={designation}
                                onChangeText={text => setDesignation(text)}
                                error={errors.designation}
                                touched={touched.designation}
                                style={styles.topMargin}
                            /> */}
                                           
                        </View>
                        </ScrollView>
                        <ButtonView 
                            title='Save'
                            containerStyle={[styles.topMargin,{position:'absolute',bottom:24,left:24,right:24}]}
                            parentStyle={{backgroundColor:colors.accent}}
                            onPress={() => handleSubmit()}
                        />
                        </View>
                    )
                }
        </Formik>


            <AddAddress 
                ref={addAddressModalRef}
                onSavePress={address => setAddress(address)}
            />
        </BaseView>
    )
}

export default PersonalInfo



const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        paddingTop:16
    },
    row : {
        flexDirection:'row',
        marginTop:16
    },
    topMargin : {
        marginTop:16
    },
    rightMargin : {
        marginRight:8,
        flex:1
    },
    leftMargin : {
        marginLeft:8,
        flex:1
    },
    addAddressText : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:colors.darkBlueColor,
        paddingLeft:8
    },
    addAddressView : {
        alignItems:'center',
        justifyContent:'center',
        marginTop:24,
        alignSelf:'flex-end'
    },
    uploadImageView : {
        height:164,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#e7e7e7',
    },
    label : {
        fontSize:12,
        fontFamily:fonts.notoSansRegular,
        paddingBottom:4,
        color:'#3C4043'
    },
    image : {
        height:164,
        width:'100%',
        borderRadius:4
    },
    view : {
        flex:1,
        justifyContent:'center',
        marginLeft:8
    },
    imageView : {
        width:'30%',
        marginRight : 8,
        borderRadius:4,
        backgroundColor:'#fff',
        padding:4
    }
});
