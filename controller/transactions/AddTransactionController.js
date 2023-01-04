import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import AddTransaction from "../../screens/transactions/AddTransaction";
import { Format } from "../../utils/Format";
import { Transaction } from "../../utils/Transaction";

const AddTransactionController = (props) =>{

    

    const [transactionValue, setTransactionValue] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [transactionDescription, setTransactionDescription] = useState("");
    const [transactionCategory, setTransactionCategory] = useState("");
    const [transactionDate, setTransactionDate] = useState(new Date());

    const [isLoading, setIsLoading] =useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const route = useRoute();

    const data = [
        
        { key:"1", value:"Restaurante" },
        { key:"2", value:"Supermercado" },
        { key:"3", value:"Lazer" },
        { key:"4", value:"Contas básicas"}
    ];

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setTransactionDate(currentDate);
    };

    const showDatePicker = () =>{

        DateTimePickerAndroid.open({

            mode: "date",
            display: "calendar",
            value: transactionDate,
            locale: "pt-BR",
            positiveButton: {label: 'OK', textColor: 'green'},
            negativeButton: {label: 'Cancel', textColor: '#ff3000'},
            onChange
        })
    }

    const formatToCurrency = (value) => {

        setTransactionValue(value);

        console.log(Format.intToReal(value));
        console.log(Format.intToCurrency(value));
    }

    const saveTransaction = () =>{

        setIsLoading(true);

        if(transactionValue != ""){

            if(transactionName != ""){

                if(transactionDescription != ""){

                    if(transactionCategory != ""){

                        if(transactionDate != ""){

                            setErrorMessage("");

                            Transaction.saveTransaction(
                                route.params.userData.email,
                                route.params.transactionType, 
                                Format.intToCurrency(transactionValue), 
                                transactionName, 
                                transactionDescription, 
                                transactionCategory, 
                                transactionDate.getTime()
                            ).then(result=>{

                                setTransactionValue("");
                                setTransactionName("");
                                setTransactionDescription("");
                                setTransactionCategory("");
                                setTransactionDate(new Date());
                                setIsLoading(false);

                            });
                        }else{

                            setIsLoading(false);
                            setErrorMessage("Selecione a data da transação.");
                        }
                    }else{
            
                        setIsLoading(false);
                        setErrorMessage("Selecione a categoria da transação.");
                    }
                }else{
        
                    setIsLoading(false);
                    setErrorMessage("Digite uma descrição para a transação.");
                }
            }else{
    
                setIsLoading(false);
                setErrorMessage("Digite um nome para a transação.");
            }
        }else{

            setIsLoading(false);
            setErrorMessage("Digite o valor da transação.");
        }
    }

    return(

        <AddTransaction

            transactionTypeRoute={route.params.transactionType}

            setTransactionValue={setTransactionValue}
            setTransactionName={setTransactionName}
            setTransactionDescription={setTransactionDescription}
            setTransactionCategory={setTransactionCategory}
            setTransactionDate={setTransactionDate}

            transactionValue={transactionValue}
            transactionName={transactionName}
            transactionDescription={transactionDescription}
            transactionCategory={transactionCategory}
            transactionDate={transactionDate}

            isLoading={isLoading}
            errorMessage={errorMessage}

            data={data}
            showDatePicker={showDatePicker}
            formatToCurrency={formatToCurrency}

            saveTransaction={saveTransaction}

            
        ></AddTransaction>
    )
}

export default AddTransactionController;