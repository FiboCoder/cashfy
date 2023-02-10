import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";

const TransactionComponent = (props) =>{

    const navigation = useNavigation();

    const getIconContainerStyle = () =>{

        switch(props.transaction.type){

            case "Earning":
                return styles.iconContainerGreen;

            case "Spending":
                return styles.iconContainerRed;

            case "Transfer":
                return styles.iconContainerGray;
        }
    }

    const getValuePrefixStyle = () =>{

        switch(props.transaction.type){

            case "Earning":
                return styles.valueTextGreen;

            case "Spending":
                return styles.valueTextRed;

            case "Transfer":
                return styles.valueTextGray;
        }
    }

    const getValuePrefix = () =>{

        switch(props.transaction.type){

            case "Earning":
                return "+ R$";

            case "Spending":
                return "- R$";

            case "Transfer":
                return "R$";
        }
    }

    return(

        <TouchableOpacity onPress={()=>{navigation.navigate("TransactionDetailsStack", {transaction: props.transaction, route: props.route})}} style={styles.container}>

            <View style={styles.subContainer}>

                <View style={ getIconContainerStyle() }>
                    <SimpleLineIcons name="handbag" size={20} color="white" />
                </View>

                <View style={styles.infoContainer}>

                    <Text numberOfLines={1} style={styles.titleText}>{props.transaction.name}</Text>
                    <Text numberOfLines={1} style={styles.descriptionText}>{props.transaction.description}</Text>
                </View>
            </View>
            

            <Text style={ getValuePrefixStyle() }>{ getValuePrefix() }{Format.intToReal(props.transaction.value)}</Text>
        </TouchableOpacity>
    );
}
    
const styles = StyleSheet.create({

    container:{

        margin: 2,
        marginBottom: 12,
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
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

    iconContainerGray:{

        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
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

    valueTextGreen:{

        fontSize: 18,
        fontWeight: "700",
        color: "green"
    },

    valueTextRed:{

        fontSize: 18,
        fontWeight: "700",
        color: "red"
    },

    valueTextGray:{

        fontSize: 18,
        fontWeight: "700",
        color: "gray"
    }
});

export default TransactionComponent;