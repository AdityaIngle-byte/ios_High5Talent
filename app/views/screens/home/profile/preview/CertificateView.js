import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../../values/fonts'

const CertificateView = props => {

    const profileCertificates = useSelector(state => state.profile.profileCertificates)

    const list = profileCertificates.length > 2 ? profileCertificates.slice(0,2) : profileCertificates;
    const length = profileCertificates.length > 2 ? profileCertificates.length-2 : profileCertificates.length;
    // console.log('[CertificateView.js] : ',list,length,profileCertificates)

    const _renderItem = (item,index) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.certificationName}</Text>
            </View>
        )
    }


    


    return (
       <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
       >
        <View style={[styles.parent,{paddingTop:profileCertificates.length>0?12:0}]}>
            {
                profileCertificates.length>0
                &&
                list.map((item,index) => _renderItem(item,index))
            }
            {
                profileCertificates.length > 2
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

export default CertificateView



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