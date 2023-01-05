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
import { LogBox, Text, View } from 'react-native';
import SplashScreen from './screens/main/SplashScreen';
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext();

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

  const { signIn } = React.useContext(AuthContext);

  return (
    <LoginController signIn={signIn}></LoginController>
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

  LogBox.ignoreAllLogs();

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if(action.token){

            SecureStore.setItemAsync('userToken', action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          SecureStore.deleteItemAsync('userToken');
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data });
      },
    }),
    []
  );

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>

          {
            state.isLoading == true
              ?
                <Stack.Screen name="SplashStack" component={SplashStack}/>
              :
                <>
                  {state.userToken == null 
                    ?
                      <>
                        <Stack.Screen name="LoginStack" component={LoginStack}/>
                        <Stack.Screen name="RegisterStack" component={RegisterStack}/>
                      </>
                    :
                      <>
                        <Stack.Screen name="HomeStack" component={HomeStack}/>
                        <Stack.Screen name="TransactionsStack" component={TransactionsStack}/>
                        <Stack.Screen name="ProfileStack" component={ProfileStack}/>
                        <Stack.Screen name="AddTransactionStack" component={AddTransactionStack}/>
                        <Stack.Screen name="TransactionDetailsStack" component={TransactionDetails}/>
                      </>
                  }
                </>
          }
        
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;