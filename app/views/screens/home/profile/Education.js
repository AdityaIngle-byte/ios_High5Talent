import React, { useRef } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setExtraData } from '../../../../redux/actions/homeActions'
import { setProfileEducation, updateEducation } from '../../../../redux/actions/profileActions'
import { showAlert, showAlertMessage, showConfirmAlert } from '../../../../utils/Message'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import AddEducation from './add/AddEducation'
import EducationItem from './items/EducationItem'
import TitleRow from './items/TitleRow'

const Education = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    
    const profileEducation = useSelector(state => state.profile.profileEducation);
    const extraData = useSelector(state => state.home.extraData)
    


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
        showConfirmAlert(
                'Delete', 
                `Are you sure you want to delete "${item.educationProgram}"?`,
                () => {
                    if(baseViewRef !== null){
                        baseViewRef.current.showLoader()
                        const list = profileEducation;
                        const filteredList = list.filter(it => it.educationProgram !== item.educationProgram)
                        updateEducation(filteredList)  
                            .then(response => {
                                baseViewRef.current.hideLoader()
                                console.log('[Education.js] on Delete Education: ',response)
                                dispatch(setProfileEducation(filteredList))
                                dispatch(setExtraData(!extraData))
                                baseViewRef.current.hideLoader()
                                showAlert('success','Deleted Successfully!')
                            })
                            .catch(error => {
                                baseViewRef.current.hideLoader()
                                console.log('[AddEducation.js] on Delete Education Error: ',error)
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
            headerTitle='EDUCATION'
            hasTitle
        >
        <ScrollView
            contentContainerStyle={{paddingBottom:40}}
        >
        <View style={styles.parent}>
            <AddEducation  />
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
        </View>
        </ScrollView>
        </BaseView>
    )
}

export default Education

const styles = StyleSheet.create({
    parent : {
        flex:1
    }
})
