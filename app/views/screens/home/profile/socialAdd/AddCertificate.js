import { Formik } from 'formik';
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraData } from '../../../../../redux/actions/homeActions';
import { profileCertificateValidationSchema, profileExperienceValidationSchema } from '../../../../../utils/formikValidations';
import { generateRandomString } from '../../../../../utils/Validations';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import DatePickerModal from '../../../../modals/DatePickerModal';
import { colors } from '../../../../../values/colors';

const AddCertificate = props => {

    const baseViewRef = useRef(null)
    const datePickerModal = useRef(null)

    const dispatch = useDispatch();


    const {setProfileCertificates,profileCertificates}=props;  
    const extraData = useSelector(state => state.home.extraData)

    // const [certificateName, setCertificateName] = useState('Azure')
    // const [certificateNumber, setCertificateNumber] = useState('AZU1231')
    // const [issuedBy, setIssuedBy] = useState('Google')
    // const [issueDate, setIssueDate] = useState('2020-09-17')
    // const [expiryDate, setExpiryDate] = useState('2021-09-16')

    const [certificateName, setCertificateName] = useState('')
    const [certificateNumber, setCertificateNumber] = useState('')
    const [issuedBy, setIssuedBy] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [flag, setFlag] = useState(0)
    

    const _setDate = date => {
        if(flag === 2){
           setExpiryDate(date)
        }else {
            setIssueDate(date)
        }
    }


    const _onSave = () => {
        const data = {
            certificationName : certificateName,
            certificate : certificateNumber,
            issuedby : issuedBy,
            expiryDate : expiryDate,
            issueDate : issueDate,
        }
        console.log(data);
        const list = [data , ...profileCertificates]
        setProfileCertificates(list)
        _onReset()
                       
    }

    const _onReset = () => {
        setCertificateName('')   
        setCertificateNumber('')
        setIssuedBy('')
        setIssueDate('')
        setExpiryDate('')
    }

    return (
        <BaseView 
            ref={baseViewRef}
            parentStyle={styles.parent}
        >
            <TitleRow
                title={`Add Certificate`}
                disabled={0}
                hasIcon
                onTitlePress={() => setIsCollapsed(prevState => !prevState)}
                hasReset={!isCollapsed}
                onReset={() => _onReset()}
            />

            <Collapsible collapsed={isCollapsed}>
            <Formik
                initialValues={{
                    certificateName,
                    certificateNumber,
                    issuedBy,
                    issueDate,
                    expiryDate
                }}
                validationSchema={profileCertificateValidationSchema}
                onSubmit={() => _onSave()}
                enableReinitialize
            >
                {
                    ({handleSubmit,errors,touched}) => (
                        <View>
                        <View style={styles.row}>
                            <InputView 
                                label='Certificate Name'
                                placeholder='Certificate Name' 
                                style={styles.rightMargin}
                                value={certificateName}
                                onChangeText={text => setCertificateName(text)}
                                // isRequired
                                error={errors.certificateName}
                                touched={touched.certificateName}
                            />
                            <InputView 
                                label='Certificate no.'
                                placeholder='Certificate no.'
                                style={styles.leftMargin}
                                value={certificateNumber}
                                onChangeText={text => setCertificateNumber(text)}
                                // isRequired
                                error={errors.certificateNumber}
                                touched={touched.certificateNumber}
                            />
                        </View>
                        <InputView 
                            label='Issued By'
                            placeholder='Issued By'
                            style={styles.topMargin}
                            value={issuedBy}
                            onChangeText={text => setIssuedBy(text)}
                            // isRequired
                            error={errors.issuedBy}
                            touched={touched.issuedBy}
                        />

                        <View style={[styles.row,styles.topMargin]}>
                            <PickerView 
                                label={issueDate === '' ? '' : 'Issue Date'}
                                value={issueDate === '' ? 'Issue Date' : issueDate}
                                parentStyle={styles.rightMargin}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                   setFlag(1)
                                   if(datePickerModal !== null){
                                       datePickerModal.current.showModal()
                                   }
                                }}
                                error={errors.issueDate}
                                touched={touched.issueDate}
                            />
                            <PickerView 
                                label={expiryDate === '' ? '' : 'Expiry Date'}
                                value={expiryDate === '' ? 'Expiry Date' : expiryDate}
                                parentStyle={styles.leftMargin}
                                pickerStyle={{height:56}}
                                onPress={() => {
                                    setFlag(2)
                                    if(datePickerModal !== null){
                                       datePickerModal.current.showModal()
                                   }
                                }}
                                error={errors.expiryDate}
                                touched={touched.expiryDate}
                            />
                        </View>

                    
                        <ButtonView
                            title='Add Certificate'
                            onPress={() => handleSubmit()}
                            buttonStyle={{backgroundColor:colors.accent,borderColor:colors.accent}}
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

        </BaseView>
    )
}

export default AddCertificate

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
