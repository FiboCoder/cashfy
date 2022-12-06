import { useState } from "react";
import Transactions from "../../screens/transactions/Transactions";

const TransactionsController = () =>{

    const [pressedButton, setPressedButton] = useState("Balance");

    return(

        <Transactions

            setPressedButton={setPressedButton}

            pressedButton={pressedButton}
        ></Transactions>
    );
}

export default TransactionsController;