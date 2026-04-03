'use server';  

import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);   // lebih aman
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
    }
    
    return snapshot.data();
}