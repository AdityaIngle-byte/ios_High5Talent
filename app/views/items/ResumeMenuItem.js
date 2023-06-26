import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { images } from '../../assets/images'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'
// import { localImagesPath } from '../../assets/src/localImagesPath'


export const ResumeMenuItem = props => {

    const {hasIcon,iconName,iconType,hasImage,source,title,color} = props

    const [checked, setChecked] = useState(false)

    const tintColor = color ? color : colors.accent;

    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={[{marginTop:8},props.style]}
        >
            <View style={[styles.itemView,props.parentStyle]}>
                {
                    hasIcon
                    &&
                    <Icon 
                        name={iconName}
                        type={iconType}
                        color={tintColor}
                        size={16}
                        containerStyle={{width:16}}
                    />
                }
                {
                    hasImage &&
                    <Image 
                        source={source}
                        style={styles.image}
                        resizeMode='contain'
                    />
                }
                <Text style={[styles.itemTitle,props.titleStyle]}>{title}</Text>
                
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemView : {
        height:28,
        flexDirection:'row',
        paddingHorizontal:4,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#fff'
    },
    itemTitle : {
        fontSize:10,
        color:colors.accent,
        paddingLeft:4,
        fontFamily:fonts.notoSansBold,
        // flex:1,
        // fontWeight:'700'
    },
    image : {
        height:20,
        width:20,
        tintColor:colors.accent
    },
    checkIcon : {
        height:24,
        width:24,
        marginRight:4,
    }
});