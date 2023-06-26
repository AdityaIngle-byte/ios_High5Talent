import { View, Text, Image,Alert} from 'react-native'
import React from 'react'
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer'
import { images } from '../../assets/images';
import { colors } from '../../values/colors';
import {useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/Octicons';
import { showConfirmAlert } from '../../utils/Message';
import { clearUserPrefs } from '../../utils/UserPrefs';

export default function CustomDrawer(props) {

  const personalInfo = useSelector(state => state.profile.profilePersonalInfo);

  const _onLogout = () => {
    showConfirmAlert(
        'Logout',
        'Are you sure you want to log out?',
        () => {
            clearUserPrefs()
            // onLogout()
            props.navigation.replace('Login')
        }
    ); 
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:colors.whiteColor,flex:1}}>
      <View style={{flex:1}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image source={images.matchedTagIcon} style={{height:60,width:60,borderRadius:30,margin:10,padding:10,borderWidth:0.4,borderColor:"black"}}/>
          <View style={{}}>
            <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>{personalInfo?.firstName+' '+personalInfo?.lastName}</Text>
            <View style={{marginRight:50,marginTop:5}}><Text style={{fontSize:12}}>Role : Candidate</Text></View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props}/>
      <View style={{justifyContent:"flex-end",margin:5,borderTopWidth:1,borderColor:"gray"}}>
      <DrawerItem 
        icon={()=><AntDesign name='sign-out' size={30}/> }
        label="Logout" onPress={_onLogout} />
      </View>
    </DrawerContentScrollView>
  )

}



