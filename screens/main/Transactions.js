import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';
import TransactionComponent from "../components/TransactionComponent";

const Transactions = (props) =>{

    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <MaterialIcons name="arrow-back-ios" size={24} color="#8000AD" />
                <Text style={styles.titleText}>Transações</Text>
            </View>

            <View style={styles.topButtonsContainer}>

                <TouchableOpacity onPress={()=>{props.setPressedButton("Earnings")}} style={props.pressedButton === "Earnings" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Earnings" ? styles.activeText : styles.inactiveText}>Ganhos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.setPressedButton("Balance")}} style={props.pressedButton === "Balance" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Balance" ? styles.activeText : styles.inactiveText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.setPressedButton("Spending")}} style={props.pressedButton === "Spending" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Spending" ? styles.activeText : styles.inactiveText}>Gastos</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.listContainer}>

                <TransactionComponent type={"red"}/>
                <TransactionComponent type={"green"}/>
                <TransactionComponent type={"red"}/>
                <TransactionComponent type={"green"}/>
                <TransactionComponent type={"red"}/>
                <TransactionComponent type={"green"}/>
                <TransactionComponent type={"red"}/>
                <TransactionComponent type={"green"}/>
            
                <TransactionComponent type={"red"}/>
                <TransactionComponent type={"green"}/>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "white",
        paddingTop: Constants.statusBarHeight + 30
    },

    headerContainer:{

        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        marginLeft: 24,
        marginRight: 24, 

    },

    titleText:{

        flex: 1,
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: "#8000AD"
    },

    topButtonsContainer:{

        marginLeft: 24,
        marginRight: 24,
        marginBottom: 30,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        borderRadius: 100,
        padding: 6,
        paddingLeft: 30,
        paddingRight: 30,
        elevation: 4
    },

    inactiveButton:{

        backgroundColor: "#EEEEEE",
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 20,
    },
    activeButton:{

        backgroundColor: "#8000AD",
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 30,
        elevation: 6
    },

    inactiveText:{

        fontWeight: "700",
        fontSize: 18,
        color: "#8000AD"
    },
    activeText:{

        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },

    listContainer:{

        marginLeft: 24,
        marginRight: 24,
    }
});

export default Transactions;