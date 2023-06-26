import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import {  setProfileLanguages, updateLanguages } from '../../../../../redux/actions/profileActions';
import { setExtraData } from '../../../../../redux/actions/homeActions';
import { profileCertificateValidationSchema, profileExperienceValidationSchema, resumeLanguageValidationSchema } from '../../../../../utils/formikValidations';
import { generateRandomString } from '../../../../../utils/Validations';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import DatePickerModal from '../../../../modals/DatePickerModal';
import CheckBoxView from '../../../../components/CheckBoxView';
import { showAlert } from '../../../../../utils/Message';

const AddLanguage = props => {

    const baseViewRef = useRef(null)
    const datePickerModal = useRef(null)

    const dispatch = useDispatch();

    const profileLanguages = useSelector(state => state.profile.profileLanguages)
    const extraData = useSelector(state => state.home.extraData)

    const [language, setLanguage] = useState('')
    const [canRead, setCanRead] = useState(false)
    const [canSpeak, setCanSpeak] = useState(false)
    const [canWrite, setCanWrite] = useState(false)
        
    const [isCollapsed, setIsCollapsed] = useState(false)
    


    const _onSave = () => {

        if(!canRead && !canSpeak && !canWrite){
            showAlert('error','Please Select Minimum one Language option')
        }else {
            if(baseViewRef !== null){
                
                baseViewRef.current.showLoader()

                const data = {
                    languagename : language,
                    read : canRead ? 'Yes' : 'No',
                    speak : canSpeak ? 'Yes' : 'No',
                    write : canWrite ? 'Yes' : 'No'
                }
                const list = [data , ...profileLanguages]

                updateLanguages(list)   
                    .then(response => {
                        baseViewRef.current.hideLoader()
                        console.log('[AddLanguage.js] Response: ',response)
                        dispatch(setProfileLanguages(list))
                        setTimeout(() =>{
                            baseViewRef.current.successModal.baseModal.showModal()
                            baseViewRef.current.successModal.init('Language Added!',language)
                        },500)
                        _onReset()

                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader()
                        console.log('[AddLanguage.js] Error: ',error)
                    })


                // 
                // dispatch(setProfileLanguages(list))
                // dispatch(setExtraData(!extraData))
                
            }
        }
    }

    const _onReset = () => {
        setLanguage('')
        setCanRead(false)
        setCanSpeak(false)
        setCanWrite(false)
    }

    return (
        <BaseView 
            ref={baseViewRef}
            parentStyle={styles.parent}
        >
            <TitleRow
                title={`Add Language`}
                disabled={0}
                hasIcon
                onTitlePress={() => setIsCollapsed(prevState => !prevState)}
                hasReset={!isCollapsed}
                onReset={() => _onReset()}
            />

            <Collapsible collapsed={isCollapsed}>
            <Formik
                initialValues={{
                    language : language
                }}
                validationSchema={resumeLanguageValidationSchema}
                onSubmit={() => _onSave()}
                enableReinitialize
            >
                {
                    ({handleSubmit,errors,touched}) => (
                        <View>
                        <InputView 
                            placeholder={'English, Spanish etc'}
                            parentStyle={styles.topMargin}
                            value={language}
                            onChangeText={text => setLanguage(text)}
                            // isRequired
                            error={errors.language}
                            touched={touched.language}
                            textInputViewStyle={{backgroundColor:'#fff',borderRadius:8}}
                        />

                        <View style={{paddingHorizontal:12}}>
                            <CheckBoxView
                                title='Read'
                                checked={canRead}
                                onPress={() => setCanRead(prevState => !prevState)}
                            />
                            <CheckBoxView
                                title='Speak'
                                checked={canSpeak}
                                onPress={() => setCanSpeak(prevState => !prevState)}
                            />
                            <CheckBoxView
                                title='Write'
                                checked={canWrite}
                                onPress={() => setCanWrite(prevState => !prevState)}
                            />
                        </View>

                    
                        <ButtonView
                            title='Add Language'
                            onPress={() => handleSubmit()}
                        />

                        </View>
                    )
                }
            </Formik>
            </Collapsible>

        </BaseView>
    )
}

export default AddLanguage

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
    },
    row : {
        flexDirection:'row',
        alignItems:'center'
    },
    topMargin : {
        marginTop:16
    },
    leftMargin : {
        marginLeft:8,
        flex:1
    },
    rightMargin : {
        marginRight:8,
        flex:1
    },
})
