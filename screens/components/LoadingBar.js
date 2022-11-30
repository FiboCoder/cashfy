import { StyleSheet, View } from "react-native";
import LottieView from 'lottie-react-native';

const LoadingBar = () =>{

    return(

        <View style={styles.container}>

            <LottieView
            
            style={{width: 100, height: 100}}
                autoPlay
                source={require("../../assets/icons/loading.json")}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)"

    }
});

export default LoadingBar;