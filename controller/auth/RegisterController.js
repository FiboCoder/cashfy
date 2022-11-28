import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import { auth, db } from "../../utils/Firebase";
import { User } from "../../utils/User";

const RegisterController = () =>{

    const [image, setImage] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);

    const getImageFromGallery = async () =>{

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true
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
            esif: true
        });

        if(!image.canceled){

            setLoading(false);
            setShowImageSelectionModal(false);
            setImage(image.uri);
        }
    }

    const register = async () =>{

        if(username != ""){

            if(email != ""){

                if(password != ""){

                    if(confirmPassword != ""){

                        if(password === confirmPassword){

                            if(password.length >= 6){

                                if(image != ""){

                                    let response = await fetch(image);
                                    let blob = await response.blob();

                                    User.uploadImage(email, blob).then(result=>{

                                        User.addUser(result, username, email, password).then(result=>{


                                        });
                                    });
                                }else{

                                    User.addUser("", username, email, password).then(result=>{


                                    });
                                }
                            }else{

                                setErrorMessage("A senha deve conter no mínimo 6 caractéres!");

                            }
                        }else{
                
                            setErrorMessage("As senhas digitadas não coincidem!");
                            
                        }
                    }else{
            
                        setErrorMessage("Preencha o campo Confirmar senha!");

                    }
                }else{
        
                    setErrorMessage("Preencha o campo Senha!");
                    
                }
            }else{
    
                setErrorMessage("Preencha o campo E-mail!");
                
            }
        }else{

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
            email={email}
            password={password}
            confirmPassword={confirmPassword}

            errorMessage={errorMessage}
        
            register={register}

            setShowImageSelectionModal={setShowImageSelectionModal}
            showImageSelectionModal={showImageSelectionModal}

            getImageFromGallery={getImageFromGallery}
            getImageFromCamera={getImageFromCamera}

        />
    );
}

export default RegisterController;