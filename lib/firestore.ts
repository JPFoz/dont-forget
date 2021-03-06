import { initializeApp, getApps} from "firebase/app";
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

// These do _not_ need to be treated as secret. Read more here: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIRESTORE_APP_ID,
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
    const itemsQuery = query(itemsColRef, orderBy("dateCreated"))
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

export const addItemToList = (collectionName: string, item: Item) => {
    return setDoc(doc(db, collectionName, item.id), {
        ...item
    });
};

export const removeListItem = (collectionName: string, id: string) => {
    return deleteDoc(doc(db, collectionName, id));
};