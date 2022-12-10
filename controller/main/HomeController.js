import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Home from "../../screens/main/Home"
import { auth, db } from "../../utils/Firebase";

const HomeController = () =>{

    const [pressedButton, setPressedButton] = useState("Balance");
    const [addTransactionsOptionsOpen, setAddTransactionsOptionsOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [transactionsList, setTransactionsList] = useState([]);
    const [total, setTotal] = useState(0);

    const navigation = useNavigation();

    const addTransactionOption = (type) =>{

        setAddTransactionsOptionsOpen(false);

        switch(type){

            case "Earning":
                navigation.navigate("AddTransactionStack", {transactionType: type, userData});
                break;

            case "Expense":
                navigation.navigate("AddTransactionStack", {transactionType: type, userData});
                break;
        }
    }

    useEffect(()=>{

        onAuthStateChanged(auth, user=>{

            if(user){

                getDoc(doc(db, "users", user.email)).then(userData=>{
                    
                    setUserData(userData.data());
                });

                const transactionsQuery = query(
                    collection(db, "users", user.email, "transactions"), 
                    orderBy("date", "desc"), 
                    limit(10));
                getDocs(transactionsQuery).then(transactions=>{
    
                    let transactionsListArray = [];
                    let sum = 0;

                    if(!transactions.empty){
    
                        transactions.forEach(transaction=>{
    
                            if(transaction.data().type === "Earning"){

                                sum = sum + parseFloat(transaction.data().value);
                                console.log(transaction.data().value)
                            }else{

                                sum = sum - parseFloat(transaction.data().value);
                            }
                            transactionsListArray.push(transaction.data());
                        });

                        setTotal(sum);
                        setTransactionsList(transactionsListArray);
                    }
                }).catch(err=>{
    
                    setTransactionsList(transactionsList);
                });
            }
        });
    },[]);

    const renderTransaction = ({item}) =>{

        

        return <TransactionComponent transaction={item} route={"Home"}></TransactionComponent>;
    }

    return(

        <Home

            setPressedButton={setPressedButton}
            setAddTransactionsOptionsOpen={setAddTransactionsOptionsOpen}
            addTransactionOption={addTransactionOption}

            pressedButton={pressedButton}
            addTransactionsOptionsOpen={addTransactionsOptionsOpen}
            total={total}

            userData={userData}

            transactionsList={transactionsList}
            renderTransaction={renderTransaction}
        ></Home>
    );
}

export default HomeController;