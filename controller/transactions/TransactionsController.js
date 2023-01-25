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

                        let dataToChart = [
                            {x: "Dom", y: 0, y0: 0},
                            {x: "Seg", y: 0, y0: 0},
                            {x: "Ter", y: 0, y0: 0},
                            {x: "Qua", y: 0, y0: 0},
                            {x: "Qui", y: 0, y0: 0},
                            {x: "Sex", y: 0, y0: 0},
                            {x: "Sáb", y: 0, y0: 0}
                        ];
                        let sumSu = 0;
                        let sumM = 0;
                        let sumTu = 0;
                        let sumW = 0;
                        let sumTh = 0;
                        let sumF = 0;
                        let sumSa = 0;
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                if(Format.getDayOfTimestamp(transaction.data().date) == 0){

                                    sumSu = sumSu + parseFloat(transaction.data().value.toFixed(2));
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
    
                case "Mês":
                    Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                        let transactionsArray = [];
                        let dataToChart = [

                            {x: "Sem 1", y: 0, y0: 0},
                            {x: "Sem 2", y: 0, y0: 0},
                            {x: "Sem 3", y: 0, y0: 0},
                            {x: "Sem 4", y: 0, y0: 0},
                            {x: "Sem 5", y: 0, y0: 0},
                        ]

                        let sumWeek1 = 0;
                        let sumWeek2 = 0;
                        let sumWeek3 = 0;
                        let sumWeek4 = 0;
                        let sumWeek5 = 0;

                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                if(Format.findWeek(transaction.data().date) == 1){

                                    sumWeek1 = sumWeek1 + parseFloat(transaction.data().value);
                                    dataToChart.splice(0, 1);
                                    dataToChart.splice(0, 0, {x : "Sem 1", y: sumWeek1, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 2){

                                    sumWeek2 = sumWeek2 + parseFloat(transaction.data().value);
                                    dataToChart.splice(1, 1);
                                    dataToChart.splice(1, 0, {x : "Sem 2", y: sumWeek2, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 3){

                                    sumWeek3 = sumWeek3 + parseFloat(transaction.data().value);
                                    dataToChart.splice(2, 1);
                                    dataToChart.splice(2, 0, {x : "Sem 3", y: sumWeek3, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 4){

                                    sumWeek4 = sumWeek4 + parseFloat(transaction.data().value);
                                    dataToChart.splice(3, 1);
                                    dataToChart.splice(3, 0, {x : "Sem 4", y: sumWeek4, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 5){

                                    sumWeek5 = sumWeek5 + parseFloat(transaction.data().value);
                                    dataToChart.splice(4, 1);
                                    dataToChart.splice(4, 0, {x : "Sem 5", y: sumWeek5, y0: 0});
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

                        let dataToChart = [
                            {x: "Ja", y: 0, y0: 0},
                            {x: "Fe", y: 0, y0: 0},
                            {x: "Ma", y: 0, y0: 0},
                            {x: "Ab", y: 0, y0: 0},
                            {x: "Mo", y: 0, y0: 0},
                            {x: "Ju", y: 0, y0: 0},
                            {x: "Jl", y: 0, y0: 0},
                            {x: "Ag", y: 0, y0: 0},
                            {x: "St", y: 0, y0: 0},
                            {x: "Ou", y: 0, y0: 0},
                            {x: "No", y: 0, y0: 0},
                            {x: "De", y: 0, y0: 0},
                        ];
                        let sumMonth1 = 0;
                        let sumMonth2 = 0;
                        let sumMonth3 = 0;
                        let sumMonth4 = 0;
                        let sumMonth5 = 0;
                        let sumMonth6 = 0;
                        let sumMonth7 = 0;
                        let sumMonth8 = 0;
                        let sumMonth9 = 0;
                        let sumMonth10 = 0;
                        let sumMonth11 = 0;
                        let sumMonth12 = 0;


                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Earning"){

                                let converted = new Date(transaction.data().date);

                                switch(converted.getMonth() + 1){

                                    case 1:
                                        sumMonth1 = sumMonth1 + parseFloat(transaction.data().value);
                                        dataToChart.splice(0, 1);
                                        dataToChart.splice(0, 0, {x: "Ja", y: sumMonth1, y0: 0});
                                    break;

                                    case 2:
                                        sumMonth2 = sumMonth2 + parseFloat(transaction.data().value);
                                        dataToChart.splice(1, 1);
                                        dataToChart.splice(1, 0, {x: "Fe", y: sumMonth2, y0: 0});
                                    break;

                                    case 3:
                                        sumMonth3 = sumMonth3 + parseFloat(transaction.data().value);
                                        dataToChart.splice(2, 1);
                                        dataToChart.splice(2, 0, {x: "Ma", y: sumMonth3, y0: 0});
                                    break;

                                    case 4:
                                        sumMonth4 = sumMonth4 + parseFloat(transaction.data().value);
                                        dataToChart.splice(3, 1);
                                        dataToChart.splice(3, 0, {x: "Ab", y: sumMonth4, y0: 0});
                                    break;

                                    case 5:
                                        sumMonth5 = sumMonth5 + parseFloat(transaction.data().value);
                                        dataToChart.splice(4, 1);
                                        dataToChart.splice(4, 0, {x: "Mo", y: sumMonth5, y0: 0});
                                    break;

                                    case 6:
                                        sumMonth6 = sumMonth6 + parseFloat(transaction.data().value);
                                        dataToChart.splice(5, 1);
                                        dataToChart.splice(5, 0, {x: "Ju", y: sumMonth6, y0: 0});
                                    break;

                                    case 7:
                                        sumMonth7 = sumMonth7 + parseFloat(transaction.data().value);
                                        dataToChart.splice(6, 1);
                                        dataToChart.splice(6, 0, {x: "Jl", y: sumMonth7, y0: 0});
                                    break;

                                    case 8:
                                        sumMonth8 = sumMonth8 + parseFloat(transaction.data().value);
                                        dataToChart.splice(7, 1);
                                        dataToChart.splice(7, 0, {x: "Ag", y: sumMonth8, y0: 0});
                                    break;

                                    case 9:
                                        sumMonth9 = sumMonth9 + parseFloat(transaction.data().value);
                                        dataToChart.splice(8, 1);
                                        dataToChart.splice(8, 0, {x: "St", y: sumMonth9, y0: 0});
                                    break;

                                    case 10:
                                        sumMonth10 = sumMonth10 + parseFloat(transaction.data().value);
                                        dataToChart.splice(9, 1);
                                        dataToChart.splice(9, 0, {x: "Ou", y: sumMonth10, y0: 0});
                                    break;

                                    case 11:
                                        sumMonth11 = sumMonth11 + parseFloat(transaction.data().value);
                                        dataToChart.splice(10, 1);
                                        dataToChart.splice(10, 0, {x: "No", y: sumMonth11, y0: 0});
                                    break;

                                    case 12:
                                        sumMonth12 = sumMonth12 + parseFloat(transaction.data().value);
                                        dataToChart.splice(11, 1);
                                        dataToChart.splice(11, 0, {x: "De", y: sumMonth12, y0: 0});
                                    break;
                                }
                                transactionsArray.push(transaction.data());
                            }

                            
                        });
                        setDataToChart(dataToChart);
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
                            {x: "Dom", y: 0, y0: 0},
                            {x: "Seg", y: 0, y0: 0},
                            {x: "Ter", y: 0, y0: 0},
                            {x: "Qua", y: 0, y0: 0},
                            {x: "Qui", y: 0, y0: 0},
                            {x: "Sex", y: 0, y0: 0},
                            {x: "Sáb", y: 0, y0: 0}
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

                                    sumSu = sumSu + parseFloat(transaction.data().value.toFixed(2));
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
    
                case "Mês":
                    Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                        let transactionsArray = [];
                        let dataToChart = [

                            {x: "Sem 1", y: 0, y0: 0},
                            {x: "Sem 2", y: 0, y0: 0},
                            {x: "Sem 3", y: 0, y0: 0},
                            {x: "Sem 4", y: 0, y0: 0},
                            {x: "Sem 5", y: 0, y0: 0},
                        ]

                        let sumWeek1 = 0;
                        let sumWeek2 = 0;
                        let sumWeek3 = 0;
                        let sumWeek4 = 0;
                        let sumWeek5 = 0;

                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Spending"){

                                if(Format.findWeek(transaction.data().date) == 1){

                                    sumWeek1 = sumWeek1 + parseFloat(transaction.data().value);
                                    dataToChart.splice(0, 1);
                                    dataToChart.splice(0, 0, {x : "Sem 1", y: sumWeek1, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 2){

                                    sumWeek2 = sumWeek2 + parseFloat(transaction.data().value);
                                    dataToChart.splice(1, 1);
                                    dataToChart.splice(1, 0, {x : "Sem 2", y: sumWeek2, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 3){

                                    sumWeek3 = sumWeek3 + parseFloat(transaction.data().value);
                                    dataToChart.splice(2, 1);
                                    dataToChart.splice(2, 0, {x : "Sem 3", y: sumWeek3, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 4){

                                    sumWeek4 = sumWeek4 + parseFloat(transaction.data().value);
                                    dataToChart.splice(3, 1);
                                    dataToChart.splice(3, 0, {x : "Sem 4", y: sumWeek4, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 5){

                                    sumWeek5 = sumWeek5 + parseFloat(transaction.data().value);
                                    dataToChart.splice(4, 1);
                                    dataToChart.splice(4, 0, {x : "Sem 5", y: sumWeek5, y0: 0});
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

                        let dataToChart = [
                            {x: "Ja", y: 0, y0: 0},
                            {x: "Fe", y: 0, y0: 0},
                            {x: "Ma", y: 0, y0: 0},
                            {x: "Ab", y: 0, y0: 0},
                            {x: "Mo", y: 0, y0: 0},
                            {x: "Ju", y: 0, y0: 0},
                            {x: "Jl", y: 0, y0: 0},
                            {x: "Ag", y: 0, y0: 0},
                            {x: "St", y: 0, y0: 0},
                            {x: "Ou", y: 0, y0: 0},
                            {x: "No", y: 0, y0: 0},
                            {x: "De", y: 0, y0: 0},
                        ];
                        let sumMonth1 = 0;
                        let sumMonth2 = 0;
                        let sumMonth3 = 0;
                        let sumMonth4 = 0;
                        let sumMonth5 = 0;
                        let sumMonth6 = 0;
                        let sumMonth7 = 0;
                        let sumMonth8 = 0;
                        let sumMonth9 = 0;
                        let sumMonth10 = 0;
                        let sumMonth11 = 0;
                        let sumMonth12 = 0;


                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Spending"){
                                let converted = new Date(transaction.data().date);

                                switch(converted.getMonth() + 1){

                                    case 1:
                                        sumMonth1 = sumMonth1 + parseFloat(transaction.data().value);
                                        dataToChart.splice(0, 1);
                                        dataToChart.splice(0, 0, {x: "Ja", y: sumMonth1, y0: 0});
                                    break;

                                    case 2:
                                        sumMonth2 = sumMonth2 + parseFloat(transaction.data().value);
                                        dataToChart.splice(1, 1);
                                        dataToChart.splice(1, 0, {x: "Fe", y: sumMonth2, y0: 0});
                                    break;

                                    case 3:
                                        sumMonth3 = sumMonth3 + parseFloat(transaction.data().value);
                                        dataToChart.splice(2, 1);
                                        dataToChart.splice(2, 0, {x: "Ma", y: sumMonth3, y0: 0});
                                    break;

                                    case 4:
                                        sumMonth4 = sumMonth4 + parseFloat(transaction.data().value);
                                        dataToChart.splice(3, 1);
                                        dataToChart.splice(3, 0, {x: "Ab", y: sumMonth4, y0: 0});
                                    break;

                                    case 5:
                                        sumMonth5 = sumMonth5 + parseFloat(transaction.data().value);
                                        dataToChart.splice(4, 1);
                                        dataToChart.splice(4, 0, {x: "Mo", y: sumMonth5, y0: 0});
                                    break;

                                    case 6:
                                        sumMonth6 = sumMonth6 + parseFloat(transaction.data().value);
                                        dataToChart.splice(5, 1);
                                        dataToChart.splice(5, 0, {x: "Ju", y: sumMonth6, y0: 0});
                                    break;

                                    case 7:
                                        sumMonth7 = sumMonth7 + parseFloat(transaction.data().value);
                                        dataToChart.splice(6, 1);
                                        dataToChart.splice(6, 0, {x: "Jl", y: sumMonth7, y0: 0});
                                    break;

                                    case 8:
                                        sumMonth8 = sumMonth8 + parseFloat(transaction.data().value);
                                        dataToChart.splice(7, 1);
                                        dataToChart.splice(7, 0, {x: "Ag", y: sumMonth8, y0: 0});
                                    break;

                                    case 9:
                                        sumMonth9 = sumMonth9 + parseFloat(transaction.data().value);
                                        dataToChart.splice(8, 1);
                                        dataToChart.splice(8, 0, {x: "St", y: sumMonth9, y0: 0});
                                    break;

                                    case 10:
                                        sumMonth10 = sumMonth10 + parseFloat(transaction.data().value);
                                        dataToChart.splice(9, 1);
                                        dataToChart.splice(9, 0, {x: "Ou", y: sumMonth10, y0: 0});
                                    break;

                                    case 11:
                                        sumMonth11 = sumMonth11 + parseFloat(transaction.data().value);
                                        dataToChart.splice(10, 1);
                                        dataToChart.splice(10, 0, {x: "No", y: sumMonth11, y0: 0});
                                    break;

                                    case 12:
                                        sumMonth12 = sumMonth12 + parseFloat(transaction.data().value);
                                        dataToChart.splice(11, 1);
                                        dataToChart.splice(11, 0, {x: "De", y: sumMonth12, y0: 0});
                                    break;
                                }

                                transactionsArray.push(transaction.data());
                            }
                        });
                        setDataToChart(dataToChart);
                        setTransactionsList(transactionsArray);
                    });
                    break;
            }
        }else{

            switch(chartTime){

                case "Semana":
                    Transaction.recoverTransactionToChart(userDataContext.email, "week").then(transactions=>{

                        let transactionsArray = [];

                        let dataToChart = [
                            {x: "Dom", y: 0, y0: 0},
                            {x: "Seg", y: 0, y0: 0},
                            {x: "Ter", y: 0, y0: 0},
                            {x: "Qua", y: 0, y0: 0},
                            {x: "Qui", y: 0, y0: 0},
                            {x: "Sex", y: 0, y0: 0},
                            {x: "Sáb", y: 0, y0: 0}
                        ];
                        let sumSu = 0;
                        let sumM = 0;
                        let sumTu = 0;
                        let sumW = 0;
                        let sumTh = 0;
                        let sumF = 0;
                        let sumSa = 0;
                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Transfer"){

                                if(Format.getDayOfTimestamp(transaction.data().date) == 0){

                                    sumSu = sumSu + parseFloat(transaction.data().value.toFixed(2));
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
    
                case "Mês":
                    Transaction.recoverTransactionToChart(userDataContext.email, "month").then(transactions=>{

                        let transactionsArray = [];
                        let dataToChart = [

                            {x: "Sem 1", y: 0, y0: 0},
                            {x: "Sem 2", y: 0, y0: 0},
                            {x: "Sem 3", y: 0, y0: 0},
                            {x: "Sem 4", y: 0, y0: 0},
                            {x: "Sem 5", y: 0, y0: 0},
                        ]

                        let sumWeek1 = 0;
                        let sumWeek2 = 0;
                        let sumWeek3 = 0;
                        let sumWeek4 = 0;
                        let sumWeek5 = 0;

                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Transfer"){

                                if(Format.findWeek(transaction.data().date) == 1){

                                    sumWeek1 = sumWeek1 + parseFloat(transaction.data().value);
                                    dataToChart.splice(0, 1);
                                    dataToChart.splice(0, 0, {x : "Sem 1", y: sumWeek1, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 2){

                                    sumWeek2 = sumWeek2 + parseFloat(transaction.data().value);
                                    dataToChart.splice(1, 1);
                                    dataToChart.splice(1, 0, {x : "Sem 2", y: sumWeek2, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 3){

                                    sumWeek3 = sumWeek3 + parseFloat(transaction.data().value);
                                    dataToChart.splice(2, 1);
                                    dataToChart.splice(2, 0, {x : "Sem 3", y: sumWeek3, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 4){

                                    sumWeek4 = sumWeek4 + parseFloat(transaction.data().value);
                                    dataToChart.splice(3, 1);
                                    dataToChart.splice(3, 0, {x : "Sem 4", y: sumWeek4, y0: 0});
                                }else if(Format.findWeek(transaction.data().date) == 5){

                                    sumWeek5 = sumWeek5 + parseFloat(transaction.data().value);
                                    dataToChart.splice(4, 1);
                                    dataToChart.splice(4, 0, {x : "Sem 5", y: sumWeek5, y0: 0});
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

                        let dataToChart = [
                            {x: "Ja", y: 0, y0: 0},
                            {x: "Fe", y: 0, y0: 0},
                            {x: "Ma", y: 0, y0: 0},
                            {x: "Ab", y: 0, y0: 0},
                            {x: "Mo", y: 0, y0: 0},
                            {x: "Ju", y: 0, y0: 0},
                            {x: "Jl", y: 0, y0: 0},
                            {x: "Ag", y: 0, y0: 0},
                            {x: "St", y: 0, y0: 0},
                            {x: "Ou", y: 0, y0: 0},
                            {x: "No", y: 0, y0: 0},
                            {x: "De", y: 0, y0: 0},
                        ];
                        let sumMonth1 = 0;
                        let sumMonth2 = 0;
                        let sumMonth3 = 0;
                        let sumMonth4 = 0;
                        let sumMonth5 = 0;
                        let sumMonth6 = 0;
                        let sumMonth7 = 0;
                        let sumMonth8 = 0;
                        let sumMonth9 = 0;
                        let sumMonth10 = 0;
                        let sumMonth11 = 0;
                        let sumMonth12 = 0;


                        transactions.forEach(transaction=>{

                            if(transaction.data().type == "Transfer"){

                                let converted = new Date(transaction.data().date);

                                switch(converted.getMonth() + 1){

                                    case 1:
                                        sumMonth1 = sumMonth1 + parseFloat(transaction.data().value);
                                        dataToChart.splice(0, 1);
                                        dataToChart.splice(0, 0, {x: "Ja", y: sumMonth1, y0: 0});
                                    break;

                                    case 2:
                                        sumMonth2 = sumMonth2 + parseFloat(transaction.data().value);
                                        dataToChart.splice(1, 1);
                                        dataToChart.splice(1, 0, {x: "Fe", y: sumMonth2, y0: 0});
                                    break;

                                    case 3:
                                        sumMonth3 = sumMonth3 + parseFloat(transaction.data().value);
                                        dataToChart.splice(2, 1);
                                        dataToChart.splice(2, 0, {x: "Ma", y: sumMonth3, y0: 0});
                                    break;

                                    case 4:
                                        sumMonth4 = sumMonth4 + parseFloat(transaction.data().value);
                                        dataToChart.splice(3, 1);
                                        dataToChart.splice(3, 0, {x: "Ab", y: sumMonth4, y0: 0});
                                    break;

                                    case 5:
                                        sumMonth5 = sumMonth5 + parseFloat(transaction.data().value);
                                        dataToChart.splice(4, 1);
                                        dataToChart.splice(4, 0, {x: "Mo", y: sumMonth5, y0: 0});
                                    break;

                                    case 6:
                                        sumMonth6 = sumMonth6 + parseFloat(transaction.data().value);
                                        dataToChart.splice(5, 1);
                                        dataToChart.splice(5, 0, {x: "Ju", y: sumMonth6, y0: 0});
                                    break;

                                    case 7:
                                        sumMonth7 = sumMonth7 + parseFloat(transaction.data().value);
                                        dataToChart.splice(6, 1);
                                        dataToChart.splice(6, 0, {x: "Jl", y: sumMonth7, y0: 0});
                                    break;

                                    case 8:
                                        sumMonth8 = sumMonth8 + parseFloat(transaction.data().value);
                                        dataToChart.splice(7, 1);
                                        dataToChart.splice(7, 0, {x: "Ag", y: sumMonth8, y0: 0});
                                    break;

                                    case 9:
                                        sumMonth9 = sumMonth9 + parseFloat(transaction.data().value);
                                        dataToChart.splice(8, 1);
                                        dataToChart.splice(8, 0, {x: "St", y: sumMonth9, y0: 0});
                                    break;

                                    case 10:
                                        sumMonth10 = sumMonth10 + parseFloat(transaction.data().value);
                                        dataToChart.splice(9, 1);
                                        dataToChart.splice(9, 0, {x: "Ou", y: sumMonth10, y0: 0});
                                    break;

                                    case 11:
                                        sumMonth11 = sumMonth11 + parseFloat(transaction.data().value);
                                        dataToChart.splice(10, 1);
                                        dataToChart.splice(10, 0, {x: "No", y: sumMonth11, y0: 0});
                                    break;

                                    case 12:
                                        sumMonth12 = sumMonth12 + parseFloat(transaction.data().value);
                                        dataToChart.splice(11, 1);
                                        dataToChart.splice(11, 0, {x: "De", y: sumMonth12, y0: 0});
                                    break;
                                }
                                transactionsArray.push(transaction.data());
                            }
                        });
                        setDataToChart(dataToChart);
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