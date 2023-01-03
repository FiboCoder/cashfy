import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";


const Profile = () =>{

    const navigation = useNavigation();
    const route = useRoute();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>
                
                <Text style={styles.titleText}>Perfil</Text>
            </View>

            <View style={styles.userInfo}>

                {

                    route.params.userData.imageUrl
                        ?
                            <Image style={styles.imageProfileContainer} source={{uri: route.params.userData.imageUrl}}></Image>
                        :
                            <View style={styles.imageProfileContainer}>
                                <AntDesign style={styles.icon} name="user" size={44} color="#8000AD"/>
                            </View>
                }
                
                <Text style={styles.usernameText}>{route.params.userData.username}</Text>
            </View>

            <View style={styles.optionsContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("PersonalInfoStack")}} style={styles.optionButton}>

                    <View style={styles.subContainerOptionButton}>
                        <AntDesign style={styles.icon} name="user" size={24} color="#ff7E00"/>
                        <Text style={styles.personalInfoText}>Informações Pessoais</Text>
                    </View>
                    

                    <MaterialIcons name="arrow-forward-ios" size={22} color="#1D1D1D" />

                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>

                    <View style={styles.subContainerOptionButton}>
                        <Ionicons name="ios-image-outline" size={24} color="#ff7E00" />
                        <Text style={styles.personalInfoText}>Tema e Cores</Text>
                    </View>

                    <MaterialIcons name="arrow-forward-ios" size={22} color="#1D1D1D" />
                    
                </TouchableOpacity>


            </View>

            <TouchableOpacity style={styles.logoutButton}>

                <Ionicons style={styles.icon} name="exit-outline" size={24} color="#ff7E00" />
                <Text style={styles.personalInfoText}>Sair</Text>
                    
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
        backgroundColor: "#1D1D1D",
        paddingLeft: 24,
        paddingRight: 24
    },

    headerContainer:{

        alignItems: "center",
        paddingTop: Constants.statusBarHeight + 30,
        flexDirection: "row",
        marginBottom: 60,

    },

    titleText:{

        flex: 1,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        color: "white",
        marginRight: 24
    },

    userInfo:{

        flexDirection: "column",
        alignItems: "center",
        marginBottom: 50
    },

    imageProfileContainer:{

        width: 130,
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: "#EEEEEE",
        marginBottom: 30,
        elevation: 8
    },

    usernameText:{

        fontSize: 20,
        fontWeight: "700",
        color: "#1D1D1D"
    },

    optionsContainer:{

        flexDirection: "column"
    },

    optionButton:{

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 12,
        marginBottom: 20,
        elevation: 4
    },

    subContainerOptionButton:{

        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    personalInfoText:{

        marginLeft: 10,
        color: "#1D1D1D"
    },

    logoutButton:{

        position: "absolute",
        left: 0,
        bottom: 0,
        marginLeft: 24,
        marginBottom: 24,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 3
    }
});

export default Profile;