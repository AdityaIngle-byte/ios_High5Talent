import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Platform} from 'react-native'
import BaseView from '../../../hoc/BaseView'
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { fonts } from '../../../../values/fonts';
import { showAlert, showChoiceAlert } from '../../../../utils/Message';
import CountDown from 'react-native-countdown-component';
import { colors } from '../../../../values/colors';
import ButtonView from '../../../components/ButtonView';
import CameraFontsView from './items/CameraFontsView';
import MarqueeView from '../../../../utils/MarqueeView';
import { uploadResumeFile } from '../../../../redux/actions/resumeActions';
import { getVideoType } from '../../../../utils/ImageLoader';
import { Video } from 'react-native-compressor';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../values/dimens';
import {copyFile} from '../../../../utils/FIleHandler';
import AddResumeName from './items/AddResumeName';
import { downloadFile } from '../../../../utils/Share';



const RecordVideoResume = props => {

    const baseViewRef = useRef(null);
    const cameraRef = useRef(null);
    const marqueeViewRef = useRef(null)
    const addResumeRef = useRef(null);

    const [isFirstTime, setIsFirstTime] = useState(true)
    const [scriptDetail, setScriptDetail] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraBlur, setIsCameraBlur] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [flashMode, setFlashMode] = useState(false);
    const [cameraMode, setCameraMode] = useState('front');
    const [fontSize, setFontSize] = useState(24);
    const [fontSpeed, setFontSpeed] = useState(12);
    const [showMarquee, setShowMarquee] = useState(false);
    const [recordedVideoData, setRecordedVideoData] = useState(null)

    useEffect(() => {
        init() 

        if(!isFirstTime){
            useEffectCallback()
        }
    }, [setScriptDetail,isRecording])

    const init = () => {
        const {title,script} = props.route.params;
        if(title !== undefined && script !== undefined){
            setScriptDetail({title,script});
        };
        checkCameraStatus()
        return
    }

    const checkCameraStatus = () => {
        // if(RNCamera.Constants.CameraStatus === '')
        console.log('[RecordVideoResume.js] Check CameraStatus : ',cameraRef.current)
    }


    

    const useEffectCallback = () => {
        if(cameraRef !== null){
            if(isRecording){
                
                // console.log('[RecordResume.js] Video Recording Start',cameraRef.current)
                    _startRecordVideo()
                }else {
                    console.log('[RecordResume.js] Video Recording Stop')
                    _stopRecordVideo()
                } 
        }
    }

    const _onRecord = () => {
        setIsRecording(prevState => !prevState)
        setIsCollapsed(true)   
        setIsFirstTime(false)
    }

    const _startRecordVideo = async() => {
        if (cameraRef !== null) {
            try {
              const promise = cameraRef.current.recordAsync({quality : 0.5});
              if (promise) {
                const data = await promise;
                console.log('[RecordResume.js] takeVideo', data);
                setRecordedVideoData(data)
              }
            } catch (e) {
              console.error(e);
            }
          }
    }

   const  _stopRecordVideo = () => {
        console.log('[RecordResume.js] Stopping Video: ',cameraRef)
        if(cameraRef !== null){
            cameraRef.current.stopRecording()
        }
    }

    
    const _onSavePress = async () => {
        // console.log('[RecordVideoResume.js] on Save Resume : ', recordedVideoData);
        if (addResumeRef !== null) {
          addResumeRef.current.baseModal.showModal();
        }
    };

    const _onSaveResumePress = () => {
        showChoiceAlert(
            'Try Again',
            'What do you want to do next?',
            () => _onReRecord(),
            'Save',
            () => _onSavePress()
        )
       
    }


    const _onReRecord = () => {
        console.log("Re Record Press")
        setRecordedVideoData(null)
    }

    //Old Function and on hold
    // const _onSaveResume = async() => {
    //     debugger;
    //     if(baseViewRef !== null){
    //         baseViewRef.current.showLoader();
    //         const result = await Video.compress(
    //             recordedVideoData.uri,
    //             {
    //             compressionMethod: 'auto'
    //             },
    //             (progress) => {
    //                 console.log('[RecordVideoResume.js] on COmpress progress: ',progress.toFixed(2))
    //             }
    //         );

    //         console.log('[RecordVideoResume.js] Result: ',result)
        
    //         const uri = recordedVideoData.uri;
    //         const uriList = uri.split('.');
    //         const time = new Date().getTime()
    //         const type = uriList[uriList.length - 1];
    //         const uploadedData = {
    //             name : `High5VideoPitch - ${time}.${type}`,
    //             type : getVideoType(type),
    //             uri : result
    //         }
    //         // console.log('[RecordVideoResume.js] On Save : ',recordedVideoData,uploadedData)
            
    //         uploadResumeFile(uploadedData)
    //             .then(response => {
    //                 baseViewRef.current.hideLoader();
    //                 console.log('[CreateHigh5Resume.js] on Upload Resume : ',response)
    //                 showAlert('success','Resume Upload Successfully!')
    //                 // props.navigation.popToTop()
    //                 props.route.params.onGoBack()
    //                 props.navigation.goBack()
    //             })
    //             .catch(error => {
    //                 baseViewRef.current.hideLoader();
    //                 console.log('[CreateHigh5Resume.js] on Upload Resume : ',error)
    //             })
    //     }
    // }


    // const _onVideoIcon = () => {
    //     setIsCameraBlur(prevState => !prevState)
    // }

    // New Function 

    const _onSaveResume = async(name) => {
        debugger;
        if (Platform.OS === 'ios') {
            setTimeout(() => {
              downloadFile(
                'High5 Resume',
                `Save or share ${name}.pdf resume`,
                recordedVideoData.uri,
              )
                .then(response => {
                  showAlert('success', 'Saved Successfully!');
                })
                .catch(error => {
                  showAlert('error', 'Error! Not Saved. Try Again');
                });
            }, 500);
        }else{
            copyFile(recordedVideoData.uri, name)
            .then(response => {
            showAlert('success', 'Saved Successfully!');
            })
            .catch(error => {
            showAlert('error', 'Error! Not Saved. Try Again');
            });
        }    
    }


    const _onCollapsed = () => {
        if(!isRecording){
           setIsCollapsed(prevState => !prevState)
        }else{
            showAlert('error','Stop Recording')
        }
    }



    const _onFontSizeIncrease = () => {
        if(fontSize < 56){
            setFontSize(fontSize+2)
        }else {
            showAlert('error','Fonts Size cannot more than 56')
        }
    }


    const _onFontSizeDecrease = () => {
        if(fontSize > 10){
            setFontSize(fontSize-2)
        }else {
            showAlert('error','Fonts Size cannot less than 10')
        }
    }


    const _onFontSpeedDecrease = () => {
        if(fontSpeed > 2){
            setFontSpeed(fontSpeed-1)
        }else {
            showAlert('error','Font Speed cannot less than 10x')
        }
    }


    const _onFontSpeedIncrease = () => {
        if(fontSpeed < 28){
            setFontSpeed(fontSpeed+1)
        }else {
            showAlert('error','Font Speed cannot more than 28x')
        }
    }


    const _onFlashMode = () => {
        setFlashMode(prevState => !prevState)
    }


    const _onCameraMode = () => {
        setCameraMode(cameraMode === 'front' ? 'back' : 'front')
    }



    const _onMarqueeMode = () => {
        setShowMarquee(prevState => !prevState)
    }



    const _onPreviewVideo = () => {
        if(recordedVideoData !== null){
            props.navigation.navigate('VideoPreview',{'videoData' : recordedVideoData.uri})
        }else {
            showAlert('error','No video recorded yet')
        }
    }


    return (
        <BaseView   
            hasStatusBar
            hasHeader
            hasBack
            hasTitle
            onBackPress={() => props.navigation.goBack()}
            headerTitle='RECORD VIDEO PITCH'
            navigation={props.navigation}
            hasSettings
            onSettingsPress={() => setIsCollapsed(prevState => !prevState)}
            ref={baseViewRef}
        >
            <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={cameraMode === 'back' ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={flashMode ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                defaultVideoQuality={RNCamera.Constants.VideoQuality["480p"]}
             
            >
                
                <View style={[styles.parent,{backgroundColor:isCameraBlur ? '#000000F2' : 'transparent'}]}>
                    <CameraFontsView 
                        isCollapsed={isCollapsed}
                        onCross={() => _onCollapsed()}
                        
                        onFontSizeDecrease={() => _onFontSizeDecrease()}
                        fontSize={fontSize}
                        onFontSizeIncrease={() => _onFontSizeIncrease()}
                        onFontSpeedDecrease={() => _onFontSpeedDecrease()}
                        fontSpeed={fontSpeed}
                        onFontSpeedIncrease={() => _onFontSpeedIncrease()}
                    />
                    <IconView 
                        iconName={flashMode ? 'flash-on' : 'flash-off'}
                        iconType={'material'}
                        style={styles.flashIcon}
                        onPress={() => _onFlashMode()}
                        iconColor={'#fff'}
                    />
                    <IconView 
                        iconName={'flip-camera-ios'}
                        iconType={'material'}
                        style={styles.flashIcon}
                        onPress={() => _onCameraMode()}
                        iconColor={'#fff'}
                    />
                    <View style={styles.bottomView}>
                        
                        {
                            isRecording && scriptDetail !== null
                            &&
                            <IconView 
                                iconName={showMarquee ? 'ios-eye-sharp' : 'ios-eye-off-sharp'}
                                iconType={'ionicon'}
                                style={[styles.flashIcon,{alignSelf:'flex-end'}]}
                                onPress={() => _onMarqueeMode()}
                                iconColor={'#fff'}
                            />
                        }
                        {
                            (isRecording  &&  showMarquee && scriptDetail !== null)
                            &&
                            <MarqueeView
                                style={styles.marqueeView}
                                // ref={marqueeViewRef}
                                loop={-1}
                                direction={"btt"}
                                autoPlay={isRecording}
                                speed={fontSpeed}
                                onEnd={() => {}}
                            >
                                <Text style={[styles.marqueeText,{fontSize:fontSize}]}>{scriptDetail.script}</Text>
                            </MarqueeView>
                        }
                        
                        {
                            isRecording
                            &&
                            <CountDown
                                until={120}
                                size={14}
                                // onFinish={() => alert('Finished')}
                                digitStyle={{backgroundColor: '#FFF'}}
                                digitTxtStyle={{color: colors.primary}}
                                timeToShow={['M', 'S']}
                                timeLabels={{m: 'MM', s: 'SS'}}
                                timeLabelStyle={{color: colors.primary, fontFamily:fonts.notoSansBold}}
                                onFinish={() => {
                                    _stopRecordVideo()
                                    setIsRecording(false)
                                }}
                                
                            />
                        }
                        {/* <View style={styles.row}>
                            <IconView 
                                iconName='list'
                                iconType='entypo'
                                style={styles.icon1}
                                onPress={() => this._onCollapsed()}
                            /> */}
                            <IconView 
                                iconName={isRecording ? 'controller-record' : 'controller-play'}
                                iconType='entypo'
                                style={styles.iconRecord}
                                iconColor={isRecording ? 'red' : '#000'}
                                onPress={() => _onRecord()}
                            />
                    </View>
                </View>
            </RNCamera>
            {
                recordedVideoData !== null
                &&
                <View style={styles.row}>
                    <ButtonView 
                        title={'Preview'}
                        containerStyle={{width:144}}
                        size='medium'
                        onPress={() => _onPreviewVideo()}
                        disabled={recordedVideoData === null}
                    />
                    <ButtonView 
                        title={'Save & Continue'}
                        containerStyle={{width:144}}
                        size='medium'
                        onPress={() => _onSaveResumePress()}
                    />
                </View>
            }
             <AddResumeName ref={addResumeRef} onSave={_onSaveResume} />
        </BaseView>
    )
}

export default RecordVideoResume

const styles = StyleSheet.create({
    parent : {
        flex:1,
        // backgroundColor:'#ffffff80'
    },
    preview : {
        flex:1
    },
    row : {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:32,
        marginBottom:16
        // marginVertical:16
    },
    iconView : {
        backgroundColor:'#ffffff',
    },
    icon1 : {
        height:48,
        width:48,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:24
    },
    iconRecord : {
        height:48,
        width:72,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:24,
        alignSelf:'center'
    },
    
    bottomView : {
        position:'absolute',
        bottom:32,
        right: 0,left:0,
    },
    flashIcon : {
        backgroundColor:'#00000000',
        alignSelf:'flex-start',
        height:64,width:64,
        justifyContent:'center',
        alignItems:'center'
    },
    marqueeView : {
        height: SCREEN_HEIGHT/2-64, 
        width: '100%', 
        backgroundColor: "#ffffff80", 
        marginBottom:8
    },
    marqueeText : {
        paddingHorizontal:16,
        fontFamily:fonts.notoSansBold
    },
    bottom : {
        paddingVertical:16
    }
})



const IconView = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.iconView,props.style]}>
                <Icon 
                    name={props.iconName}
                    type={props.iconType}
                    size={props.iconSize ? props.iconSize : 28}
                    color={props.iconColor}
                />
            </View>
        </TouchableOpacity>
    )
}