import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { applyForJob, getHomeData, setFavJobsList, setMatchedJobsList,getMatchedJobs } from '../../../../redux/actions/homeActions'
import { setResumeList } from '../../../../redux/actions/resumeActions'
import { showAlert } from '../../../../utils/Message'
import { getUserPref } from '../../../../utils/UserPrefs'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'
import ButtonView from '../../../components/ButtonView'
import InputView from '../../../components/InputView'
import PickerView from '../../../components/PickerView'
import BaseView from '../../../hoc/BaseView'
import SelectResumeModal from '../../../modals/SelectResumeModal'
import { profileStyles } from '../profile/profileStyles'
import axios from 'axios'

import ScreeningQuestion from './items/ScreeningQuestion'

const ApplyJob = props => {

    const baseViewRef = useRef(null)
    const selectResumeModalRef = useRef(null)

    const dispatch = useDispatch()

    const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
    const resumeList = useSelector(state => state.resume.resumeList)
    
// Hi, I have experience both on the agency-side and corporate-side of the staffing business, with a focus in the financial services space at companies like Bloomberg and UBS. 
    const [description, setDescription] = useState('')
    const [jobDetail, setJobDetail] = useState(null)
    const [recruiter, setRecruiter] = useState(null)
    const [resume, setResume] = useState(null)
    const [ QandA, setQandA ] = useState([])
    const [ QandAValidation, setQandAValidation ] = useState([])
    const [vettingDB, setVettingDB] = useState([]);
    const [vettingAssign, setVettingAssign] = useState([]); 
    const [vettingDetails, setVettingDetails] = useState([]);

    useEffect(() => {
        init()
        return () => {    
        };
    }, [])

    
    const init = () => {
        const {detail, recruiter} = props.route.params;
        console.log('[ApplyJob.js] init : ',detail,recruiter)
        if(detail !== undefined) {
            setJobDetail(detail)     
            setRecruiter(recruiter)       
        }
        if(detail.QandA) {
            let QnA = JSON.parse(detail.QandA)
            let finalQA = QnA.map(item => {
                if(!['Industry Experience', 'Work Experience', 'Custom Question', 'Language'].includes(item.name)) {
                    return { ...item, answer: 'Yes'}
                }
                else if (item.name === 'Language') {
                    return { ...item, answer: JSON.parse(item.input).map(i => ({ name: i, proficiency: 'Beginner'}))}
                }
                else if (item.name === 'Custom Question') {
                    return { ...item, answer: item.input === 'Yes/No' ? 'Yes' : ''}
                }
                else {
                    return item
                }
            })
            setQandA(finalQA)
            setQandAValidation(finalQA.map(i => ''))
        }
        if(detail.vettingDetails && detail.vettingDetails.length > 0) {
            let vettingData = typeof(detail.vettingDetails) === 'string' ? JSON.parse(detail.vettingDetails) : detail.vettingDetails
            setVettingDetails(vettingData)
            fetchVetting(vettingData)
        }
    }

    const fetchVetting = async (vetting) => {
        debugger;
        baseViewRef.current.showLoader()
        const res = await axios.get(
          "https://high5vettingqa-api.azurewebsites.net/test/all",
          {
            headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" },
          }
        );
        let vett = res.data.filter((i) => i.skills.length === 1);
        setVettingDB(vett);
        let vettings = [];
        let skills = vett.map((i) => i.skills[0]);
        let DB = [...vetting].map((i) => ({
          ...i,
          duration: i.duration?.split(" ")[0],
          type: i.type === "Video MCQ" ? "Video" : i.type,
        }));
        DB.map((item) => {
          if (skills.includes(item.name)) {
            let obj = vett.find((i) => i.skills.includes(item.name));
            if (
              obj.testCategory === item.type &&
              obj.details.duration === item.duration
            ) {
              vettings.push(obj._id);
            }
          }
        });
        setVettingAssign(vettings);
        baseViewRef.current.hideLoader()
    };


    const _onSelectResume = () => {
        if(selectResumeModalRef !== null){
            if(resumeList.length>0){
                selectResumeModalRef.current.baseModal.showModal();
                selectResumeModalRef.current.init(resumeList);
            }else{
                showAlert('error','Please Add Resume.')
            }
        }
    }


    const onSubmit = async() => {
        debugger;
        if(baseViewRef !== null){
            console.log(QandA)
            let QnAVal = QandA.map(i => '')
            QandA.forEach((item, index) => {
                if(['Industry Experience', 'Work Experience', 'Custom Question'].includes(item.name)) {
                    if(item.isMandatory && !item.answer) {
                        console.log(item.answer)
                        QnAVal[index] = '*Required Field'
                    }
                    if(item.name === 'Work Experience') {
                        let exp = QandA.find(item2 => item2.name === 'Industry Experience')?.answer
                        if(exp && +item.answer < +exp) {
                            QnAVal[index] = 'Total experience should be greater than Industry Experience'
                        }
                    }
                }
            })

            if(resume === '' || resume==null) {
               showAlert('error','Please Select Resume');
            }
            else if(QnAVal.some(i => i)) {
                setQandAValidation(QnAVal)
                showAlert('error','Please Fill All the Mandatory Screening Questions');
            }
            else if(false) {
            console.log(QandA)
            console.log(QandAValidation)
            toast.success('Validation Success')
            }
            else {
                setQandAValidation(QandA.map(i => ''))
                debugger;
                if (vettingAssign.length > 0) {
                    let body = {
                        companyInfo: {
                            companyName: jobDetail.companyName,
                            companyLogo: "",
                            companyId: jobDetail.companyJobId
                        },
                        reviewer: {
                            firstName: "",
                            lastName: "",
                            reviewerEmail: "",
                            instructions: "",   //
                        },
                        createdBy: {
                            id: jobDetail.jobCreatedBy,
                            name: jobDetail.jobCreatedByName,
                            role: "user",
                        },
                        modifiedBy: {
                            id: jobDetail.jobCreatedBy,
                            name:jobDetail.jobCreatedByName,
                            role: "user",    //
                        },
                        firstName: profilePersonalInfo.firstName,
                        lastName: profilePersonalInfo.firstName,
                        email: profilePersonalInfo.email,
                        recruiterEmail: "",   //
                        high5hireCandidateId: jobDetail.jobId,
                        testAssign: {
                            id: vettingAssign[0],
                        },
                        testInvited: true,
                        expiryDays: 40,
                        takesForTest: 3,
                    };
                    const res = await axios.post(
                      "https://high5vettingqa-api.azurewebsites.net/candidate/add",
                      body,
                      {
                        headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" },
                      }
                    );
                    if (vettingAssign.length > 1) {
                      const res2 = await axios.post(
                        "https://high5vettingqa-api.azurewebsites.net/candidate/add",
                        { ...body, testAssign: { id: vettingAssign[1] } },
                        {
                          headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" },
                        }
                      );
                    }
                    if (vettingAssign.length > 2) {
                      const res2 = await axios.post(
                        "https://high5vettingqa-api.azurewebsites.net/candidate/add",
                        { ...body, testAssign: { id: vettingAssign[2] } },
                        {
                          headers: { token: "df$rtu*om*xc:d11m05h5hzsAqrCh" },
                        }
                      );
                    }
                    console.log("Response from vetting assign");
                    console.log(res.data);
                }
                const jobLocation = `${jobDetail.location.address}, ${jobDetail.location.city}, ${jobDetail.location.state}, ${jobDetail.location.country}, ${jobDetail.location.zipcode}`;
                const userPrefs = JSON.parse(await getUserPref())
                console.log('[JobDetail.js] On MakeJobFavorite : ',userPrefs)
                const data = {
                    "id" : jobDetail.id,
                    "jobId":jobDetail.jobId,
                    "jobTitle": jobDetail.fullText.jobTitle,
                    "jobTenant": jobDetail.fullText.jobTenant,
                    "jobLocation": jobLocation,
                    "candidateId": userPrefs.candidateId,
                    "candidateFname": profilePersonalInfo.firstName,
                    "candidateLname": profilePersonalInfo.lastName,
                    "candidateEmail": profilePersonalInfo.email,
                    "comments": description,
                    "recruiterData": [{
                        "firstName": recruiter !== null ? recruiter.firstName : "",
                        "lastName": recruiter !== null ? recruiter.lastName : "",
                        "email": recruiter !== null ? recruiter.email : "",
                    }],
                    "resumeURL" : [{
                        "fileName" : resume !== null ? resume.fileName : '',
                        "resumeURL" : resume !== null ? resume.resumeURL : '',
                    }]
                }
        
                console.log('[ApplyJob.js] On Submit : ',data)
                baseViewRef.current.showLoader()
                applyForJob(data)
                    .then(response => {
                        baseViewRef.current.hideLoader()
                        console.log('[ApplyJob.js] On Submit : ',response)
                        showAlert('success','You have been successfully applied!')
                        const {onGoBack,fromSearch} = props.route.params;
                        if(onGoBack !== undefined){
                            onGoBack();
                        
                        }
                        if(fromSearch==true){
                            _updateJob();
                        }
                        props.navigation.goBack()
                    })
                    .catch(error => {
                        baseViewRef.current.hideLoader()
                        console.log('[ApplyJob.js] On Submit Error : ',error)
                    })
            }
        }
    }

    const _updateJob = () => {
        debugger;
        baseViewRef.current.showLoader()
          getMatchedJobs()
              .then(response => {
                  dispatch(setMatchedJobsList(response))
                  baseViewRef.current.hideLoader()
              })
              .catch(error => {
                  console.log('[JobDetail.js] MatchedJob List Error: ',error)
              })
    }


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='APPLY'
            navigation={props.navigation}
            hasNotification
            hasTitle
        >
        {
            jobDetail !== null
            &&
            <ScrollView style={styles.parent}>
                <Text style={styles.jobTitle}>{jobDetail.fullText.jobTitle}</Text>
                <Text style={styles.value}>{jobDetail.jobType} | {`${jobDetail.location.city}, ${jobDetail.location.state}`} | {jobDetail.annualSalary}/annually</Text>
                <InputView 
                    label='Why are you a good fit for this position?'
                    placeholder='Why are you a good fit for this position?'
                    parentStyle={{marginHorizontal:16,marginTop:16}}
                    textInputViewStyle={{}}
                    textInputStyle={[profileStyles.multiLineTextInputStyle,{height:220}]}
                    multiline
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
               
                        {/* {screeningQuestion.map((QandA)=>{
                            return(
                                <View style={{backgroundColor:'#fff',borderRadius:6,margin:15,borderWidth:0.4}}>
                                    <View style={{justifyContent:'flex-start',margin:10}}>
                                        <Text>{QandA.question}</Text>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:'flex-end',alignItems:'center'}}>
                                        <Text>Yes</Text>
                                        <RadioButton
                                            value="first"
                                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                                            onPress={() => setChecked('first')}
                                        />
                                        <Text>No</Text>
                                        <RadioButton
                                            value="second"
                                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                                            onPress={() => setChecked('second')}
                                        />
                                    </View>
                                </View>
                            )
                        })} */}
                      
                <PickerView 
                    label={resume === null ? '' : 'Select Resume'}
                    value={resume === null ? 'Select Resume' : resume.fileName}
                    parentStyle={{marginHorizontal:16,marginTop:24}}
                    pickerStyle={{height:56}}
                    onPress={() => _onSelectResume()}
                />
                { QandA.length > 0 && 
                <ScreeningQuestion
                    QandA={QandA}
                    setQandA={setQandA}
                    QandAValidation={QandAValidation}
                />
                }
                {/* {
                    resume !== null
                    &&
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text>{resume.fileName}</Text>
                        <TouchableOpacity>
                            <Icon 
                                name='close'
                                type={'antdesign'}
                            />
                        </TouchableOpacity>
                    </View>
                } */}
                <View style={styles.row}>
                    
                    <ButtonView 
                        title={'Close'}
                        buttonStyle={{paddingHorizontal:20,borderColor:colors.acceptBtn,backgroundColor:'#fff',borderRadius:6}}
                        containerStyle={{marginRight:8,}}
                        titleStyle={{color:colors.acceptBtn}}
                        onPress={() => props.navigation.goBack()}
                    />
                    
                    <ButtonView 
                        title={'Submit Application'}
                        buttonStyle={{paddingHorizontal:20,borderColor:colors.submitColor,backgroundColor:colors.submitColor,borderRadius:6}}
                        containerStyle={{marginLeft:8}}
                        titleStyle={{color:'#fff'}}
                        onPress={() => onSubmit()}
                    />
                </View>
            </ScrollView>
        }
            <SelectResumeModal 
                ref={selectResumeModalRef}
                onSetItem={item => setResume(item)}
            />
        </BaseView>
    )
}

export default ApplyJob

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingTop:16,
    },
    jobTitle : {
        fontSize:20,
        fontFamily:fonts.notoSansMedium,
        color:colors.accent,
        textAlign:'center'
    },
    value : {
        textTransform:'capitalize',
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        textAlign:'center',
        marginTop:4
    },
    row : {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        marginRight:16,
        marginBottom:30
    }
})
