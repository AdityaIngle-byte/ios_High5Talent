
import BaseView from '../../hoc/BaseView'
import { Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import InputView from '../../components/InputView'
import { fonts } from '../../../values/fonts'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'
import { useDispatch, useSelector } from 'react-redux'
import NumericInput from 'react-native-numeric-input'
import PickerView from '../../components/PickerView'
import SingleSelectModal from '../../modals/SingleSelectModal'
import { jobTypesJson } from '../../../json/jobTypesJson'
import { updateSkills, setProfileSkills} from '../../../redux/actions/profileActions'
import { profileSkillsValidationSchema } from '../../../utils/formikValidations'
import { showAlert,showAlertMessage, showConfirmAlert} from '../../../utils/Message'
import { generateRandomString } from '../../../utils/Validations'
import AddEducation from '../home/profile/add/AddEducation'
import EducationItem from '../home/profile/items/EducationItem'
import ProfileSkillItem from '../home/profile/items/ProfileSkillItem'
import TitleRow from '../home/profile/items/TitleRow'

export default function FillSkills(props) {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    const singleSelectModal = useRef(null)

    const profileSkills = useSelector(state => state.profile.profileSkills);
    const extraData = useSelector(state => state.home.extraData)
    const [skillName, setSkillName] = useState('')
    const [secondaryskillName, setsecondaryskillName] = useState('')
    // const [rating, setRating] = useState(3)
    const [skillsets, setSkillsets] = useState('')
    const [skillsList, setSkillsList] = useState([])
    const [skillsListSecondary, setSkillsListSecondary] = useState([])

    const [flag, setFlag] = useState(0)


    useEffect(() => {
        // _setInitialData()
      return () => {
      };
    },[skillsets,setSkillsList])


    const _renderItem = (item,index) => {
        return(
            <ProfileSkillItem 
                item={item}
                index={index}
                onDelete={() => _onDeleteSkill(item)}
                flag={flag}
                onSkillPress={() => {
                    props.route.params.onGoBack(item)
                    props.navigation.goBack()
                }}
            />
        )
    }

    const _renderItemSecondary = (item,index) => {
        return(
            <ProfileSkillItem 
                item={item}
                index={index}
                onDelete={() => _onDeleteSkillSecondary(item)}
                flag={flag}
                onSkillPress={() => {
                    props.route.params.onGoBack(item)
                    props.navigation.goBack()
                }}
            />
        )
    }


    const _onDeleteSkill = (item) => {
        const list = skillsList;
        const filteredList = list.filter(it => it.id !== item.id)
        showAlert('success',`${item.skill} Deleted Successfully!`)
        setSkillsList(filteredList)
    }

    const _onDeleteSkillSecondary = (item) => {
        const list = skillsListSecondary;
        const filteredList = list.filter(it => it.id !== item.id)
        showAlert('success',`${item.skill} Deleted Successfully!`)
        setSkillsListSecondary(filteredList)
    }

    const _onAddSkill = () => {

        const filteredList = skillsList.filter(it => it.skill.replace(' ',"").toLowerCase() === skillName.replace(' ',"").toLowerCase())
        console.log('[Skills.js] Filtered List : ',skillsList,skillName,filteredList)
        // alert('Hi')
        if(filteredList.length < 1){
            const item = {
                id : `skill_${generateRandomString(20)}`,
                skill : skillName,
                // rating : rating
            }
            showAlert('success',`${item.skill} Added Successfully!`)
            const list = [...skillsList,item]
            setSkillsList(list);
            setSkillName('')
        }else{
            showAlert('error','Skill ALready Added!')
        }

        
        // setSkillName('');
    }

    const _onAddSkillSecondary = () => {
        const filteredList = skillsListSecondary.filter(it => it.skill.replace(' ',"").toLowerCase() === secondaryskillName.replace(' ',"").toLowerCase())
        console.log('[Skills.js] Filtered List : ',skillsListSecondary,secondaryskillName,filteredList)
        // alert('Hi')
        if(filteredList.length < 1){
            const item = {
                id : `skill_${generateRandomString(20)}`,
                skill : secondaryskillName,
                // rating : rating
            }
            showAlert('success',`${item.skill} Added Successfully!`)
            const list = [...skillsListSecondary,item]
            setSkillsListSecondary(list);
            setsecondaryskillName('')
        }else{
            showAlert('error','Skill ALready Added!')
        }

        
        setSkillName('');
    }


    const _onReset = () => {
        showConfirmAlert(
                'Reset',
                'All Skills and Industry will be reset.Are you sure?',
                () => {
                    setSkillsList([])
                    setSkillsListSecondary([])
                    setsecondaryskillName('')
                    setSkillName('')
                    setSkillsets('')
                }

            )
    }
    

    const _onSave = () => {
        if(skillsList.length < 1){
            showAlert('error','No Skills Added!')
        }else if(skillsets === ''){
            showAlert('error','No SkillSet Selected!')
        }else {
            // const _skills = {};
            const primaryskills = []
            const secondaryskills = []
            skillsList.forEach(it => {
                primaryskills.push(it.skill)
            })
            skillsListSecondary.forEach(it => {
                secondaryskills.push(it.skill)
            })

            const data = {
                skillSet : [skillsets],
                primarySkills : primaryskills,
                secondaryskills:secondaryskills

            }
             console.log(data);
        }
      
    }

    

    return (
        <BaseView
        ref={baseViewRef}
        hasStatusBar
        hasHeader
        hasBack
        onBackPress={() => props.navigation.goBack()}
        headerTitle='SKILLS'
        hasTitle
        rightComponent={
            <TouchableOpacity 
                style={{padding:8}}
                onPress={() => _onReset()}
            >
                <Text style={{color:colors.primary,fontFamily:fonts.notoSansMedium}}>Reset</Text>
            </TouchableOpacity>
        }
       
    >
    <ScrollView
        contentContainerStyle={{paddingBottom:40}}
        style={{flex:1}}
    >
    <Formik
        initialValues={{
            skill : skillName
        }}
        validationSchema={profileSkillsValidationSchema}
        onSubmit={() => {_onAddSkill()}}
        enableReinitialize
    >
    {
        ({handleSubmit,values,errors,touched}) => (
            <View style={styles.parent}>
                
                <InputView 
                    label={'Primary Skills'}
                    placeholder={'Primary Skills'}
                    value={skillName}
                    onChangeText={text => setSkillName(text)}
                    error={errors.skill}
                    touched={touched.skill}
                    
                />

                <TouchableOpacity 
                    style={{alignSelf: 'center'}}
                    onPress={() => handleSubmit()}
                >
                    <Text style={styles.addSkill}>+ Add Primary Skill</Text>
                </TouchableOpacity>

            
                <View style={{marginTop:30}}>
                    <InputView 
                        label={'Secondary Skills'}
                        placeholder={'Secondary Skills'}
                        value={secondaryskillName}
                        onChangeText={text => {setsecondaryskillName(text);setFlag(1)}}  
                    />
                </View>
                

                <TouchableOpacity 
                    style={{alignSelf: 'center'}}
                    onPress={() => _onAddSkillSecondary()}
                >
                    <Text style={styles.addSkill}>+ Add Secondary Skill</Text>
                </TouchableOpacity>

                {
                    skillsList.length>0?
                    <View style={{marginHorizontal:10,marginRight:8}}>
                        <Text style={[styles.headingTextColor,{fontWeight:"bold"}]}>Primary Skills</Text>
                        {
                        skillsList.map((item,index) => _renderItem(item,index))
                        }
                    </View>:null

                }
               

                {
                    skillsListSecondary.length>0?
                    <View style={{marginHorizontal:10,marginRight:8}}>
                        <Text style={[styles.headingTextColor,{fontWeight:"bold"}]}>Secondary Skills</Text>
                        {
                            skillsListSecondary.map((item,index) => _renderItemSecondary(item,index))
                        }
                    </View>:null

                }
                

               

                <PickerView 
                    label={skillsets !== '' ? 'Skillsets' : ''}
                    value={skillsets !== '' ? skillsets : 'Select Skillsets'}
                    onPress={() => {
                        if(singleSelectModal !== null){
                            singleSelectModal.current.baseModal.showModal();
                            singleSelectModal.current.init(jobTypesJson)
                        }
                    }}
                    parentStyle={{marginTop:32}}
                />
            </View>
    )}
    </Formik>
    </ScrollView>

        <ButtonView 
            title='Next'
            containerStyle={[styles.topMargin,{position:'absolute',bottom:10,left:24,right:24}]}
            parentStyle={{backgroundColor:colors.accent}}
            onPress={() => _onSave()}
        />
    

        <SingleSelectModal 
            ref={singleSelectModal}
            onSetItem={item => setSkillsets(item.name)}
        />
    </BaseView>
    )
}

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        paddingTop:16
    },
    heading : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        paddingBottom:4,
        color:'#888',
        // paddingTop:16
    },
    row : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:16
    },
    addSkill : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        paddingBottom:4,
        color:colors.accent,
    },
    headingTextColor:{
        color:"gray",
        fontSize:18,
        marginTop:10
    }
})