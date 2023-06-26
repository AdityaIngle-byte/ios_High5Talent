import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../../redux/actions/homeActions'
import { setProfileLicenses, updateLicenses } from '../../../../redux/actions/profileActions'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import AddExperience from './add/AddExperience'
import AddLicense from './add/AddLicense'
import ExperienceItem from './items/ExperienceItem'
import LicenseItem from './items/LicenseItem'
import TitleRow from './items/TitleRow'

const Licenses = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const profileLicenses = useSelector(state => state.profile.profileLicenses);
    const extraData = useSelector(state => state.home.extraData)

    const _renderItem = (item,index) => {
        return(
            <LicenseItem 
                item={item}
                index={index}
                onDelete = {() => _onDelete(item)}
            />
        )
    }


    const _onDelete = (item) => {

        showConfirmAlert(
            'Delete',
            `Are you sure you want to delete "${item.licenseName}"?`,
            () => {
                if(baseViewRef !== null){
                    baseViewRef.current.showLoader();

                    const list = profileLicenses;
                    const filteredList = list.filter(it => it.licenseName !== item.licenseName)
                    updateLicenses(filteredList)    
                        .then(response => {
                            baseViewRef.current.hideLoader()
                            console.log('[AddLicense.js] Response: ',response)
                            dispatch(setProfileLicenses(filteredList))
                            dispatch(setExtraData(!extraData))
                            showAlert('success','Deleted Successfully!')
                        })
                        .catch(error => {
                            baseViewRef.current.hideLoader()
                            console.log('[AddLicense.js] Error: ',error)
                        })
                }
            })
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='LICENSES'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddLicense  />
            <View  style={{flex:1,paddingHorizontal:16,marginTop:16}}>
                <TitleRow 
                    title={'My Licenses'}
                />
                {
                    profileLicenses.map((it,index) => _renderItem(it,index))
                }
                {
                    profileLicenses.length < 1
                    &&
                    <NoDataView 
                        msg={'No License Added yet!'}
                        parentStyle={{marginTop:48}}
                    />
                }
            </View>
        </View>
        </ScrollView>
        </BaseView>
    )
}

export default Licenses

const styles = StyleSheet.create({
    parent : {
        flex:1
    }
})
