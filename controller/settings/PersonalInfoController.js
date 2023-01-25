import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import PersonalInfo from "../../screens/settings/PersonalInfo";
import { User } from "../../utils/User";
import * as ImagePicker from 'expo-image-picker';

const PersonalInfoController = () =>{

    const route = useRoute();

    const [image, setImage] = useState("");
    const [showImageSelectionModal, setShowImageSelectionModal] = useState(false);

    const [usernameClicked, setUsernameClicked] = useState(false);
    const [passwordClicked, setPasswordClicked] = useState(false);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const getImageFromGallery = async () =>{

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            esif: true,
            aspect: [1,1]
          });
      
          if (!image.canceled) {

            setLoading(true);
            setShowImageSelectionModal(false);
            setImage(image.assets.uri);
            saveImage(image)
          }else{

            setLoading(false);
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

            setLoading(true);
            setShowImageSelectionModal(false);
            setImage(image.uri);
            saveImage(image)
        }else{

            setLoading(false);
        }
    }

    const saveImage = async (image) => {

        let response = await fetch(image.uri);
        let blob = await response.blob();
        User.uploadImage(route.params.userData.email, blob).then(imageRef=>{

            User.updateData(route.params.userData.email, imageRef, "imageUrl").then(result=>{

                setLoading(false);
            }).catch(err=>{

                setLoading(false);
            });
        }).catch(err=>{

            setLoading(false);
        });
    }

    const updateUserData = (field) =>{

        if(field === "Username"){

            setLoading(true);
            setUsernameClicked(false);
            User.updateData(route.params.userData.email, text, "username").then(result=>{

                setLoading(false);
            }).catch(err=>{

                
            });

        }else{

            setLoading(true);
            setPasswordClicked(false);
            User.updateData(route.params.userData.email, text, "password").then(result=>{

                setLoading(false);
            }).catch(err=>{

                
            });
        }
    }

    return(

        <PersonalInfo
                    
            setImage={setImage}
            setShowImageSelectionModal={setShowImageSelectionModal}
            setUsernameClicked={setUsernameClicked}
            setPasswordClicked={setPasswordClicked}
            setText={setText}

            showImageSelectionModal={showImageSelectionModal}

            usernameClicked={usernameClicked}
            passwordClicked={passwordClicked}
            text={text}

            loading={loading}

            getImageFromCamera={getImageFromCamera}
            getImageFromGallery={getImageFromGallery}

            updateUserData={updateUserData}

            userData={route.params.userData}
        ></PersonalInfo>
    );
}

export default PersonalInfoController;
