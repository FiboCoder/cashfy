import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Home from "../../screens/main/Home"
import { auth, db } from "../../utils/Firebase";
import {UserDataContext} from "../../App";

const HomeController = (props) =>{

    const userDataContext = useContext(UserDataContext);

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
                navigation.navigate("AddTransactionStack", {transactionType: "Earning", userData});
                break;

            case "Spending":
                navigation.navigate("AddTransactionStack", {transactionType: "Spending", userData});
                break;
        }
    }

    useEffect(()=>{

        
        const userDataSnapshot = onSnapshot(doc(db, "users", userDataContext.email), (userData)=>{

            setUserData(userData.data());
        });

        const transactionsSnapshot = onSnapshot(
            collection(db, "users", userDataContext.email, "transactions"), 
            orderBy("date", "desc"), (transactions)=>{

                let transactionsListArray = [];

            let earnings = 0;
            let spendings = 0;
            let sum = 0;

            if(!transactions.empty){

                transactions.forEach(transaction=>{


                    transactionsListArray.push(transaction.data());

                    if(transaction.data().type === "Earning"){

                        earnings = earnings + parseFloat(transaction.data().value);
                        sum = sum + parseFloat(transaction.data().value);
                    }else{

                        spendings = spendings + parseFloat(transaction.data().value);
                        sum = sum - parseFloat(transaction.data().value);
                    }

                });

                let transactionsListArrayLimited = transactionsListArray.slice(0, 6);

                setTotalEarnings(earnings);
                setTotalSpendings(spendings);
                setTotal(sum);
                setTransactionsList(transactionsListArray);
                setTransactionsListLimited(transactionsListArrayLimited);

            }
            });

        return(()=>{

            userDataSnapshot();
            transactionsSnapshot();
        });
    },[]);

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

            transactionsListLimited={transactionsListLimited}
            renderTransaction={renderTransaction}
        ></Home>
    );
}

export default HomeController;