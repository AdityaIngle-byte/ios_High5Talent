import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { capturedImage, getGalleryImage } from "../../utils/ImageLoader";
import { showAlert, showConfirmAlert } from "../../utils/Message";
import { checkCameraPermission, requestCameraPermission } from "../../utils/PermissionsCheck";
import { IS_SCREEN_WIDTH_480_ABOVE } from "../../values/dimens";
import ButtonView from "../components/ButtonView";
import BaseBottomSheet from "../hoc/BaseBottomSheet";
import SingleSelectItem from "../items/SingleSelectItem";

class ImagePickerModal extends Component {

    state = {
        hasDelete : false
    }


    showDeleteBtn = () => {
        this.setState({hasDelete: true});
    }


    _onTakePhoto = () => {
        // this.baseBottomSheetRef.hideModal()
        if(Platform.OS === 'android'){
            checkCameraPermission()
                .then(response => {
                    if(response === 1){
                        this._captureImage()
                    }else {
                       
                        requestCameraPermission()
                            .then(response => {
                                this._captureImage()
                            })
                            .catch(error => {
                                this.baseBottomSheetRef.hideModal()
                                showAlert('message','No Camera Permission Provided. Go To Settings and provide Permissions')
                            })
                    }
                })
        }else if(Platform.OS === 'ios'){
            this._captureImage()
        }
    }


    _captureImage = () => {
        // this.baseBottomSheetRef.hideModal()
        capturedImage()
            .then(response => {
                console.log('[ImagePickerModal.js] Take Photo : ',response)
                this._setImage(response)
            }).catch(error => {
                this.baseBottomSheetRef.hideModal()
            })
    }


    _onGetFromGallery = () => {
        // this.baseBottomSheetRef.hideModal()
        getGalleryImage()
            .then(response => {
                console.log('[ImagePickerModal.js] Gallery Photo : ',response)
                this._setImage(response)
            }).catch(error => {
                this.baseBottomSheetRef.hideModal()
            })
    }

    _onDelete = () => {
        this.baseBottomSheetRef.hideModal()
        showConfirmAlert(
                'Delete',
                'Are you sure?',
                () => {
                    this.props.deleteImage();
                }
            )
      
    }


    _setImage = (image) => {
        this.props.setImage(image);
        this.baseBottomSheetRef.hideModal()
    }

    render() {

        const {hasDelete} = this.state;

        return (
            <BaseBottomSheet
                ref={ref => this.baseBottomSheetRef = ref}
            >
           
                <View style={styles.parent}>
                    <SingleSelectItem 
                        title='Photo Library'
                        onPress={() => this._onGetFromGallery()}
                        titleStyle={{textAlign:'center'}}
                    />
                    <SingleSelectItem 
                        title='Take Photo'
                        onPress={() => this._onTakePhoto()}
                        titleStyle={{textAlign:'center'}}
                    />
                    {
                        hasDelete
                        &&
                        <SingleSelectItem 
                            title='Delete'
                            onPress={() => this._onDelete()}
                            titleStyle={{color:'red',textAlign:'center'}}
                        />
                    }

                    <ButtonView 
                        title='Cancel'
                        onPress={() => this.baseBottomSheetRef.hideModal()}

                    />

                </View>
            </BaseBottomSheet>
        );
    }
};

export default ImagePickerModal;

const styles = StyleSheet.create({
    parent : {
        // backgroundColor:'#F0F0F0',
        borderRadius:IS_SCREEN_WIDTH_480_ABOVE ? 20 : 12,
        paddingHorizontal:16,
        paddingBottom:8
    }
});