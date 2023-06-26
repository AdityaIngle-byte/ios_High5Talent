import { View, Text,ScrollView,StyleSheet} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../../hoc/BaseView'
import { Formik } from 'formik'
import { socialMediaValidationSchema } from '../../../utils/formikValidations'
import { setProfileSocialMedia,updateSocialMedia } from '../../../redux/actions/profileActions'
import InputView from '../../components/InputView'
import { fonts } from '../../../values/fonts'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'
import { useDispatch, useSelector } from 'react-redux'
import NumericInput from 'react-native-numeric-input'
import PickerView from '../../components/PickerView'
import SingleSelectModal from '../../modals/SingleSelectModal'
import Select2 from '../../components/react-native-select-two-master'
import { Switch } from "@rneui/themed";

 
const mockData = [
  { id: 1, name: "React Native Developer", checked: true }, // set default checked for render option item
  { id: 2, name: "Android Developer" },
  { id: 3, name: "iOS Developer" }
]

const currentTypeJson=[{id:'',name:'ABC'},{id:'',name:'DEF'},{id:'',name:'GHI'}];

export default function FillContact(props) {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch()
    const singleSelectModal = useRef(null)


    const [linkedIn, setLinkedIn] = useState('');
    const [facebookId, setFacebookId] = useState('')
    const [twitterId, setTwitterId] = useState('')
    const [preferredSalary, setPreferredSalary] = useState(1)
    const [currentTypePreferredSalary, setCurrentTypePreferredSalary] = useState(null)
    const [minContractRate,setMinContractRate] = useState(1);
    const [currentTypeContractRate, setCurrentTypeContractRate] = useState(null)
    const [flag, setflag] = useState(null);
    const [experience,setExperience] = useState({years:0,months:0});
    const [jobTitle, setJobTitle] = useState('');
    const [positionType, setPositionType] = useState('');
    const [isFresher, setisFresher] = useState(false);
    const [preferredLocation,setPreferredLocation]=useState('');


    useEffect(() => {
        // _setInitialData()
      return () => {
      };
    })


    

    const _onSave = () => {
        alert("Success");
        props.navigation.navigate('FillSkills');
    }

    const setDropDown = (item) =>{
        if(flag==0){
            setCurrentTypePreferredSalary(item.name);
        }else{
            setCurrentTypeContractRate(item.name);
        }
    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            headerTitle='PROFILE INFO'
            hasTitle
            hasBack
            onBackPress={() => props.navigation.goBack()}
        >
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                <Formik
                    initialValues={{
                        linkedIn : linkedIn,
                        facebookId : facebookId
                    }}
                    validationSchema={socialMediaValidationSchema}
                    onSubmit={() => _onSave()}
                    enableReinitialize
                >
                    {({handleSubmit,errors,touched}) => (
                        <View style={{flex:1,marginHorizontal:16}}>
                            <View>
                                <View>
                                    <Text style={styles.headingTextColor}>Social</Text>
                                </View>
                                <View>
                                <InputView 
                                    label={'Linkedin Profile Link'}
                                    placeholder={'Linkedin Id'}
                                    value={linkedIn}
                                    onChangeText={text => setLinkedIn(text)}
                                    style={styles.topMargin}
                                    error={errors.linkedIn}
                                    touched={touched.linkedIn}
                                />
                                <InputView 
                                    label={'Facebook ID'}
                                    placeholder={'Facebook ID'}
                                    value={facebookId}
                                    onChangeText={text => setFacebookId(text)}
                                    style={styles.topMargin}
                                    error={errors.facebookId}
                                    touched={errors.facebookId}
                                />
                                <InputView 
                                    label={'Twitter ID'}
                                    placeholder={'Twitter ID'}
                                    value={twitterId}
                                    onChangeText={text => setTwitterId(text)}
                                    style={styles.topMargin}
                                    error={errors.twitterId}
                                    touched={errors.twitterId}
                                />
                                </View>
                            </View>
                            <View>
                                <View style={{marginTop:10}}>
                                    <Text style={styles.headingTextColor}>Rates</Text>
                                </View>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{marginHorizontal:10,flex:1,marginRight:8}}>
                                        <Text style={[styles.headingTextColor,{fontSize:14}]}>Preferred salary</Text>
                                        <NumericInput 
                                        minValue={1}
                                        value={preferredSalary} 
                                        onChange={preferredSalary => setPreferredSalary(preferredSalary)} 
                                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                        totalWidth={150} 
                                        totalHeight={50} 
                                        iconSize={25}
                                        step={1}
                                        valueType='real'
                                        rounded 
                                        textColor='black' 
                                        iconStyle={{ color: 'white' }} 
                                        rightButtonBackgroundColor={colors.successColor} 
                                        leftButtonBackgroundColor={colors.accent} /> 
                                    </View>
                                    <View style={{marginHorizontal:5,flex:1}}>
                                        <Text style={[styles.headingTextColor,{fontSize:14}]}>Current Type</Text>
                                        <PickerView 
                                            label={currentTypePreferredSalary === null ? '' : 'Select Type'}
                                            value={currentTypePreferredSalary === null ? 'Select Type' : `${currentTypePreferredSalary}`}
                                            parentStyle={{}}
                                            pickerStyle={{height:50,width:150}}
                                            onPress={() => {
                                                setflag(0)
                                                if(singleSelectModal !== null){
                                                    singleSelectModal.current.baseModal.showModal();
                                                    singleSelectModal.current.init(currentTypeJson)
                                                }
                                            }}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={{marginTop:10,flexDirection:"row"}}>
                                    <View style={{marginHorizontal:10,flex:1,marginRight:8}}>
                                        <Text style={[styles.headingTextColor,{fontSize:14}]}>Minimum Contract Rate</Text>
                                        <NumericInput 
                                        minValue={1}
                                        value={minContractRate} 
                                        onChange={minContractRate => setMinContractRate(minContractRate)} 
                                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                        totalWidth={150} 
                                        totalHeight={50} 
                                        iconSize={25}
                                        step={1}
                                        valueType='real'
                                        rounded 
                                        textColor='black' 
                                        iconStyle={{ color: 'white' }} 
                                        rightButtonBackgroundColor={colors.successColor} 
                                        leftButtonBackgroundColor={colors.accent} /> 
                                    </View>
                                    <View style={{marginHorizontal:5,flex:1}}>
                                        <Text style={[styles.headingTextColor,{fontSize:14}]}>Current Type</Text>
                                        <PickerView 
                                            label={currentTypeContractRate === null ? '' : 'Select Type'}
                                            value={currentTypeContractRate === null ? 'Select Type' : `${currentTypeContractRate}`}
                                            parentStyle={{}}
                                            pickerStyle={{height:50,width:150}}
                                            onPress={() => {
                                                setflag(1)
                                                if(singleSelectModal !== null){
                                                    singleSelectModal.current.baseModal.showModal();
                                                    singleSelectModal.current.init(currentTypeJson)
                                                }
                                            }}
                                        />
                                    </View>     
                                </View>
                            </View>
                            <View>
                                <View style={{marginTop:10}}>
                                    <Text style={styles.headingTextColor}>Is Fresher ?</Text>
                                </View>
                                <Switch
                                    value={isFresher === true}
                                    onValueChange={()=>setisFresher(!isFresher)}
                                    color={isFresher === true?colors.newColor:colors.placeholderTextColor}
                                />
                            </View>
                            {
                                isFresher === false ?
                            <>
                            <View>
                                <View style={{marginTop:10}}>
                                    <Text style={styles.headingTextColor}>Experience</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:"row"}}>
                                <View style={{marginHorizontal:10,marginRight:8}}>
                                    <Text style={[styles.headingTextColor,{fontSize:14}]}>Years</Text>
                                    <NumericInput 
                                    minValue={1}
                                    type='up-down'
                                    value={experience.years} 
                                    onChange={years =>setExperience(prevState => ({
                                        ...prevState,
                                        years: years
                                     }))} 
                                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={100} 
                                    totalHeight={50} 
                                    iconSize={15}
                                    step={1}
                                    valueType='real'
                                    rounded 
                                    textColor='black' 
                                    iconStyle={{ color: 'black' }} 
                                     /> 
                                </View>
                                <View style={{marginHorizontal:10,marginRight:8}}>
                                    <Text style={[styles.headingTextColor,{fontSize:14}]}>Months</Text>
                                    <NumericInput 
                                    type='up-down'
                                    minValue={1}
                                    value={experience.months} 
                                    onChange={months =>setExperience(prevState => ({
                                        ...prevState,
                                        months: months
                                     }))} 
                                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={100} 
                                    totalHeight={50} 
                                    iconSize={15}
                                    step={1}
                                    valueType='real'
                                    rounded 
                                    textColor='black' 
                                    iconStyle={{ color: 'black' }} 
                                     /> 
                                </View>
                                <View style={{marginHorizontal:10,marginRight:8}}>
                                    <Text style={[styles.headingTextColor,{fontSize:14}]}>Current Job Title</Text>
                                    <InputView 
                                    label={'Job Title'}
                                    placeholder={'Job Title'}
                                    value={jobTitle}
                                    onChangeText={text => setJobTitle(text)}
                                    error={errors.jobTitle}
                                    touched={touched.jobTitle}
                                    />
                                </View>
                            </View>
                            </>
                            :null
                        }
                        <View>
                            <View style={{marginTop:10}}>
                                <Text style={styles.headingTextColor}>Position Types</Text>
                            </View>
                            <Select2
                                style={{ borderRadius: 5 }}
                                colorTheme={colors.accent}
                                popupTitle="Select Position Types"
                                title="Select Position Types"
                                data={mockData}
                                onSelect={data => {
                                    setPositionType(data)
                                }}
                                onRemoveItem={data => {
                                    setPositionType(data)
                                }}
                            />
                        </View>
                        <View>
                            <View style={{marginTop:10}}>
                                <Text style={styles.headingTextColor}>Preferred Locations</Text>
                            </View>
                            <InputView 
                                label={'Type Location'}
                                placeholder={'Type Location'}
                                value={preferredLocation}
                                onChangeText={text => setPreferredLocation(text)}
                                error={errors.preferredLocation}
                                touched={touched.preferredLocation}
                            />
                            
                        </View>
                            <ButtonView 
                                title='Next'
                                containerStyle={[styles.topMargin,{marginHorizontal:10}]}
                                parentStyle={{backgroundColor:colors.accent}}
                                onPress={() => handleSubmit()}
                            />
                            <SingleSelectModal 
                                ref={singleSelectModal}
                                onSetItem={item => {setDropDown(item)}}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        paddingTop:16
    },
    row : {
        flexDirection:'row',
        marginTop:16
    },
    topMargin : {
        marginTop:16,
        marginBottom:10
    },
    rightMargin : {
        marginRight:8,
        flex:1
    },
    leftMargin : {
        marginLeft:8,
        flex:1
    },
    addAddressText : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:colors.darkBlueColor,
        paddingLeft:8
    },
    addAddressView : {
        alignItems:'center',
        justifyContent:'center',
        marginTop:24,
        alignSelf:'flex-end'
    },
    uploadImageView : {
        height:164,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#e7e7e7',
    },
    label : {
        fontSize:12,
        fontFamily:fonts.notoSansRegular,
        paddingBottom:4,
        color:'#3C4043'
    },
    image : {
        height:164,
        width:'100%',
        borderRadius:4
    },
    view : {
        flex:1,
        justifyContent:'center',
        marginLeft:8
    },
    imageView : {
        width:'30%',
        marginRight : 8,
        borderRadius:4,
        backgroundColor:'#fff',
        padding:4
    },
    headingTextColor:{
        color:"gray",
        fontSize:18,
        marginTop:10
    }
});