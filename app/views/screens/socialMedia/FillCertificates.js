import React, { useRef,useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../redux/actions/homeActions'
import { showAlert,showAlertMessage,showConfirmAlert } from '../../../utils/Message'
import NoDataView from '../../components/NoDataView'
import BaseView from '../../hoc/BaseView'
import AddCertificate from '../home/profile/socialAdd/AddCertificate'
import CertificateItem from '../home/profile/items/CertificateItem'
import TitleRow from '../home/profile/items/TitleRow'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'

const FillCertificates = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const [profileCertificates,setProfileCertificates] = useState([]);
    const [extraData,setExtraData] = useState([]);


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
        const list = profileCertificates;
        const filteredList = list.filter(it => it.certificationName !== item.certificationName)
        showAlert('success',`${item.certificationName} Deleted Successfully!`)
        setProfileCertificates(filteredList)
        setExtraData(!extraData)
    }

    const _onSave=()=>{
        if(profileCertificates.length<1){
            showAlert('error','No Certificates Added!')
            return;
        }
        props.navigation.navigate('FillLicenses');
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
            <AddCertificate   setProfileCertificates={setProfileCertificates} profileCertificates={profileCertificates}/>
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
            <ButtonView
                title='Next'
                containerStyle={styles.topMargin}
                parentStyle={{backgroundColor:colors.accent}}
                onPress={() => _onSave()}
            />
        </View>
        </ScrollView>
        </BaseView>
    )
}

export default FillCertificates

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    topMargin:{
        margin:10
    }
})
