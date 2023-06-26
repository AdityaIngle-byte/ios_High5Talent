import React, { useRef,useState} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../../redux/actions/homeActions'
import { setProfileExperiences,updateWorkExperience } from '../../../redux/actions/profileActions'
import { showAlert,showConfirmAlert} from '../../../utils/Message'
import NoDataView from '../../components/NoDataView'
import BaseView from '../../hoc/BaseView'
import AddExperience from '../home/profile/socialAdd/AddExperience'
import ExperienceItem from '../home/profile/items/ExperienceItem'
import TitleRow from '../home/profile/items/TitleRow'
import ButtonView from '../../components/ButtonView'
import { colors } from '../../../values/colors'

const FillWorkExperience = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const [profileExperiences,setProfileExperiences] = useState([]);
    const [extraData,setExtraData] = useState([]);

    const _renderItem = (item,index) => {
        return(
            <ExperienceItem 
                item={item}
                index={index}
                onDelete={() => _onDelete(item)}
            />
        )
    }

    const _onDelete = (item) => {
        const list = profileExperiences;
        const filteredList = list.filter(it => it.employerName !== item.employerName)
        showAlert('success',`${item.employerName} Deleted Successfully!`)
        setProfileExperiences(filteredList)
        setExtraData(!extraData)
    }

    const _onSave=()=>{
        alert("Done");
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='WORK EXPERIENCE'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddExperience  setProfileExperiences={setProfileExperiences} profileExperiences={profileExperiences}/>
            <View  style={{flex:1,paddingHorizontal:16,marginTop:16}}>
                <TitleRow 
                    title={'My Work Experience'}
                />
                {
                    profileExperiences.map((it,index) => _renderItem(it,index))
                }
                {
                    profileExperiences.length < 1
                    &&
                    <NoDataView 
                        msg={'No Experience Added yet!'}
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

export default FillWorkExperience

const styles = StyleSheet.create({
    parent : {
        flex:1
    },
    topMargin:{
        margin:10
    }
})
