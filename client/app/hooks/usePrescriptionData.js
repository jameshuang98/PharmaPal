import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD8hmmog3-WYUGiRRMsOSWUemmmItAOew8",
    authDomain: "pharmapal-77e74.firebaseapp.com",
    projectId: "pharmapal-77e74",
    storageBucket: "pharmapal-77e74.appspot.com",
    messagingSenderId: "678649431412",
    appId: "1:678649431412:web:442396beb9e565dba81821",
    measurementId: "G-2K1X0821L5"
};


export default function usePrescriptionData() {
    // initialize state
    const [state, setState] = useState({
        prescriptionData: []
    });

    // initialize firebase app
    initializeApp(firebaseConfig);

    // initialize services
    const db = getFirestore();
    const auth = getAuth();

    // collection ref
    const colRef = collection(db, 'prescription');


    // grouping queries together
    useEffect(() => {
        let prescriptions = []
        getDocs(colRef)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    prescriptions.push({ ...doc.data(), id: doc.id })
                })
                // console.log(prescriptions)
                setState({
                    prescriptionData: prescriptions
                });
            })
            .catch(err => {
                console.log(err.message)
            })


    }, []);

    return { state };
};