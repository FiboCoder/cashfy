import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "../../screens/components/Chart";
import { db } from "../../utils/Firebase";
import { Format } from "../../utils/Format";
import { Transaction } from "../../utils/Transaction";

const ChartController = (props) =>{

    const [chartTime, setChartTime] = useState("week");
    const [transactionsList, setTransactionsList] = useState([]);
    const [earningSum, setEarningSum] = useState(0);
    const [spendingSum, setSpendingSum] = useState(0);
    const [transferSum, setTransferSum] = useState(0);

    const fetchData  = async (chartTime) =>{

        switch(chartTime){

            case "week":
                setChartTime("Semana");
                Transaction.recoverTransactionToChart(props.userData.email, chartTime).then(transactions=>{

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

                        setTransactionsList(transactionArray);
                    }
                });
                break;

            case "month":
                setChartTime("Mês");
                Transaction.recoverTransactionToChart(props.userData.email, chartTime).then(transactions=>{

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

                        setTransactionsList(transactionArray);
                    }
                });
                break;

            case "year":
                setChartTime("Ano");
                Transaction.recoverTransactionToChart(props.userData.email, chartTime).then(transactions=>{

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

                        setTransactionsList(transactionArray);
                    }
                });
                break;
        }
    }

    useEffect(()=>{

        fetchData("week");
    },[]);

    return(

        <Chart
        
            setChartTime={setChartTime}

            chartTime={chartTime}
            earningSum={earningSum}
            spendingSum={spendingSum}
            transferSum={transferSum}

            transactionsList={transactionsList}

            fetchData={fetchData}
            
        ></Chart>
    );
}

export default ChartController;