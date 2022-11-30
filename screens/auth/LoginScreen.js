import React from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

                <Text style={styles.title}>CASHFY</Text>

                <View style={styles.textInputContainer}>

                    <FontAwesome style={styles.icon} name="envelope-o" size={22} color="#8000AD" />
                    <TextInput style={styles.textInput} onChangeText={(text)=>{props.setEmail(text)}} value={props.email} placeholder="E-mail"></TextInput>

                </View>

                <View style={styles.textInputContainer}>

                    <AntDesign style={styles.icon} name="lock" size={26} color="#8000AD"/>
                    <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(text)=>{props.setPassword(text)}} value={props.password} placeholder="Senha"></TextInput>

                </View>
                

                <View style={styles.registerButtonContainer}>
                    
                    {

                        props.errorMessage != ""
                            ?
                                <Text style={styles.errorMessage}>{props.errorMessage}</Text>
                            :
                                null
                    }
                    <TouchableOpacity onPress={()=>{props.login()}} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Acessar</Text>
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
        backgroundColor: "#8000AD",
        paddingTop: Constants.statusBarHeight
        
    },

    subContainer:{

        flex: 1,
        alignItems: "center",
        width: "100%",
        marginTop: 30,
        
    
    },

    title:{

        fontWeight: "700",
        fontSize: 30,
        color: "white",
        marginBottom: 50
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
        justifyContent: "flex-start",
        backgroundColor: "#F5D9FF",
        borderRadius: 30,
        padding: 12,
        marginBottom: 12,
        marginLeft: 10,
        marginRight: 12,
        paddingLeft: 12,
        paddingRight: 10
    },

    icon:{

        width: 26
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
        fontWeight: "600",
        color: "white"
    }
})
export default LoginScreen;