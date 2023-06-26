import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,FlatList,RefreshControl,Image } from 'react-native'
import { colors } from '../../../values/colors';
import { fonts } from '../../../values/fonts';
import BaseView from '../../hoc/BaseView';
import Collapsible from 'react-native-collapsible'
import { Icon } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import ButtonView from '../../components/ButtonView'
import InputView from '../../components/InputView'
// import AddAddress from './AddAddress'
import { getAddressFromLatLong, getCurrentLocation, getFormattedAddress, getSearchedLocation } from './LocationServices'
import { images } from '../../../assets/images';
import AddAddress from './AddAddress';
import { checkLocationPermissions } from '../../../utils/PermissionsCheck';
import Geolocation from '@react-native-community/geolocation';



const SelectAddress = props => {

    const addAddressModal = useRef(null)


    const mapViewRef = useRef(null)

    const [initialRegion, setInitialRegion] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mapTypeIndex, setMapTypeIndex] = useState(0);
    const [mapType, setMapType] = useState('Standard');
    const [isAddressViewCollapsed, setIsAddressViewCollapsed] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [addressesList, setAddressesList] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false)


    useEffect(() => {
        // Geolocation.requestAuthorization()
        // _getCurrentLocation()
        _checkLocationPermissions()
      return () => {
        
      };
    }, [])


    const _checkLocationPermissions = () => {
        checkLocationPermissions()
            .then(response => {
                _getCurrentLocation()
            })
            .catch(error => {

            })
    }


    const _getCurrentLocation = () => {
        console.log('[SelectAddress.js] Use Current Location Called : ')
        getCurrentLocation()
            .then(location => {
                console.log('[SelectAddress.js] Current Location : ',location)
                const region = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }
                setInitialRegion(region)
                _getLocationFromLatLong(region.latitude,region.longitude)
            })
    }


    const _onMapPress = (data) => {
        const coordinates = data.nativeEvent.coordinate
        console.log('On Map Press :',coordinates)

        const initialRegion = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
        }
        setInitialRegion(initialRegion)

        _getLocationFromLatLong(coordinates.latitude,coordinates.longitude)
        
    }


    const _getLocationFromLatLong = (lat,lng) => {
        getAddressFromLatLong(lat,lng)
            .then(response => {
                console.log('[SelectAddress.js] Get Address from location response : ',response)
                if(response.length > 0){
                    const {formatted_address,geometry} = response[0]
                    // this.setState({
                    //     title : '',
                    //     description : formatted_address,
                    //     initialRegion : {
                    //         latitude: geometry.location.lat,
                    //         longitude: geometry.location.lng,
                    //         latitudeDelta: 0.04,
                    //         longitudeDelta: 0.05,
                    //     },
                    //     googleApiAddress : response[0],
                    //     // isAddressViewCollapsed : !this.state.isAddressViewCollapsed
                    // },() => {
                    //     this.mapView.animateToRegion(this.state.initialRegion,2000)
                    // })
                    setTitle('')
                    setDescription(formatted_address)
                    const region = {
                        latitude: geometry.location.lat,
                        longitude: geometry.location.lng,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }
                    setInitialRegion(region)
                    if(mapViewRef !== null){
                        mapViewRef.current.animateToRegion(region,2000)
                    }

                    
                }
            })
            .catch(error => {
                console.log('[SelectAddress.js] Get Address from location error : ',error)
            })
    }



    // const _updateMapIndex = (index) => {
    //     console.log('Index : ',index)

    //     let mapType = 'standard'
    //     if(index === 1){
    //         mapType = 'satellite'
    //     }else if(index === 2){
    //         mapType = 'hybrid'
    //     }
    //     setMapTypeIndex(index);
    //     setMapType(mapType);
    // }


    const _onSearchText = (text) => {
        setSearchText(text)
        setRefreshing(true)
        if(text.length > 2){
            getSearchedLocation(text)
                .then(response => {
                    setRefreshing(false)
                    console.log('[SelectAddress.js] Address Searched List : ',response)
                    setAddressesList(response)
                    
                })
                .catch(error => {
                    setRefreshing(false)
                    console.log('[SelectAddress.js] Address Searched Error : ',error)
                })
        }
    }


    const _renderAddressItem = ({item,index}) => {

        const {icon,name,formatted_address} = item
        return (
                
            <TouchableOpacity onPress={() => _onItemPress(item)}>
            <View style={styles.itemParent}>
                <Image 
                    source={{uri : icon}}
                    style={{height:16,width:16,marginRight:8,tintColor:'#888'}}
                    resizeMode={'contain'}
                />
                <View style={{borderBottomWidth:0.5,borderBottomColor:'#d4d4d4',flex:1,paddingBottom:4}}>
                    <Text style={styles.itemName}>{name}</Text>
                    <Text 
                        style={styles.itemAddress}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >{formatted_address}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }


    const _onItemPress = (item) => {
        const {geometry,name,formatted_address} = item

        console.log('[SelectAddress.js] On Item Press : ',item, mapViewRef)
        const region = {
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                latitudeDelta: 0.04,
                longitudeDelta: 0.05,
            }
        setTitle(name)
        setDescription(formatted_address)
        setInitialRegion(region)
        setIsAddressViewCollapsed(prevState => !prevState)
        if(mapViewRef !== null){
            mapViewRef.current.animateToRegion(region,2000)
        }
        // console.log('[SelectAddress.js] REf : ',mapViewRef)
        // this.setState({
        //     title : name,
        //     description : formatted_address,
        //     initialRegion : {
        //         latitude: geometry.location.lat,
        //         longitude: geometry.location.lng,
        //         latitudeDelta: 0.04,
        //         longitudeDelta: 0.05,
        //     },
        //     googleApiAddress : item,
        //     isAddressViewCollapsed : !this.state.isAddressViewCollapsed
        // },() => {
        //     this.mapView.animateToRegion(this.state.initialRegion,2000)
        // })
        
    }


    const _onSave = (address) => {
       props.route.params.onGoBack(address)
       props.navigation.goBack()
    }


    const _onConfirmLocation = () => {
        console.log('[SelectAddress.js] On Confirm Location :',props)

        getAddressFromLatLong(initialRegion.latitude,initialRegion.longitude)
            .then(response => {
                console.log('[SelectAddress.js] On Confirm :',response)
                if(response.length > 0){
                    const address = getFormattedAddress(response[0].address_components);
                    address['latlong'] = {
                        latitude : initialRegion.latitude,
                        longitude : initialRegion.longitude
                    }
                    console.log('[SelectAddress.js] On Confirm Address:',address)
                    addAddressModal.current.baseModal.showModal();
                    addAddressModal.current.init(address)
                }
            })
            .catch(error => {
                console.log('[SelectAddress.js] On Save Error:',error)
            })

    }

    const _onChooseOtherLocation = () => {
       setInitialRegion({
            latitude: 30.747560,
            longitude: 76.596995,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
        })
        setTitle('')
        setDescription('')
        setIsAddressViewCollapsed(false)

    }


    

    return (
        <BaseView
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            headerTitle='SELECT ADDRESS'
        >

            <View style={styles.parent}>
                    
               {
                    initialRegion !== null
                    &&
                    <MapView
                        initialRegion={initialRegion}
                        style={styles.mapView}
                        onPress={_onMapPress}
                        mapType={'standard'}
                        ref={mapViewRef}
                        // showsUserLocation
                    >
                        
                        <Marker
                            coordinate={{latitude:initialRegion.latitude,longitude:initialRegion.longitude}}
                            draggable
                            title={title}
                            description={description}
                        >
                            <Image 
                                source={images.interviewer}
                                style={{height:56,width:56}}
                                resizeMode='contain'
                            />
                        </Marker>
                    </MapView>
                } 
                {
                    !isAddressViewCollapsed
                    &&
                    <View style={styles.addressParent}>
                            
                        <Collapsible collapsed={isAddressViewCollapsed}>
                            <View style={{paddingHorizontal:16,marginTop:16}}>
                                <InputView 
                                    placeholder={'Search Your Location city, state, zipcode'}
                                    value={searchText}
                                    onChangeText={text => _onSearchText(text)}
                                />

                                {/* Current location view */}
                                <TouchableOpacity
                                    onPress={() => {
                                        _getCurrentLocation()
                                        setIsAddressViewCollapsed(prevState => !prevState)
                                    }}
                                >
                                    <View style={styles.itemParent}>
                                        <Icon 
                                            name='locate'
                                            type='ionicon'
                                            containerStyle={{paddingRight:4}}
                                            color={colors.primary}
                                        />
                                        <Text style={styles.itemName}>Use Current Location</Text>
                                    </View>
                                </TouchableOpacity>

                                {/* searched locations list */}
                                <FlatList 
                                    data={addressesList}
                                    renderItem={_renderAddressItem}
                                    style={{backgroundColor:'#fff'}}
                                    refreshControl={
                                        <RefreshControl 
                                            refreshing={isRefreshing}
                                            onRefresh={() => {}}
                                        />
                                    }
                                />
                            </View>
                        </Collapsible>
                    </View>
                }
            </View> 
            {
                isAddressViewCollapsed
                &&
                <Collapsible 
                    collapsed={!isAddressViewCollapsed}
                    style={styles.confirmAddressView}
                >
                    <View>
                        <Text style={styles.yourLocationText}>Your Location</Text>
                        <Text style={styles.addressText}>{title !== '' ? title+',' : ''} {description}</Text>
                    </View>
                    <ButtonView 
                        title={'Confirm Location'}
                        onPress={() => _onConfirmLocation()}
                        parentStyle={{}}
                    />
                    <TouchableOpacity 
                        style={{marginBottom:24}}
                        onPress={() => _onChooseOtherLocation()}
                    >
                        <Text style={styles.chooseOtherLocation}>Choose other location</Text>
                    </TouchableOpacity>
                </Collapsible>
            }
            <AddAddress 
                ref={addAddressModal}
                onSavePress={_onSave}
            />
        </BaseView>
    )
}

export default SelectAddress

const styles = StyleSheet.create({
    parent : {
        flex:1,
        backgroundColor:'#fff',
    },
    mapView : {
        flex:1,
        position:'absolute',
        top:0,bottom:0,right: 0,left:0
    },
    mapTypeButtons : {
        position: 'absolute',
        width:164,
        height:24,
        zIndex: 100,
        right: 0,top:12
    },
    addressParent : {
        backgroundColor:'#fff',
        paddingBottom:24,
        // paddingTop:8,
        // height:'100%'
        // paddingHorizontal:16,
        flex:1,
        // // height:560,
        // position:'absolute',
        // top:0,bottom:0,right: 0,left:0
    },
    selectAddressText : {
        fontSize:10,
        fontFamily:fonts.notoSansBold
    },
    yourLocationText : {
        fontSize:12,
        fontFamily:fonts.notoSansBold,
        color:'#888'
    },
    addressText : {
        fontSize:14,
        fontFamily:fonts.notoSansBold,
        color:colors.accent
    },
    addressRow : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemParent : {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:8,
        backgroundColor:'#fff'
    },
    itemName : {
        fontSize:14,
        fontFamily:fonts.notoSansBold,
        color:colors.accent
    },
    itemAddress : {
        fontSize:12,
        fontFamily:fonts.notoSansBold,
        color:'#888',
    },
    confirmAddressView : {
        backgroundColor:'#fff',
        paddingHorizontal:16,
        // flex:1
        // position:'absolute',
        // bottom:0,left:0,right:0
    },
    chooseOtherLocation : {
        fontSize:14,
        fontFamily:fonts.notoSansMedium,
        color:colors.darkBlueColor,
        fontWeight:'700',
        textAlign:'center',
        padding:4
    }
})
