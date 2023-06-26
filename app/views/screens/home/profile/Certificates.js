import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../../redux/actions/homeActions'
import { setProfileCertificates, updateCertificates } from '../../../../redux/actions/profileActions'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import AddCertificate from './add/AddCertificate'
import CertificateItem from './items/CertificateItem'
import TitleRow from './items/TitleRow'

const Certificates = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const profileCertificates = useSelector(state => state.profile.profileCertificates);
    const extraData = useSelector(state => state.home.extraData)

    const _renderItem = (item,index) => {
        return(
            <CertificateItem 
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }


    const _onDelete = (item) => {
        showConfirmAlert(
            'Delete',
            `Are you sure you want to delete "${item.certificationName}"?`,
            () => {
                if(baseViewRef !== null){
                    const list = profileCertificates;
                    const filteredList = list.filter(it => it.certificationName !== item.certificationName)
                    baseViewRef.current.showLoader()
                    updateCertificates(filteredList)
                        .then(response => {
                            dispatch(setProfileCertificates(filteredList))
                            dispatch(setExtraData(!extraData))
                            console.log('[Certificate.js] On Delete Certificate: ',response)
                            baseViewRef.current.hideLoader()
                            showAlert('success','Deleted Successfully!')
                        })
                        .catch(error => {
                            baseViewRef.current.hideLoader()
                            console.log('[Certificate.js] On Add Certificate Error: ',error)
                        })
                }
            }
        )
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='CERTIFICATES'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddCertificate  />
            <View  style={{flex:1,paddingHorizontal:16,marginTop:16}}>
                <TitleRow 
                    title={'My Certificates'}
                />
                {
                    profileCertificates.map((it,index) => _renderItem(it,index))
                }

                {
                    profileCertificates.length < 1
                    &&
                    <NoDataView 
                        msg={'No Certificate Added yet!'}
                        parentStyle={{marginTop:48}}
                    />
                }
            </View>
        </View>
        </ScrollView>
        </BaseView>
    )
}

export default Certificates

const styles = StyleSheet.create({
    parent : {
        flex:1
    }
})
