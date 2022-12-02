import { StyleSheet, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';

import { AntDesign } from '@expo/vector-icons';


const AddTransaction = () =>{

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <AntDesign name="close" size={34} color="white" />
                <Text style={styles.titleText}>Adicionar Transação</Text>
            </View>

            <TextInput keyboardType="number-pad" numberOfLines={1} style={styles.textInputHeader}>R$00,00</TextInput>

            <View style={styles.mainContainer}>

                <TextInput style={styles.textInput}>Nome da transação</TextInput>
                <TextInput style={styles.textInput}>Descrição</TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "red",
        paddingTop: Constants.statusBarHeight + 30
    },

    headerContainer:{

        marginLeft: 24,
        marginRight: 24,
        marginBottom: 80,
        flexDirection: "row",
        alignItems: "center"
    },

    titleText:{

        flex: 1,
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: "white"
    },

    textInputHeader:{

        marginBottom: 20,
        marginRight: 10,
        fontSize: 44,
        fontWeight: "700",
        textAlign: "right",
        color: "white"
    },

    mainContainer:{

        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 50,
        padding: 24
    },

    textInput:{

        marginBottom: 14,
        backgroundColor: "#FFD8D8",
        paddingTop: 10,
        paddingBottom: 10,
        padding: 18,
        borderRadius: 30
    }
})

export default AddTransaction;