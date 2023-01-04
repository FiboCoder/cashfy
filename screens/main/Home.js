import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { LineChart } from "react-native-chart-kit";
import TransactionComponent from "../components/TransactionComponent";
import { useNavigation } from "@react-navigation/native";


const Home = (props) =>{

    const navigation = useNavigation();

    return(

        <>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>

                <View style={styles.cardContainer}>

                    <View style={styles.topContainer}>

                        <View style={styles.welcomeContainer}>
                        <Text style={styles.fixedMessage}>Olá, </Text>
                        <Text style={styles.usernameText}>Steave</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack")}} style={styles.imageProfileContainer}>

                            <AntDesign style={styles.icon} name="user" size={24} color="#1D1D1D"/>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={styles.bottomContainer}>

                        <View>
                            <Text style={styles.phraseText}>Visão geral da sua carteira</Text>
                            <Text style={styles.balanceTextCard}>R$10.029.267,89</Text>
                        </View>
                        
                        <Image
                        
                            width={"100%"}
                            height={"100%"}
                            style={styles.logo}
                            source={require("../../assets/logo500x150.png")}
                            resizeMode={"contain"}
                            resizeMethod={"auto"}>
                        </Image>
                    </View>
                </View>

                {/*<View style={styles.topButtonsContainer}>

                    <TouchableOpacity onPress={()=>{props.setPressedButton("Earnings")}} style={props.pressedButton === "Earnings" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Earnings" ? styles.activeText : styles.inactiveText}>Ganhos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setPressedButton("Balance")}} style={props.pressedButton === "Balance" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Balance" ? styles.activeText : styles.inactiveText}>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setPressedButton("Spending")}} style={props.pressedButton === "Spending" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Spending" ? styles.activeText : styles.inactiveText}>Gastos</Text>
                    </TouchableOpacity>
                </View>*/}

                {/*<View style={styles.chartContainer}>

                <LineChart
                    data={{
                    labels: ["1", "5", "10", "15", "20", "25", "30"],
                    datasets: [
                        {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="R$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FFF",
                    fillShadowGradientFrom: "#8000AD",
                    fillShadowGradientTo: "#AF73C4",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `#8000AD`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#8000AD"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    }}
                />
                </View>*/}

                <View style={styles.resumeOfTransactionsContainer}>

                    <Text style={[styles.transactionsText, {marginBottom: 30}]}>Resumo de Transações</Text>

                    <View style={styles.resumeCardsContainer}>

                        <View style={styles.resumeCardContainer}>
                            <Text style={styles.cardTitleText}>Gastos</Text>
                            <Text style={styles.cardPriceText}>R$10.000</Text>
                        </View>

                        <View style={styles.resumeCardContainer}>
                            <Text style={styles.cardTitleText}>Ganhos</Text>
                            <Text style={styles.cardPriceText}>R$10.000</Text>
                        </View> 

                        <View style={styles.resumeCardContainer}>
                            <Text style={styles.cardTitleText}>Transferências</Text>
                            <Text style={styles.cardPriceText}>R$10.000</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.transactionsContainer}>

                    <View style={styles.transactionsTitleContainer}>
                        <Text style={styles.transactionsText}>Transações</Text>

                        <TouchableOpacity onPress={()=>{navigation.navigate("TransactionsStack")}}>

                            <MaterialIcons name="arrow-forward-ios" size={24} color="#1D1D1D" />

                        </TouchableOpacity>
                    </View>

                    <TransactionComponent type={"red"}/>
                    <TransactionComponent type={"green"}/>
                    <TransactionComponent type={"red"}/>
                    <TransactionComponent type={"green"}/>
                    <TransactionComponent type={"red"}/>
                    <TransactionComponent type={"green"}/>

                    
                </View>

                
            </ScrollView>

            <View onPress={()=>{props.setAddTransactionsOptionsOpen(!props.addTransactionsOptionsOpen)}} style={ props.addTransactionsOptionsOpen ? styles.addTransactionButtonContainerActive : styles.addTransactionButtonContainer }>

                {
                    props.addTransactionsOptionsOpen
                        ?
                            <View style={styles.transactionsOptionsContainer}>
                                <TouchableOpacity onPress={()=>{props.addTransactionOption("Earning")}} style={styles.addBtnOptionsEarningContainer}>
                                    <Text style={styles.addBtnOptionsEarningText}>+ Ganho</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{props.addTransactionOption("Expense")}}  style={styles.addBtnOptionsExpenseContainer}>
                                    <Text style={styles.addBtnOptionsExpenseText}>- Gasto</Text>
                                </TouchableOpacity>
                            </View>
                        :
                            null
                }
                
                <TouchableOpacity onPress={()=>{props.setAddTransactionsOptionsOpen(!props.addTransactionsOptionsOpen)}} style={styles.addTransactionButton}>
                    <Ionicons name="add" size={44} color="white" />
                </TouchableOpacity>
            </View>
            
        </>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: "#F2F2F2",
        paddingLeft: 20,
        paddingRight: 20
    },

    cardContainer:{

        flexDirection: "column",
        alignSelf: "stretch",
        marginBottom: 50,
        backgroundColor: "#1D1D1D",
        borderRadius: 14,
        padding: 20,
        elevation: 10,
    },

    topContainer:{

        marginBottom: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    welcomeContainer:{

        flexDirection: "row",
        alignItems: "center"
    },

    fixedMessage:{

        fontSize: 18,
        fontWeight: "700",
        color: "white"
    },

    usernameText:{

        fontSize: 22,
        fontWeight: "700",
        color: "#FF7E00"
    },

    imageProfileContainer:{

        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE"
    },

    bottomContainer:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    phraseText:{

        fontSize: 13,
        color: "white"
    },

    balanceTextCard:{

        fontSize: 24,
        fontWeight: "700",
        color: "#FF7E00"
    },

    logo:{

        width: "30%",
        height: 30,
    },

    resumeOfTransactionsContainer:{

        marginBottom: 50,
        alignSelf: "stretch",
        flexDirection: "column"
    },

    resumeCardsContainer:{

        flexDirection: "row",
        justifyContent: "space-between",

    },

    resumeCardContainer:{

        width: 114,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        paddingTop: 16,
        paddingBottom: 16
    },

    cardTitleText:{

        fontSize: 14,
        fontWeight: "700"
    },

    cardPriceText:{
        
        fontSize: 14,
        fontWeight: "700",
        color: "#FF7E00"
    },

    topButtonsContainer:{

        marginBottom: 30,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#565656",
        borderRadius: 8,
        padding: 6,
        paddingLeft: 30,
        paddingRight: 30,
        elevation: 4
    },

    inactiveButton:{

        backgroundColor: "#565656",
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 8,
    },
    activeButton:{

        backgroundColor: "#FF7E00",
        padding: 10,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 8,
        elevation: 6
    },

    inactiveText:{

        fontWeight: "700",
        fontSize: 18,
        color: "white"
    },
    activeText:{

        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },

    chartContainer:{

        alignSelf: "stretch",
        marginBottom: 30,
    },

    transactionsContainer:{

        marginBottom: 58,
        flexDirection: "column",
        alignSelf: "stretch",

    },

    transactionsTitleContainer:{

        marginBottom: 30,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    transactionsText:{

        fontSize: 22,
        fontWeight: "700",
        color: "#1D1D1D"
    },

    addTransactionButtonContainer:{

        zIndex: 1,
        position: "absolute",
        right: 0,
        bottom: 0,
        marginRight: 24,
        marginBottom: 24,
        flexDirection: "column",
        alignItems: "flex-end",
    },

    addTransactionButtonContainerActive:{

        zIndex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        paddingRight: 24,
        paddingBottom: 24,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },

    transactionsOptionsContainer:{

        marginBottom: 10,
        elevation: 4,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "white",
        
    },

    addBtnOptionsEarningContainer:{

        marginBottom: 20
    },

    addBtnOptionsEarningText:{

        fontSize: 20,
        fontWeight: "600",
        color: "green"
    },

    addBtnOptionsExpenseContainer:{


    },

    addBtnOptionsExpenseText:{

        fontSize: 20,
        fontWeight: "600",
        color: "red"
    },

    addTransactionButton:{

        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF7E00",
        elevation: 8
    }

});

export default Home;