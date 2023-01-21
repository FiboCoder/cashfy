import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserDataContext } from "../../App";
import TransactionComponent from "../../screens/components/TransactionComponent";
import Transactions from "../../screens/transactions/Transactions";
import { auth, db } from "../../utils/Firebase";
import { Format } from "../../utils/Format";
import { Transaction } from "../../utils/Transaction";

const TransactionsController = () =>{

    const userDataContext = useContext(UserDataContext);

    const [pressedButton, setPressedButton] = useState("Balance");

    const [transactionsList, setTransactionsList] = useState([]);
    const [dataToChart, setDataToChart] = useState([]);

    const [chartTime, setChartTime] = useState("Semana");
    const [transactionType, setTransactionType] = useState("Ganhos");

    const getChartData = () =>{

        if(transactionType == "Ganhos"){

            switch(chartTime){

                case "Semana":
                    Transaction.recoverTransactionToChart(userDataContext.email, "week").then(transactions=>{

                        let transactionsArray = [];
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                transactionsArray.push(transaction.data());
                            }
                        });

                        setTransactionsList(transactionsArray);
                    });
                    break;
    
                case "Mês":
                    Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                        let transactionsArray = [];
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                transactionsArray.push(transaction.data());
                            }
                        });

                        setTransactionsList(transactionsArray);
                    });
                    break;
    
                case "Ano":
                    Transaction.recoverTransactionToChart(userDataContext.email, "year").then(transactions=>{

                        let transactionsArray = [];
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                transactionsArray.push(transaction.data());
                            }

                        });

                        setTransactionsList(transactionsArray);
                    });
                    break;
            }
        }else if(transactionType == "Gastos"){

            switch(chartTime){

                case "Semana":
                    Transaction.recoverTransactionToChart(userDataContext.email, "week").then(transactions=>{

                        let transactionsArray = [];
                        let dataToChart = [
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0}
                        ];
                        let sumSu = 0;
                        let sumM = 0;
                        let sumTu = 0;
                        let sumW = 0;
                        let sumTh = 0;
                        let sumF = 0;
                        let sumSa = 0;
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Spending"){

                                if(Format.getDayOfTimestamp(transaction.data().date) == 0){

                                    sumSu = sumSu + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(0, 1);
                                    dataToChart.splice(0, 0, {x: "Dom", y: sumSu, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 1){

                                    sumM = sumM + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(1, 1);
                                    dataToChart.splice(1, 0,{x: "Seg", y: sumM, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 2){

                                    sumTu = sumTu + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(2, 1);
                                    dataToChart.splice(2, 0,{x: "Ter", y: sumTu, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 3){

                                    sumW = sumW + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(3, 1);
                                    dataToChart.splice(3, 0,{x: "Qua", y: sumW, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 4){

                                    sumTh = sumTh + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(4, 1);
                                    dataToChart.splice(4, 0,{x: "Qui", y: sumTh, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 5){

                                    sumF = sumF + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(5, 1);
                                    dataToChart.splice(5, 0,{x: "Sex", y: sumF, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 6){

                                    sumSa = sumSa + parseFloat(transaction.data().value).toFixed(2);
                                    dataToChart.splice(6, 1);
                                    dataToChart.splice(6, 0,{x: "Sab", y: sumSa, y0: 0});
                                }
                                transactionsArray.push(transaction.data());
                            }
                        });

                        setDataToChart(dataToChart);
                        setTransactionsList(transactionsArray);
                    });
                    break;
    
                case "Mês":
                    Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                        let transactionsArray = [];
                        let dataToChart = [
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0},
                            {x: 0, y: 0, y0: 0}
                        ];
                        let sumSu = 0;
                        let sumM = 0;
                        let sumTu = 0;
                        let sumW = 0;
                        let sumTh = 0;
                        let sumF = 0;
                        let sumSa = 0;
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Spending"){
                                if(Format.getDayOfTimestamp(transaction.data().date) == 0){

                                    sumSu = sumSu + parseFloat(transaction.data().value);
                                    dataToChart.splice(0, 1);
                                    dataToChart.splice(0, 0, {x: "Dom", y: sumSu, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 1){

                                    sumM = sumM + parseFloat(transaction.data().value);
                                    dataToChart.splice(1, 1);
                                    dataToChart.splice(1, 0,{x: "Seg", y: sumM, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 2){

                                    sumTu = sumTu + parseFloat(transaction.data().value);
                                    dataToChart.splice(2, 1);
                                    dataToChart.splice(2, 0,{x: "Ter", y: sumTu, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 3){

                                    sumW = sumW + parseFloat(transaction.data().value);
                                    dataToChart.splice(3, 1);
                                    dataToChart.splice(3, 0,{x: "Qua", y: sumW, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 4){

                                    sumTh = sumTh + parseFloat(transaction.data().value);
                                    dataToChart.splice(4, 1);
                                    dataToChart.splice(4, 0,{x: "Qui", y: sumTh, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 5){

                                    sumF = sumF + parseFloat(transaction.data().value);
                                    dataToChart.splice(5, 1);
                                    dataToChart.splice(5, 0,{x: "Sex", y: sumF, y0: 0});

                                }else if(Format.getDayOfTimestamp(transaction.data().date) == 6){

                                    sumSa = sumSa + parseFloat(transaction.data().value);
                                    dataToChart.splice(6, 1);
                                    dataToChart.splice(6, 0,{x: "Sab", y: sumSa, y0: 0});
                                }
                                transactionsArray.push(transaction.data());
                            }
                        });

                        setDataToChart(dataToChart);
                        setTransactionsList(transactionsArray);
                    });
                    break;
    
                case "Ano":
                    Transaction.recoverTransactionToChart(userDataContext.email, "year").then(transactions=>{

                        let transactionsArray = [];
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Spending"){

                                transactionsArray.push(transaction.data());
                            }

                        });

                        setTransactionsList(transactionsArray);
                    });
                    break;
            }
        }else{

                switch(chartTime){

                    case "Semana":
                        Transaction.recoverTransactionToChart(userDataContext.email, "week").then(transactions=>{
    
                            let transactionsArray = [];
                            transactions.forEach(transaction=>{
    
                                if(transaction.data().type == "Transfer"){
    
                                    transactionsArray.push(transaction.data());
                                }
                            });
    
                            setTransactionsList(transactionsArray);
                        });
                        break;
        
                    case "Mês":
                        Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{
    
                            let transactionsArray = [];
                            transactions.forEach(transaction=>{
    
                                if(transaction.data().type == "Transfer"){
    
                                    transactionsArray.push(transaction.data());
                                }
                            });
    
                            setTransactionsList(transactionsArray);
                        });
                        break;
        
                    case "Ano":
                        Transaction.recoverTransactionToChart(userDataContext.email, "year").then(transactions=>{
    
                            let transactionsArray = [];
                            transactions.forEach(transaction=>{
    
                                if(transaction.data().type == "Transfer"){
    
                                    transactionsArray.push(transaction.data());
                                }
    
                            });
    
                            setTransactionsList(transactionsArray);
                        });
                        break;
            }
        }
    }

    useEffect(()=>{

        getChartData();
    },[chartTime, transactionType]);

    const renderTransaction = ({item}) =>{

        return <TransactionComponent transaction={item} route={"Transactions"}></TransactionComponent>
    }

    return(

        <Transactions

            setPressedButton={setPressedButton}

            pressedButton={pressedButton}

            renderTransaction={renderTransaction}
            transactionsList={transactionsList}
            dataToChart={dataToChart}

            setChartTime={setChartTime}
            setTransactionType={setTransactionType}

            chartTime={chartTime}
            transactionType={transactionType}

            getChartData={getChartData}
        ></Transactions>
    );
}

export default TransactionsController;