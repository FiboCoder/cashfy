import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';
import TransactionComponent from "../components/TransactionComponent";
import { useNavigation } from "@react-navigation/native";

const Transactions = (props) =>{

    const navigation = useNavigation();

    const renderFlatList = () =>{

        let earning = props.transactionsList.filter(transaction=>{

            return transaction.type == "Earning";
        });

        let spendings = props.transactionsList.filter(transaction=>{

            return transaction.type == "Expense";
        });

        switch(props.pressedButton){

            case "Balance":
            return <FlatList
                        data={props.transactionsList}
                        renderItem={props.renderTransaction}
                        keyExtractor={item => props.transactionsList.indexOf(item)}
                    />

            case "Earnings":

            return <FlatList
                        data={earning}
                        renderItem={props.renderTransaction}
                        keyExtractor={item => props.transactionsList.indexOf(item)}
                    />

            case "Expenses":

            return <FlatList
                        data={spendings}
                        renderItem={props.renderTransaction}
                        keyExtractor={item => props.transactionsList.indexOf(item)}
                    />

            default:
            return <FlatList
                        data={props.transactionsList}
                        renderItem={props.renderTransaction}
                        keyExtractor={item => props.transactionsList.indexOf(item)}
                    />
        }

    }
    return(

        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="#8000AD" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Transações</Text>
            </View>

            <View style={styles.topButtonsContainer}>

                <TouchableOpacity onPress={()=>{props.setPressedButton("Earnings")}} style={props.pressedButton === "Earnings" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Earnings" ? styles.activeText : styles.inactiveText}>Ganhos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.setPressedButton("Balance")}} style={props.pressedButton === "Balance" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Balance" ? styles.activeText : styles.inactiveText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{props.setPressedButton("Expenses")}} style={props.pressedButton === "Expenses" ? styles.activeButton : styles.inactiveButton}>
                    <Text style={props.pressedButton === "Expenses" ? styles.activeText : styles.inactiveText}>Gastos</Text>
                </TouchableOpacity>
            </View>

            {

                
                renderFlatList()
            }

        </View>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
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
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        color: "#8000AD",
        marginRight: 24
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