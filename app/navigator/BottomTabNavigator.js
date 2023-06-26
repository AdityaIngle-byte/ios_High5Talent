import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabView from './CustomBottomTabView';

import Home from '../views/screens/home/home/Home';
import Jobs from '../views/screens/home/jobs/Jobs';
import Todos from '../views/screens/home/todos_requests/Todos';
import Profile from '../views/screens/home/profile/Profile';
import Assessments from '../views/screens/home/assessments/Assessments';
import Learn from '../views/screens/home/learn/Learn';
import Interviewer from '../views/screens/home/interviewer/Interviewer';
import SearchAgent from '../views/screens/home/searchAgent/SearchAgent';
import Interviews from '../views/screens/home/interviews/Interviews';
import Preferences from '../views/screens/home/settings/Preferences';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export const BottomTabNavigator = () => {

    return (
        <Tab.Navigator 
            initialRouteName='Home' 
            backBehavior='initialRoute'
            tabBar={props => (
                <CustomBottomTabView  {...props} />
            )}
            swipeEnabled
            screenOptions={{headerShown:false}}
        >
            <Tab.Screen 
                name={'Home'} 
                component={Home}
            />
            <Tab.Screen 
                name={'Jobs'} 
                component={Jobs}
            />
            <Tab.Screen 
                name={'Todos'} 
                component={Todos}
            />
           <Tab.Screen 
                name={'Profile'} 
                component={Profile}
            />
            <Tab.Screen 
                name={'Assessments'} 
                component={Assessments}
            />
             <Tab.Screen 
                name={'Interviews'} 
                component={Interviews} 
            />
            {/* <Tab.Screen 
                name={'Learn'} 
                component={Learn}
            /> */}
            
            {/* <Tab.Screen 
                name={'Interviewer'} 
                component={Interviewer} 
            />
            <Tab.Screen 
                name={'SearchAgent'} 
                component={SearchAgent} 
            />

            <Tab.Screen 
                name={'Interviews'} 
                component={Interviews} 
            /> */}

            {/* <Tab.Screen 
                name={'Preferences'} 
                component={Preferences} 
            />
             */}
        </Tab.Navigator>
    )
}


export const HomeNavigator = () => {
    return (
        <Stack.Navigator
            headerMode='none'
            initialRouteName='Home'
            screenOptions={{ transitionSpec : transitionConfig }}
        >
             <Stack.Screen 
                name={'Home'} 
                component={Home}
            />
            {/* <Stack.Screen 
                name={'SearchJobs'} 
                component={SearchJobs}   
                // options={}  
            /> */}
        </Stack.Navigator>
    )
}




