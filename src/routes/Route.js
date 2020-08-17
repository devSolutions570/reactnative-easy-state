import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import EditNutrition from '../pages/EditNutrition';

const Stack = createStackNavigator();

export default Route = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="EditNutrition"
                    component={EditNutrition}
                />
                <Stack.Screen
                    name="AddNutrition"
                    component={EditNutrition}
                />
            </Stack.Navigator>    
        </NavigationContainer>
    )
}