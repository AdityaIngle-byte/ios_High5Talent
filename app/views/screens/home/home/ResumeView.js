import React, { useRef, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Platform, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { images } from '../../../../assets/images'
import { getStampVideoUrl, setBottomTab } from '../../../../redux/actions/homeActions'
import { deleteResume, getResumeList, setResumeList, uploadResumeFile } from '../../../../redux/actions/resumeActions'
import { getDocument } from '../../../../utils/DocPicker'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import { fonts } from '../../../../values/fonts'
import BaseView from '../../../hoc/BaseView'
import { MenuItem } from '../../../items/MenuItem'
import RequestMoreItemsView from '../../../items/RequestMoreItemsView'
import ResumeItem from '../../../items/ResumeItem'
import { ResumeMenuItem } from '../../../items/ResumeMenuItem'
// import RNFetchBlob from 'rn-fetch-blob'
// import ReactNativeBlobUtil from 'react-native-blob-util'
// import OpenFile from 'react-native-doc-viewer';


const ResumeView = props => {

    const baseViewRef = useRef()

    const dispatch = useDispatch()

    const resumeList = useSelector(state => state.resume.resumeList);
    const [isRefreshing, setIsRefreshing] = useState(false)

    const _resumeList = resumeList.length > 2 ? resumeList.slice(0,2) : resumeList;

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


    // const uploadDocument = (base64String,file) => {
    //     if(baseViewRef !== null){


            
    //         const data = {
    //             candidateId: "580836381",
    //             fileName: file.name,
    //             fileType: file.type,
    //             base64: base64String
    //         }
    //         console.log('[ResumeView.js] On Upload',data);

    //         baseViewRef.current.showLoader();
    //         uploadResumeFile(data)
    //             .then(response => {
    //                 baseViewRef.current.hideLoader();
    //                 console.log('[ResumeView.js] On Upload',response);
    //                 setTimeout(() =>{
    //                     baseViewRef.current.successModal.baseModal.showModal()
    //                     baseViewRef.current.successModal.init('Resume Uploaded Successfully!',``)
    //                 },500)
    //             })
    //             .catch(error => {
    //                 baseViewRef.current.hideLoader();
    //                 console.log('[ResumeView.js] On Upload Error: ',error);
    //             })
    //     }
    // }


    const _renderItem = (item,index) => {
        return (
            <ResumeItem 
                item={item}
                index={index}
                onPreview={() => onResumePreview(item)}
                onDelete={() => _onDeleteResume(item)}
            />
        )
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


    const onResumePreview = (item) => {
        props.navigation.navigate('WebView',{
            'title' : item.fileName,
            'url' : item.resumeURL
        })
        // const nameSplit = item.fileName.split('.')
        // // console.log('[ResumeView.js] on preview: ', nameSplit)
        
        // const type = nameSplit[nameSplit.length - 1]

        // if(type === 'mov' || type === 'mp4'){
        //     props.navigation.navigate('VideoPreview',{
        //             'videoData' : item.resumeURL
        //         })
        // }else if(type === 'pdf'){
        //     if(Platform.OS === 'ios'){
        //         props.navigation.navigate('WebView',{
        //             'title' : item.fileName,
        //             'url' : item.resumeURL
        //         })
        //     }else {
        //         _onPreview(item,type)
        //     }
        // }else if(type === 'doc' || type === 'docx'){
        //     // props.navigation.navigate('WebView',{
        //     //     'title' : item.fileName,
        //     //     'url' : item.resumeURL
        //     // }) 
        //     _onPreviewDocFile(item,type)
        // }
            
    }


    const _onPreviewDocFile = (item,type) => {

        console.log('[ResumeHome.js] On Preview Doc File : ',item,type)
        if(Platform.OS === 'android'){
            // OpenFile.openDoc([
            //     {
            //         url:item.resumeURL,
            //         fileName:item.fileName,
            //         fileType:type, 
            //         cache:false
            //     }
            // ],(error,url) => {
            //     if (error) {
            //       console.error('[ResumeHome.js] error',error);
            //     } else {
            //       console.log('[ResumeHome.js] url',url)
            //     }
            // })
        }else if(Platform.OS === 'ios'){
            // OpenFile.openDoc([{
            //     url:item.resumeURL,
            //     fileNameOptional:item.fileName,
            //   }], (error, url) => {
            //      if (error) {
            //       this.setState({animating: false});
            //      } else {
            //       this.setState({animating: false});
            //        console.log(url)
            //      }
            //    })
        }
        // props.navigation.navigate('WebView',{
        //     'title' : item.fileName,
        //     'url' : url
        // }) 
    }


    const _onPreview = item => {
        
        if(baseViewRef !== null){
            baseViewRef.current.showLoader()
            console.log('[ResumeView.js] onView file : ',item)
            ReactNativeBlobUtil.fetch('GET', item.resumeURL)
                .then((res) => {
                    // let status = res.info().status;
                    baseViewRef.current.hideLoader()
                    console.log('[ResumeView.js] onView file : ',res)

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


    // const _onPreviewDocFile = () => {}
    


    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar={false}
        >
        <View style={styles.parent}>
            <ResumeMenuItem 
                hasIcon
                iconName='plus'
                iconType='feather'
                title='High5 Templates'
                onPress={() => _onCreateResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
            <ResumeMenuItem 
                hasImage
                source={images.video}
                title='Video Resume'
                onPress={() => _onCreateVideoResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
            <ResumeMenuItem 
                hasIcon
                iconName='upload'
                iconType='feather'
                title='Upload Resume'
                onPress={() => _onUploadResume()}
                titleStyle={styles.menuItemTitle}
                parentStyle={styles.menuItemParent}
            />
        </View>

            <ScrollView 
                style={{paddingHorizontal:16}}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={() => _getResumeList()}
                    />
                }
            >
            {
                _resumeList.length > 0
                &&
                _resumeList.map((item,index) => _renderItem(item,index))
            }

            {
                _resumeList.length > 0
                &&
                <RequestMoreItemsView 
                    title='View More'
                    onPress={() => {
                        // dispatch(setBottomTab('Profile'))
                        props.navigation.navigate('ResumeHome')
                        
                    }}
                    parentStyle={{marginHorizontal:0}}
                />
            }
            </ScrollView>
        </BaseView>
    )
}

export default ResumeView

const styles = StyleSheet.create({
    parent: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:16
    },

    menuItemParent : {
        borderRadius:8
    },
    menuItemTitle : {
        fontFamily:fonts.notoSansRegular
    }
})
