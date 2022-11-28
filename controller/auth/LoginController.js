import React, { useState } from "react";
import { View } from "react-native";
import LoginScreen from "../../screens/auth/LoginScreen";
import { User } from "../../utils/User";

const LoginController = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const login = () =>{
        
        if(email != ""){

            if(password != ""){

                User.signIn(email, password).then(result=>{


                });
            }else{
    
                setErrorMessage("Preencha o campo Senha");
            }
        }else{

            setErrorMessage("Preencha o campo E-mail!");
        }

        
    }

    return(

        <LoginScreen

            setEmail={setEmail}
            setPassword={setPassword}

            email={email}
            password={password}

            errorMessage={errorMessage}

            login={login}
        />
    );
}

export default LoginController;