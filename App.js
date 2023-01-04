import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterController from './controller/auth/RegisterController';
import LoginController from './controller/auth/LoginController';
import HomeController from './controller/main/HomeController';
import TransactionsController from './controller/transactions/TransactionsController';
import ProfileController from './controller/settings/ProfileController';
import AddTransactionController from './controller/transactions/AddTransactionController';
import TransactionDetailsController from './controller/transactions/TransactionDetailsController';
import { Text, View } from 'react-native';
import SplashScreen from './screens/main/SplashScreen';

const SplashStack = () =>{

  return(

    <SplashScreen></SplashScreen>
  );
}

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

const TransactionsStack = () =>{

  return(

    <TransactionsController></TransactionsController>
  );
}

const ProfileStack = () =>{

  return(
    
    <ProfileController></ProfileController>
  );
}

const AddTransactionStack = () =>{

  return(
    
    <AddTransactionController></AddTransactionController>
  );
}

const TransactionDetails = () =>{

  return(

    <TransactionDetailsController></TransactionDetailsController>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeStack" screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashStack" component={SplashStack}/>
        <Stack.Screen name="RegisterStack" component={RegisterStack}/>
        <Stack.Screen name="LoginStack" component={LoginStack}/>
        <Stack.Screen name="HomeStack" component={HomeStack}/>
        <Stack.Screen name="TransactionsStack" component={TransactionsStack}/>
        <Stack.Screen name="ProfileStack" component={ProfileStack}/>
        <Stack.Screen name="AddTransactionStack" component={AddTransactionStack}/>
        <Stack.Screen name="TransactionDetailsStack" component={TransactionDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;