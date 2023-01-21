import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';
import TransactionComponent from "../components/TransactionComponent";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from "react-native-popup-menu";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const Transactions = (props) =>{

    console.log(props.dataToChart)

    const navigation = useNavigation();
    return(

        <MenuProvider>
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="#1D1D1D" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Transações</Text>
            </View>

            <View style={styles.chartContainer}>

                <View style={styles.chartTimeContainer}>

                    <Menu >
                        <MenuTrigger style={styles.chartTimeMenu} text={props.chartTime} />
                        <MenuOptions>
                            <MenuOption onSelect={() => props.setChartTime("Semana")} text='Semana'/>
                            <MenuOption onSelect={() => props.setChartTime("Mês")} text="Mês"/>
                            <MenuOption onSelect={() => props.setChartTime("Ano")} text="Ano"/>
                        </MenuOptions>
                    </Menu>

                    <Menu>
                        <MenuTrigger style={styles.chartTimeMenu} text={props.transactionType} />
                        <MenuOptions>
                            <MenuOption onSelect={() => props.setTransactionType("Ganhos")} text='Ganhos'/>
                            <MenuOption onSelect={() => props.setTransactionType("Gastos")} text="Gastos"/>
                            <MenuOption onSelect={() => props.setTransactionType("Transferências")} text="Transferências"/>
                        </MenuOptions>
                    </Menu>
                </View>

                <VictoryChart
                    width={Dimensions.get("window").width * 0.8}
                    height={Dimensions.get("window").width * 0.6 }
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 20 }}
                    >
                    <VictoryBar
                        barRatio={0.6}
                        style={{
                            
                        data: { fill: "#FF7E00" }
                        }}
                        data={props.dataToChart}
                    />
                </VictoryChart>
            </View>

            <ScrollView style={styles.listContainer}>

                <FlatList
                    data={props.transactionsList}
                    renderItem={props.renderTransaction}
                ></FlatList>

                
            </ScrollView>

        </View>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        backgroundColor: "#F8F8F8",
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
        color: "#1D1D1D"
    },

    chartContainer:{

        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 4,
        marginLeft: 24,
        marginRight: 24,
        padding: 10
    },

    chartTimeContainer:{

        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch"
    },

    chartTimeMenu:{

        padding: 12,
        paddingHorizontal: 40,
        borderRadius: 6,
        backgroundColor: "#E6E6E6"
    },

    listContainer:{

        backgroundColor: "white",
        borderColor: "#E6E6E6",
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 24,
        marginRight: 24,
        elevation: 4,
        padding: 10
    }
});

export default Transactions;