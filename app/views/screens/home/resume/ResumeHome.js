import React, { useRef, useState } from 'react'
import { RefreshControl } from 'react-native'
import { FlatList, StyleSheet, Text, Platform, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../../../../assets/images'
import { deleteResume, getResumeList, setResumeList, uploadResumeFile } from '../../../../redux/actions/resumeActions'
import { convertPdfToBase64, getDocument } from '../../../../utils/DocPicker'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import { generateRandomString } from '../../../../utils/Validations'
import { fonts } from '../../../../values/fonts'
import { resumeTypes } from '../../../../values/strings'
import NoDataView from '../../../components/NoDataView'
import BaseView from '../../../hoc/BaseView'
import { MenuItem } from '../../../items/MenuItem'
import ResumeItem from '../../../items/ResumeItem'
// import RNFetchBlob from 'rn-fetch-blob'
// import ReactNativeBlobUtil from 'react-native-blob-util'
// import OpenFile from 'react-native-doc-viewer';



const ResumeHome = props => {

    const baseViewRef = useRef(null)

    const dispatch = useDispatch();

    const userPrefs = useSelector(state => state.login.userPrefs)
    const resumeList = useSelector(state => state.resume.resumeList);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const extraData = useSelector(state => state.home.extraData)




    const _onCreateResume = () => {
        props.navigation.navigate('CreateHigh5Resume',{
                'data': null,
                onGoBack : _getResumeList
            })
    }


    const _onCreateVideoResume = () => {
        props.navigation.navigate('VideoResumeInstructions')
    }


    const _onUploadResume = () => {
        getDocument()
            .then(response => {
                const file = response[0];
                const type = file.type
                const data = {
                    name : file.name !== undefined ? file.name : `Resume_${generateRandomString(20)}`,
                    type : type,
                    uri : file.uri
                }
                console.log('[ResumeView.js] Document : ',data,file);
                if(type === 'application/pdf' || type === 'application/docx' 
                    || type === 'application/msword' || type === 'application/doc'
                    || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                        if(baseViewRef !== null){
                            baseViewRef.current.showLoader();
                            uploadResumeFile(data)
                                .then(res => {
                                    baseViewRef.current.hideLoader()
                                    console.log('[ResumeView.js] Upload Resume : ',res)
                                    showAlert('success','Resume Upload Successfully!')
                                    _getResumeList()
                                })
                                .catch(error => {
                                    baseViewRef.current.hideLoader()
                                    console.log('[ResumeView.js] Upload Resume : ',error)
                                })
                        }
                    }else {
                        showAlert('error','Wrong Format!')
                    }
                
            })
            .catch(error => {
                console.log('[ResumeView.js] Document : ',error);
            })
    }

    const _getResumeList = () => {
        setIsRefreshing(true)
        getResumeList()
            .then(response => {
                setIsRefreshing(false)
                console.log('[ResumeView.js] Get Resume List : ',response)
                dispatch(setResumeList(response))
            })
            .catch(error => {
                setIsRefreshing(false)
                console.log('[ResumeView.js] Get Resume List : ',error)
            })
    }



    const _renderResumeItem = ({item,index}) => {
        return (
            <ResumeItem
                item={item}
                index={index}
                navigation={props.navigation}
                onPreview={() => onResumePreview(item)}
                onDelete={() => _onDeleteResume(item)}
            />
        )
    }


    const onResumePreview = (item) => {
        const nameSplit = item.fileName.split('.')
        const type = nameSplit[nameSplit.length - 1]
        console.log('[ResumeView.js] on preview: ', nameSplit,type)
        if(type === 'mov' || type === 'mp4'){
            props.navigation.navigate('VideoPreview',{
                    'videoData' : item.resumeURL
                })
        }else if(type === 'pdf'){
            if(Platform.OS === 'ios'){
                props.navigation.navigate('WebView',{
                    'title' : item.fileName,
                    'url' : item.resumeURL
                })
            }else {
                _onPreview(item,type)

            }
        }else if(type === 'doc' || type === 'docx'){
            // props.navigation.navigate('WebView',{
            //     'title' : item.fileName,
            //     'url' : item.resumeURL
            // }) 
            _onPreviewDocFile(item,type)
        }
            
    }


    const _onPreview = (item,type) => {
        debugger;
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            console.log('[ResumeView.js] onView file : ',item)
            ReactNativeBlobUtil.fetch('GET', item.resumeURL)
                .then((res) => {
                    baseViewRef.current.hideLoader()
                    props.navigation.navigate('PDFViewer',{
                        'title' : item.fileName,
                        'url' : res.data
                    })
                })
                // Something went wrong:
                .catch((errorMessage, statusCode) => {
                    // error handling
                    baseViewRef.current.hideLoader()
                    console.log('[ResumeView.js] onView file : ',errorMessage,statusCode)
                })
        }
    }


    const _onPreviewDocFile = (item,type) => {


        console.log('[ResumeHome.js] On Preview Doc File : ',item,type)
        // if(Platform.OS === 'android'){
        //     // OpenFile.openDoc([
        //     //     {
        //     //         url:item.resumeURL,
        //     //         fileName:item.fileName,
        //     //         fileType:type, 
        //     //         cache:false
        //     //     }
        //     // ],(error,url) => {
        //     //     if (error) {
        //     //       console.error('[ResumeHome.js] error',error);
        //     //     } else {
        //     //       console.log('[ResumeHome.js] url',url)
        //     //     }
        //     // })
        // }else if(Platform.OS === 'ios'){
        //     console.log('[ResumeHome.js] On Preview Doc File in IOS ')
        //     // OpenFile.openDoc([{
        //     //     url:`${item.resumeURL}`,
        //     //     fileNameOptional:item.fileName,
        //     //   }], (error, url) => {
        //     //         if (error) {
        //     //         console.error('[ResumeHome.js] error',error);
        //     //       } else {
        //     //         console.log('[ResumeHome.js] url',url)
        //     //       }
        //     //    })
        // }
        props.navigation.navigate('WebView',{
            'title' : item.fileName,
            'url' : item.resumeURL
        }) 

    }


    const _onDeleteResume = item => {
        // console.log('[ResumeView.js] on Delete Resume: ', item)
        showConfirmAlert(
            'Delete',
            'Are You Sure want to delete?',
            () => {
                // console.log('[ResumeView.js] on Delete Resume: ', item)
                if(baseViewRef !== null){
                    baseViewRef.current.showLoader();
                    deleteResume(item.fileName)
                        .then(response => {
                            baseViewRef.current.hideLoader()
                            console.log('[ResumeView.js] on Delete Resume: ', response)
                            showAlert('success','Resume Deleted Successfully!')
                            _getResumeList()
                        })
                        .catch(error => {
                            baseViewRef.current.hideLoader()
                            console.log('[ResumeView.js] on Delete Resume Error: ', error)
                        })
                }
            })

    }

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='RESUMES'
            hasTitle
        >
        <View style={styles.parent}>
            <Text style={styles.resumeText}>New Resume</Text>   
            <MenuItem 
                hasIcon
                iconName='plus'
                iconType='feather'
                title='Create using High5 Templates'
                onPress={() => _onCreateResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
            <MenuItem 
                hasImage
                source={images.video}
                title='Create a Video Resume'
                onPress={() => _onCreateVideoResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
            <MenuItem 
                hasIcon
                iconName='upload'
                iconType='feather'
                title='Upload Resume'
                onPress={() => _onUploadResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
            <View style={{flex:1}}>
                <Text style={[styles.resumeText,{marginTop:40}]}>My Resumes</Text>   
                <FlatList 
                    data={resumeList}
                    renderItem={_renderResumeItem}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            onRefresh={() => _getResumeList()}
                        />
                    }
                    contentContainerStyle={{paddingBottom:40}}
                    showsVerticalScrollIndicator={false}
                    extraData={extraData}
                />
                
                {
                    (resumeList.length < 1 && !isRefreshing)
                    &&
                    <NoDataView 
                        msg='No Resume Created Yet!'
                        parentStyle={{position:'absolute',alignSelf:'center',top:120}}
                    />
                }
            </View>
        </View>
        </BaseView>
    )
}

export default ResumeHome

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        marginTop:16
    },
    resumeText : {
        fontFamily:fonts.notoSansRegular,
        color:'#1B1B1B',
        fontSize:12
    },
    menuItemParent : {
        borderRadius:8
    },
    menuItemTitle : {
        fontFamily:fonts.notoSansRegular
    }
})
