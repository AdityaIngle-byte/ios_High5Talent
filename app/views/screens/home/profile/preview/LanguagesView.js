import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const LanguagesView = props => {

    const profileLanguages = useSelector(state => state.profile.profileLanguages)

    const list = profileLanguages.length > 2 ? profileLanguages.slice(0,2) : profileLanguages;
    const length = profileLanguages.length > 2 ? profileLanguages.length-2 : profileLanguages.length;
    // console.log('[LanguageView.js] : ',list,length,profileLanguages)

    const _renderItem = (item,index) => {
        return(
            <View style={[styles.itemView]}>
                <Text style={[styles.itemText]}>{item.languagename}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileLanguages.length>0?12:0}]}>
            {
                profileLanguages.length>0
                &&
                list.map((item,index) => _renderItem(item,index))
            }
            {
                profileLanguages.length > 2
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

export default LanguagesView



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