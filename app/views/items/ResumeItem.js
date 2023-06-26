import React, { Fragment, useRef, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { setResumeList } from '../../redux/actions/resumeActions';
import { dateFormatWithDDMonthYYYY } from '../../utils/DateTimeValidations';
import { showAlert, showAlertMessage, showConfirmAlert } from '../../utils/Message';
import { downloadFile, share } from '../../utils/Share';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts';
import { resumeTypes } from '../../values/strings';
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob'
// import BaseView from '../../../../hoc/BaseView';
// import FileViewer from 'react-native-file-viewer';


const {VIDEO_RESUME, UPLOADED_RESUME, HIGH_5_RESUME} = resumeTypes



const ResumeItem = props => {

    const baseViewRef = useRef(null)
    const {item,index,navigation} = props;

    const [viewMoreScript, setViewMoreScript] = useState(false)
    const resumeList = useSelector(state => state.resume.resumeList)
    const dispatch = useDispatch();

    // console.log('[ResumeItem.js] Init : ',item)


    // const _onRecordResume = () => {
    //     navigation.navigate('CheckPermissions',{
    //         'item' : item
    //     })
    // }


    // const _onPreviewVideoResume = () => {
    //     if(item.is_recorded === 1){
    //         const data = {
    //             uri : item.video_uri
    //         }
    //         props.navigation.navigate('VideoPreview',{'videoData' : data})
    //     }
    // }


    // const _onDownloadVideoResume = async() => {
    //     if(item.video_uri === ''){
    //         showAlert('error','Video Pitch Incomplete.')
    //     }else {
            
    //         if(Platform.OS === 'android'){
    //             // let filePath = `${RNFS.DownloadDirectoryPath}/${item.title}.mp4`;
    //             // RNFS.copyFile(item.video_uri, filePath)
    //             // .then(() => {
    //             //     console.log("Video copied locally!!");
    //             //     showAlert('success','Video Pitch Downloaded Successfully')
    //             // }, (error) => {
    //             //     console.log("CopyFile fail for video: " + error);
    //             //     showAlert('error','Error Occur! Not Downloaded')
    //             // });
    //         }else {
    //             downloadFile(item.title,'High 5 Video Resume',item.video_uri)
    //                 .then(response => {
    //                     showAlert('success','Video Pitch Downloaded Successfully')
    //                 })
    //                 .catch(error => {
    //                     showAlert('error','Error Occur! Not Downloaded')
    //                 })
    //         }
         
    //     }
    // }

    // const _onPreviewUploadedResume = () => {
        
        // if(Platform.OS === 'ios'){
        //     // FileViewer.open(item.resume_uri)
        //     // .then(() => {
        //     //     // success
        //     //     console.log('[ResumeItem.js] View Custom Resume Success')
        //     // })
        //     // .catch(error => {
        //     //     // error
        //     //     console.log('[ResumeItem.js] View Custom Resume Error: ',error)
        //     // });
        // }else {
        //     navigation.navigate('PdfPreview',{
        //         'path' : `${item.resume_uri}`,
        //         'title' : item.title
        //     })
        // }
    // }

    // const _onPreviewHigh5Resume = () => {
    //     navigation.navigate('ResumePreview',{
    //             'data' : item
    //         })
    // }

    // const _onDownloadHigh5Resume = () => {
    //     if(item.type === HIGH_5_RESUME){
    //         downloadFile(item.title,'High 5 Video Resume',item.html_code)
    //                 .then(response => {
    //                     showAlert('success','Shared Successfully')
    //                 })
    //     }
    // }

    const _onShareResume = () => {
        // if(item.type === VIDEO_RESUME){
        //     if(item.video_uri === ''){
        //         showAlert('error','Video Pitch Incomplete.')
        //     }else {
        //         share(item.title,'High 5 Video Resume',item.video_uri)
        //             .then(response => {
        //                 showAlert('success','Shared Successfully')
        //             })
        //     }
        // }else if(item.type === UPLOADED_RESUME){
            share(item.fileName,'High 5 Video Resume',item.resumeURL)
                    .then(response => {
                        showAlert('success','Shared Successfully')
                    })
        // }else if(item.type === HIGH_5_RESUME){
        //     share(item.title,'High 5 Video Resume',item.html_code)
        //             .then(response => {
        //                 showAlert('success','Shared Successfully')
        //             })
        // }
    }


    const _onDeleteResume = () => {
       
    }


    return (
       
        <View style={styles.parent}>
            <View style={styles.videoResumeView}>
                <View style={styles.row}>
                    <Text style={[styles.title,{flex:1}]}>{item.fileName}</Text>
                    <View style={[styles.row]}>
                        <TouchableOpacity
                            style={{paddingHorizontal:8}}
                            onPress={props.onPreview}
                        >
                            <Icon 
                                name='eye'
                                type='feather'
                                color={colors.accent}
                                size={20}
                            />
                        </TouchableOpacity>
                                        
                        {/* share resume */}
                        <TouchableOpacity
                            style={{paddingHorizontal:8}}
                            onPress={() => _onShareResume()}
                        >
                            <Icon 
                                name='share-2'
                                type='feather'
                                color={colors.accent}
                                size={20}
                            />
                        </TouchableOpacity>

                        {/* delete resume */}
                        <TouchableOpacity
                            style={{paddingHorizontal:8}}
                            onPress={props.onDelete}
                        >
                            <Icon 
                                name='trash-2'
                                type='feather'
                                color={colors.accent}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default ResumeItem

const styles = StyleSheet.create({
    parent : {
        marginTop:16,
        // marginHorizontal:16,
        backgroundColor:'#fff',
        paddingHorizontal:16,
        paddingVertical:12,
        borderRadius:6
    },
    videoResumeView : {
        
    },
    row : {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    title : {
        fontSize:16,
        fontFamily:fonts.notoSansBold,
        color:colors.accent
    },
    script : {
        fontSize:12,
        fontFamily:fonts.notoSansRegular,
        color:colors.defaultTextColor,
        flex:1
    },
    viewScript : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:colors.primary,
        // paddingTop:16
        // position:'absolute',
        // top:24
    },
    createdDate : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:'#888',
    },
    flag : {
        paddingHorizontal:8,
        paddingVertical:4,
        backgroundColor:colors.rtrColor,
        borderRadius:4
    }
})
