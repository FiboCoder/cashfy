import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";

const TransactionDetails = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{{props.route == "Transactions" ? navigation.navigate("TransactionsStack") : navigation.navigate("HomeStack")}}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.titleText}>Detalhes da Transação</Text>
            </View>

            <View style={styles.categoryIconContainer}>
                    <SimpleLineIcons name="handbag" size={28} color="#1D1D1D" />
            </View>

            <Text style={styles.transactionNameText}>{props.transaction.name}</Text>
            <Text style={styles.transactionCategoryText}>{props.transaction.category}</Text>
            <Text style={styles.transactionValueText}>{"R$" + Format.intToReal(props.transaction.value)}</Text>
            <Text style={styles.transactionDescriptionText}>{props.transaction.description}</Text>
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
        backgroundColor: "#1D1D1D"
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