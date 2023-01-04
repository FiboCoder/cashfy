import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ModalGetImage from "../components/ModalGetImage";
import LoadingBar from "../components/LoadingBar";

const RegisterScreen = (props) =>{

    const navigation = useNavigation();

    return(
        

        <View style={styles.container}>

            <View style={styles.subContainer}>

                <Image 
                    width={"100%"} 
                    height={"100%"}
                    style={styles.logo} 
                    source={require("../../assets/logo500x150.png")} 
                    resizeMode={"contain"} 
                    resizeMethod={"auto"}>
                </Image>

                <Text style={styles.title}>CADASTRAR</Text>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="user" size={24} color="#F6F6F6"/>
                    <TextInput 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setUsername(text)}}
                        placeholder="Nome de usuário"
                        placeholderTextColor={"white"}>
                    </TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <FontAwesome style={styles.icon} name="envelope-o" size={22} color="#F6F6F6" />
                    <TextInput 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setEmail(text)}}
                        placeholder="E-mail"
                        placeholderTextColor={"white"}>
                    </TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="#F6F6F6"/>
                    <TextInput 
                        secureTextEntry={true} 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setPassword(text)}} 
                        value={props.password} 
                        placeholder="Senha"
                        placeholderTextColor={"white"}>
                    </TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="#F6F6F6"/>
                    <TextInput 
                        secureTextEntry={true} 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setConfirmPassword(text)}} 
                        value={props.confirmPassword} 
                        placeholder="Confirmar senha"
                        placeholderTextColor={"white"}>
                    </TextInput>

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
                
                <Pressable onPress={()=>{navigation.navigate("LoginStack")}} style={styles.haveAccountContainer}>
                    <Text style={styles.haveAccountText1}>Tem conta? </Text>    
                    <Text style={styles.haveAccountText2}>Acesse.</Text>    
                </Pressable>

            </View>

            

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

        { props.loading ? <LoadingBar/> : null}
            
        </View>
        
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#1D1D1D",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: Constants.statusBarHeight
        
    },

    subContainer:{

        flex: 1,
        alignItems: "center",
        width: "100%",
        marginTop: 30,
        
    
    },

    logo:{

        width: "70%",
        height: 90,
    },

    title:{

        fontWeight: "700",
        fontSize: 20,
        color: "white",
        marginBottom: 70
    },

    imageContainer:{

        width: 140,
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5D9FF",
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
        alignSelf: "stretch",
        justifyContent: "flex-start",
        backgroundColor: "#565656",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
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
        borderRadius: 8,
        padding: 14,
        backgroundColor: "#FF7E00",
        marginTop: 10,
        elevation: 8
        
    },

    registerButtonText:{

        fontWeight: "700",
        fontSize: 24,
        color: "white"
    },

    haveAccountContainer:{

        marginTop: 50,
        marginBottom: 10,
        flexDirection: "row"
    },

    haveAccountText1:{

        fontSize: 16,
        color: "white"
    },

    haveAccountText2:{

        fontSize: 16,
        fontWeight: "00",
        color: "#FF7E00"
    }
})
export default RegisterScreen;