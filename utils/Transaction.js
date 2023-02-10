import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "./Firebase";
import { Format } from "./Format";

export class Transaction{

    constructor(){


    }

    static saveTransaction(email, type, value, name, description, category, date, transferType){

        return new Promise((resolve, reject)=>{

            if(type == "Transfer"){

                addDoc(collection(db, "users", email, "transactions"), {

                    type,
                    value, 
                    name, 
                    category, 
                    description, 
                    date,
                    transferType
                }).then(result=>{
    
                    resolve(result);
                }).catch(err=>{
    
                    reject(err);
    
                });
            }else{

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
            }
        });
    }

    static recoverTransactionToChart(email, chartTime){

        return new Promise((resolve, reject)=>{

            if(chartTime == "week"){

                let d = new Date();
                d.setDate(d.getDate() - 7);
                d.setHours(0, 0, 0, 0);

                const q = query(collection(db, "users", email, "transactions"), where("date", ">=", d.getTime()));
                getDocs(q).then(transactions=>{

                    resolve(transactions);
                }).catch(err=>{

                    reject(err);
                });

            }else if(chartTime == "month"){

                let d = new Date();
                d.setDate(d.getDate() - 30);
                d.setHours(0, 0, 0, 0);

                const q = query(collection(db, "users", email, "transactions"), where("date", ">=", d.getTime()));
                getDocs(q).then(transactions=>{

                    resolve(transactions);
                }).catch(err=>{

                    reject(err);
                });

            }else{

                let d = new Date();
                d.setDate(d.getDate() - 365);
                d.setHours(0, 0, 0, 0);
                
                const q = query(collection(db, "users", email, "transactions"), where("date", ">=", d.getTime()));
                const querySnapshot = getDocs(q);
                querySnapshot.then(transactions=>{

                    resolve(transactions);
                }).catch(err=>{

                    reject(err);
                });
            }
        });
    }
}