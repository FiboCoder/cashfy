import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const PersonalInfo = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="#8000AD" />
                </TouchableOpacity>

                <Text style={styles.titleText}>Informações Pessoais</Text>
            </View>

            <View style={styles.imageProfileContainer}>
                <AntDesign name="user" size={44} color="#8000AD"/>
            </View>

            <View style={styles.infoBoxContainer}>

                <AntDesign style={styles.icon} name="user" size={24} color="#8000AD"/>
                {

                    !props.usernameClicked
                        ?
                            <>
                                <Text style={styles.infoText}>Steave</Text>
                                <TouchableOpacity onPress={()=>{props.setUsernameClicked(true)}}>
                                    <MaterialCommunityIcons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                            </>
                        :
                            <>
                                <TextInput style={styles.textInput} placeholder="Nome de usuário" onChangeText={(val)=>{props.setText(val)}}></TextInput>
                                <TouchableOpacity onPress={()=>{props.updateUserData("Username")}}>
                                    <Feather name="check" size={24} color="black" />
                                </TouchableOpacity>
                            </>
                }
                

            </View>

            <View style={styles.infoBoxContainer}>

                <FontAwesome style={styles.icon} name="envelope-o" size={22} color="#8000AD" />
                <Text style={styles.infoText}>steave@steave.com</Text>

            </View>

            <View style={styles.infoBoxContainer}>

                <AntDesign style={styles.icon} name="lock" size={26} color="#8000AD"/>
                {

                    !props.passwordClicked
                        ?
                            <>
                                <Text style={styles.infoText}>**********</Text>
                                <TouchableOpacity onPress={()=>{props.setPasswordClicked(true)}}>
                                    <MaterialCommunityIcons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                            </>
                        :
                            <>
                                <TextInput style={styles.textInput} placeholder="Senha" onChangeText={(val)=>{props.setText(val)}}></TextInput>
                                <TouchableOpacity onPress={()=>{props.updateUserData("Password")}}>
                                    <Feather name="check" size={24} color="black" />
                                </TouchableOpacity>
                            </>
                }
                

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        alignItems: "center",
        paddingLeft: 24,
        paddingRight: 24,
    },

    headerContainer:{

        alignItems: "center",
        paddingTop: Constants.statusBarHeight + 30,
        flexDirection: "row",
        marginBottom: 60

    },

    titleText:{

        flex: 1,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        color: "#8000AD",
        marginRight: 24
    },

    imageProfileContainer:{

        width: 130,
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#e6e6e6",
        marginBottom: 30,
        elevation: 8
    },

    infoBoxContainer:{

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: "#F5D9FF",
        padding: 16,
        borderRadius: 30,
        marginBottom: 14
    },

    icon:{

        width: 26,
        height: 26,
        marginRight: 10
    },
    infoText:{

        flex: 1
    },
    textInput:{

        flex: 1
    }
});

export default PersonalInfo;