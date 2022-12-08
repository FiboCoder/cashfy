import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import { auth, db } from "../../utils/Firebase";
import { User } from "../../utils/User";
import { useNavigation } from "@react-navigation/native";

const RegisterController = () =>{

    const [image, setImage] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);

    const navigation = useNavigation();

    const getImageFromGallery = async () =>{

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true,
            aspect: [1,1]
          });
      
          console.log(image);
      
          if (!image.canceled) {

            setLoading(false);
            setShowImageSelectionModal(false);
            setImage(image.uri);
            console.log("data:image/jpg;base64,"+image.base64)
          }
    }

    const getImageFromCamera = async () =>{

        let image = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true,
            aspect: [1,1]
        });

        if(!image.canceled){

            setLoading(false);
            setShowImageSelectionModal(false);
            setImage(image.uri);
        }
    }

    const register = async () =>{

        setLoading(true);

        if(username != ""){

            if(email.toLowerCase() != ""){

                if(password != ""){

                    if(confirmPassword != ""){

                        if(password === confirmPassword){

                            if(password.length >= 6){

                                if(image != ""){

                                    setErrorMessage("");

                                    let response = await fetch(image);
                                    let blob = await response.blob();

                                    User.uploadImage(email.toLowerCase(), blob).then(result=>{

                                        console.log(result)

                                        User.addUser(result, username, email.toLowerCase(), password).then(result=>{

                                            setImage("");
                                            setUsername("");
                                            setEmail("");
                                            setPassword("");
                                            setConfirmPassword("");
                                            setLoading(false);
                                            navigation.navigate("LoginStack");
                                        }).catch(err=>{

                                            setLoading(false);
                                        })
                                    }).catch(err=>{

                                        setLoading(false);
                                    });
                                }else{

                                    setErrorMessage("");

                                    User.addUser("", username, email.toLowerCase(), password).then(result=>{

                                        setImage("");
                                        setUsername("");
                                        setEmail("");
                                        setPassword("");
                                        setConfirmPassword("");
                                        setLoading(false);
                                        navigation.navigate("LoginStack");
                                    });
                                }
                            }else{

                                setLoading(false);
                                setErrorMessage("A senha deve conter no mínimo 6 caractéres!");

                            }
                        }else{
                
                            setLoading(false);
                            setErrorMessage("As senhas digitadas não coincidem!");
                            
                        }
                    }else{
            
                        setLoading(false);
                        setErrorMessage("Preencha o campo Confirmar senha!");

                    }
                }else{
        
                    setLoading(false);
                    setErrorMessage("Preencha o campo Senha!");
                    
                }
            }else{
    
                setLoading(false);
                setErrorMessage("Preencha o campo E-mail!");
                
            }
        }else{

            setLoading(false);
            setErrorMessage("Preencha o campo Nome de usuário!");
        }
    }

    return(

        <RegisterScreen

            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}

            image={image}
            username={username}
            email={email.toLowerCase()}
            password={password}
            confirmPassword={confirmPassword}

            errorMessage={errorMessage}
            loading={loading}
        
            register={register}

            setShowImageSelectionModal={setShowImageSelectionModal}
            showImageSelectionModal={showImageSelectionModal}

            getImageFromGallery={getImageFromGallery}
            getImageFromCamera={getImageFromCamera}

        />
    );
}

export default RegisterController;