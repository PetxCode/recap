import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyBvDD5MWu9QaoU_HJOq8Dkw3utBucQMTpU",
  authDomain: "push-build.firebaseapp.com",
  projectId: "push-build",
  storageBucket: "push-build.appspot.com",
  messagingSenderId: "88870785610",
  appId: "1:88870785610:web:52940afa79f994faad0cb3"
});

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, storage, auth };
