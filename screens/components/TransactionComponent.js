import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";

const TransactionComponent = (props) =>{

    const navigation = useNavigation();

    return(

        <TouchableOpacity onPress={()=>{navigation.navigate("TransactionDetailsStack", {transaction: props.transaction, route: props.route})}} style={styles.container}>

            <View style={styles.subContainer}>

                <View style={props.transaction.type == "Earning" ? styles.iconContainerGreen : styles.iconContainerRed}>
                    <SimpleLineIcons name="handbag" size={20} color="white" />
                </View>

                <View style={styles.infoContainer}>

                    <Text numberOfLines={1} style={styles.titleText}>{props.transaction.name}</Text>
                    <Text numberOfLines={1} style={styles.descriptionText}>{props.transaction.description}</Text>
                </View>
            </View>
            

            <Text style={props.transaction.type == "Earning" ? styles.priceTextGreen : styles.priceTextRed}>{props.transaction.type == "Earning" ? "+ R$" : "- R$"}{props.transaction.value}</Text>
        </TouchableOpacity>
    );
}
    
const styles = StyleSheet.create({

    container:{

        margin: 2,
        marginBottom: 12,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6,
        flexDirection: "row",
        alignItems: "center",
        elevation: 3,
        backgroundColor: "white",
        borderRadius: 10
    },

    subContainer:{

        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainerGreen:{

        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        borderRadius: 50
    },

    iconContainerRed:{

        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        borderRadius: 50
    },

    infoContainer:{

        flex: 1,
        marginLeft: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden",
        
    },

    titleText:{

        fontSize: 16,
        fontWeight: "700"
    },

    descriptionText:{

    },

    priceTextGreen:{

        fontSize: 18,
        fontWeight: "700",
        color: "green"
    },

    priceTextRed:{

        fontSize: 18,
        fontWeight: "700",
        color: "red"
    }
});

export default TransactionComponent;