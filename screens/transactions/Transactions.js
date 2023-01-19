import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';

import { MaterialIcons } from '@expo/vector-icons';
import TransactionComponent from "../components/TransactionComponent";
import { useNavigation } from "@react-navigation/native";
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from "react-native-popup-menu";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const Transactions = (props) =>{

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
                        <MenuTrigger style={styles.chartTimeMenu} text='Semana' />
                        <MenuOptions>
                            <MenuOption  onSelect={() => alert(`Week`)} text='Semana'/>
                            <MenuOption onSelect={() => alert(`month`)} text="Mês"/>
                            <MenuOption onSelect={() => alert(`year`)} text="Ano"/>
                        </MenuOptions>
                    </Menu>

                    <Menu>
                        <MenuTrigger style={styles.chartTimeMenu} text='Ganhos' />
                        <MenuOptions>
                            <MenuOption onSelect={() => alert(`Earnings`)} text='Ganhos'/>
                            <MenuOption onSelect={() => alert(`Spendings`)} text="Gastos"/>
                            <MenuOption onSelect={() => alert(`Transfers`)} text="Transferências"/>
                        </MenuOptions>
                    </Menu>
                </View>

                <VictoryChart
                    width={Dimensions.get("window").width * 0.94}
                    height={Dimensions.get("window").width * 0.6 }
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 16 }}
                    >
                    <VictoryBar
                        barRatio={0.8}
                        style={{
                            
                        data: { fill: "#FF7E00" }
                        }}
                        data={[
                            { x: 1, y: 2, y0: 0 },
                            { x: 2, y: 3, y0: 0 },
                            { x: 3, y: 5, y0: 0 },
                            { x: 4, y: 4, y0: 0 },
                            { x: 5, y: 1, y0: 0 },
                            { x: 6, y: 2, y0: 0 },
                            { x: 7, y: 5, y0: 0 },
                          ]}
                    />
                </VictoryChart>
            </View>

            <ScrollView style={styles.listContainer}>

                <Text>Olá</Text>

                
            </ScrollView>

        </View>
        </MenuProvider>
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

        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        backgroundColor: "#E6E6E6"
    },

    listContainer:{

        borderColor: "#E6E6E6",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        marginLeft: 24,
        marginRight: 24,
    }
});

export default Transactions;