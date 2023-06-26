import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { currencyList } from '../../../../json/currencyList'
import { changePassword } from '../../../../redux/actions/loginActions'
import { setPreferences, updateCurrencyPreferences } from '../../../../redux/actions/profileActions'
import { changePasswordValidationSchema, preferencesCurrencyRateValidationSchema } from '../../../../utils/formikValidations'
import ButtonView from '../../../components/ButtonView'
import InputView from '../../../components/InputView'
import PickerView from '../../../components/PickerView'
import BaseView from '../../../hoc/BaseView'
import CurrencyListModal from '../../../modals/CurrencyListModal'

const UpdateCurrencyAndRates = props => {

    const baseViewRef = useRef(null)
    const currencyListModalRef = useRef(null)

    const dispatch = useDispatch()

    const userPrefs = useSelector(state => state.home.userPrefs)
    const preferences = useSelector(state => state.profile.preferences)
    const currencyAndRates = preferences.currencyAndRates;

    const currencyItem = currencyList.filter(it => it.short_name === currencyAndRates.preferredSalaryCurrency);
    console.log('[UpdateCurrencyAndRates.js] : ',currencyItem)
    const [preferredCurrency, setPreferredCurrency] = useState(currencyItem.length>0 ? currencyItem[0] : null);
    const [minimumHourlyRate, setMinimumHourlyRate] = useState(currencyAndRates.minContractRate);
    const [minimumAnnualSalary, setMinimumAnnualSalary] = useState(currencyAndRates.preferredSalary)
    
    const _onUpdateCurrencyAndRates = () => {
        if(baseViewRef !== null){
            baseViewRef.current.showLoader();
            const data = {
                "clickName": "Currency",
                "minContractRate": minimumHourlyRate,
                "preferredSalary": minimumAnnualSalary,
                "preferredSalaryCurrency": preferredCurrency.short_name.toUpperCase()
            }
            updateCurrencyPreferences(data)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[UpdateCurrencyAndRates.js]  : ',response)
                    const updatedData = {
                        minContractRate : minimumHourlyRate,
                        minContractRateCurrency : currencyAndRates.minContractRateCurrency,
                        preferredSalaryCurrency : preferredCurrency.short_name,
                        preferredSalary : minimumAnnualSalary
                    }
                    const _preferences = {
                        ...preferences,
                        currencyAndRates:updatedData
                    }
                    dispatch(setPreferences(_preferences))
                    baseViewRef.current.successModal.baseModal.showModal();
                    baseViewRef.current.successModal.init('Updated Successfully');
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[UpdateCurrencyAndRates.js] Error : ',error)
                })
        }
    }


    const _onAddCurrency = () => {
        if(currencyListModalRef !== null){
            currencyListModalRef.current.baseModal.showModal()
        }
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='UPDATE CURRENCY & RATES'
            navigation={props.navigation}
        >
        <Formik
            initialValues={{
                preferredCurrency : preferredCurrency,
                minimumHourlyRate : minimumHourlyRate,
                minimumAnnualSalary : minimumAnnualSalary,
            }}
            validationSchema={preferencesCurrencyRateValidationSchema}
            onSubmit={() =>_onUpdateCurrencyAndRates()}
            enableReinitialize
        >
            {
                ({handleSubmit,errors,touched}) => (
                    <View style={styles.parent}>
                        <PickerView 
                            label={preferredCurrency === null ? '' : 'Select Preferred Currency'}
                            value={preferredCurrency === null ? 'Select Preferred Currency' : preferredCurrency.short_name}
                            parentStyle={{marginTop:16}}
                            pickerStyle={{height:56}}
                            onPress={() => _onAddCurrency()}
                            error={errors.preferredCurrency}
                            touched={touched.preferredCurrency}
                        />
                        <InputView 
                            label='Minimum Hourly Rate'
                            placeholder="Minimum Hourly Rate"
                            style={styles.topMargin}
                            value={minimumHourlyRate}
                            onChangeText={text => setMinimumHourlyRate(text)}
                            touched={touched.minimumHourlyRate}
                            error={errors.minimumHourlyRate}
                        />
                        <InputView 
                            label='Minimum Annual Salary'
                            placeholder="Minimum Annual Salary"
                            style={styles.topMargin}
                            value={minimumAnnualSalary}
                            onChangeText={text => setMinimumAnnualSalary(text)}
                            touched={touched.minimumAnnualSalary}
                            error={errors.minimumAnnualSalary}
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

        <CurrencyListModal 
            ref={currencyListModalRef}
            onItemPress={item => setPreferredCurrency(item)}
        />
        </BaseView>
    )
}

export default UpdateCurrencyAndRates

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
