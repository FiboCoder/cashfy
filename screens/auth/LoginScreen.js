import React from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import LoadingBar from "../components/LoadingBar";

const LoginScreen = (props) =>{

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

                <Text style={styles.title}>ENTRAR</Text>

                <View style={styles.textInputContainer}>

                    <FontAwesome style={styles.icon} name="envelope-o" size={22} color="white" />
                    <TextInput 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setEmail(text)}}
                        placeholder="E-mail" 
                        placeholderTextColor={"#F6F6F6"}>

                    </TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="white"/>
                    <TextInput 
                        secureTextEntry={true} 
                        style={styles.textInput} 
                        onChangeText={(text)=>{props.setPassword(text)}}
                        placeholder="Senha"
                        placeholderTextColor={"#F6F6F6"}>
                    </TextInput>

                </View>
                

                <View style={styles.loginButtonContainer}>
                    
                    {

                        props.errorMessage != ""
                            ?
                                <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                            :
                                null
                    }
                    <TouchableOpacity onPress={()=>{props.login()}} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Acessar</Text>
                    </TouchableOpacity>
                </View>
                
                <Pressable onPress={()=>{navigation.navigate("RegisterStack")}} style={styles.noAccountContainer}>
                    <Text style={styles.noAccountText1}>Não tem conta? </Text>    
                    <Text style={styles.noAccountText2}>Cadastre-se.</Text>    
                </Pressable>
            </View>

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

    iconContainer:{

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 100,
        padding: 40,
        marginTop: 40,
        marginBottom: 20
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

    icon:{

        width: 26
    },

    textInput:{

        flex: 1,
        alignSelf: "stretch",
        marginLeft: 10,
        color: "white"

    },

    loginButtonContainer:{

        width: "100%",
        flexDirection: 'column',
        alignItems: "center",
        marginTop: 40

    },

    errorMessage:{

        color: "white"
    },

    loginButton:{

        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#FF7E00",
        marginTop: 10,
        elevation: 8
        
    },

    loginButtonText:{

        fontWeight: "700",
        fontSize: 24,
        color: "white"
    },

    noAccountContainer:{

        marginTop: 50,
        marginBottom: 10,
        flexDirection: "row"
    },

    noAccountText1:{

        fontSize: 16,
        color: "white"
    },

    noAccountText2:{

        fontSize: 16,
        fontWeight: "700",
        color: "#FF7E00"
    }
})
export default LoginScreen;