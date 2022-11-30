import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "../../screens/auth/LoginScreen";
import { User } from "../../utils/User";
import { useNavigation } from "@react-navigation/native";

const LoginController = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const login = () =>{

        setLoading(true);
        
        if(email.toLowerCase() != ""){

            if(password != ""){

                User.signIn(email.toLowerCase(), password).then(result=>{

                    console.log(result)

                    setEmail("");
                    setPassword("");
                    setLoading(false);
                    navigation.navigate("HomeStack");
                }).catch(err=>{

                    setPassword("");
                    setLoading(false);
                })
            }else{
    
                setLoading(false);
                setErrorMessage("Preencha o campo Senha");
            }
        }else{

            setLoading(false);
            setErrorMessage("Preencha o campo E-mail!");
        }

        
    }

    return(

        <LoginScreen

            setEmail={setEmail}
            setPassword={setPassword}

            email={email.toLowerCase()}
            password={password}

            errorMessage={errorMessage}
            loading={loading}

            login={login}
        />
    );
}

export default LoginController;