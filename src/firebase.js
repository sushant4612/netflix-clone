import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAvrgY1TNyasSnwvCdSZWL8YVl1MDus6Zk",
  authDomain: "netflix-clone-54d51.firebaseapp.com",
  projectId: "netflix-clone-54d51",
  storageBucket: "netflix-clone-54d51.firebasestorage.app",
  messagingSenderId: "251318993641",
  appId: "1:251318993641:web:aea5575f0ef5763c502678"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider : "local",
            email
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try{
         await signInWithEmailAndPassword(auth, email, password);  
    }catch(error){
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = async () =>{
    await signOut(auth);
}

export  {auth, db, login, logout, signup};