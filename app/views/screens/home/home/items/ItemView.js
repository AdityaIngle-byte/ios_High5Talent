import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../../values/colors'
import { fonts } from '../../../../../values/fonts'

const ItemView = props => {
    const {title,children,isCollapsed=false} = props;

    const [collapsed, setCollapsed] = useState(isCollapsed)

    // useEffect(() => {
    //     setCollapsed(false)
    //     return () => {
            
    //     }
    // }, [setCollapsed])

    return (
        <View style={styles.parent}>
            <TouchableOpacity
                onPress={() => setCollapsed(prevState => !prevState)}
                style={{marginBottom:4}}
            >
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Icon 
                    name={!collapsed ? 'caret-down' : 'caret-right'}
                    type='font-awesome'
                    size={16}
                    color={colors.defaultTextColor}
                />
            </View>
            </TouchableOpacity>

            <Collapsible collapsed={collapsed}>
                {children}
            </Collapsible>
        </View>
    )
}

export default ItemView

const styles = StyleSheet.create({
    parent : {

    },
    row : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop:16,
        paddingHorizontal:16,
    },
    title : {
        fontSize:16,
        fontFamily:fonts.notoSansMedium,
        color:colors.defaultTextColor,
        
    }
})
