import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { images } from '../../assets/images'
import { colors } from '../../values/colors'
import { fonts } from '../../values/fonts'


export const SideMenuItem = props => {

    const {hasIcon,iconName,iconType,hasImage,source,title,color} = props

    const [checked, setChecked] = useState(false)

    const tintColor = color ? color : colors.accent;

    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={[{marginTop:12},props.style]}
        >
            <View style={[styles.itemView,props.parentStyle]}>
                {
                    hasIcon
                    &&
                    <Icon 
                        name={iconName}
                        type={iconType}
                        color={tintColor}
                        size={20}
                        containerStyle={{width:32}}
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
                <Text style={[styles.itemTitle,{color:tintColor},props.titleStyle]}>{title}</Text>
                {
                    props.hasCheckBox
                    &&
                    <TouchableOpacity
                        onPress={() => {
                                setChecked(prevState => !prevState)
                                setTimeout(() =>{
                                    props.onCheckPress(checked)
                                },500)
                            }}
                    >
                        <Image
                            source={checked ? images.check : images.unchecked}
                            style={styles.checkIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemView : {
        height:48,
        flexDirection:'row',
        paddingHorizontal:12,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#fff'
    },
    itemTitle : {
        fontSize:14,
        color:'#888',
        paddingLeft:8,
        fontFamily:fonts.notoSansBold,
        flex:1,
        // fontWeight:'700'
    },
    image : {
        height:24,
        width:24,
        marginRight:4,
        tintColor:colors.accent
    },
    checkIcon : {
        height:24,
        width:24,
        marginRight:4,
    }
});