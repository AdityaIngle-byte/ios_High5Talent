import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const EducationView = props => {

    const profileEducation = useSelector(state => state.profile.profileEducation)
    console.log("Profile Education");
    console.log(profileEducation);

    const list = profileEducation.length > 2 ? profileEducation.slice(0,2) : profileEducation;
    const length = profileEducation.length > 2 ? profileEducation.length-2 : profileEducation.length;
    // console.log('[EducationView.js] : ',list,length,profileEducation)

    const _renderItem = (item,index) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.educationProgram}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileEducation.length>0?12:0}]}>
            {
                profileEducation.length>0
                &&
                <ScrollView 
                    horizontal
                >
                    {
                        list.map((it,index) => _renderItem(it,index))
                    }
                </ScrollView>
                
            }
            {
                profileEducation.length > 2
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

export default EducationView



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
        fontFamily:fonts.poppinsMedium,

    }
})