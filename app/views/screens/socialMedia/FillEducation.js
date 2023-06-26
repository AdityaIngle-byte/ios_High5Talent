import React, { useRef,useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../redux/actions/homeActions'
import { showAlert,showAlertMessage,showConfirmAlert } from '../../../utils/Message'
import NoDataView from '../../components/NoDataView'
import BaseView from '../../hoc/BaseView'
import AddEducation from '../home/profile/socialAdd/AddEducation'
import EducationItem from '../home/profile/items/EducationItem'
import TitleRow from '../home/profile/items/TitleRow'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'


const FillEducation = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const [profileEducation,setProfileEducation] = useState([]);
    const [extraData,setExtraData] = useState([]);


    const _renderItem = (item,index) => {
        return(
            <EducationItem 
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }


    const _onDelete = (item) => {
        const list = profileEducation;
        const filteredList = list.filter(it => it.educationProgram !== item.educationProgram)
        showAlert('success',`${item.educationProgram} Deleted Successfully!`)
        setProfileEducation(filteredList)
        setExtraData(!extraData)
    }

    const _onSave=()=>{
        if(profileEducation.length<1){
            showAlert('error','No Education Added!')
            return;
        }
        props.navigation.navigate('FillCertificates');
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='EDUCATION'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddEducation   setProfileEducation={setProfileEducation} profileEducation={profileEducation}/>
            <View  style={{flex:1,paddingHorizontal:16,marginTop:16}}>
                <TitleRow 
                    title={'My Education'}
                />
                {
                    profileEducation.map((it,index) => _renderItem(it,index))
                }
                {
                    profileEducation.length < 1
                    &&
                    <NoDataView 
                        msg={'No Education Added yet!'}
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

export default FillEducation

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    topMargin:{
        margin:10
    }
})
