import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import AddTransaction from "../../screens/transactions/AddTransaction";

const AddTransactionController = (props) =>{

    

    const [transactionValue, setTransactionValue] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [transactionDate, setTransactionDate] = useState(new Date());

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

        let fValue = value.replace(/\D/g, "");
        fValue = fValue.replace(/(\d)(\d{2})$/, "$1,$2");
        fValue = fValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setTransactionValue(fValue);
    }

    return(

        <AddTransaction

            transactionTypeRoute={route.params.transactionType}

            setTransactionValue={setTransactionValue}
            setTransactionType={setTransactionType}
            setTransactionDate={setTransactionDate}

            transactionValue={transactionValue}
            transactionType={transactionType}
            transactionDate={transactionDate}

            data={data}
            showDatePicker={showDatePicker}
            formatToCurrency={formatToCurrency}

            
        ></AddTransaction>
    )
}

export default AddTransactionController;