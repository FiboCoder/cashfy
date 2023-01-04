import { Image, StyleSheet, View } from "react-native";

const SplashScreen = () =>{

    return(

        <View style={styles.container}>

            <Image 
                width={"100%"} 
                height={"100%"}
                style={styles.logo} 
                source={require("../../assets/logo500x150.png")} 
                resizeMode={"contain"} 
                resizeMethod={"auto"}>
            </Image>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1D1D1D"
    },

    logo:{

        width: "70%",
    }
});

export default SplashScreen;