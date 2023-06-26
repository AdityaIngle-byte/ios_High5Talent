import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import BaseView from '../../hoc/BaseView'
import { colors } from '../../../values/colors'

const WebViewScreen = props => {

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
        console.log('[WebViewScreen.js] Init :',title,url)

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


            <WebView
                source={{ uri: url }}
                style={{flex:1}}
                onLoadStart={() => setLoader(true)}
                onLoadEnd={() => setLoader(false)}
            />
        </View>
        </BaseView>
    )
}

export default WebViewScreen

