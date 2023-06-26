import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { colors } from '../../values/colors';
import { fonts } from '../../values/fonts'
import ButtonView from '../components/ButtonView';

const   LearningItem = props => {

    const {item,index,onStart,onResume,onGetCertificate} = props;

    const percent = item.PercentComplete
    const width = percent.toString()+'%'

    return (
       
        <View style={styles.parent}>
            <Text style={styles.title}>{item.CourseName}</Text>
            {
                percent !== 100 && 
                <Text style={styles.text1}>{percent}% Completed</Text>
            }
            {
                percent === 100
                &&
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Icon 
                        name='checkmark-done-circle'
                        type='ionicon'
                        color={'#3AB549'}
                        size={18}
                    />
                    <Text style={[styles.text1,{marginLeft:8}]}>Course Completed</Text>
                </View>
            }
            <View style={styles.slider}>
                <View style={[styles.completeSlider,{width:width}]}/>
            </View>

            <View style={styles.bottomView}>
                {
                    percent === 0 &&
                    <ButtonView 
                        title={'Start'}
                        buttonStyle={{paddingHorizontal:20}}
                        containerStyle={{marginRight:8,marginTop:8}}
                        titleStyle={{fontSize:12}}
                        size='small'
                        onPress={onStart}
                    />
                }
                {
                    (percent !== 0 && percent !== 100) &&
                    <ButtonView 
                        title={'Resume'}
                        buttonStyle={{paddingHorizontal:20}}
                        containerStyle={{marginRight:8,marginTop:8}}
                        titleStyle={{fontSize:12}}
                        size='small'
                        onPress={onResume}
                    />
                }
                {
                    percent === 100 &&
                    <ButtonView 
                        title={'Get Certificate'}
                        buttonStyle={{paddingHorizontal:20}}
                        containerStyle={{marginRight:8,marginTop:8}}
                        titleStyle={{fontSize:12}}
                        size='small'
                        onPress={onGetCertificate}
                    />
                }
                {/* <TouchableOpacity 
                  onPress={() => props.navigation.navigate('WebView',{
                            'url' : item.CourseUrl,
                            'title' : `${item.CourseName}`
                        })}
                >
                    <Text style={styles.reject}>View Details</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default LearningItem

const styles = StyleSheet.create({
    parent : {
        backgroundColor:'#fff',
        paddingHorizontal:12,
        paddingVertical:12,
        borderRadius:6,
        marginTop:16,
        marginHorizontal:16
    },
    title : {
        fontSize:14,
        color:'#1B1B1B',
        fontFamily:fonts.notoSansRegular,
        fontWeight:'700',
        paddingBottom:4
    },
    text1 : {
        fontSize:12,
        color:'#666666',
        fontFamily:fonts.notoSansRegular,
        paddingBottom:4
    },
    slider : {
        height:5,
        backgroundColor:'#EDEDED',
        borderRadius:3,
        marginTop:4,
        // width:'100%'
        flex:1
    },
    completeSlider : {
        backgroundColor:'#009EFF',
        // width:'10%',
        flex:1,
        borderRadius:3
    },
    bottomView : {
        flexDirection:'row',
        alignItems:'center',
        marginTop:8
    },
    reject : {
        fontSize:12,
        fontWeight:'400',
        fontFamily:fonts.notoSansRegular,
        color:colors.primary,
        padding:8,
        marginTop:4
    }
})
