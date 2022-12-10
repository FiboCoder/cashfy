import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Constants from 'expo-constants';
import { useState } from "react";

import LoadingBar from "../components/LoadingBar";

import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from "@react-navigation/native";
import { Format } from "../../utils/Format";


const AddTransaction = (props) =>{

    const navigation = useNavigation();

    return(

        <View style={props.transactionTypeRoute == "Earning" ? styles.containerGreen : styles.containerRed}>

            <View style={styles.headerContainer}>

                <TouchableOpacity onPress={()=>{navigation.navigate("HomeStack")}}>
                    <AntDesign name="close" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.titleText}>Adicionar Transação</Text>
            </View>

            <TextInput 

                keyboardType="number-pad"  
                numberOfLines={1} style={styles.textInputHeader} 
                onChangeText={(val)=>{props.formatToCurrency(val)}} 
                placeholder="R$0,00" value={ "R$"+Format.intToReal(props.transactionValue) }>

            </TextInput>

            <View style={styles.mainContainer}>

                <TextInput 
                    onChangeText={(val)=>{props.setTransactionName(val)}} 
                    style={props.transactionTypeRoute == "Earning" ?  styles.textInputGreen : styles.textInputRed} 
                    placeholder="Nome da transação"
                    value={props.transactionName}>
                </TextInput>
                <TextInput 
                    onChangeText={(val)=>{props.setTransactionDescription(val)}} 
                    style={props.transactionTypeRoute == "Earning" ?  styles.textInputGreen : styles.textInputRed} 
                    placeholder="Descrição" 
                    value={props.transactionDescription}>
                        
                </TextInput>
                <SelectList 

                    boxStyles={props.transactionTypeRoute == "Earning" ? styles.boxStyleGreen : styles.boxStyleRed} 
                    dropdownStyles={props.transactionTypeRoute == "Earning" ?  styles.dropdownStyleGreen : styles.dropdownStyleRed } 
                    inputStyles={styles.inputStyle} 
                    search={false} 
                    placeholder={"Selecionar Opção"} 
                    setSelected={(val)=>{props.setTransactionCategory(val)}} 
                    data={props.data} 
                    save="value">

                </SelectList>
                <TouchableWithoutFeedback onPress={props.showDatePicker} style={props.transactionTypeRoute == "Earning" ?  styles.textInputGreen : styles.textInputRed}>
                    <View style={props.transactionTypeRoute == "Earning" ?  styles.dateButtonGreen : styles.dateButtonRed}>
                        <Text placeholder="Data da transação">{props.transactionDate.toLocaleDateString()}</Text>
                        <AntDesign name="calendar" size={24} color="black" />
                    </View>
                </TouchableWithoutFeedback>

                { props.errorMessage ? <Text style={styles.errorMessageText}>{props.errorMessage}</Text> : null }

                <TouchableOpacity 
                    onPress={()=>{props.saveTransaction()}} 
                    style={props.transactionTypeRoute == "Earning" ? styles.addButtonGreen : styles.addButtonRed}>
                        <Text style={styles.addButtonText}>Adicionar Transação</Text>
                </TouchableOpacity>

            </View>

            { props.isLoading ? <LoadingBar/> : null}
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

    headerContainer:{

        marginLeft: 24,
        marginRight: 24,
        marginBottom: 80,
        flexDirection: "row",
        alignItems: "center"
    },

    titleText:{

        flex: 1,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        color: "white",
        marginRight: 30
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 50,
        padding: 24
    },

    textInputGreen:{

        marginBottom: 14,
        borderWidth: 1,
        borderColor: "green",
        paddingTop: 10,
        paddingBottom: 10,
        padding: 18,
        borderRadius: 30,

    },

    textInputRed:{

        marginBottom: 14,
        borderWidth: 1,
        borderColor: "red",
        paddingTop: 10,
        paddingBottom: 10,
        padding: 18,
        borderRadius: 30,

    },

    dateButtonGreen:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 60,
        borderWidth: 1,
        borderColor: "green",
        paddingTop: 12,
        paddingBottom: 12,
        padding: 18,
        borderRadius: 30,

    },

    dateButtonRed:{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 60,
        borderWidth: 1,
        borderColor: "red",
        paddingTop: 12,
        paddingBottom: 12,
        padding: 18,
        borderRadius: 30,

    },

    boxStyleGreen:{
        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 14, 
        paddingBottom: 14, 
        borderWith: 1, 
        borderColor: "green", 
        borderRadius: 30,

    },

    boxStyleRed:{
        flexDirection: "row",
        marginBottom: 14, 
        paddingTop: 14, 
        paddingBottom: 14, 
        borderWith: 1, 
        borderColor: "red", 
        borderRadius: 30,

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

    inputStyle:{

    },

    errorMessageText:{

        alignSelf: "stretch",
        textAlign: "center",
        color: "red"
    },  

    addButtonGreen:{

        padding: 16,
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "green",

    },

    addButtonRed:{

        padding: 16,
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "red",

    },

    addButtonText:{

        fontSize: 20,
        fontWeight: "700",
        color: "white",
    }
})

export default AddTransaction;