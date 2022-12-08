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
import PersonalInfoController from './controller/settings/PersonalInfoController';
import { useState } from 'react';
import { auth } from './utils/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

const PersonalInfoStack = () =>{

  return(

    <PersonalInfoController></PersonalInfoController>
  );
}

const Stack = createNativeStackNavigator();

const App = () =>{

  const [isAuth, setIsAuth] = useState(false);

  onAuthStateChanged(auth, user=>{

    if(user && user.uid){

      setIsAuth(true);
    }else{

      setIsAuth(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!isAuth ? "LoginStack" : "HomeStack"} screenOptions={{headerShown: false}}>

        {

          !isAuth
          ?
          <>
            <Stack.Screen name="RegisterStack" component={RegisterStack}/>
            <Stack.Screen name="LoginStack" component={LoginStack}/>
          </>
          :
          <>
            <Stack.Screen name="RegisterStack" component={RegisterStack}/>
          <Stack.Screen name="LoginStack" component={LoginStack}/>
          <Stack.Screen name="HomeStack" component={HomeStack}/>
          <Stack.Screen name="TransactionsStack" component={TransactionsStack}/>
          <Stack.Screen name="ProfileStack" component={ProfileStack}/>
          <Stack.Screen name="AddTransactionStack" component={AddTransactionStack}/>
          <Stack.Screen name="TransactionDetailsStack" component={TransactionDetails}/>
          <Stack.Screen name="PersonalInfoStack" component={PersonalInfoStack}/>
          </>
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;