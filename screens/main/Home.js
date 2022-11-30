import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { LineChart } from "react-native-chart-kit";
import { RNSVGSvgAndroid } from "react-native-svg";


const Home = (props) =>{

    return(

        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>

            <View style={styles.cardContainer}>

                <View style={styles.topContainer}>

                    <Text style={styles.usernameText}>Nome do usuário</Text>
                    <TouchableOpacity style={styles.imageProfileContainer}>

                        <AntDesign style={styles.icon} name="user" size={24} color="#8000AD"/>
                    </TouchableOpacity>
                    
                </View>

                <View>
                    <Text style={styles.phraseText}>Visão geral da sua carteira</Text>
                    <Text style={styles.balanceTextCard}>R$10.029.267,89</Text>
                </View>
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

            <View style={styles.chartContainer}>

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
            </View>

            <View style={styles.transactionsContainer}>

                <View style={styles.transactionsTitleContainer}>
                    <Text style={styles.transactionsText}>Transactions</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: "white"
    },

    cardContainer:{

        flexDirection: "column",
        alignSelf: "stretch",
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 50,
        backgroundColor: "#8000AD",
        borderRadius: 24,
        padding: 20,
        elevation: 30,
    },

    topContainer:{

        marginBottom: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    usernameText:{

        fontSize: 18,
        fontWeight: "700",
        color: "white"
    },

    imageProfileContainer:{

        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEEEEE"
    },

    phraseText:{

        fontSize: 13,
        color: "white"
    },

    balanceTextCard:{

        fontSize: 24,
        fontWeight: "700",
        color: "white"
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

    chartContainer:{

        alignSelf: "stretch",
        marginBottom: 30,
    },

    transactionsContainer:{

        alignSelf: "stretch",
        marginLeft: 24,
        marginRight: 24,

    },

    transactionsTitleContainer:{

        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    transactionsText:{

        fontSize: 20,
        fontWeight: "700"
    },



});

export default Home;