import React from "react";
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";
import { MenuProvider } from "react-native-popup-menu";
import ChartController from "../../controller/components/ChartController";

const Home = (props) =>{

    const navigation = useNavigation();

    return(

        <MenuProvider>

            <ScrollView style={styles.container} >

                <ImageBackground
                    source={require("../../images/bg_2.png")} 
                    resizeMode={"cover"}
                    style={styles.cardImagebackground}
                    width={"100%"}
                    height={"100%"}
                    imageStyle={{borderRadius: 10}}>
                        

                    <View style={styles.topContainer}>

                        <View style={styles.welcomeContainer}>
                        <Text style={styles.fixedMessage}>Olá, </Text>
                        <Text style={styles.usernameText}>{props.userData.username}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{navigation.navigate("ProfileStack")}} style={styles.imageProfileContainer}>
                            <AntDesign style={styles.icon} name="user" size={24} color="#1D1D1D"/>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={styles.bottomContainer}>

                        <View>
                            <Text style={styles.phraseText}>Visão geral da sua carteira</Text>
                            <Text style={styles.balanceTextCard}>{"R$"+Format.intToReal(parseFloat(props.userData.balance).toFixed(2))}</Text>
                        </View>
                        
                        <Image
                            width={100}
                            height={100}
                            style={styles.logo}
                            source={require("../../assets/logo500x150.png")}
                            resizeMode={"contain"}
                            resizeMethod={"auto"}>
                        </Image>
                    </View>
                </ImageBackground>

                <ChartController userData={props.userData} style={styles.ChartController}></ChartController>

                <View style={styles.transactionsContainer}>

                    <View style={styles.transactionsTitleContainer}>
                        <Text style={styles.transactionsText}>Transações</Text>

                        <TouchableOpacity onPress={()=>{navigation.navigate("TransactionsStack")}}>

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

                
            </ScrollView>

            <View onPress={()=>{props.setAddTransactionsOptionsOpen(!props.addTransactionsOptionsOpen)}} style={ props.addTransactionsOptionsOpen ? styles.addTransactionButtonContainerActive : styles.addTransactionButtonContainer }>

                {
                    props.addTransactionsOptionsOpen
                        ?
                            <View style={styles.transactionsOptionsContainer}>
                                <TouchableOpacity onPress={()=>{props.addTransactionOption("Earning")}} style={styles.addBtnOptionsEarningContainer}>
                                    <Text style={styles.addBtnOptionsEarningText}>+ Ganho</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{props.addTransactionOption("Spending")}}  style={styles.addBtnOptionsExpenseContainer}>
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
            
        </MenuProvider>
    );
}

const styles = StyleSheet.create({

    container:{

        flex: 1,
        flexDirection: "column",
        paddingTop: Constants.statusBarHeight + 30,
        backgroundColor: "#FF7E00",
    },

    cardImagebackground:{

        alignSelf: "stretch",
        flexDirection: "column",
        padding: 20,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        marginLeft: 20,
        marginRight: 20

    },

    topContainer:{

        marginBottom: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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

        alignSelf: "stretch",
        flexDirection: "column",
        marginLeft: 20,
        marginRight: 20,
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

    chart:{

        marginBottom: 30
    },

    transactionsContainer:{

        paddingTop: 20,
        marginBottom: 50,
        flexDirection: "column",
        alignSelf: "stretch",
        backgroundColor: "white"

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