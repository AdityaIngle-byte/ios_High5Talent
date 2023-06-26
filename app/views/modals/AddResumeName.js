//import liraries
import { Formik } from 'formik';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { showAlertMessage } from '../../utils/Message';
import { fonts } from '../../values/fonts';
import ButtonView from '../components/ButtonView';
import HeaderModal from '../components/HeaderModal';
import InputView from '../components/InputView';
import BaseModal from '../hoc/BaseModal';

// create a component
class AddResumeName extends Component {

    state = {
        title : ''
    }


    init = title => {
        this.setState({title : title})
    }


    render() {

        const {title} = this.state;

        return (
            <BaseModal
                ref={ref => this.baseModal = ref}
            >
            <View
                style={{borderRadius:12}}
            >
            <HeaderModal 
                title={'Resume Title'}
                onCrossPress={() => this.baseModal.hideModal()}
            />
            <View style={styles.container}>
                <InputView 
                    label={'Title'}
                    placeholder={'Title'}
                    parentStyle={{marginTop:20}}
                    value={title}
                    onChangeText={text => this.setState({title:text})}
                />
                <ButtonView 
                    title={'Add'}
                    onPress={() => {
                        this.props.setResumeTitle(title);
                        this.baseModal.hideModal()
                    }}
                />
            </View>
            </View>
            </BaseModal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingBottom:24,
        backgroundColor:'#fff',
        paddingHorizontal:16,
        // height:290,
        width:'100%',
        borderBottomRightRadius:16,
        borderBottomLeftRadius:16
    },
    text1 : {
        fontFamily:fonts.notoSansRegular,
        fontSize:14,
        color:'#00000080'
    }
});

//make this component available to the app
export default AddResumeName;
