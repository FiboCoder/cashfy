import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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

                    reject(err);
                }).catch(err=>{

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
                    username
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
}