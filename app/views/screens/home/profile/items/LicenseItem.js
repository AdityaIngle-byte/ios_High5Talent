import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors } from '../../../../../values/colors';
import { fonts } from '../../../../../values/fonts';

const LicenseItem = props => {

    const {item,index} = props;

    return (
        <View style={styles.parent}>
            <View style={styles.row}>
                <Text style={styles.titleText}>{item.licenseName}</Text>
                <TouchableOpacity
                    onPress={props.onDelete}
                    style={{paddingLeft:8}}
                >
                    <Icon 
                        name='trash-2'
                        type='feather'
                        size={20}
                        color={'#97A3AD'}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.text2}>{item.license} - ({item.state})</Text>
            <Text style={styles.text2}>Valid From
                <Text style={styles.titleText}> {item.startDate} - </Text>
                To
                <Text style={styles.titleText}> {item.expiryDate} </Text>
            </Text>
           
        </View>
    )
}

export default LicenseItem

const styles = StyleSheet.create({
    parent : {
        backgroundColor:'#fff', 
        // marginRight:8,
        marginTop:12,
        borderRadius:8,
        paddingHorizontal:12,
        paddingVertical:12,        
    },
    row : {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    titleText : {
        fontFamily:fonts.notoSansBold,
        fontSize:16,
        color:colors.accent,
        flex:1
    },
    text2 :{
        fontFamily:fonts.notoSansRegular,
        fontSize:14,
        color:colors.accent,
        marginTop:4
    },
})

