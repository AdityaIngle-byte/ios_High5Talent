import { View, Text,StyleSheet,Image, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import {Card} from 'react-native-elements'
import { colors } from '../../values/colors'
import Feather from 'react-native-vector-icons/Feather' 
import AntDesign from 'react-native-vector-icons/AntDesign'
import TagButton from '../components/TagButton'
import * as Progress from 'react-native-progress';
import { fonts } from '../../values/fonts'
import { images } from '../../assets/images'


// https://assets.livehire.com/tc-branding/hcltech/logo-3.png
export default function ShortProfileView(props) {
    debugger;
    const {index,item,profileImage,percentage,isprofileImageNull,edit} = props
    
    const [progress,setProgress]=useState(0);
    

    function profileCompletionColor(){
        if(percentage<=0.355){
            // setProgress(0.3)
            return 'red';
        }else if (percentage<=0.700){
            // setProgress(0.6)
            return 'blue';
        }else{
            // setProgress(1)
            return colors.resultSuccessColor;
        }
    }


  return (
    <View>
        <Card containerStyle={{borderRadius:6}}>
            <View key={index} style={styles.user}>
                <View style={styles.profileCircle}>
                    {
                        isprofileImageNull?
                        <Image
                        resizeMode='contain'
                        style={[styles.roundInitial,isprofileImageNull?{width:100}:{}]}
                        source={images.userImage}
                        />:
                        <Image
                        resizeMode='contain'
                        style={styles.roundInitial}
                        source={{uri:profileImage}}
                        />

                    }
                
                   <Progress.Circle color={profileCompletionColor()} thickness={4} size={80} progress={percentage}  indeterminate={false} style={{position:"absolute",top:-17}} />
                   <View>
                       <Text style={{color:profileCompletionColor(),fontSize:10}}>{percentage>=1.00?'100%':Math.round(percentage*100)+'%'}</Text>
                   </View>
                </View>
                <View style={styles.profiledetails}>
                    <Text style={{fontWeight:"bold",fontSize:20,fontFamily:fonts.notoSansRegular}}>{item?.firstName===undefined || item?.firstName===null ||  item?.firstName === ''?<TagButton onPress={edit} size='mini' title='Add Name'/>:item.firstName+' '+item?.lastName}</Text>
                    {/* <Text style={{fontSize:10,color:colors.placeholderTextColor}}>{item?.designation===undefined || item?.designation ===null || item?.designation ===''? <TagButton size='mini' title='Add Designation'/>:item?.designation}</Text> */}
                    <Text style={{fontSize:10,fontFamily:fonts.notoSansRegular}}>{item?.address.city===undefined || item?.address.city ===null || item?.address.city ===''?<TagButton onPress={edit} size='mini' title='Add Location'/>:item?.address.city+' ,'+item?.address.state+' ,'+item?.address.country}</Text>
                </View>
                <View style={styles.profileEndView}>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={edit}>
                            <Feather name='edit' size={20} color={colors.darkBlueColor} style={styles.icon}/>
                            <Text style={{fontSize:10,color:colors.placeholderTextColor}}>{item?.location}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    parentView:{
        flex:1,
    },
    user:{
        flex:1,
        flexDirection:"row",
        height:70,
      
    },
    profileCircle:{
        flex:0.5,
        // borderWidth:0.4,
        borderColor:colors.placeholderTextColor,
        marginRight:20,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70,
        marginTop:10
    },
    profiledetails:{
        flex:1,
        // justifyContent:"center",
        marginVertical:10,
        // borderWidth:1
    },
    profileEndView:{
        flex:1,
        justifyContent:"flex-start",
        alignItems:"flex-end"
        // marginLeft:5
    },
    roundInitial:{
        width:70,
        height:80,
        borderRadius:70
        // borderWidth:1,
    },
   icon:{
    paddingRight:5,
    paddingBottom:5
   }
})