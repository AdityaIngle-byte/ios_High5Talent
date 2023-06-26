import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { colors } from '../../../../../values/colors'
import { fonts } from '../../../../../values/fonts'

const SkillsView = props => {

    const profileSkills = useSelector(state => state.profile.profileSkills)
    const skillsList = profileSkills.primarySkills

    const list = skillsList.length > 2 ? skillsList.slice(0,2) : skillsList;
    const length = skillsList.length > 2 ? skillsList.length-2 : skillsList.length;
    // console.log('[SkillsView.js] : ',list,length,skillsList)

    const _renderSkill = (item,index) => {


        return(
            <View style={[styles.itemView,props.itemStyle]}>
                <Text style={[styles.itemText,props.itemTextStyle]}>{item}</Text>
            </View>
        )
    }


    


    return (
       <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
            <View style={[styles.parent,{paddingTop:skillsList.length>0?12:0}]}>
                {
                    skillsList.length>0
                    &&
                    list.map((item,index) => _renderSkill(item,index))
                    
                }
                {
                    skillsList.length > 2
                    &&
                    <TouchableOpacity
                        onPress={props.onMorePress}
                    >
                    <View style={[styles.itemView,props.itemStyle]}>
                        <Text style={[styles.itemText,props.itemTextStyle]}>+ {length}</Text>
                    </View>
                    </TouchableOpacity>
                }
            </View>
            </ScrollView>

            <Text style={styles.industry}><Text style={{fontSize:12,color:'#888'}}>Industry:</Text> {profileSkills.skillSet[0]}</Text>
       </View>
                
           
    )
}

export default SkillsView



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
        // marginBottom:8,
        borderRadius:4,
        flexDirection:'row',
    },
    itemText : {
        fontSize:12,
        fontFamily:fonts.notoSansMedium,
        color:colors.accent
    },
    industry : {
        fontSize:14,
        fontFamily:fonts.notoSansMedium,
        color:colors.successColor
    }
})