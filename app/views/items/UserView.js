import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View,TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../../assets/images'
import { setBottomTab } from '../../redux/actions/homeActions'
import { getProfileImage, setProfileImage, updateProfileImage } from '../../redux/actions/profileActions'
import { showAlert } from '../../utils/Message'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
import BaseView from '../hoc/BaseView'
import ImagePickerModal from '../modals/ImagePickerModal'
import CircularProgress from './UserImageWithProgress'

const UserView = props => {

    const baseViewRef = useRef(null)
    const imagePickerModal = useRef(null)
    const dispatch = useDispatch();

    const {hasData,onSearchJobPress,navigation,isUserDisabled} = props;

    const [isImageRefreshing, setIsImageRefreshing] = useState(false)
    const profileImage = useSelector(state => state.profile.profileImage)
    const personalInfo = useSelector(state => state.profile.profilePersonalInfo);

    
    // const onUserPress = () => {
    //     navigation.navigate('Profile')
    //     dispatch(setBottomTab('Profile'))
    // }

    const onAddProfile = () => {
        navigation.navigate('PersonalInfo')
    }


    const _onAddImage = () => {
        if(imagePickerModal !== null){
            imagePickerModal.current.baseBottomSheetRef.showModal()
            imagePickerModal.current.showDeleteBtn()
        }
    }


    const _onSetImage = image => {
        console.log('[UserView.js] Set image : ',image)
        
        setIsImageRefreshing(true)
            const file = {
                name : image.name,
                type : image.type,
                uri : image.uri
            }
            updateProfileImage(file)
                .then(response => {
                    setIsImageRefreshing(false)
                    console.log('[UserView.js] updateProfileImage : ',response)
                    dispatch(setProfileImage(image.uri))
                    showAlert('success', 'Profile Image Updated Successfully!')
                    _getProfileImage()
                })
                .catch(error => {
                    setIsImageRefreshing(false)
                    console.log('[UserView.js] updateProfileImage : ',error)
                })
    }


    const _getProfileImage = () => {
        getProfileImage()
            .then(response => {
                console.log('[UserView.js] Profile Image : ', response)
            })
            .catch(error => {
                console.log('[UserView.js] updateProfileImage : ', error)
            })
    }

    return (
        <View style={[styles.parent]}>
            <View style={styles.row}>
                {
                    personalInfo !== null
                    ?
                    <Fragment>
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => onAddProfile()}>
                            <Text style={styles.name}>Hi. 👋 {personalInfo.firstName} {personalInfo.middleName} {personalInfo.lastName}</Text>
                            <Text style={styles.designation}>{personalInfo.designation}</Text>
                            <Text style={[styles.designation,{fontSize:12}]}>{personalInfo.address.addressLine1}</Text>        
                        </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity 
                        onPress={() => _onAddImage()}
                        // disabled={isUserDisabled}
                    >
                        <CircularProgress 
                            percent={25}
                            source={profileImage !== null ? {uri : profileImage} : {uri : images.userImage}}
                        />
                        {
                            isImageRefreshing
                            &&
                            <ActivityIndicator 
                                size='large'
                                color={colors.accent}
                                style={{position:'absolute',zIndex:100,left:0,right:0,top:0,bottom:0}}
                            />
                        }
                    </TouchableOpacity> */}
                    </Fragment>
                    :
                    <Fragment>
                       <View style={styles.view}>
                            <TouchableOpacity onPress={() => onAddProfile()}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon 
                                        name='edit-3'
                                        type='feather'
                                        color={'#fff'}
                                        containerStyle={{paddingRight:12}}
                                    />
                                    <Text style={styles.name}>Add Name</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Icon 
                                        name='edit-3'
                                        type='feather'
                                        color={'#fff'}
                                        containerStyle={{paddingRight:12}}
                                        size={16}
                                    />
                                    <Text style={styles.designation}>Add Designation</Text>  
                                </View>
                                
                            </TouchableOpacity>      
                        </View>
                        {/* <TouchableOpacity 
                            onPress={() => _onAddImage()}
                        >
                            <CircularProgress 
                                percent={5}
                                source={profileImage !== null ? {uri : profileImage} : {uri : images.userImage}}
                            />
                        </TouchableOpacity> */}
                    </Fragment>
                }
            </View>
          

            {/* <ImagePickerModal 
                ref={imagePickerModal}
                setImage={_onSetImage}
                deleteImage={() => dispatch(setProfileImage(null))}
            /> */}
        </View>
    )
}

export default UserView

const styles = StyleSheet.create({
    parent : {
        height:96,
        backgroundColor: colors.accent,
        paddingHorizontal:16,
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24
    },
    row : {
        flexDirection:'row',
        alignItems:'center'
    },
    view : {
        flex:1,
        // height:90,
        justifyContent:'center',
        marginTop:12
    },
    name : {
        fontSize:20,
        fontFamily:fonts.notoSansRegular,
        fontWeight:'900',
        color: '#fff',
        textTransform:'capitalize',
        height:28,
        lineHeight:28,
    },
    designation : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        fontWeight:'400',
        color: '#fff',
        textTransform:'capitalize',
        height:20,
        lineHeight:20,
    },
    searchView : {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#fff',
        paddingHorizontal:12,
        height:48,
        borderRadius:24
    },
    searchText : {
        fontSize:14,
        fontFamily:fonts.notoSansRegular,
        fontWeight:'400',
        paddingLeft: 12,
        color: '#797979'
    }
})
