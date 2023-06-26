//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { images } from '../../assets/images';
import { fonts } from '../../values/fonts';
import ButtonView from '../components/ButtonView';
import BaseModal from '../hoc/BaseModal';

// create a component
class SuccessModal extends Component {

    state = {
        value : ''
    }


    init = (title,value) => {
        this.setState({ title, value })
    }


    _onAlright = () => {
        this.baseModal.hideModal()
    }


    render() {

        const {title,value} = this.state;

        return (
            <BaseModal
                ref={ref => this.baseModal = ref}
                onBackButtonPress={() => this.baseModal.hideModal()}
                onBackdropPress={() => this.baseModal.hideModal()}
                overlayStyle={{borderRadius:8}}
            >
            <View style={styles.parent}>
                <Image 
                    source={images.success}
                    style={styles.image}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
                <ButtonView 
                    title={'Alright!'}
                    containerStyle={{width:'100%'}}
                    onPress={() => this._onAlright()}
                />
            </View>
            </BaseModal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    parent: {
        backgroundColor:'#fff',
        paddingHorizontal:16,
        paddingTop:32,
        paddingBottom:24,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
        // marginHorizontal:24
    },
    image : {
        height:144,
        width:144,
        // borderRadius:32
    },
    title : {
        marginTop:32,
        fontSize:20,
        fontFamily:fonts.notoSansBold
    },
    value : {
        marginTop:8,
        fontSize:16,
        fontFamily:fonts.notoSansRegular
    }
   
});

//make this component available to the app
export default SuccessModal;
