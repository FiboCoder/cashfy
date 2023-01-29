import React from "react";
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";
import ChartController from "../../controller/components/ChartController";

const Home = (props) =>{

    console.log(props.spendingSum)

    const navigation = useNavigation();

    return(

        <>
            <View style={styles.container}>

                <ScrollView>

                    <View style={styles.topContainerMain}>

                        <View style={styles.welcomeContainer}>
                            <Text style={styles.fixedMessage}>Olá, </Text>
                            <Text style={styles.usernameText}>{props.userData.username}</Text>
                        </View>

                        <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack", {userData: props.userData})}} style={styles.imageProfileContainer}>
                            
                            {

                                props.userData.imageUrl != ""
                                ?
                                    <Image width={70} height={70} style={styles.imageProfile} resizeMode={"center"} source={{uri: props.userData.imageUrl}}></Image>
                                :
                                <AntDesign style={styles.icon} name="user" size={24} color="#1D1D1D"/>
                                
                            }
                            
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mainContainer}>

                        <ImageBackground
                            source={require("../../images/bg_3.png")} 
                            resizeMode={"cover"}
                            style={styles.cardImagebackground}
                            width={"100%"}
                            height={"100%"}
                            imageStyle={{borderRadius: 10}}>
                                

                            <View style={styles.topContainer}>

                                <Image
                                    width={100}
                                    height={100}
                                    style={styles.logo}
                                    source={require("../../assets/logo500x150.png")}
                                    resizeMode={"contain"}
                                    resizeMethod={"auto"}>
                                </Image>
                            </View>

                            <View style={styles.bottomContainer}>

                                <View>
                                    <Text style={styles.phraseText}>Visão geral da sua carteira</Text>
                                    <Text style={styles.balanceTextCard}>{"R$"+Format.intToReal(parseFloat(props.userData.balance).toFixed(2))}</Text>
                                </View>
                                
                                
                            </View>
                        </ImageBackground>

                        {

                            props.transactionsList
                                ?
                                    <ChartController
                                        userData={props.userData} 
                                        chartTime={props.chartTime} 
                                        setChartTime={props.setChartTime} 
                                        style={styles.ChartController}
                                        earningSum={props.earningSum}
                                        spendingSum={props.spendingSum}
                                        transferSum={props.transferSum}

                                        totalSum={props.totalSum}

                                        transactionsList={props.transactionsListChart}
                                    ></ChartController>
                                :
                                    null
                        }

                        

                        <View style={styles.transactionsContainer}>

                            <View style={styles.transactionsTitleContainer}>
                                <Text style={styles.transactionsText}>Transações</Text>

                                <TouchableOpacity onPress={()=>{navigation.navigate("TransactionsStack"), {}}}>

                                    <MaterialIcons name="arrow-forward-ios" size={24} color="#1D1D1D" />

                                </TouchableOpacity>
                            </View>

                            <View style={styles.transactionsListContainer}>
                                <FlatList 
                                    data={props.transactionsListLimited}
                                    renderItem={props.renderTransaction}
                                    keyExtractor={item => item.date}>
                                </FlatList>
                                </View>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
            <Pressable onPress={()=>{props.setAddTransactionsOptionsOpen(!props.addTransactionsOptionsOpen)}} style={ props.addTransactionsOptionsOpen ? styles.addTransactionButtonContainerActive : styles.addTransactionButtonContainer }>

                <>
                    {
                        props.addTransactionsOptionsOpen
                            ?
                                <View style={styles.transactionsOptionsContainer}>
                                    <TouchableOpacity onPress={()=>{props.addTransactionOption("Earning")}} style={styles.addBtnOptionsEarningContainer}>
                                        <Text style={styles.addBtnOptionsEarningText}>Ganho</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{props.addTransactionOption("Spending")}} style={styles.addBtnOptionsExpenseContainer}>
                                        <Text style={styles.addBtnOptionsExpenseText}>Gasto</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{props.addTransactionOption("Transfer")}} style={styles.addBtnOptionsTransferContainer}>
                                        <Text style={styles.addBtnOptionsTransferText}>Transferências</Text>
                                    </TouchableOpacity>
                                </View>
                            :
                                null
                    }
                    
                    <TouchableOpacity onPress={()=>{props.setAddTransactionsOptionsOpen(!props.addTransactionsOptionsOpen)}} style={styles.addTransactionButton}>
                        <Ionicons name="add" size={44} color="white" />
                    </TouchableOpacity>
                </>
            </Pressable>
        </>
            
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#1D1D1D",
    },

    topContainerMain:{

        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#1D1D1D",
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 4,
    },

    mainContainer:{

        flex: 1,
        width: "98%",
        alignSelf: "center",
        paddingTop: 50,
        backgroundColor: "#F8F8F8",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    cardImagebackground:{

        zIndex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        padding: 20,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 8,
        marginLeft: 20,
        marginRight: 20

    },

    topContainer:{

        marginBottom: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    welcomeContainer:{

        flexDirection: "row",
        alignItems: "center"
    },

    fixedMessage:{

        fontSize: 20,
        fontWeight: "700",
        color: "white"
    },

    usernameText:{

        fontSize: 24,
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

    imageProfile:{

        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
    },

    bottomContainer:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    phraseText:{

        fontSize: 14,
        color: "white"
    },

    balanceTextCard:{

        fontSize: 28,
        fontWeight: "900",
        color: "#FF7E00"
    },

    logo:{

        width: "44%",
        height: 44,
    },

    resumeOfTransactionsContainer:{

        alignSelf: "stretch",
        flexDirection: "row",
        margin: 20,
        marginTop: 0
    },

    resumeOfTransactionsContentContainer:{
        
        
        justifyContent: "space-between", 
        alignItems: "center",
    },

    resumeCardContainer:{

        width: 260,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        elevation: 6,
        margin: 10,
        paddingTop: 0,
        paddingBottom: 20,
        padding: 0
    },

    circleColorContainer:{

        padding: 16,
        borderRadius: 50,
        marginBottom: 10
    },

    subcircleColorContainer:{

        backgroundColor: "white",
        padding: 10,
        borderRadius: 50,
    },

    cardTitleText:{

        padding: 4,
        alignSelf: "stretch",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: "red",
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "700",
        textAlign: "center",
        color: "white"
    },

    cardPriceText:{
        
        fontSize: 24,
        fontWeight: "700",
        color: "#1D1D1D"
    },

    ChartController:{

    },

    transactionsContainer:{

        paddingTop: 20,
        flexDirection: "column",
        alignSelf: "stretch",
        margin: 20,
        marginBottom: 30

    },

    transactionsTitleContainer:{

        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
        padding: 12,
    },

    transactionsText:{

        fontSize: 22,
        fontWeight: "700",
        color: "#1D1D1D"
    },

    transactionsListContainer:{

        backgroundColor: "white",
        borderRadius: 10,
        elevation: 4,
        padding: 20
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

        marginBottom: 20

    },

    addBtnOptionsExpenseText:{

        fontSize: 20,
        fontWeight: "600",
        color: "red"
    },

    addBtnOptionsTransferContainer:{


    },

    addBtnOptionsTransferText:{

        fontSize: 20,
        fontWeight: "600",
        color: "gray"
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