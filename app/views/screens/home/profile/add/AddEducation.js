import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { educationTypeJson } from '../../../../../json/educationTypesList';
import { setProfileEducation, updateEducation } from '../../../../../redux/actions/profileActions';
import { setExtraData } from '../../../../../redux/actions/homeActions';
import { profileEducationValidationSchema } from '../../../../../utils/formikValidations';
import { generateRandomString, getYearsList } from '../../../../../utils/Validations';
import { colors } from '../../../../../values/colors';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
import SingleSelectModal from '../../../../modals/SingleSelectModal';
import TitleRow from '../items/TitleRow';

const AddEducation = props => {

    const baseViewRef = useRef(null)
    const singleSelectModal = useRef(null)

    const dispatch = useDispatch();

    const profileEducation = useSelector(state => state.profile.profileEducation)
    const extraData = useSelector(state => state.home.extraData)

    // const [graduatedYear, setGraduatedYear] = useState('2015');
    // const [educationType, setEducationType] = useState('Master Degree')
    // const [educationProgram, setEducationProgram] = useState('Master of Computer Application')
    // const [school, setSchool] = useState('University of South Florida')
    // const [major, setMajor] = useState('C,C++,java,android')

    const [graduatedYear, setGraduatedYear] = useState('');
    const [educationType, setEducationType] = useState('')
    const [educationProgram, setEducationProgram] = useState('')
    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('')

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [flag, setFlag] = useState(0)



    const _onSetItem = item => {
        if(flag === 0){
            setGraduatedYear(item.name)
        }else if(flag === 1){
            setEducationType(item.name)
        }
    }


    const _onSave = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            const data = {                    
                graduatedYear,
                educationType,
                educationProgram,
                school,
                major
            }
            const list = [data , ...profileEducation]
            updateEducation(list)  
                .then(response => {
                    baseViewRef.current.hideLoader()
                    console.log('[AddEducation.js] on AddEducation: ',response)
                    dispatch(setProfileEducation(list))
                    _onReset()
                    baseViewRef.current.hideLoader()
                    setTimeout(() =>{
                        baseViewRef.current.successModal.baseModal.showModal()
                        baseViewRef.current.successModal.init('Education Added!',`${educationProgram} at ${school})`)
                    },500)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[AddEducation.js] on AddEducation Error: ',error)
                })
            // const list = [data , ...profileEducation]
            // dispatch(setProfileEducation(list))
            // dispatch(setExtraData(!extraData))
            
        }
    }

    const _onReset = () => {
        setEducationProgram('')
        setEducationType('')
        setGraduatedYear('')
        setSchool('')
        setMajor('')
    }

    return (
        <BaseView 
            ref={baseViewRef}
            parentStyle={styles.parent}
        >
            <TitleRow
                title={`Add Education`}
                disabled={0}
                hasIcon
                onTitlePress={() => setIsCollapsed(prevState => !prevState)}
                hasReset={!isCollapsed}
                onReset={() => _onReset()}
                // titleStyle={{fontSize:16,color:colors.textInputTextColor}}
            />

            <Collapsible collapsed={isCollapsed}>
            <Formik
                initialValues={{
                    graduatedYear,
                    educationType,
                    educationProgram,
                    school,
                    major,
                }}
                validationSchema={profileEducationValidationSchema}
                onSubmit={() => _onSave()}
                enableReinitialize
            >
                {
                    ({handleSubmit,errors,touched}) => (
                        <View>
                        <View style={styles.row}>
                            <PickerView 
                                label={graduatedYear === '' ? '' : 'Graduated Year'}
                                value={graduatedYear === '' ? 'Graduated Year' : graduatedYear}
                                parentStyle={{marginRight:8,width:132}}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                        setFlag(0)
                                        if(singleSelectModal !== null){
                                            singleSelectModal.current.baseModal.showModal()
                                            singleSelectModal.current.init(getYearsList())
                                        }
                                    }}
                                error={errors.graduatedYear}
                                touched={touched.graduatedYear}
                            />

                            <PickerView 
                                label={educationType === '' ? '' : 'Education Type'}
                                value={educationType === '' ? 'Education Type' : educationType}
                                parentStyle={{marginLeft:8,flex:1}}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                        setFlag(1)
                                        if(singleSelectModal !== null){
                                            singleSelectModal.current.baseModal.showModal()
                                            singleSelectModal.current.init(educationTypeJson)
                                        }
                                    }}
                                error={errors.educationType}
                                touched={touched.educationType}
                            />
                        </View>

                        <InputView 
                            style={styles.topMargin}
                            label='Education Program'
                            placeholder='Education Program'
                            value={educationProgram}
                            onChangeText={text => setEducationProgram(text)}
                            error={errors.educationProgram}
                            touched={touched.educationProgram}
                        /> 

                        <InputView 
                            style={styles.topMargin}
                            label='School'
                            placeholder='School'
                            value={school}
                            onChangeText={text => setSchool(text)}
                            error={errors.school}
                            touched={touched.school}
                        />

                        <InputView 
                            label='Major'
                            placeholder='Major'
                            value={major}
                            onChangeText={text => setMajor(text)}
                            style={styles.topMargin}
                            error={errors.major}
                            touched={touched.major}
                        />


                        <ButtonView
                            title='Add Education'
                            onPress={() => handleSubmit()}
                        />

                        </View>
                    )
                }
            </Formik>
            </Collapsible>

            <SingleSelectModal 
                ref={singleSelectModal}
                onSetItem={_onSetItem}
            />

        </BaseView>
    )
}

export default AddEducation

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
    }
})
