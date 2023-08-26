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
    // useEffect(() => {
    //     let prescriptions = []
    //     getDocs(prescriptionRef)
    //         .then((snapshot) => {
    //             snapshot.docs.forEach((doc) => {
    //                 prescriptions.push({ ...doc.data(), id: doc.id })
    //             })
    //             setState({
    //                 prescriptionData: prescriptions
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         });
    // }, []);


    // subscribe to the prescription collection to get real time collection data
    // onSnapshot(prescriptionRef, (snapshot) => {
    //     let prescriptions = []
    //     snapshot.docs.forEach((doc) => {
    //         prescriptions.push({ ...doc.data(), id: doc.id })
    //     })
    //     setState(prev => ({
    //         ...prev,
    //         prescriptionData: prescriptions
    //     }));
    // });

    useEffect(() => {
        // calls the onSnapshot function as well as stores the unsubscribe function into the unsub variable
        const unsub = onSnapshot(prescriptionRef, (snapshot) => {
            let prescriptions = [];
            snapshot.docs.forEach((doc) => {
                prescriptions.push({ ...doc.data(), id: doc.id })
            });
            setState(prev => ({
                ...prev,
                prescriptionData: prescriptions
            }));
        });

        // unsubscribe when the component unmounts to prevent memory leak
        // otherwise the subscription would still be active even after component unmounts
        return () => {
            unsub();
        }
    }, []);

    // subscribe to the record collection to get real time collection data
    // onSnapshot(recordRef, (snapshot) => {
    //     let records = []
    //     snapshot.docs.forEach((doc) => {
    //         records.push({ ...doc.data(), id: doc.id })
    //     })
    //     setState(prev => ({
    //         ...prev,
    //         recordData: records
    //     }));
    // });

    // METHODS FOR PRESCRIPTION COLLECTION
    const createPrescription = async (prescription) => {
        return addDoc(prescriptionRef, prescription)
            .then((docRef) => {
                const res = {
                    ...prescription,
                    id: docRef.id
                };
                return res;
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const updatePrescription = (id, prescription) => {
        const docRef = doc(db, 'prescription', id);
        updateDoc(docRef, {
            ...prescription
        });
    };

    const deletePrescription = async (id) => {
        const docRef = doc(db, 'prescription', id);
        deleteDoc(docRef);
    };


    // METHODS FOR RECORD COLLECTION

    const getRecord = async (prescriptionId, doseId) => {
        let records = []
        const q = query(recordRef, where("prescriptionId", "==", prescriptionId), where("doseId", "==", parseInt(doseId)));

        return getDocs(q)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    records.push({ ...doc.data(), id: doc.id })
                });

                if (records.length > 1) {
                    throw new Error(`Error! More than one record found with prescriptionId: ${prescriptionId} and doseId: ${doseId}`);
                } else if (records.length == 0) {
                    return null
                };
                return records[0];
            })
            .catch(err => {
                console.log(err.message)
            });
    };

    const createRecord = async (record) => {
        const recordToCreate = {
            prescriptionId: record.prescriptionId,
            doseId: parseInt(record.doseId),
            createdAt: record.createdAt,
            taken: record.taken,
            takenAt: record.takenAt
        };
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
    const updateRecord = (id, taken, takenAt) => {
        const docRef = doc(db, 'record', id);
        updateDoc(docRef, {
            taken: taken,
            takenAt: taken ? serverTimestamp() : takenAt
        });
    };

    return { state, createPrescription, updatePrescription, deletePrescription, getRecord, createRecord, updateRecord };
};