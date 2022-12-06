import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const TransactionDetails = () =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.titleText}>Detalhes da Transação</Text>
            </View>

            <View style={styles.categoryIconContainer}>
                    <SimpleLineIcons name="handbag" size={28} color="#8000AD" />
            </View>

            <Text style={styles.transactionNameText}>Salário</Text>
            <Text style={styles.transactionCategoryText}>Categoria</Text>
            <Text style={styles.transactionValueText}>R$3.000,00</Text>
            <Text style={styles.transactionDescriptionText}>Salário Mulher Magnética</Text>
        </View>
    );
    
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#8000AD"
    },

    headerContainer:{

        alignItems: "center",
        paddingTop: Constants.statusBarHeight + 30,
        flexDirection: "row",
        marginBottom: 60,

    },

    titleText:{

        flex: 1,
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: "white"
    },

    categoryIconContainer:{

        width: 80,
        height: 80,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "white"
    },

    transactionNameText:{

        fontSize: 24,
        fontWeight: "700",
        color: "white"
    },

    transactionCategoryText:{

        marginBottom: 20,
        fontSize: 14,
        fontWeight: "500",
        color: "lightgray"
    },

    transactionValueText:{

        marginBottom: 16,
        fontSize: 30,
        fontWeight: "700",
        color: "white"
    },

    transactionDescriptionText:{

        fontSize: 14,
        fontWeight: "600",
        color: "lightgray"
    }
});

export default TransactionDetails;