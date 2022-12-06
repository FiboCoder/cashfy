import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Home from "../../screens/main/Home"

const HomeController = () =>{

    const [pressedButton, setPressedButton] = useState("Balance");
    const [addTransactionsOptionsOpen, setAddTransactionsOptionsOpen] = useState(false);

    const navigation = useNavigation();

    const addTransactionOption = (type) =>{

        setAddTransactionsOptionsOpen(false);

        switch(type){

            case "Earning":
                navigation.navigate("AddTransactionStack", {transactionType: type});
                break;

            case "Expense":
                navigation.navigate("AddTransactionStack", {transactionType: type});
                break;
        }
    }

    return(

        <Home

            setPressedButton={setPressedButton}
            setAddTransactionsOptionsOpen={setAddTransactionsOptionsOpen}
            addTransactionOption={addTransactionOption}

            pressedButton={pressedButton}
            addTransactionsOptionsOpen={addTransactionsOptionsOpen}
        ></Home>
    );
}

export default HomeController;