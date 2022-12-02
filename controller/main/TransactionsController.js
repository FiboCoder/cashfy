import { useState } from "react";
import Transactions from "../../screens/main/Transactions";

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