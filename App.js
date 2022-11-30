import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterController from './controller/auth/RegisterController';
import LoginController from './controller/auth/LoginController';
import HomeController from './controller/main/HomeController';

const RegisterStack = () =>{

  return (
    <RegisterController></RegisterController>
  );
}

const LoginStack = () =>{

  return (
    <LoginController></LoginController>
  );
}

const HomeStack = () =>{

  return(

    <HomeController></HomeController>
  );
  
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeStack" screenOptions={{headerShown: false}}>
        <Stack.Screen name="RegisterStack" component={RegisterStack}/>
        <Stack.Screen name="LoginStack" component={LoginStack}/>
        <Stack.Screen name="HomeStack" component={HomeStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;