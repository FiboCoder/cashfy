import { StyleSheet, Text, View } from "react-native";
import { VictoryPie, VictoryContainer } from "victory-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Format } from "../../utils/Format";

const Chart = (props) =>{

    return(

            <View style={styles.chartContainer}>

                <Text style={[styles.titleText]}>Resumo de Transações</Text>
                <Menu style={styles.chartTimeSelectContainer}>

                    <MenuTrigger style={styles.chartTimeSelectTriggerContainer} text={props.chartTime} customStyles={{triggerText: {fontSize: 16, fontWeight:"600"}}}/>
                
                    <MenuOptions optionsContainerStyle={{marginTop: 40, padding: 10, elevation: 6, borderRadius: 8}}>
                        <MenuOption onSelect={() => props.fetchData("week")} text='Semana' />
                        <MenuOption onSelect={() => props.fetchData("month")} text='Mês' />
                        <MenuOption onSelect={() => props.fetchData("year")} text='Ano' />
                    </MenuOptions>
                </Menu>
                
                <VictoryPie

                    data={props.transactionsList}

                    colorScale={["green", "red", "lightgray"]}

                    animate={{
                        duration: 500
                    }}

                    categories={{ x: ["earnings", "spendings", "transfers"] }}

                    containerComponent={<VictoryContainer responsive={true}/>}

                    padding={90}
                    innerRadius={50}
                    padAngle={3}

                    style={{
                        data: {
                        },
                    }}
                    
                />

                <View style={styles.legendsContainer}>

                    <View style={styles.legendContainer}>
                        <View style={styles.circleColorContainerRed}>
                            <View style={styles.subcircleColorContainer}></View>
                        </View>
                        <View style={styles.legendTextsContainer}>
                            <Text style={styles.legendTitleText}>Gastos</Text>
                            <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.spendingSum).toFixed(2))}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.circleColorContainerGreen}>
                            <View style={styles.subcircleColorContainer}></View>
                        </View>
                        <View style={styles.legendTextsContainer}>
                            <Text style={styles.legendTitleText}>Ganhos</Text>
                            <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.earningSum).toFixed(2))}</Text>
                        </View>
                        
                    </View>

                    <View style={styles.legendContainer}>
                        <View style={styles.circleColorContainerLightGray}>
                            <View style={styles.subcircleColorContainer}></View>
                        </View>
                        <View style={styles.legendTextsContainer}>
                            <Text style={styles.legendTitleText}>Transferências</Text>
                            <Text style={styles.legendTitlePrice}>{"R$"+Format.intToReal(parseFloat(props.transferSum).toFixed(2))}</Text>
                        </View>
                        
                    </View>
                </View>
            </View> 
    );
}

const styles = StyleSheet.create({

    chartContainer:{

        paddingTop: 10,
        alignSelf: "stretch",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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

    circleColorContainerRed:{

        backgroundColor: "red",
        padding: 10,
        borderRadius: 50,
        marginRight: 14
    },

    circleColorContainerGreen:{

        backgroundColor: "green",
        padding: 10,
        borderRadius: 50,
        marginRight: 14
    },

    circleColorContainerLightGray:{

        backgroundColor: "lightgray",
        padding: 10,
        borderRadius: 50,
        marginRight: 14
    },

    legendTextsContainer:{

        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    legendTitleText:{

        fontSize: 18,
        fontWeight: "500"
    },

    legendTitlePrice:{

        alignSelf: "stretch",
        fontSize: 16,
        fontWeight: "600"
    }
})

export default Chart;