import { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp, Timestamp,
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
        prescriptionData: [],
        recordData: []
    });

    // initialize firebase app
    initializeApp(firebaseConfig);

    // initialize services
    const db = getFirestore();
    const auth = getAuth();

    // collection refs
    const prescriptionRef = collection(db, 'prescription');
    const recordRef = collection(db, 'record');



    // state.prescriptionData
    // [{"id": "123123sldflkj", "userId":"1", "title":"Zoloft", "createdAt":"123123123", "dailyFrequency":"2", "frequency":"1", "json":"{"1": "1690167371", "2": "1690167372" }", "status":"active"}]

    // timeslot object
    // {{"1690167371": [{"title": "zoloft", "dose":"50", "prescriptionId": "123123sldflkj"}, {"title": "aderall", "dose":"20", "prescriptionId": "12312322sldflkj"}]}, {"1690167372": [{"title": "zoloft", "dose":"50", "prescriptionId": "123123sldflkj"}, {"title": "aderall", "dose":"20", "prescriptionId": "123123s22ldflkj"}]}}

    // single timeslot_list (group by time to take medicine (from json))
    // [{"title": "zoloft", "dose":"50"}, {"title": "aderall", "dose":"20"}]



    // getting data and storing it in state
    useEffect(() => {
        let prescriptions = []
        getDocs(prescriptionRef)
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
            });
    }, []);

    // task to get record in record collection
    const getRecord = (prescriptionId, doseId) => {
        let records = []
        const q = query(recordRef, where("prescriptionId", "==", prescriptionId), where("doseId", "==", parseInt(doseId)));

        return getDocs(q)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    records.push({ ...doc.data(), id: doc.id })
                })

                if (records.length > 1) {
                    throw new Error(`Error! More than one record found with prescriptionId: ${prescriptionId} and doseId: ${doseId}`);
                } else if (records.length == 0) {
                    return null
                }
                console.log('records[0]', records[0])
                return records[0]
            })
            .catch(err => {
                console.log(err.message)
            });
    };


    // task to create records in record collection
    const createRecord = (record) => {
        const recordToCreate = {
            prescriptionId: record.prescriptionId,
            doseId: parseInt(record.doseId),
            createdAt: record.createdAt,
            taken: record.taken,
            takenAt: record.takenAt
        }
        return addDoc(recordRef, recordToCreate)
            .then((docRef) => {
                const res = {
                    ...recordToCreate,
                    id: docRef.id
                }
                return res;
            })
            .catch((err) => {
                console.log(err.message);
            });

    };

    // takes 2 arguments: document reference and object
    // it only updates document based on object, it will leave other properties alone if not in the update object
    // updateDoc(docRef, {
    //     title: 'updated title'
    // })
    // update an existing record
    const updateRecord = (recordId, taken) => {
        const docRef = doc(db, 'record', recordId);
        const q = query(recordRef, where("prescriptionId", "==", prescriptionId), where("doseId", "==", doseId));
        console.log("updateRecord query", q)

        // if (!querySnapshot.empty) {
        //     const docRef = querySnapshot.docs[0].ref;
        //     // docRef now refers to the document with the specified email field value
        // }
        // const docRef =
        //     updateDoc(docRef, {
        //         title: 'updated title'
        //     })
        //         .then(() => {
        //             updateForm.reset();
        //         })
    }

    return { state, getRecord, createRecord, updateRecord };
};