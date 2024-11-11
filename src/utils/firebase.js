
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdWB4HKPZ04zBrXSHCOOWHSgOe2a2w8oQ",
    authDomain: "online-food-cbac0.firebaseapp.com",
    projectId: "online-food-cbac0",
    storageBucket: "online-food-cbac0.appspot.com",
    messagingSenderId: "148701936865",
    appId: "1:148701936865:web:059f4cddcbb743e6c44ba0",
    measurementId: "G-SN2VRY14TM"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };
