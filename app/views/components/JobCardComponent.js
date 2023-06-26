import { View, Text,StyleSheet,Image} from 'react-native'
import React from 'react'
import {Card} from 'react-native-elements'
import TagButton from './TagButton'
import { colors } from '../../values/colors'
import Entypo from 'react-native-vector-icons/Entypo' 
import AntDesign from 'react-native-vector-icons/AntDesign'

// https://assets.livehire.com/tc-branding/hcltech/logo-3.png
export default function JobCardComponent(props) {
    const {index,item}=props
  return (
    <View>
        <Card>
            <View key={index} style={styles.user}>
                <View style={styles.profileCircle}>
                    <Image
                        resizeMode='contain'
                        style={styles.roundInitial}
                        source={{
                        uri: 'https://assets.livehire.com/tc-branding/hcltech/logo-3.png',
                        }}
                    />
                </View>
                <View style={styles.profiledetails}>
                    <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                    <Text  numberOfLines={2} style={{fontSize:10}}>{item.skills}</Text>
                </View>
                <View style={styles.profileEndView}>
                    <View style={{flexDirection:"row"}}>
                        <Entypo name='location-pin' color={colors.darkBlueColor} style={styles.icon}/>
                        <Text style={{fontSize:10,color:colors.placeholderTextColor}}>{item.location}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <AntDesign name='calendar' color={colors.darkBlueColor}  style={styles.icon}/>
                        <Text style={{fontSize:10,color:colors.placeholderTextColor}}>Mathew Davis</Text>
                    </View>
                </View>
            </View>
        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    parentView:{
        flex:1
    },
    user:{
        flex:1,
        flexDirection:"row",
        height:70
    },
    profileCircle:{
        flex:0.5,
        borderWidth:0.4,
        borderColor:colors.placeholderTextColor,
        marginRight:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:70
    },
    profiledetails:{
        flex:1,
        justifyContent:"center",
        margin:5
    },
    profileEndView:{
        flex:1,
        justifyContent:"center",
        // alignItems:"flex-end"
        marginLeft:5
    },
    roundInitial:{
        width:50,
        height:40,
        // borderWidth:1,
    },
   icon:{
    paddingRight:5,
    paddingBottom:5
   }
})