import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "../../screens/components/Chart";
import { db } from "../../utils/Firebase";
import { Format } from "../../utils/Format";
import { Transaction } from "../../utils/Transaction";

const ChartController = (props) =>{

    return(

        <Chart
        
            setChartTime={props.setChartTime}

            chartTime={props.chartTime}

            earningSum={props.earningSum}
            spendingSum={props.spendingSum}
            transferSum={props.transferSum}

            totalSum={props.totalSum}

            transactionsList={props.transactionsList}
            
        ></Chart>
    );

}

export default ChartController;