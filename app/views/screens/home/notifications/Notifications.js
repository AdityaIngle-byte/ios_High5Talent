import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import BaseView from '../../../hoc/BaseView'

const Notifications = props => {

    const baseViewRef = useRef(null)

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='NOTIFICATIONS'
            navigation={props.navigation}
            hasNotification
        > 

        </BaseView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    parent : {
        flex:1,
        paddingHorizontal:16,
        // paddingTop:16
    },
    topMargin : {
        marginTop:16
    }
})
