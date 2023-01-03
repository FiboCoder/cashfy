import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Home from "../../screens/main/Home"
import { auth, db } from "../../utils/Firebase";
import { Transaction } from "../../utils/Transaction";

const HomeController = () =>{

    const [userData, setUserData] = useState([]);

    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [total, setTotal] = useState(0);

    const [pressedButton, setPressedButton] = useState("Balance");
    const [chartTime, setChartTime] = useState("month");
    
    const [transactionsList, setTransactionsList] = useState([]);
    const [transactionsListLimited, setTransactionsListLimited] = useState([]);

    const [addTransactionsOptionsOpen, setAddTransactionsOptionsOpen] = useState(false);

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
                    orderBy("date", "desc"));
                getDocs(transactionsQuery).then(transactions=>{
    
                    let transactionsListArray = [];

                    let earnings = 0;
                    let spendings = 0;
                    let sum = 0;

                    if(!transactions.empty){
    
                        transactions.forEach(transaction=>{
    
                            if(transaction.data().type === "Earning"){

                                earnings = earnings + parseFloat(transaction.data().value);
                                sum = sum + parseFloat(transaction.data().value);
                            }else{

                                spendings = spendings + parseFloat(transaction.data().value);
                                sum = sum - parseFloat(transaction.data().value);
                            }

                        });

                        for(let i = 0; i++; i<=10){

                            transactionsListArray.push(transactions[i].data())
                        }

                        setTotalEarnings(earnings);
                        setTotalSpendings(spendings);
                        setTotal(sum);
                        setTransactionsListLimited(transactionsListArray);
                    }
                }).catch(err=>{
    
                    setTransactionsList(transactionsList);
                });
            }
        });
    },[]);

    /*useEffect(()=>{

        Transaction.recoverTransactionsToChart(userData.email, chartTime, pressedButton).then(transactions=>{

            let transactionsArray = [];

            transactions.forEach(transaction=>{

                transactionsArray.push(transaction.data());
            });

            setTransactionsListToChart(transactionsArray);

        });


    },[chartTime]);*/

    const renderTransaction = ({item}) =>{

        

        return <TransactionComponent transaction={item} route={"Home"}></TransactionComponent>;
    }

    return(

        <Home

            setPressedButton={setPressedButton}
            setChartTime={setChartTime}
            setAddTransactionsOptionsOpen={setAddTransactionsOptionsOpen}
            addTransactionOption={addTransactionOption}

            pressedButton={pressedButton}
            chartTime={chartTime}
            addTransactionsOptionsOpen={addTransactionsOptionsOpen}

            totalEarnings={totalEarnings}
            totalSpendigns={totalSpendings}
            total={total}

            userData={userData}

            transactionsList={transactionsList}
            setTransactionsListLimited={setTransactionsListLimited}
            renderTransaction={renderTransaction}
        ></Home>
    );
}

export default HomeController;