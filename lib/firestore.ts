import { initializeApp, getApps} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getFirestore,
    deleteDoc,
    doc,
    collection,
    query,
    getDocs,
    onSnapshot,
    orderBy,
    updateDoc,
    CollectionReference,
    setDoc
} from "firebase/firestore";
import { Item } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyClI8CzY3Nz2P1hqwF7hx3vPEc8i0bAh4s",
    authDomain: "don-t-forget-7b1d2.firebaseapp.com",
    projectId: "don-t-forget-7b1d2",
    storageBucket: "don-t-forget-7b1d2.appspot.com",
    messagingSenderId: "583444203903",
    appId: "1:583444203903:web:8f8dab2bd91dee768e324a",
    measurementId: "G-6NLGX5QKN2"
};

let app;
let db;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app)
  }

export const getListItems = (collectionName) => {
    const itemsColRef = collection(db, collectionName) as CollectionReference<Item>
    return getDocs(itemsColRef)
}

export const streamListItems = (collectionName, snapshot, error) => {
    const itemsColRef = collection(db, collectionName)
    const itemsQuery = query(itemsColRef, orderBy('dateCreated'))
    return onSnapshot(itemsQuery, snapshot, error);
};

export const updateListItem = (collectionName, item: Item) => {
    const listItemDocRef = doc(db, collectionName, item.id)
    return updateDoc(listItemDocRef, {
            ...item
    });
};

export const toggleListItem = (collectionName, id: string, value: boolean) => {
    const listItemDocRef = doc(db, collectionName, id)
    return updateDoc(listItemDocRef, {
        done: value
    });
};

export const addItemToList = (item: Item, collectionName) => {
    return setDoc(doc(db, collectionName, item.id), {
        ...item
    });
};

export const removeItem = (id: string, collectionName) => {
    return deleteDoc(doc(db, collectionName, id));
};