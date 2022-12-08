import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./Firebase";

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
}