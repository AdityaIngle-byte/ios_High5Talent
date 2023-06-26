

// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/
 
// import React in our code
import React, {useState, useEffect,useRef} from 'react';

 
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import {Card} from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../../../values/colors';
import BaseView from '../../../hoc/BaseView'
import JobCardComponent from '../../../components/JobCardComponent';
import Entypo from 'react-native-vector-icons/Entypo' 
import ButtonView from '../../../components/ButtonView';
import { useDispatch, useSelector } from 'react-redux';
import JobItem from '../../../items/JobItem';
import JobDetailItem from '../details/items/JobDetailItem';
import {images} from './../../../../assets/images';
import TagButton from '../../../components/TagButton';
import moment from 'moment'
import ItemView from './items/ItemView';
import ApplyJobModalBox from '../../../components/ApplyJobModalBox';
import Modal from 'react-native-modalbox';
import { fonts } from '../../../../values/fonts';
import { getRecruiterDetail,getMatchedJobs,setMatchedJobsList,setFavJobsList,setAppliedJobsList} from '../../../../redux/actions/homeActions';
import { showAlert } from '../../../../utils/Message';

const SearchView = (props) => {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [currentItem, setCurrentItem] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [centerModal,setCenterModal] = useState(false);
  const [recruiterDetail, setRecruiterDetail] = useState(null)
  const matchedJobsList = useSelector(state => state.home.matchedJobsList);
  const baseViewRef = useRef(null)
  const [isRefreshing,setIsRefreshing]=useState(false);
  const dispatch = useDispatch()

  const profilePersonalInfo = useSelector(state => state.profile.profilePersonalInfo)
  const profileSocialMedia = useSelector(state => state.profile.profileSocialMedia)
  const profileStory = useSelector(state => state.profile.profileStory)
  const profileSkills = useSelector(state => state.profile.profileSkills)
  const preferences = useSelector(state => state.profile.preferences)
  const profileEducation = useSelector(state => state.profile.profileEducation)

 
  useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            debugger;
            _getMatchedJobsList();
          });
      
          // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {
            unsubscribe();
        }
  }, [setCurrentItem]);

  const init = (matchedJobs) => {
      debugger;
      console.log("This is matched jobs list");
      matchedJobs.forEach(object => {
        object.isMatchedJob = true;
    });
    console.log(matchedJobs);
    setFilteredDataSource(matchedJobs);
    setMasterDataSource(matchedJobs);
    if(currentItem !== undefined) {
        // alert(type + JSON.stringify(detail))
        getRecruiterTenantDetail(currentItem.jobTenant) 
    }
  }

  const _getMatchedJobsList = () => {
    setIsRefreshing(true)
    getMatchedJobs()
        .then(response => {
            setIsRefreshing(false)
            console.log('[Jobs.js] MatchedJob List: ',response)
            if(response.length > 0){
                // const jobStatusCodes = [ "37" ]
                const matchedJobs = response.filter(job => (job.status !== "Applied" && !job.favorited))
                const favouritedJobs = response.filter(job => job.favorited)
                const appliedJobs = response.filter(job => job.status === 'Applied')
                dispatch(setMatchedJobsList(matchedJobs))
                dispatch(setFavJobsList(favouritedJobs))
                dispatch(setAppliedJobsList(appliedJobs))
                init(matchedJobs);
            }
        })
        .catch(error => {
            setIsRefreshing(false)
            console.log('[MyJobsView.js] MatchedJob List Error: ',error)
        })
    }   
  const getRecruiterTenantDetail = (jobTenant) => {
    if(baseViewRef !== null){
        baseViewRef?.current?.showLoader();
        getRecruiterDetail(jobTenant)
            .then(response => {
                baseViewRef.current.hideLoader()
                console.log('[JobDetail.js] recruiterDetail : ', response)
                if(response.length > 0){
                    setRecruiterDetail(response[0])
                }
            })
            .catch(error => {
                baseViewRef.current.hideLoader()
                console.log('[JobDetail.js] recruiterDetail : ', response)
                if(response.length > 0){
                    setRecruiterDetail(response[0])
                }
            })
    }
  }

  

 
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.fullText.jobTitle
            ? item.fullText.jobTitle.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
 
    // const ItemView = ({item,index}) => {
    //     return (
    //         <TouchableOpacity onPress={()=>{setCurrentItem(item);setIsOpen(true)}}>
    //             <JobCardComponent index={index} item={item}/>
    //         </TouchableOpacity>
    //         // <Text>{index}</Text>
    //     )
    // };
    const _renderJobItem = (item,index) => {
        return (
                <View style={styles.cardViewStyle}>
                    <JobItem 
                    item={item.item}
                    index={item.index}
                    isMatchedJob={true}
                    // hasButtons
                    onPress={()=>{setCurrentItem(item.item);setIsOpen(true)}}
                    />
                </View>
                
        )
    }

    if(isRefreshing){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
               <ActivityIndicator 
                      size='small'
                      style={{marginTop:12}}
                  />
            </View>
        )
      }
   
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
 
  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const _renderSkillItem = ({item,index}) => {
    return (
        <ItemView 
            value={item}
        />
    )
  }  
  
  const _onApplyJobPress = () => {
    let condition = checkEligiblity()
    if(condition) {
        setCenterModal(false);
        setIsOpen(false);
        props.navigation.navigate('ApplyJob',{
          'detail' : currentItem,
          'recruiter' : recruiterDetail,
          'fromSearch':true,
        })
    }
    else {
        showAlert('error','You are not eligible to apply for this job!')
    }
    
  }

  const checkEligiblity = () => {
    debugger;
    const weightage = typeof(currentItem.weightage) === 'string' ? JSON.parse(currentItem.weightage) : currentItem.weightage
    let user = {...profileSkills,...profilePersonalInfo,...profileSocialMedia,...profileStory,...preferences,'education':profileEducation}
    const {
      primarySkills,
      secondarySkills,
      jobTitle,
      education,
      experienceLevel,
      industries,
      location,
    } = weightage;                                   
    let condition = true;
    let unmatched = {
        primarySkills: false,
        secondarySkills: false,
        jobTitle: false,
        education: false,
        experienceLevel: false,
        industries: false,
        location: false
    }

    if (primarySkills && primarySkills.length > 0) {
      if (!primarySkills.every((item) => user.primarySkills.includes(item))) {
        condition = false;
        unmatched = { ...unmatched, primarySkills: true }
      }
    }

    if (secondarySkills && secondarySkills.length > 0) {
      if (
        !secondarySkills.every((item) => user.secondarySkills.includes(item))
      ) {
        condition = false;
        unmatched = { ...unmatched, secondarySkills: true }
      }
    }

    if (industries && industries.length > 0) {
      if (!industries.every((item) => user.skillSet.includes(item))) {
        condition = false;
        unmatched = { ...unmatched, industries: true }
      }
    }

    if (education && education.length > 0) {
      if (
        !user.education.map((item) => item.educationType.toLowerCase()).includes(education[0].toLowerCase())
      ) {
        condition = false;
        unmatched = { ...unmatched, education: true }
      }
    }

    if (location) {
        if(currentItem.isRemote) {                                 
            if(!(user.preferredLocations.includes('Remote'))) {
                condition = false
                unmatched = { ...unmatched, location: true }
            }
        }
        else {
            if (
                !([user.address.city, ...user.preferredLocations].map(i => i.toLowerCase()).includes(currentItem.location.city.toLowerCase()))
            ) {
                condition = false;
                unmatched = { ...unmatched, location: true }
            } 
        }                                                    
    }

    if (jobTitle) {
      if (user.currentJobTitle?.trim().toLowerCase() !== currentItem.jobTitle.trim().toLowerCase()) {
        condition = false;
        unmatched = { ...unmatched, jobTitle: true }
      }
    }

    if (experienceLevel) {                                      
      if (findRange(user.experienceYear, user.experienceMonth) !== currentItem.experienceLevel) {
        condition = false;
        unmatched = { ...unmatched, experienceLevel: true }
      }
    }

    return condition
  }
 
  return (
      <BaseView
      ref={baseViewRef}
      hasStatusBar
      >
        <SafeAreaView style={{flex: 1}}>
            {/* Add the below in another component */}
            <ApplyJobModalBox 
                currentItem={currentItem} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                centerModal={centerModal} 
                setCenterModal={setCenterModal}
            />
            <Modal style={[styles.centerModal]} position={"center"} backdropPressToClose ={false} isOpen={centerModal}>
                <View style={styles.cross}>               
                    <TouchableOpacity onPress={()=>setCenterModal(false)}>
                        <Text>❌</Text>
                    </TouchableOpacity> 
                </View>
                <View style={styles.jobdetails}>
                    <Text style={styles.jobName}>Apply</Text>
                    <View style={{borderWidth:1,marginBottom:10}}></View>
                </View>
                <ButtonView 
                    title={'Apply for this job'}
                    buttonStyle={{paddingVertical:0,backgroundColor:colors.accent,borderRadius:4,borderColor:colors.accent,marginHorizontal:10}}
                    onPress={_onApplyJobPress}
                    size='medium'
                />
                <View style={styles.row2}>
                    <View style={styles.bar} />
                    <Text style={[styles.description2]}>OR</Text>
                    <View style={styles.bar} />
                </View>
                <ButtonView 
                    title={'Refer someone'}
                    titleStyle={{color:colors.accent}}
                    buttonStyle={{paddingVertical:0,backgroundColor:'#fff',borderRadius:4,borderColor:colors.accent,marginHorizontal:10}}
                    // onPress={onApply}
                    size='medium'
                />
            </Modal>
            <View style={styles.container}>
                <View style={styles.parent}>
                    <View  style={{flexDirection:"row"}}>
                    <TouchableOpacity 
                        style={styles.headerView}
                        onPress={()=>props.navigation.goBack()}>
                        <AntDesign 
                            name='arrowleft'
                            color={'#fff'}
                            size={20}
                            style={{margin:6,padding:6}}
                        />
                    </TouchableOpacity>
                        <Icon 
                            name={'search'}
                            type={'fontawesome'}
                            color={'#fff'}
                            size={20}
                            style={{margin:6,padding:6}}
                        />
                        <TextInput  
                            style={{flex:1,color:"white"}} 
                            placeholder='Search Here' 
                            placeholderTextColor='white'
                            onChangeText={(text) => searchFilterFunction(text)}
                            value={search}
                        />
                    </View>
                </View>
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    // ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={_renderJobItem}
                />
            </View>
        </SafeAreaView>
      </BaseView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom:80,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  parent:{
    height : 56,
    marginTop:Platform.OS==='android'?10:0,
    marginBottom:10,
    paddingTop:10,
    backgroundColor: colors.accent,
    alignItems:'center',
    flexDirection:'row',
    // paddingHorizontal:12,
    borderBottomLeftRadius:6,
    borderBottomRightRadius:6,
  },
    modal: {  
        marginTop:150,
        borderRadius:14,
    },
    cross:{
        position:'absolute',
        top:0,
        right:0,
        margin:20,
        zIndex:9999
    },
    profileCircle:{
        flex:0.5,
        borderWidth:0.4,
        borderColor:colors.placeholderTextColor,
        marginRight:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70,
        borderWidth:1,
        borderColor:"red"
    },
    roundInitial:{
        width:50,
        height:40,
        // borderWidth:1,
    },
    logoComponent:{
        borderWidth:0.4,
        borderRadius:10,
        height:70,
        width:70,
        margin:10,
        justifyContent:"center",
        alignItems:"center"
    },
    row : {
        flexDirection:'row',
        alignItems: 'center',
    },
    matchedView : {
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:colors.primary,
        paddingHorizontal:12,
        borderRadius:2
    },
    jobdetails:{
        margin:20,
    },
    jobName:{
        fontWeight:'bold',
        fontSize:20,
        paddingBottom:5
    },
    jobSummary:{
        fontSize:12,
    },
    icon:{
        paddingRight:5,
    },
    jobSummaryView:{
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:3
    },
    cardViewStyle:{
        borderWidth:0.3,
        padding:3,
        margin:5,
        borderRadius:3,
        borderColor:"gray",
        marginHorizontal:15
    },
    itemView : {
        height:32,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:16,
        backgroundColor:'#E4ECF7',
        marginTop:16,
        marginRight:12,
        borderRadius:4,
    },
    value : { 
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:'#1B1B1B',
        textTransform :'capitalize'
    },
    centerModal: {
        height: 300,
        width: 300,
        zIndex:9999,
        borderRadius:10
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 24,
      },
    bar: {
        width: '25%',
        height: 1,
        backgroundColor: colors.primary,
    },
    description2: {
        fontSize: 14,
        color: colors.primary,
        fontFamily: fonts.notoSans700,
        paddingHorizontal:  16,
        textAlign: 'center',
    },
});
 
export default SearchView;