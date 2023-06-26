import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseView from '../../../hoc/BaseView'

const Assessments = props => {

    const baseViewRef = useRef(null)

    return (
        <BaseView
            ref={baseViewRef}
            hasStatusBar
            hasHeader
            hasMenu
            headerTitle='ASSESSMENTS'
            navigation={props.navigation}
            hasNotification
        >
        <View style={styles.parent}>
            <Text>
                Home
            </Text>
        </View>
        </BaseView>
    )
}

export default Assessments

const styles = StyleSheet.create({
    parent : {
        flex:1
    }
})
