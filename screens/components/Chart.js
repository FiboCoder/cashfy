import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { VictoryPie, VictoryContainer, VictoryLabel, VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Format } from "../../utils/Format";
import { Svg } from "react-native-svg";

const Chart = (props) =>{

    return(

            <View style={styles.chartContainer}>

                <View style={styles.timeChartContainer}>

                    <TouchableOpacity onPress={()=>{props.setChartTime("Semana"), props.fetchData("week")}}>
                        <Text style={props.chartTime == "Semana" ? styles.timeChartTextActive : styles.timeChartText}>Semana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setChartTime("Mês"), props.fetchData("month")}}>
                        <Text style={props.chartTime == "Mês" ? styles.timeChartTextActive : styles.timeChartText}>Mês</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{props.setChartTime("Ano"), props.fetchData("year")}}>
                        <Text style={props.chartTime == "Ano" ? styles.timeChartTextActive : styles.timeChartText}>Ano</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainContainer}>


                    <Svg width={Dimensions.get('window').width * 0.9} height={Dimensions.get('window').width * 0.9} style={{width: "100%", height: "auto"}}>

                        <VictoryPie

                            width={Dimensions.get('window').width * 0.9}
                            height={Dimensions.get('window').width * 0.9}

                            standalone={false}
                            data={props.transactionsList}

                            colorScale={["green", "red", "lightgray"]}

                            animate={{
                                duration: 500
                            }}
                            categories={{ x: ["earnings", "spendings", "transfers"] }}


                            innerRadius={56}
                            startAngle={0}


                            style={{
                                labels: {fill: "white"},
                                data: {
                                },
                            }}

                            labelRadius={({ innerRadius }) => (Dimensions.get('window').width * 0.4) / 2 }
                            labelComponent={<VictoryLabel lineHeight={2} angle={1}/>}

                        />

                        <VictoryLabel
                                textAnchor="middle"
                                style={{ fontSize: 20 }}
                                x={Dimensions.get('window').width * 0.45} y={Dimensions.get('window').width * 0.45}
                                text={props.totalSum != 0 ? props.totalSum : ""}
                                />
                    </Svg>
                    
                    

                    <View style={styles.legendsContainer}>

                        <View style={styles.legendContainer}>
                            <View style={[styles.squareColorContainer, {backgroundColor: "red"}]}>
                            </View>
                            <View style={styles.legendTextsContainer}>
                                <Text style={styles.legendTitleText}>Gastos</Text>
                                <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.spendingSum).toFixed(2))}</Text>
                            </View>
                            
                        </View>

                        <View style={styles.legendContainer}>
                            <View style={[styles.squareColorContainer, {backgroundColor: "green"}]}>
                            </View>
                            <View style={styles.legendTextsContainer}>
                                <Text style={styles.legendTitleText}>Ganhos</Text>
                                <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.earningSum).toFixed(2))}</Text>
                            </View>
                            
                        </View>

                        <View style={styles.legendContainer}>
                            <View style={[styles.squareColorContainer, {backgroundColor: "gray"}]}>
                            </View>
                            <View style={styles.legendTextsContainer}>
                                <Text style={styles.legendTitleText}>Transferências</Text>
                                <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.transferSum).toFixed(2))}</Text>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View> 
    );
}

const styles = StyleSheet.create({

    chartContainer:{

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    timeChartContainer:{

        zIndex: 2,
        alignSelf: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
    },

    timeChartText:{

        alignSelf: "stretch",
        width: 90,
        padding: 10,
        backgroundColor: "#E6E6E6",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#CBCBCB",
        textAlign: "center"
    },

    timeChartTextActive:{

        width: 90,
        padding: 10,
        backgroundColor: "white",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderBottomColor: "white",
        textAlign: "center",
        fontWeight: "700"

    },

    mainContainer:{

        marginTop: -2,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 0,
        borderRadius: 10,
        elevation: 4
    },

    titleText:{

        alignSelf: "stretch",
        fontSize: 22,
        fontWeight: "700",
        color: "#1D1F1D",
        marginBottom: 20,
        padding: 12,
    },

    chartTimeSelectContainer:{

        width: "26%",
        alignSelf: "flex-start",
        borderRadius: 6,
        backgroundColor: "#CBCBCB",
        elevation: 2,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },

    chartTimeSelectTriggerContainer:{

        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
    },

    chartTimeText:{

        fontSize: 16,
        fontWeight: "600"
    },

    legendsContainer:{

        alignSelf: "stretch",
        alignItems: "flex-start",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },

    legendContainer:{

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },

    subcircleColorContainer:{

        backgroundColor: "white",
        padding: 6,
        borderRadius: 50
    },
    squareColorContainer:{

        backgroundColor: "green",
        padding: 12,
        borderRadius: 4,
        marginRight: 14
    },

    legendTextsContainer:{

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    legendTitleText:{

        fontSize: 18,
        fontWeight: "400"
    },

    legendTitlePrice:{

        alignSelf: "stretch",
        fontSize: 16,
        fontWeight: "400"
    }
})

export default Chart;