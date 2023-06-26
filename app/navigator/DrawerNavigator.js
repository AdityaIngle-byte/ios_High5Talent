
import React, {  } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import SideMenu from './SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setBottomTab } from '../redux/actions/homeActions';
import { BottomTabNavigator } from './BottomTabNavigator';
import { setLogoutUser } from '../redux/actions/loginActions';

const Drawer = createDrawerNavigator();

export default HomeNavigator = () => {

    const selectedTab = useSelector(state => state.home.currentBottomTab)
    const dispatch = useDispatch()

    const _setBottomTab = (screenName) => {
        dispatch(setBottomTab(screenName))
    }


    const onLogout = () => {
        dispatch(setLogoutUser())
    }

    return (
        <Drawer.Navigator
            drawerContent={props => SideMenu(props,selectedTab,_setBottomTab,onLogout)}
            
            screenOptions={{
                headerShown : false,
                drawerType : 'front',
                drawerStyle : {backgroundColor:'transparent',width:'100%'}
            }}
        >   
            <Drawer.Screen 
                name='Tabs'
                component={BottomTabNavigator}
            />

            
        </Drawer.Navigator>
    )
}