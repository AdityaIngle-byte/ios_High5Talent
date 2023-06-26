import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { images } from '../../assets/images'

const Loader = props => {
    return (
        <Overlay
            isVisible={props.loader}
            overlayStyle={{backgroundColor:'#0000',elevation:0}}
            backdropStyle={{backgroundColor:'#00000080'}}
        >
            <Image 
                source={images.loader}
                style={styles.image}
                resizeMode='contain'
            />
        </Overlay> 
    )
}

export default Loader

const styles = StyleSheet.create({
    image : {
        height:240,
        width: 240,
        // backgroundColor: '#00000000'
    }
})
