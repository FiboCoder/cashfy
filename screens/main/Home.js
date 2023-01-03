import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { LineChart } from "react-native-chart-kit";
import TransactionComponent from "../components/TransactionComponent";
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";

const Home = (props) =>{

    const navigation = useNavigation();

    //const [data, setData] = useState([]);

    /*let data = [

        parseInt(props.transactionsListToChart[props.transactionsListToChart.length-1]),
        parseInt(props.transactionsListToChart[props.transactionsListToChart.length-2]),
        parseInt(props.transactionsListToChart[(props.transactionsListToChart.length -1) /2]),
        parseInt(props.transactionsListToChart[1]),
        parseInt(props.transactionsListToChart[0]),

    ]*/

    /*if(props.transactionsListToChart){

        if(props.pressedButton == "Earnings"){

            let arrayType = props.transactionsListToChart;
            arrayType = arrayType.filter(item=>{

                return item.type == "Earning";
            })

            if(arrayType > -1){

                data = [

                    parseFloat(arrayType[arrayType.length-1]),
                    parseFloat(arrayType[arrayType.length-2]),
                    parseFloat(arrayType[(arrayType.length -1) /2]),
                    parseFloat(arrayType[1]),
                    parseFloat(arrayType[0]),
            
                ]
            }
        }
    }*/

    return(

        <>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>

                <View style={styles.cardContainer}>

                    <View style={styles.topContainer}>

                        <Text style={styles.usernamePreText}>Olá, </Text>
                        <Text numberOfLines={1} style={styles.usernameText}>{props.userData.username}</Text>
                        {

                            props.userData.imageUrl
                                ?
                                    <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack", {userData: props.userData})}}>
                                        <Image style={styles.imageProfileContainer} source={{uri: props.userData.imageUrl}}></Image>
                                    </TouchableOpacity>
                                    
                                :
                                    <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack", {userData: props.userData})}} style={styles.imageProfileContainer}>
                                        <AntDesign style={styles.icon} name="user" size={24} color="#1D1D1D"/>
                                    </TouchableOpacity>
                        }
                        
                        
                    </View>

                    <View>
                        <Text style={styles.phraseText}>Visão geral da sua carteira</Text>
                        <Text style={styles.balanceTextCard}>{"R$ "+Format.intToReal(props.total.toFixed(2))}</Text>
                    </View>
                </View>


                <View style={styles.topButtonsContainer}>

                    <View style={styles.transactionsTitleContainer}>
                        <Text style={styles.transactionsText}>Resumo de Transações</Text>
                    </View>

                <View style={styles.topButtonsSubContainer}>

                    <View style={styles.topBox}>
                        <Text style={styles.topBoxTitle}>Ganhos</Text>
                        <Text style={styles.topBoxValue}>{"R$" + Format.intToReal(props.totalEarnings.toFixed(2))}</Text>
                    </View>

                    <View style={styles.topBox}>
                        <Text style={styles.topBoxTitle}>Gastos</Text>
                        <Text style={styles.topBoxValue}>{"R$" + Format.intToReal(props.totalSpendings.toFixed(2))}</Text>

                    </View>

                </View>

                <View style={styles.bottomButtonsContainer}>

                    <TouchableOpacity onPress={()=>{props.setChartTime("week")}}><Text style={props.chartTime == "week" ? styles.chartTimeTextActive : styles.chartTimeText}>Semana</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setChartTime("month")}}><Text style={props.chartTime == "month" ? styles.chartTimeTextActive : styles.chartTimeText}>Mês</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setChartTime("year")}}><Text style={props.chartTime == "year" ? styles.chartTimeTextActive : styles.chartTimeText}>Ano</Text></TouchableOpacity>
                </View>

                    {/*<TouchableOpacity onPress={()=>{props.setPressedButton("Earnings")}} style={props.pressedButton === "Earnings" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Earnings" ? styles.activeText : styles.inactiveText}>Ganhos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setPressedButton("Balance")}} style={props.pressedButton === "Balance" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Balance" ? styles.activeText : styles.inactiveText}>Receita</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setPressedButton("Spending")}} style={props.pressedButton === "Spending" ? styles.activeButton : styles.inactiveButton}>
                        <Text style={props.pressedButton === "Spending" ? styles.activeText : styles.inactiveText}>Gastos</Text>
                    </TouchableOpacity>*/}
                </View>

                <View style={styles.chartContainer}>

                {/*
                props.transactionsListToChart.length > -1
                    ?
                    
                        <LineChart
                            data={{
                            labels: ["1", "5", "10", "15", "20", "25", "30"],
                            datasets: [
                                {
                                    data: [

                                        parseInt(props.transactionsListToChart[props.transactionsListToChart.length-1]),
                                        parseInt(props.transactionsListToChart[props.transactionsListToChart.length-2]),
                                        parseInt(props.transactionsListToChart[(props.transactionsListToChart.length -1) /2]),
                                        parseInt(props.transactionsListToChart[1]),
                                        parseInt(props.transactionsListToChart[0]),
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
                            fillShadowGradientFrom: "#1D1D1D",
                            fillShadowGradientTo: "#CBCBCB",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1 ) => `#1D1D1D`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#1D1D1D"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            }}
                        />

                    :
                        null
                */}
                </View>

                <View style={styles.transactionsContainer}>

                    <View style={styles.transactionsTitleContainer}>
                        <Text style={styles.transactionsText}>Transações</Text>

                        <TouchableOpacity onPress={()=>{navigation.navigate("TransactionsStack")}}>

                            <MaterialIcons name="arrow-forward-ios" size={24} color="#1D1D1D" />

                        </TouchableOpacity>
                    </View>

                    <FlatList 
                        data={props.transactionsList} 
                        renderItem={props.renderTransaction} 
                        keyExtractor={item => props.setTransactionsListLimited.indexOf(item)}
                    />

                    
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
        backgroundColor: "white",
    },

    cardContainer:{

        flexDirection: "column",
        alignSelf: "stretch",
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 50,
        backgroundColor: "#1D1D1D",
        borderRadius: 24,
        padding: 20,
        elevation: 10,
    },

    topContainer:{

        marginBottom: 50,
        flexDirection: "row",
        alignItems: "center",
    },

    usernamePreText:{

        fontSize: 18,
        fontWeight: "500",
        color: "white"
    },

    usernameText:{

        flex: 1,
        fontSize: 18,
        fontWeight: "700",
        color: "#ff7E00",
        textAlign: "left",
        marginRight: 10
    },

    imageProfileContainer:{

        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        elevation: 4
    },

    phraseText:{

        fontSize: 13,
        color: "white"
    },

    balanceTextCard:{

        fontSize: 24,
        fontWeight: "700",
        color: "#ff7E00"
    },


    bottomContainer:{

        flexDirection: "column",
        alignItems: "flex-start"

    },

    topButtonsContainer:{

        marginLeft: 24,
        marginRight: 24,
        marginBottom: 30,
        alignSelf: "stretch",
        
    },

    topButtonsSubContainer:{

        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    topBox:{

        alignItems: "center",
        borderRadius: 14,
        padding: 30,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: "#282828",
        elevation: 4
    },

    topBoxTitle:{

        color: "white",
        marginBottom: 10
    },

    topBoxValue:{

        color: "#FF7E00",
        fontWeight: "700"
    },

    inactiveButton:{

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE",
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 20,
    },
    activeButton:{

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1D1D1D",
        padding: 12,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: 30,
        elevation: 6
    },

    inactiveText:{

        fontWeight: "700",
        fontSize: 18,
        color: "#1D1D1D"
    },
    activeText:{

        fontWeight: "700",
        fontSize: 20,
        color: "white"
    },

    chartContainer:{

        alignSelf: "stretch",
        marginBottom: 10,
    },

    bottomButtonsContainer:{

        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 20,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-around",
    },

    chartTimeText:{

        fontSize: 18,
        fontWeight: "500",
    },

    chartTimeTextActive:{

        fontSize: 18,
        fontWeight: "600",
        color: "#ff7E00"
    },

    transactionsContainer:{

        marginBottom: 58,
        flexDirection: "column",
        alignSelf: "stretch",
        marginLeft: 24,
        marginRight: 24,

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
        backgroundColor: "#ff7E00",
        elevation: 8
    }

});

export default Home;