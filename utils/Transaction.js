import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./Firebase";
import { Format } from "./Format";

export class Transaction{

    constructor(){


    }

    static saveTransaction(email, type, value, name, description, category, date){

        return new Promise((resolve, reject)=>{

            addDoc(collection(db, "users", email, "transactions"), {

                type,
                value, 
                name, 
                category, 
                description, 
                date
            }).then(result=>{

                resolve(result);
            }).catch(err=>{

                reject(err);

            });
        });
    }

    static recoverTransactionsToChart(email, chartTime = "month", transactionType = "Earning"){

        return new Promise((resolve, reject)=>{

            let currentDateFixed = new Date();
            let dateFixed = 0;
            currentDateFixed.setMonth(currentDateFixed.getMonth() +1);
            dateFixed = currentDateFixed.getTime();

            if(chartTime == "week"){

                let currentDate = new Date();
                let timestamp = 0;

                currentDate.setDate(currentDate.getDate() -6);
        
                timestamp = currentDate.getTime();

                Transaction.recoverTransactionsFromDatabase(email, timestamp, dateFixed, transactionType).then(transactions=>{

                    resolve(transactions);
                });

            }else if(chartTime == "month"){


                let currentDate = new Date();
                let timestamp = 0;

                currentDate.setMonth(currentDate.getMonth() -1);
        
                timestamp = currentDate.getTime();


                this.recoverTransactionsFromDatabase(email, timestamp, dateFixed, transactionType).then(transactions=>{

                    resolve(transactions);
                });

                
            }else if(chartTime == "year"){
    
                let currentDate = new Date();
    
                currentDate.setFullYear(currentDate.getFullYear() -1);
                
                timestamp = currentDate.toLocaleString();

                Transaction.recoverTransactionsFromDatabase(email, timestamp, currentDateFixed, transactionType).then(transactions=>{

                    resolve(transactions);
                });
            }

            
        });
    }

    static recoverTransactionsFromDatabase(email, timestamp, currentDate, transactionType){

        return new Promise((resolve, reject)=>{

            if(transactionType == "Earnings"){

                const transactionsQuery = query(
                    collection(db, "users", email, "transactions"),
                    where("type", "==", "Earning"),
                    where("date", ">=", timestamp),
                    where("date", "<=", currentDate))
    
                getDocs(transactionsQuery).then((transactions)=>{
    
                    resolve(transactions);
                    
                }).catch(err=>{
    
                    reject(err)
                });
            }else if(transactionType == "Spending"){

                const transactionsQuery = query(
                    collection(db, "users", email, "transactions"),
                    where("type", "==", "Expense"),
                    where("date", ">=", timestamp),
                    where("date", "<=", currentDate))
    
                getDocs(transactionsQuery).then((transactions)=>{
    
                    resolve(transactions);
                    
                }).catch(err=>{
    
                    reject(err)
                });
            }else{

                const transactionsQuery = query(
                    collection(db, "users", email, "transactions"),
                    where("date", ">=", timestamp),
                    where("date", "<=", currentDate))
    
                getDocs(transactionsQuery).then(transactions=>{
    
                    resolve(transactions);
                    
                }).catch(err=>{
    
                    reject(err)
                });
            }
        })
    }
}