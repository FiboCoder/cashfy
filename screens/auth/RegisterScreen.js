import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ModalGetImage from "../components/ModalGetImage";

const RegisterScreen = (props) =>{

    const navigation = useNavigation();

    return(
        

        <View style={styles.container}>

            <View style={styles.subContainer}>

                <Text style={styles.title}>CASHFY</Text>

                <TouchableOpacity onPress={()=>{props.setShowImageSelectionModal(!props.showImageSelectionModal)}} style={styles.imageContainer}>
                    {
                        props.image != ""
                        ?
                            <Image style={styles.image} resizeMode="cover" source={{uri: props.image}}></Image>
                        :
                            
                            <AntDesign name="user" size={50} color="#8000AD" />
                            
                    }
                </TouchableOpacity>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="user" size={24} color="#8000AD"/>
                    <TextInput style={styles.textInput} onChangeText={(text)=>{props.setUsername(text)}} value={props.username} placeholder="Nome de usuário"></TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <FontAwesome style={styles.icon} name="envelope-o" size={22} color="#8000AD" />
                    <TextInput style={styles.textInput} onChangeText={(text)=>{props.setEmail(text)}} value={props.email} placeholder="E-mail"></TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="#8000AD"/>
                    <TextInput style={styles.textInput} onChangeText={(text)=>{props.setPassword(text)}} value={props.password} placeholder="Senha"></TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="#8000AD"/>
                    <TextInput style={styles.textInput} onChangeText={(text)=>{props.setConfirmPassword(text)}} value={props.confirmPassword} placeholder="Confirmar senha"></TextInput>

                </View>
                

                <View style={styles.registerButtonContainer}>
                    
                    {

                        props.errorMessage != ""
                            ?
                                <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                            :
                                null
                    }
                    
                    <TouchableOpacity onPress={()=>{props.register()}} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                

            </View>

            <Pressable onPress={()=>{navigation.navigate("LoginStack")}} style={styles.noAccountContainer}>
                <Text style={styles.noAccountText1}>Tem conta? </Text>    
                <Text style={styles.noAccountText2}>Acesse.</Text>    
            </Pressable>

            {
                props.showImageSelectionModal 
                    ? 
                        <ModalGetImage 
                            setImage={props.setImage} 
                            getImageFromGallery={props.getImageFromGallery} 
                            getImageFromCamera={props.getImageFromCamera} 
                            setShowImageSelectionModal={props.setShowImageSelectionModal}
                            showImageSelectionModal={props.showImageSelectionModal}
                        /> 
                    :   
                        null
            }
            
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#8000AD",
        paddingTop: Constants.statusBarHeight
        
    },

    subContainer:{

        alignItems: "center",
        width: "100%",
        marginTop: 30,
        
    
    },

    title:{

        fontWeight: "700",
        fontSize: 30,
        color: "white"
    },

    imageContainer:{

        width: 140,
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 100,
        marginTop: 40,
        marginBottom: 20
    },

    icon:{

        width: 26
    },

    image:{

        width: 140,
        height: 140,
        borderRadius: 100,
    },
    textInputContainer:{

        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#EEEEEE",
        borderRadius: 30,
        padding: 12,
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 12,
        paddingLeft: 12,
        paddingRight: 10
    },

    textInput:{

        flex: 1,
        alignSelf: "stretch",
        marginLeft: 10

    },

    registerButtonContainer:{

        width: "100%",
        flexDirection: 'column',
        alignItems: "center",
        marginTop: 40

    },

    errorMessage:{

        color: "white"
    },

    registerButton:{

        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        padding: 14,
        backgroundColor: "#EEEEEE",
        marginTop: 10,
        marginLeft: 12,
        marginRight: 12,
        elevation: 8
        
    },

    registerButtonText:{

        fontWeight: "700",
        fontSize: 24,
        color: "#8000AD"
    },

    noAccountContainer:{

        position: "absolute",
        bottom: 0,
        marginBottom: 10,
        flexDirection: "row"
    },

    noAccountText1:{

        fontSize: 16,
        color: "white"
    },

    noAccountText2:{

        fontSize: 16,
        fontWeight: "600",
        color: "white"
    }
})
export default RegisterScreen;