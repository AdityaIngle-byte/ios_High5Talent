import React, { useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setBottomTab } from '../redux/actions/homeActions'
import { BottomTabItem } from './items/BottomTabItem'


const CustomBottomTabView = props => {
    const dispatch = useDispatch()
    const tab = useSelector(state => state.home.currentBottomTab)

    useEffect(() => {

        // console.log('[CustomBottomTabView.js]init:',props)
        _updateCurrentTabIndex()
        
    })


    const _updateCurrentTabIndex = () => {
        const currentTabIndex = props.state.index;
        if(currentTabIndex === 0){
            dispatch(setBottomTab('Home'))
        }
    }


    const moveToTab = (tab) => {
        props.navigation.jumpTo(tab)
        dispatch(setBottomTab(tab))
    }

    return (

        <View style={[styles.parent]}>
            <BottomTabItem 
                iconName='home'
                title={'Home'}
                isFocused={tab === 'Home'}
                onPress={() => moveToTab('Home')}
            />
            <BottomTabItem 
                iconName='briefcase'
                title={'Jobs'}
                isFocused={tab === 'Jobs'}
                onPress={() => moveToTab('Jobs')}
            />
            <BottomTabItem 
                iconName='server'
                title={'Todos'}
                isFocused={tab === 'Todos'}
                onPress={() => moveToTab('Todos')}
            />
            {/* <BottomTabItem 
                iconName='chat-processing-outline'
                iconType={'material-community'}
                iconSize={24}
                title={'Interviews'}
                isFocused={tab === 'Interviews'}
                onPress={() => moveToTab('Interviews')}
            /> */}
            <BottomTabItem 
                iconName='user'
                title={'Profile'}
                isFocused={tab === 'Profile'}
                onPress={() => moveToTab('Profile')}
            />
        </View>
            
    )
}

export default CustomBottomTabView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        backgroundColor:'#fff',
        height:Platform.OS === 'ios' ? 84 : 64,
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 12,
        elevation: 9,
    }
})

