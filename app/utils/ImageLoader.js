
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { showAlert } from './Message';

const imageOptions = {
    mediaType: 'photo',
    maxWidth: 600,
    maxHeight: 600,
    includeBase64 : true,
    quality : 0.9,
}

export const capturedImage = () => new Promise((resolve,reject) => {
    launchCamera(imageOptions,response => {
        console.log('[ImageLoader.js] Camera Image : ',response)
        if(response.didCancel){
            reject()
            return;
        }else if(response.errorCode === 'camera_unavailable'){
            showAlert('error','Camera is unavailable.')
            reject()
            return;
        }

        const asset = response.assets[0]

        const image = {
            uri : asset.uri,
            name : asset.fileName,
            type : asset.type,
            base64 : `data:image/jpeg;base64,${asset.base64}`
        }

        // console.log('[ImageLoader.js] Camera Image : ',response)
        
        resolve(image)
    })
})


export const getGalleryImage = () => new Promise((resolve,reject) => {
    launchImageLibrary(imageOptions,response => {

        if(response.didCancel){
            reject()
            return;
        }
        
        const asset = response.assets[0]

        const image = {
            uri : asset.uri,
            name : asset.fileName,
            type : asset.type,
            base64 : `data:image/jpeg;base64,${asset.base64}`
        }

        console.log('[ImageLoader.js] Gallery Image : ',asset)
        resolve(image)

    })
})


export const getVideoType = type => {
    let videoType = ''
    if(type === 'mov'){
        videoType = 'video/quicktime'
    }else {
        videoType = `video/${type}`
    }

    return videoType;
}