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
            }
        });
    },[]);

    useEffect(()=>{

        if(userData.email){

            const transactionsQuery = query(
                collection(db, "users", userData.email, "transactions"), 
                orderBy("date", "asc"), 
                limit(10));
            getDocs(transactionsQuery).then(transactions=>{

                let transactionsListArray = [];


                if(!transactions.empty){

                    transactions.forEach(transaction=>{

                        console.log(transaction.data().date.toTime())

                        transactionsListArray(transaction.data());
                    });

                    setTransactionsList(transactionsListArray);
                }
            }).catch(err=>{

                setTransactionsList(transactionsList)
            });
        }else{

            onAuthStateChanged(auth, user=>{

                if(user){

                    const transactionsQuery = query(
                        collection(db, "users", user.email, "transactions"), 
                        orderBy("date", "asc"), 
                        limit(10));
                    getDocs(transactionsQuery).then(transactions=>{
        
                        let transactionsListArray = [];
        
                        if(!transactions.empty){
        
                            transactions.forEach(transaction=>{
        
                                transactionsListArray.push(transaction.data());
                            });

                            console.log("ARRAYYYYYYYYY " + transactionsListArray)
        
                            setTransactionsList(transactionsListArray);
                        }
                    }).catch(err=>{
        
                        setTransactionsList(transactionsList);
                    });
                }
            });
        }
    },[]);

    const renderTransaction = ({item}) =>{

        

        return <TransactionComponent transaction={item}></TransactionComponent>;
    }

    return(

        <Home

            setPressedButton={setPressedButton}
            setAddTransactionsOptionsOpen={setAddTransactionsOptionsOpen}
            addTransactionOption={addTransactionOption}

            pressedButton={pressedButton}
            addTransactionsOptionsOpen={addTransactionsOptionsOpen}

            userData={userData}

            transactionsList={transactionsList}
            renderTransaction={renderTransaction}
        ></Home>
    );
}

export default HomeController;