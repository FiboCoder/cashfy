import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Constants from 'expo-constants';
import { useState } from "react";

import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Format } from "../../utils/Format";
import LoadingBar from "../components/LoadingBar";
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from "react-native-popup-menu";


const AddTransaction = (props) =>{


    const navigation = useNavigation();

    const getContainerStyle = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return styles.containerGreen;

            case "Spending":
                return styles.containerRed;

            case "Transfer":
                return styles.containerGray;
        }
    }

    const getBoxStyle = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return styles.boxStyleGreen;

            case "Spending":
                return styles.boxStyleRed;

            case "Transfer":
                return styles.boxStyleGray;
        }
    }

    const getDropdownStyle = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return styles.dropdownStyleGreen;

            case "Spending":
                return styles.dropdownStyleRed;

            case "Transfer":
                return styles.dropdownStyleGray;
        }
    }

    const getAddButtonStyle = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return styles.addButtonGreen;

            case "Spending":
                return styles.addButtonRed;

            case "Transfer":
                return styles.addButtonGray;
        }
    }

    const getDateButtonStyle = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return styles.dateButtonGreen;

            case "Spending":
                return styles.dateButtonRed;

            case "Transfer":
                return styles.dateButtonGray;
        }
    }

    const renderCategoryMenu = () =>{

        switch(props.transactionTypeRoute){

            case "Earning":
                return(
                    <>
                        <MenuOption onSelect={() => props.setTransactionCategory("Salário")} text='Salário'/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Adiantamento")} text="Adiantamento"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Renda extra")} text="Renda Extra"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Dividendos")} text="Dividendos"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Comissão")} text="Comissão"/>
                    </>
                );

            case "Spending":
                return(
                    <>
                        <MenuOption onSelect={() => props.setTransactionCategory("Contas básicas")} text='Contas básicas'/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Restaurante")} text="Restaurante"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Lazer")} text="Lazer"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Academia")} text="Academia"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Saúde")} text="Saúde"/>
                        <MenuOption onSelect={() => props.setTransactionCategory("Viajem")} text="Viajem"/>
                    </>
                );
        }
    }

    return(

        <View style={getContainerStyle()}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <AntDesign name="close" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Adicionar Transação</Text>
            </View>

            <TextInput

                style={styles.textInputHeader}
                keyboardType="number-pad"  
                numberOfLines={1}  
                onChangeText={(val)=>{props.formatToCurrency(val)}}
                placeholderTextColor="white" 
                placeholder="R$0,00" 
                value={ "R$"+Format.intToReal(props.transactionValue) }
                >
                
            </TextInput>

            <View style={styles.mainContainer}>

                <ScrollView style={{}} contentContainerStyle={{padding: 20, paddinTop: 0, paddingBottom: 0}}>
                    <MenuProvider>

                        <Text style={styles.fieldTitleText}>Título</Text>

                        <View style={ getBoxStyle() } >

                            <MaterialIcons name="title" size={24} color="#565656" />
                            <TextInput onChangeText={(val)=>{props.setTransactionName(val)}} style={styles.textInputMain} placeholder="Títuo">{props.transactionName}</TextInput>

                        </View>

                        <Text style={styles.fieldTitleText}>Descrição</Text>

                        <View style={ getBoxStyle() } >

                            <MaterialIcons name="subtitles" size={24} color="#565656" />
                            <TextInput onChangeText={(val)=>{props.setTransactionDescription(val)}} style={styles.textInputMain} placeholder="Descrição">{props.transactionDescription}</TextInput>

                        </View>


                        {

                            props.transactionTypeRoute == "Transfer"
                                ?
                                    null
                                :
                                    <>
                                        <Text style={styles.fieldTitleText}>Categoria</Text>

                                            <Menu >
                                                <MenuTrigger style={[getBoxStyle(), {paddingTop: 14, paddingBottom: 14}]} text={props.transactionCategory} />

                                                <MenuOptions>
                                                    {renderCategoryMenu()}
                                                </MenuOptions>
                                            </Menu>
                                    </>
                                
                        }

                        <Text style={styles.fieldTitleText}>Data</Text>

                        <TouchableWithoutFeedback onPress={props.showDatePicker} style={props.transactionTypeRoute == "Earning" ?  styles.textInputMain : styles.textInputMain}>
                            <View style={ getDateButtonStyle() }>
                                <AntDesign name="calendar" size={24} color="#565656" />
                                <Text style={styles.transactionDateText} placeholder="Data da transação">{props.transactionDate.toLocaleDateString()}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        {

                            props.transactionTypeRoute == "Transfer"
                                ?

                                    <>  
                                
                                        <Text style={styles.fieldTitleText}>Tipo da Transação</Text>
                                            <Menu>
                                                <MenuTrigger style={styles.categoryPopupMenu} text={props.transferType}/>

                                                <MenuOptions>
                                                    <MenuOption onSelect={()=>{props.setTransferType("Received")}} text="Recebida"/>
                                                    <MenuOption onSelect={()=>{props.setTransferType("Sended")}} text="Enviada"/>
                                                </MenuOptions>
                                            </Menu>
                                    </>
                                    
                                :
                                null
                        }

                        <Text style={styles.errorMessageText}>{props.errorMessage}</Text>
                    </MenuProvider>
                </ScrollView>
            </View>
            <TouchableOpacity 
                    onPress={()=>{props.saveTransaction()}} 
                    style={ getAddButtonStyle() }>
                        <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>

            {props.isLoading ? <LoadingBar/> : null}
        </View>
    );
}

const styles = StyleSheet.create({

    containerGreen: {

        flex: 1,
        backgroundColor: "green",
        paddingTop: Constants.statusBarHeight + 30
    },

    containerRed: {

        flex: 1,
        backgroundColor: "red",
        paddingTop: Constants.statusBarHeight + 30
    },

    containerGray:{

        flex: 1,
        backgroundColor: "gray",
        paddingTop: Constants.statusBarHeight + 30
    },

    headerContainer:{

        marginLeft: 24,
        marginRight: 24,
        marginBottom: 60,
        flexDirection: "row",
        alignItems: "center"
    },

    titleText:{

        flex: 1,
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
        color: "white"
    },

    textInputHeader:{

        marginBottom: 20,
        marginRight: 10,
        fontSize: 44,
        fontWeight: "700",
        textAlign: "right",
        color: "white"
    },

    mainContainer:{

        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "white",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        elevation: 20
    },

    mainContainerScrollView:{

        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "white",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingTop: 40,
        padding: 24,
        elevation: 20
    },

    fieldTitleText:{

        fontWeight: "700",
        fontSize: 18,
        marginBottom: 10
    },

    categoryPopupMenu:{

        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 14, 
        paddingBottom: 14, 
        paddingLeft: 12,
        borderWidth: 1, 
        borderColor: "gray", 
        borderRadius: 8,
    },

    textInputContainerGreen:{

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "green",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        padding: 18,
        borderRadius: 8,
    },

    textInputContainerRed:{

        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "red",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        padding: 18,
        borderRadius: 8,
    },

    textInputMain:{

        flex: 1,
        marginLeft: 10
    },

    dateButtonGreen:{

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "green",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        padding: 18,
        borderRadius: 8,

    },

    dateButtonRed:{

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "red",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        padding: 18,
        borderRadius: 8,

    },

    dateButtonGray:{

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "gray",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        padding: 18,
        borderRadius: 8,

    },

    transactionDateText:{

        marginLeft: 10
    },

    boxStyleGreen:{

        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 10, 
        paddingBottom: 10,
        paddingLeft: 12,
        borderWidth: 1, 
        borderColor: "green", 
        borderRadius: 8,

    },

    boxStyleRed:{

        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 10, 
        paddingBottom: 10,
        paddingLeft: 12,
        borderWidth: 1, 
        borderColor: "red", 
        borderRadius: 8,

    },

    boxStyleGray:{

        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 10, 
        paddingBottom: 10, 
        paddingLeft: 12,
        borderWidth: 1, 
        borderColor: "gray", 
        borderRadius: 8,

    },

    dropdownStyleGreen:{

        marginBottom: 14, 
        borderWith: 1, 
        borderColor: "green"

    },

    dropdownStyleRed:{

        marginBottom: 14, 
        borderWith: 1, 
        borderColor: "red"

    },

    dropdownStyleGray:{

        marginBottom: 14, 
        borderWith: 1, 
        borderColor: "gray"

    },

    inputStyle:{

    },

    errorMessageText:{

        fontSize: 16,
        textAlign: "center",
        color: "red"
    },

    addButtonGreen:{

        position: "absolute",
        bottom: 0 + 10,
        alignSelf: "center",
        padding: 30,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: "green",
        elevation: 4

    },

    addButtonRed:{

        position: "absolute",
        bottom: 0 + 10,
        alignSelf: "center",
        padding: 30,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: "red",
        elevation: 4

    },

    addButtonGray:{

        position: "absolute",
        bottom: 0 + 10,
        alignSelf: "center",
        padding: 30,
        borderRadius: 100,
        alignItems: "center",
        backgroundColor: "gray",
        elevation: 4

    },

    addButtonText:{

        fontSize: 20,
        fontWeight: "700",
        color: "white",
    }
})

export default AddTransaction;