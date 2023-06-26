import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const LicenseView = props => {

    const profileLicenses = useSelector(state => state.profile.profileLicenses)

    const list = profileLicenses.length > 2 ? profileLicenses.slice(0,2) : profileLicenses;
    const length = profileLicenses.length > 2 ? profileLicenses.length-2 : profileLicenses.length;
    // console.log('[LanguageView.js] : ',list,length,profileLicenses)

    const _renderItem = (item,index) => {
        return(
            <View style={[styles.itemView]}>
                <Text style={[styles.itemText]}>{item.licenseName}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileLicenses.length>0?12:0}]}>
            {
                profileLicenses.length>0
                &&
                list.map((item,index) => _renderItem(item,index))
            }
            {
                profileLicenses.length > 2
                &&
                <TouchableOpacity
                    onPress={props.onMorePress}
                >
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>+ {length}</Text>
                </View>
                </TouchableOpacity>
            }
       </View>
       </ScrollView>
                
           
    )
}

export default LicenseView



const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        // paddingTop:12
    },
    itemView : {
        height:32,
        paddingHorizontal:12,
        // borderWidth:1,
        backgroundColor:'#E4ECF7',
        justifyContent:'center',
        alignItems:'center',
        marginRight:16,
        marginBottom:8,
        borderRadius:4,
        flexDirection:'row',
    },
    itemText : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,

    }
})