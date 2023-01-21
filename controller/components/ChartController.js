import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "../../screens/components/Chart";
import { db } from "../../utils/Firebase";
import { Format } from "../../utils/Format";
import { Transaction } from "../../utils/Transaction";

const ChartController = (props) =>{

    const [chartTime, setChartTime] = useState("Semana");
    const [chartTimeFD, setChartTimeFD] = useState("");
    const [transactionsList, setTransactionsList] = useState([]);
    const [earningSum, setEarningSum] = useState(0);
    const [spendingSum, setSpendingSum] = useState(0);
    const [transferSum, setTransferSum] = useState(0);
    const [totalSum, setTotalSum] = useState(0);

    const fetchData = () =>{


        if(chartTime == "Semana"){

            Transaction.recoverTransactionToChart(props.userData.email, "week").then(transactions=>{

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

                    setTransactionsList(transactionArray);
                }
            });

        }else if(chartTime ==  "Mês"){

            Transaction.recoverTransactionToChart(props.userData.email, "month").then(transactions=>{

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

                    setTransactionsList(transactionArray);
                }
            });
                

        }else if(chartTime == "Ano"){
                
            Transaction.recoverTransactionToChart(props.userData.email, "year").then(transactions=>{

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

                    setTransactionsList(transactionArray);
                }
            });
        }
    }

    useEffect(()=>{

        fetchData()
    },[chartTime]);

    return(

        <Chart
        
            setChartTime={setChartTime}
            setChartTimeFD={setChartTimeFD}

            chartTime={chartTime}
            chartTimeFD={chartTimeFD}

            earningSum={earningSum}
            spendingSum={spendingSum}
            transferSum={transferSum}

            totalSum={totalSum}

            transactionsList={transactionsList}

            fetchData={fetchData}
            
        ></Chart>
    );

}

export default ChartController;