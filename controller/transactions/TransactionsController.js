import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Transactions from "../../screens/transactions/Transactions";
import { auth, db } from "../../utils/Firebase";

const TransactionsController = () =>{

    const [pressedButton, setPressedButton] = useState("Balance");

    const [transactionsList, setTransactionsList] = useState([]);

    useEffect(()=>{

        onAuthStateChanged(auth, user=>{

            if(user){

                const transactionsQuery = query(
                    collection(db, "users", user.email, "transactions"), 
                    orderBy("date", "desc"));

                getDocs(transactionsQuery).then(transactions=>{

                    let transactionsArray = [];

                    if(!transactions.empty){

                        transactions.forEach(transaction=>{

                            transactionsArray.push(transaction.data());
                        });
                    }
                    
                    setTransactionsList(transactionsArray);
                });
            }
        });
    },[]);

    const renderTransaction = ({item}) =>{

        return <TransactionComponent transaction={item} route={"Transactions"}></TransactionComponent>
    }

    return(

        <Transactions

            setPressedButton={setPressedButton}

            pressedButton={pressedButton}

            renderTransaction={renderTransaction}
            transactionsList={transactionsList}
        ></Transactions>
    );
}

export default TransactionsController;