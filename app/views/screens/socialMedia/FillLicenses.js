import React, { useRef,useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../redux/actions/homeActions'
import { showAlert,showAlertMessage,showConfirmAlert } from '../../../utils/Message'
import NoDataView from '../../components/NoDataView'
import BaseView from '../../hoc/BaseView'
import AddLicense from '../home/profile/socialAdd/AddLicense'
import LicenseItem from '../home/profile/items/LicenseItem'
import TitleRow from '../home/profile/items/TitleRow'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'



const FillLicenses = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const [profileLicenses,setProfileLicenses] = useState([]);
    const [extraData,setExtraData] = useState([]);


    const _renderItem = (item,index) => {
        return(
            <LicenseItem 
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }


    const _onDelete = (item) => {
        const list = profileLicenses;
        const filteredList = list.filter(it => it.licenseName !== item.licenseName)
        showAlert('success',`${item.licenseName} Deleted Successfully!`)
        setProfileLicenses(filteredList)
        setExtraData(!extraData)
    }

    const _onSave=()=>{
        if(profileLicenses.length<1){
            showAlert('error','No Licenses Added!')
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
            headerTitle='LICENSES'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddLicense   setProfileLicenses={setProfileLicenses} profileLicenses={profileLicenses}/>
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

export default FillLicenses

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    topMargin:{
        margin:10
    }
})
