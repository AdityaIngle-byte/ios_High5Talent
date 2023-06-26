import React,{useState} from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images } from '../../assets/images';
import { showConfirmAlert } from '../../utils/Message';
import { clearUserPrefs } from '../../utils/UserPrefs';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import generateRandomColor from '../../utils/RandomColor';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'


const HeaderView = props => {

    const {
        parentStyle,
        hasProfileIcon,
        hasMenu,onMenuPress,
        hasLogout,
        hasBack,onBackPress,
        title,
        hasSearchBar,onChangeSearch,
        hasNotification,onNotificationPress,
        hasPreferences,onPreferences,
        hasInfo, onInfoPress,
        hasSettings, onSettingsPress,
        hasFaq, onFaq,
        hasTitle
    } = props;

    const personalInfo = useSelector(state => state.profile.profilePersonalInfo);
    const firstNameInitial = personalInfo?.firstName.charAt(0);
    const secondNameInitial = personalInfo?.lastName.charAt(0);

    const _onLogout = () => {
        showConfirmAlert(
                'Logout',
                'Are you sure you want to log out?',
                () => {
                    clearUserPrefs()
                    // onLogout()
                    props.navigation.replace('Splash')
                }
            );

        
    }

    return (
        <View style={[styles.parent,parentStyle]}>
            {
                hasMenu 
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={onMenuPress}>
                <Image 
                    styles={styles.menuIcon}
                    source={images.menuIcon}
                    // resizeMode='contain'
                />
                </TouchableOpacity>
            }
            {
                hasLogout 
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={() => _onLogout()}>
                    <Icon 
                        name={'log-out'}
                        type={'feather'}
                        color={'#fff'}
                        size={20}
                    />
                </TouchableOpacity>
            }
            {
                hasProfileIcon 
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={onMenuPress}>
                    <View style={styles.profileCircle}>
                        <View style={styles.roundInitial}><Text style={styles.roundInitialText}>{firstNameInitial!==undefined?firstNameInitial?.toUpperCase()+secondNameInitial?.toUpperCase():null}</Text></View>
                    </View>
                </TouchableOpacity>
            }
            {
                hasBack
                &&
                <TouchableOpacity 
                    style={styles.headerView}
                    onPress={onBackPress}>
                <AntDesign 
                    name='arrowleft'
                    color={'#fff'}
                    size={25}
                    style={{margin:5,padding:5}}
                />
                </TouchableOpacity>
            }
            {/* For platform ios change the search bar */}
            {
                hasSearchBar 
                &&
                // <View style={{position:"absolute",flex:1,justifyContent:"center",paddingRight:40,alignItems:"center",borderWidth:1}}>
                    <TouchableOpacity onPress={()=>{props.navigation.navigate('SearchView')}} style={{flexDirection:"row",flex:1,justifyContent:"center",position:"absolute",zIndex: 300,paddingRight:20}}>
                        <Icon 
                            name={'search'}
                            type={'fontawesome'}
                            color={'#fff'}
                            size={20}
                            style={{margin:10,paddingTop:5}}
                        />
                        <Text style={{textAlign:"center",color:"white",marginTop:15}}>Search Here</Text>
                    </TouchableOpacity>
                // </View>
               
            }
            {
                hasTitle &&
                    <View style={{flexDirection:"row",flex:1,justifyContent:"center",position:"absolute",zIndex: 300}}>
                    <Text 
                    style={styles.titleStyle}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    >{title}</Text>
               </View>

            }

            <View style={styles.rightComponent}>
                {
                    hasFaq
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={() => props.navigation.navigate('Faqs')}>
                        <View style={styles.iconView}>
                        
                            <Icon 
                                name={'life-buoy'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {/* {
                    hasNotification
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={onNotificationPress}>
                        <View style={styles.iconView}>
                            <View style={styles.badge}/>
                            <Icon 
                                name={'bell'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                } */}
                {
                    hasInfo
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={onInfoPress}>
                        <View style={styles.iconView}>
                            <Icon 
                                name={'info'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {
                    hasSettings
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={onSettingsPress}>
                        <View style={styles.iconView}>
                            <Icon 
                                name={'settings'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                {
                    hasPreferences
                    &&
                    <TouchableOpacity 
                        style={styles.notificationView}
                        onPress={onPreferences}>
                        <View style={styles.iconView}>
                        
                            <Icon 
                                name={'sliders'}
                                type={'feather'}
                                color={'#fff'}
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                }
                
                {
                    props.rightComponent
                }
            </View>
        </View>
    )
}

export default HeaderView

const styles = StyleSheet.create({
    parent : {
        height : 56,
        // backgroundColor: colors.accent,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:"center",
        // paddingHorizontal:12,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
    },
    headerView : {
        // position: 'absolute',
        padding:8,
        // left:0,
        zIndex: 100,
        flex:1,
    },
    menuIcon : {
        height:40,
        width:40,
        // padding:8
        // tintColor:colors.accent
    },
    titleStyle : {
        flex:1,
        color:'#fff',
        textAlign:'center',
        fontSize:14,
        fontFamily:fonts.notoSansMedium,
        paddingHorizontal:24,
    },
    badge : {
        position:'absolute',
        right:8,top:8,
        backgroundColor: colors.primary,
        height:8,
        width:8,
        borderRadius:4,
        zIndex: 100,
    },
    rightComponent : {
        // position: 'absolute',
        // padding:12,
        // right:0,
        // flex:1,
        justifyContent:'flex-end',
        zIndex: 100,
        flexDirection:'row',
    },
    notificationView : {   
    },
    iconView : {
        padding:12
    },
    profileCircle:{
        flex:1,
        justifyContent:"center",
        marginLeft:10
    },
    roundInitial:{
        borderRadius:30,
        width:35,
        height:35,
        borderWidth:0.2,
        justifyContent:"center",
        backgroundColor:generateRandomColor()
    },
    roundInitialText:{
        textAlign:"center",
        color:"white",
        fontWeight:"bold"
    }
})

