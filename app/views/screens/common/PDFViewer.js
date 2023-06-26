import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Pdf from 'react-native-pdf';
// import WebView from 'react-native-webview'
import BaseView from '../../hoc/BaseView'
import { colors } from '../../../values/colors'

const PDFViewer = props => {

    // const baseViewRef = useRef(null)

    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        _init()
        return () => {
            
        }
    }, [setUrl,setTitle])


    const _init = () => {
        const {title,url} = props.route.params
        // console.log('[PDFPreview.js] Init :',title,url)

        if(title !== undefined){
            setTitle(title)
        }

        if(url !== undefined){
           setUrl(url)
        }

    }


    return (
        <BaseView
            // ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle={title.toUpperCase()}
            navigation={props.navigation}
            hasNotification
        >
        <View style={{flex:1}}>
            {
                loader
                &&
                <ActivityIndicator 
                    size={'large'}
                    color={colors.accent}
                    style={{alignSelf:'center',marginTop:16}}
                />
            }

            {/* <WebView
                javaScriptEnabled={true}
                source={{ html: `<a href="data:application/pdf;base64,${url}"></a>` }}
                style={{flex:1}}
                onLoadStart={() => setLoader(true)}
                onLoadEnd={() => setLoader(false)}
            /> */}

            <Pdf
                source={{uri : `data:application/pdf;base64,${url}`}}
                onLoadComplete={(numberOfPages,filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{flex:1}}
                
            />
        </View>
        </BaseView>
    )
}

export default PDFViewer

