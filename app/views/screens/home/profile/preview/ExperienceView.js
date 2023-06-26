import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const ExperienceView = props => {

    const profileExperiences = useSelector(state => state.profile.profileExperiences)

    const list = profileExperiences.length > 2 ? profileExperiences.slice(0,2) : profileExperiences;
    const length = profileExperiences.length > 2 ? profileExperiences.length-2 : profileExperiences.length;
    // console.log('[ExperienceView.js] : ',list,length,profileExperiences)

    const _renderItem = (item,index) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.employerName}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileExperiences.length>0?12:0}]}>
            {
                profileExperiences.length>0
                &&
                list.map((item,index) => _renderItem(item,index))
            }
            {
                profileExperiences.length > 2
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

export default ExperienceView



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