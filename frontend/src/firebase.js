// firebase.ts
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCFIX-ge7_0SAuRasfLvuoC8EpnPU1-AYA",
    authDomain: "hospital-220dc.firebaseapp.com",
    projectId: "hospital-220dc",
    storageBucket: "hospital-220dc.appspot.com",
    messagingSenderId: "900875586485",
    appId: "1:900875586485:web:b959706677f196e4cb27fc"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// To handle recaptcha and OTP verification
export { RecaptchaVerifier, signInWithPhoneNumber };

