import { View, Text , StyleSheet, TouchableOpacity,ScrollView,Image,Alert,FlatList} from 'react-native'
import React,{useEffect} from 'react'
import { colors } from '../../values/colors'
import Modal from 'react-native-modalbox';
import Entypo from 'react-native-vector-icons/Entypo' 
import ButtonView from './ButtonView';
import {Card} from 'react-native-elements'
import moment from 'moment'
import { images } from '../../assets/images';
import TagButton from './TagButton';
import JobTypeItem from '../screens/home/details/items/JobTypeItem';
import JobDetailBottomView from '../screens/home/details/items/JobDetailBottomView';
import { fonts } from '../../values/fonts';

export default function ApplyJobModalBox(props) {

    const {currentItem,setIsOpen,isOpen,setCenterModal,centerModal} = props
    
    const onApply=()=>{
        setCenterModal(true);  
    }

    const renderJobFlatlistView=(item)=>{
        return(
            <View style={{flexDirection:"row",marign:23}}>
                <View>
                    <View style={[styles.itemView]}>
                        <Text style={styles.value}>{item.item}</Text>
                    </View> 
                </View> 
            </View>
        )
    }
  return (
        <Modal
            style={[styles.modal]}
            isOpen={isOpen} 
            onClosed={()=>setIsOpen(false)}
            swipeToClose={true}
            swipeArea={500}
        >
            <View style={styles.cross}>               
                <TouchableOpacity onPress={()=>setIsOpen(false)}>
                    <Text>❌</Text>
                </TouchableOpacity> 
            </View>
            
            <View style={{marginLeft:6,marginTop:10,marginBottom:200,paddingBottom:180}}>
                <View style={styles.jobdetails}>
                    <Text style={styles.jobName}>{currentItem?.fullText?.jobTitle}</Text>
                    <View style={styles.jobSummaryView}>
                        <Entypo name='location-pin' color={colors.darkBlueColor} style={styles.icon}/>
                        <Text style={styles.jobSummary}>{currentItem?.isRemote ? 'Remote' : currentItem?.location?.city}</Text>
                    </View>
                    <View style={styles.jobSummaryView}>
                        <Entypo name='user' color={colors.darkBlueColor}  style={styles.icon}/>
                        <Text style={styles.jobSummary}>{currentItem.positionCount}</Text>
                    </View>
                    <View style={styles.row}>
                        {
                            currentItem.isMatchedJob
                            &&
                            <View style={styles.matchedView}>
                                <Image 
                                    style={{height:16,width:16,marginRight:4}}
                                    source={images.matchedTagIcon}
                                />
                                <TagButton 
                                    title={'Matched'}
                                    containerStyle={{height:24,marginTop:0}}
                                    disabled
                                    disabledTitleStyle={{fontSize:12,color:'#fff',marginRight:0}}
                                    disabledStyle={{height:24,backgroundColor:colors.primary,borderColor:'transparent',paddingHorizontal:0,}}
                                />
                            </View>
                        }
                    </View>
                    <ButtonView 
                        title={'Apply'}
                        buttonStyle={{paddingVertical:0,backgroundColor:colors.accent,borderRadius:4,borderColor:colors.accent}}
                        onPress={onApply}
                        size='medium'
                    />
                </View>
                <Card.Divider style={{elevation:2}}/> 
                <ScrollView>
                    <Card containerStyle={{backgroundColor:'#FFFFF0',height:150,borderRadius:6}}>
                        <Text style={{fontWeight:"bold",marginBottom:5}}>Job highlights</Text>
                        <View style={{borderWidth:1,marginBottom:10}}></View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{}}>
                                <Text style={{fontSize:12,margin:3}}>Job Type:</Text>
                                <Text style={{fontSize:12,margin:3}}>Target Start:</Text>
                                <Text style={{fontSize:12,margin:3}}>Location:</Text>
                                <Text style={{fontSize:12,margin:3}}>Annual Salary</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{fontSize:12,margin:3}}>{currentItem?.jobType}</Text>
                                <Text style={{fontSize:12,margin:3}}>{moment(currentItem?.prefferedStartDate).format('MMM D, YYYY')}</Text>
                                <Text style={{fontSize:12,margin:3}}>{currentItem?.isRemote ? 'Remote' : currentItem?.location?.city}</Text>
                                <Text style={{fontSize:12,margin:3}}>{currentItem?.minimumPay+'-'+currentItem?.maximumPay+' '+currentItem?.placementCurrency}</Text>
                            </View>
                        </View>
                    </Card>
                        <View style={{margin:23}}>
                            <Text style={styles.heading}>Description</Text>    
                            <Text style={{fontSize:12,margin:3}}>{currentItem?.jobDescription !== "" ? currentItem?.jobDescription : "Description not available."}</Text>      
                        </View>

                    {
                        currentItem?.primarySkills?.length > 0
                        &&
                        <View style={styles.borderView}>
                            <Text style={styles.heading}>Primary Skills</Text>
                            <FlatList 
                                data={currentItem?.primarySkills}
                                renderItem={renderJobFlatlistView}
                                horizontal
                            />
                        </View>
                    }

                    {
                        currentItem?.education?.length > 0
                        &&
                        <View style={styles.borderView}>
                            <Text style={styles.heading}>Education</Text>
                            <FlatList 
                                data={currentItem?.education}
                                renderItem={renderJobFlatlistView}
                                horizontal
                            />
                        </View>
                    }

                    {
                        currentItem?.certifications?.length > 0
                        &&
                        <View style={styles.borderView}>
                            <Text style={styles.heading}>Certifications</Text>
                            <FlatList 
                                data={currentItem?.certifications}
                                renderItem={renderJobFlatlistView}
                                horizontal
                            />
                        </View>
                    }

                    {
                        currentItem?.industries?.length > 0
                        &&
                        <View style={styles.borderView}>
                            <Text style={styles.heading}>Industries</Text>
                            <FlatList 
                                data={currentItem?.industries}
                                renderItem={renderJobFlatlistView}
                                horizontal
                            />
                        </View>
                    }

                    <View style={[styles.row,{marginTop:0,marginBottom:10}]}>
                        <View style={[styles.borderView,{flex:1,marginRight:8}]}>
                            <Text style={styles.heading}>Drug Test</Text>
                            <JobTypeItem 
                                name={currentItem?.drugTest ? 'Yes' : 'No'}
                                parentStyle={{width:120,marginTop:8,backgroundColor:'#ECFBD5'}}
                            />
                        </View>
                        <View style={[styles.borderView,{flex:1,marginLeft:8}]}>
                            <Text style={styles.heading}>Background Check</Text>
                            <JobTypeItem 
                                name={currentItem?.backgroundCheck ? 'Yes' : 'No'}
                                parentStyle={{width:120,marginTop:8,backgroundColor:'#ECFBD5'}}
                            />
                        </View>
                    </View>  

                </ScrollView>  
            </View> 
        </Modal>
  )
}

const styles = StyleSheet.create({
    modal: {  
        marginTop:150,
        borderRadius:14,
        zIndex:9999
    },
    // centerModal: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     zIndex:9999
    // },
    cross:{
        position:'absolute',
        top:0,
        right:0,
        margin:20,
        zIndex:9999
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
        margin:10,
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
    heading : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:'#1B1B1B',
        fontWeight:"bold"
    },
    borderView : {
        borderWidth:1,
        borderColor:'#EDEDED',
        backgroundColor:'#fff',
        padding:12,
        borderRadius:4,
        marginTop:16,
        marginHorizontal:20
    },
});


