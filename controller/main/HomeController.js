import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Home from "../../screens/main/Home"
import { auth, db } from "../../utils/Firebase";
import {UserDataContext} from "../../App";
import { Transaction } from "../../utils/Transaction";
import { Format } from "../../utils/Format";

const HomeController = (props) =>{

    const userDataContext = useContext(UserDataContext);

    const [userData, setUserData] = useState([]);

    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [total, setTotal] = useState(0);

    const [pressedButton, setPressedButton] = useState("Balance");
    const [chartTime, setChartTime] = useState("Semana");
    
    const [transactionsList, setTransactionsList] = useState([]);
    const [transactionsListLimited, setTransactionsListLimited] = useState([]);

    const [addTransactionsOptionsOpen, setAddTransactionsOptionsOpen] = useState(false);

    const [transactionsListChart, setTransactionsListChart] = useState([]);
    const [earningSum, setEarningSum] = useState(0);
    const [spendingSum, setSpendingSum] = useState(0);
    const [transferSum, setTransferSum] = useState(0);
    const [totalSum, setTotalSum] = useState(0);

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

    const fetchData = () =>{

        console.log("ENTROU")

        if(chartTime == "Semana"){

            console.log("ENTROU")

            Transaction.recoverTransactionToChart(userDataContext.email, "week").then(transactions=>{

                if(!transactions.empty){

                    let transactionArray = [];

                    let eSum = 0;
                    let sSum = 0;
                    let tSum = 0;

                    transactions.forEach(transaction=>{

                        if(transaction.data().type == "Earning"){

                            eSum = eSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else if(transaction.data().type == "Spending"){

                            sSum = sSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else{

                            tSum = tSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }
                    });

                    let totalSum = eSum + sSum + tSum;

                    let eSumPercent = parseFloat(((eSum*100)/totalSum).toFixed(2));
                    let sSumPercent = parseFloat(((sSum*100)/totalSum).toFixed(2));
                    let tSumPercent = parseFloat(((tSum*100)/totalSum).toFixed(2));

                    transactionArray = [
                        {x: eSumPercent+"%", y: eSumPercent},
                        {x: sSumPercent+"%", y: sSumPercent},
                        {x: tSumPercent+"%", y: tSumPercent}
                    ];

                    setEarningSum(eSum);
                    setSpendingSum(sSum);
                    setTransferSum(tSum);
                    setTotalSum(totalSum);

                    setTransactionsListChart(transactionArray);
                }
            });

        }else if(chartTime ==  "Mês"){

            Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                if(!transactions.empty){

                    let transactionArray = [];

                    let eSum = 0;
                    let sSum = 0;
                    let tSum = 0;

                    transactions.forEach(transaction=>{

                        if(transaction.data().type == "Earning"){

                            eSum = eSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else if(transaction.data().type == "Spending"){

                            sSum = sSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else{

                            
                            tSum = tSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }
                    });

                    let totalSum = eSum + sSum + tSum;

                    let eSumPercent = parseFloat(((eSum*100)/totalSum).toFixed(2));
                    let sSumPercent = parseFloat(((sSum*100)/totalSum).toFixed(2));
                    let tSumPercent = parseFloat(((tSum*100)/totalSum).toFixed(2));

                    transactionArray = [
                        {x: eSumPercent+"%", y: eSumPercent},
                        {x: sSumPercent+"%", y: sSumPercent},
                        {x: tSumPercent+"%", y: tSumPercent}
                    ];
                    
                    setEarningSum(eSum);
                    setSpendingSum(sSum);
                    setTransferSum(tSum);
                    setTotalSum(totalSum);

                    setTransactionsListChart(transactionArray);
                }
            });
                

        }else if(chartTime == "Ano"){
                
            Transaction.recoverTransactionToChart(userDataContext.email, "year").then(transactions=>{

                if(!transactions.empty){

                    let transactionArray = [];

                    let eSum = 0;
                    let sSum = 0;
                    let tSum = 0;

                    transactions.forEach(transaction=>{

                        if(transaction.data().type == "Earning"){

                            eSum = eSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else if(transaction.data().type == "Spending"){

                            sSum = sSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }else{

                            
                            tSum = tSum + parseFloat(Format.intToCurrency(transaction.data().value));
                        }
                    });

                    let totalSum = eSum + sSum + tSum;

                    let eSumPercent = parseFloat(((eSum*100)/totalSum).toFixed(2));
                    let sSumPercent = parseFloat(((sSum*100)/totalSum).toFixed(2));
                    let tSumPercent = parseFloat(((tSum*100)/totalSum).toFixed(2));

                    transactionArray = [
                        {x: eSumPercent+"%", y: eSumPercent},
                        {x: sSumPercent+"%", y: sSumPercent},
                        {x: tSumPercent+"%", y: tSumPercent}
                    ];

                    setEarningSum(eSum);
                    setSpendingSum(sSum);
                    setTransferSum(tSum);
                    setTotalSum(totalSum);

                    setTransactionsListChart(transactionArray);
                }
            });
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

    useEffect(()=>{

        fetchData();
    },[chartTime])

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

            earningSum={earningSum}
            spendingSum={spendingSum}
            transferSum={transferSum}

            totalSum={totalSum}

            transactionsListChart={transactionsListChart}
        ></Home>
    );
}

export default HomeController;