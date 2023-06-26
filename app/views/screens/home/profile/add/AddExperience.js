import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { educationTypeJson } from '../../../../../json/educationTypesList';
import { setProfileExperiences, updateWorkExperience } from '../../../../../redux/actions/profileActions';
import { setExtraData } from '../../../../../redux/actions/homeActions';
import { profileExperienceValidationSchema } from '../../../../../utils/formikValidations';
import { generateRandomString, getYearsList } from '../../../../../utils/Validations';
import { colors } from '../../../../../values/colors';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import CheckBoxView from '../../../../components/CheckBoxView';
import { profileStyles } from '../profileStyles';
import DatePickerModal from '../../../../modals/DatePickerModal';
import SingleSelectModal from '../../../../modals/SingleSelectModal';
import { jobTypesJson } from '../../../../../json/jobTypesJson';

const AddExperience = props => {

    const baseViewRef = useRef(null)
    const datePickerModal = useRef(null)
    const singleSelectModal = useRef(null)

    const dispatch = useDispatch();

    const profileExperiences = useSelector(state => state.profile.profileExperiences)
    const extraData = useSelector(state => state.home.extraData)

    // const [employerName, setEmployerName] = useState('ETeaminc')
    // const [designation, setDesignation] = useState('Mobile Developer')
    // const [durationFrom, setDurationFrom] = useState('02-09-2021')
    // const [durationTo, setDurationTo] = useState('02-09-2021')
    // const [industry, setIndustry] = useState('Information Technology')
    // const [description, setDescription] = useState("Receptionist with over 5 years' experience working in both the public and private sectors. Diplomatic, personable, and adept at managing sensitive situations. Highly organized, self-motivated, and proficient with computers. Looking to boost students’ satisfactions scores for ABC University. Bachelor's degree in communications.")

    const [employerName, setEmployerName] = useState('')
    const [designation, setDesignation] = useState('')
    const [durationFrom, setDurationFrom] = useState('')
    const [durationTo, setDurationTo] = useState('')
    const [industry, setIndustry] = useState('')
    const [description, setDescription] = useState("")
    const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false)
    
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [flag, setFlag] = useState(0)
    

    const _setDate = date => {
        if(flag === 1){
           setDurationFrom(date)
        }else {
            setDurationTo(date)
        }
    }


    const _onSave = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            const data = {
                employerName : employerName,
                jobTitle : designation,
                startDate : durationFrom,
                endDate: durationTo,
                description,
                industry,
                isSelect : isCurrentlyWorking
            }
            const list = [data , ...profileExperiences]
            updateWorkExperience(list)
                .then(response => {
                    baseViewRef.current.hideLoader()
                    dispatch(setProfileExperiences(list))
                    console.log('[AddExperience.js] on update Experience: ',response);
                    setTimeout(() =>{
                        baseViewRef.current.successModal.baseModal.showModal()
                        baseViewRef.current.successModal.init('Experience Added!',`${designation} at ${employerName})`)
                    },500)
                    _onReset()
                })
                .catch(error => {
                    baseViewRef.current.hideLoader()
                    console.log('[AddExperience.js]  Experience Error: ',error);
                })
            // 
            // dispatch(setExtraData(!extraData))
          
        }
    }

    const _onReset = () => {
        setEmployerName('')
        setDesignation('')
        setIndustry('')
        setDurationFrom('')
        setDurationTo('')
        setIsCurrentlyWorking(false)
        setDescription('')
    }

    return (
        <BaseView 
            ref={baseViewRef}
            parentStyle={styles.parent}
        >
            <TitleRow
                title={`Add Experience`}
                disabled={0}
                hasIcon
                onTitlePress={() => setIsCollapsed(prevState => !prevState)}
                hasReset={!isCollapsed}
                onReset={() => _onReset()}
            />

            <Collapsible collapsed={isCollapsed}>
            <Formik
                initialValues={{
                    employerName,
                    designation
                }}
                validationSchema={profileExperienceValidationSchema}
                onSubmit={() => _onSave()}
                enableReinitialize
            >
                {
                    ({handleSubmit,errors,touched}) => (
                        <View>
                        <View style={styles.row}>
                            <InputView 
                                label='Employer Name'
                                placeholder='Employer Name' 
                                style={styles.rightMargin}
                                value={employerName}
                                onChangeText={text => setEmployerName(text)}
                                // isRequired
                                error={errors.employerName}
                                touched={touched.employerName}
                            />
                            <InputView 
                                label='Designation'
                                placeholder='Designation'
                                style={styles.leftMargin}
                                value={designation}
                                onChangeText={text => setDesignation(text)}
                                // isRequired
                                error={errors.designation}
                                touched={touched.designation}
                            />
                        </View>
                        <PickerView 
                            label={industry !== '' ? 'Industry' : ''}
                            value={industry !== '' ? industry : 'Select Industry'}
                            onPress={() => {
                                if(singleSelectModal !== null){
                                    singleSelectModal.current.baseModal.showModal();
                                    singleSelectModal.current.init(jobTypesJson)
                                }
                            }}
                            parentStyle={styles.topMargin}
                        />

                        <View style={[styles.row,styles.topMargin]}>
                            <PickerView 
                                label={durationFrom === '' ? '' : 'Duration From'}
                                value={durationFrom === '' ? 'Duration From' : durationFrom}
                                parentStyle={styles.rightMargin}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                   setFlag(1)
                                   if(datePickerModal !== null){
                                       datePickerModal.current.showModal()
                                   }
                                    
                                }}
                            />
                            <PickerView 
                                label={durationTo === '' ? '' : 'Duration To'}
                                value={durationTo === '' ? 'Duration To' : durationTo}
                                parentStyle={styles.leftMargin}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                    setFlag(2)
                                    if(datePickerModal !== null){
                                       datePickerModal.current.showModal()
                                   }
                                }}
                                disabled={isCurrentlyWorking}
                            />
                        </View>

                        <CheckBoxView 
                            title='Currently Employer'
                            checked = {isCurrentlyWorking}
                            onPress={() => setIsCurrentlyWorking(prevState => !prevState)}
                        />

                        <InputView 
                            label='Description'
                            placeholder='Write about your experience...'
                            style={styles.topMargin}
                            value={description}
                            onChangeText={text => setDescription(text)}
                            textInputStyle={profileStyles.multiLineTextInputStyle}
                            multiline
                        />

                        <ButtonView
                            title='Add Experience'
                            onPress={() => handleSubmit()}
                        />

                        </View>
                    )
                }
            </Formik>
            </Collapsible>


            <DatePickerModal 
                ref={datePickerModal}
                setDate={_setDate}
            />

            <SingleSelectModal 
                ref={singleSelectModal}
                onSetItem={item => setIndustry(item.name)}
            />

        </BaseView>
    )
}

export default AddExperience

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
