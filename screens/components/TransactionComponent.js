import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';

const TransactionComponent = (props) =>{

    console.log(props.type)
    return(

        <TouchableOpacity style={styles.container}>

            <View style={styles.subContainer}>

                <View style={props.type == "green" ? styles.iconContainerGreen : styles.iconContainerRed}>
                    <SimpleLineIcons name="handbag" size={20} color="white" />
                </View>

                <View style={styles.infoContainer}>

                    <Text numberOfLines={1} style={styles.titleText}>Título da transação</Text>
                    <Text numberOfLines={1} style={styles.descriptionText}>Descrição da transação.</Text>
                </View>
            </View>
            

            <Text style={props.type == "green" ? styles.priceTextGreen : styles.priceTextRed}>+ R$100,59</Text>
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