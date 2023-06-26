import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const AwardsAndHonorsView = props => {

    const profileAwardsAndHonorsList = useSelector(state => state.profile.profileAwardsAndHonorsList)

    const list = profileAwardsAndHonorsList.length > 2 ? profileAwardsAndHonorsList.slice(0,2) : profileAwardsAndHonorsList;
    const length = profileAwardsAndHonorsList.length > 2 ? profileAwardsAndHonorsList.length-2 : profileAwardsAndHonorsList.length;
    // console.log('[AwardsAndHonorsView.js] : ',list,length,profileAwardsAndHonorsList)

    const _renderItem = (item,index) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.awardname}</Text>
            </View>
        )
    }

    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileAwardsAndHonorsList.length>0?12:0}]}>
            {
                profileAwardsAndHonorsList.length>0
                &&
                list.map((item,index) => _renderItem(item,index))
            }
            {
                profileAwardsAndHonorsList.length > 2
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

export default AwardsAndHonorsView



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