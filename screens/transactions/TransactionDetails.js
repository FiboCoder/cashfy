import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Format } from "../../utils/Format";

const TransactionDetails = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>

                <TouchableOpacity style={{padding: 10}} onPress={()=>{props.route == "Home" ? navigation.navigate("HomeStack") : navigation.navigate("TransactionsStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="#1D1D1D" />
                </TouchableOpacity>

                <Text style={styles.titleText}>Detalhes da Transação</Text>
            </View>

            <View style={styles.categoryIconContainer}>
                    <SimpleLineIcons name="handbag" size={28} color="white" />
            </View>

            <Text style={styles.transactionDateText}>{Format.timeStampToDate(props.transaction.date)}</Text>

            <Text style={styles.transactionNameText}>{props.transaction.name}</Text>
            <Text style={styles.transactionCategoryText}>{props.transaction.category}</Text>
            <Text style={styles.transactionValueText}>{props.transaction.type == "Earning" ? "+ R$" : "- R$"}{props.transaction.value}</Text>
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
        backgroundColor: "white"
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
        color: "#1D1D1D",
        marginRight: 24
    },

    categoryIconContainer:{

        width: 80,
        height: 80,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        backgroundColor: "#1D1D1D",
        elevation: 4
    },

    transactionNameText:{

        fontSize: 24,
        fontWeight: "700",
        color: "#1D1D1D"
    },

    transactionCategoryText:{

        marginBottom: 20,
        fontSize: 14,
        fontWeight: "500",
        color: "gray"
    },

    transactionValueText:{

        marginBottom: 16,
        fontSize: 30,
        fontWeight: "700",
        color: "#FF7E00"
    },

    transactionDateText:{

        marginBottom: 30,
        fontSize: 16,
        fontWeight: "600",
        color: "#1D1D1D"
    },

    transactionDescriptionText:{

        fontSize: 14,
        fontWeight: "600",
        color: "gray"
    }
});

export default TransactionDetails;