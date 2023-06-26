import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { changePassword } from '../../../../redux/actions/loginActions'
import { changePasswordValidationSchema } from '../../../../utils/formikValidations'
import ButtonView from '../../../components/ButtonView'
import InputView from '../../../components/InputView'
import BaseView from '../../../hoc/BaseView'

const ChangePassword = props => {

    const baseViewRef = useRef(null)

    const userPrefs = useSelector(state => state.home.userPrefs)

    // const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [hidePassword, setHidePassword] = useState(true)




    const _onChangePassword = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader();
            changePassword(userPrefs.userId,newPassword)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[ChangePassword.js] On Change password : ',response)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[ChangePassword.js] On Change password : ',error)
                })
        }
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='CHANGE PASSWORD'
            navigation={props.navigation}
            hasNotification
            hasTitle
        >
        <Formik
            initialValues={{
                // oldPassword : oldPassword,
                newPassword : newPassword,
                confirmPassword : confirmPassword
            }}
            validationSchema={changePasswordValidationSchema}
            onSubmit={() =>_onChangePassword()}
            enableReinitialize
        >
            {
                ({handleSubmit,errors,touched}) => (
                    <View style={styles.parent}>
                        {/* <InputView 
                            hasLabel
                            label='Old Password'
                            placeholder="Old Password"
                            style={styles.topMargin}
                            value={oldPassword}
                            onChangeText={text => setOldPassword(text)}
                            touched={touched.oldPassword}
                            error={errors.oldPassword}
                            secureTextEntry={hidePassword}
                            hasIcon
                            iconName={hidePassword ? 'eye-with-line' : 'eye'}
                            iconType={'entypo'}
                            onIconPress={() => setHidePassword(prevState => !prevState)}
                        /> */}
                        <InputView 
                            label='New Password'
                            placeholder="New Password"
                            style={styles.topMargin}
                            value={newPassword}
                            onChangeText={text => setNewPassword(text)}
                            touched={touched.newPassword}
                            error={errors.newPassword}
                            secureTextEntry={hidePassword}
                            hasIcon
                            iconName={hidePassword ? 'eye-with-line' : 'eye'}
                            iconType={'entypo'}
                            onIconPress={() => setHidePassword(prevState => !prevState)}
                        />
                        <InputView 
                            label='Confirm Password'
                            placeholder="Confirm Password"
                            style={styles.topMargin}
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                            touched={touched.confirmPassword}
                            error={errors.confirmPassword}
                            secureTextEntry={hidePassword}
                            hasIcon
                            iconName={hidePassword ? 'eye-with-line' : 'eye'}
                            iconType={'entypo'}
                            onIconPress={() => setHidePassword(prevState => !prevState)}
                        />

                        <ButtonView 
                            title='Change'
                            containerStyle={{marginTop:40}}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                )
            }
        </Formik>
        </BaseView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        // paddingTop:16
    },
    topMargin : {
        marginTop:16
    }
})
