import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const CustomSectionsView = props => {

    const profileCustomSections = useSelector(state => state.profile.profileCustomSections)

    const list = profileCustomSections.length > 2 ? profileCustomSections.slice(0,2) : profileCustomSections;
    const length = profileCustomSections.length > 2 ? profileCustomSections.length-2 : profileCustomSections.length;
    // console.log('[CustomSectionsView.js] : ',list,length,profileCustomSections)

    const _renderItem = (item,index) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileCustomSections.length>0?12:0}]}>
            {
                profileCustomSections.length>0
                &&
                list.map((it,index) => _renderItem(it,index))
            }
            {
                profileCustomSections.length > 2
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

export default CustomSectionsView



const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        paddingTop:12
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