import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./Firebase";

export class User{

    constructor(){}

    static signIn(email, password){

        return new Promise((resolve, reject)=>{

            signInWithEmailAndPassword(auth, email, password).then(result=>{

                resolve(result);
    
            }).catch(err=>{
    
                reject(err);
            });
        });
        
    }

    static signOut(){

        auth.signOut();
    }

    static uploadImage(email, blob){

        return new Promise((resolve, reject)=>{

            let path = "images/users/" + email + "/profile/" + email;

            let imageRef = ref(storage, path);
            uploadBytes(imageRef, blob).then(snapshot=>{

                getDownloadURL(imageRef).then(url=>{

                    resolve(url);
                }).catch(err=>{
                    console.log(err)

                    reject(err);
                }).catch(err=>{
                    console.log(err)
                    reject(err);
                })
            })
        });
    }

    static addUser(imageUrl = "", username, email, password){

        return new Promise((resolve, reject)=>{

            createUserWithEmailAndPassword(auth, email, password).then(result=>{

                setDoc(doc(db, "users", email), {

                    imageUrl,
                    email,
                    username,
                    balance: "0.00"
                }).then(result=>{

                    resolve(result);
                }).catch(err=>{

                    reject(err);
                });
            }).catch(err=>{

                reject(err);
            });
        });
        
    }

    static updateBalance(balance, email){

        console.log(balance)

        return new Promise((resolve, reject)=>{

            updateDoc(doc(db, "users", email),{

                balance
            }).then(result=>{

                resolve(result);
            }).catch(err=>{

                reject(err);
            })
        });
    }

    static updateData(email, data, type){

        return new Promise((resolve, reject)=>{

            if(type == "username"){

                updateDoc(doc(db, "users", email),{

                    username: data
                }).then(result=>{
    
                    resolve(result);
                }).catch(err=>{
    
                    reject(err);
                });
            }else if(type == "password"){

                const user = auth.currentUser;

                updatePassword(user, data).then(result=>{

                    resolve(resolve);
                }).catch(err=>{

                    reject(err);
                });
            }
        });
    }
}