import { 
    initializeApp 
  } from "firebase/app";
  import { 
    getAuth, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup
    
  } from "firebase/auth";
  import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
  

  const firebaseConfig = {
    apiKey: "AIzaSyCxFHPsNSfgWag0Vgfkb_mWFi-cc2xMNZY",
    authDomain: "cosmic-coin-5d8a5.firebaseapp.com",
    projectId: "cosmic-coin-5d8a5",
    storageBucket: "cosmic-coin-5d8a5.appspot.com",
    messagingSenderId: "655504154896",
    appId: "1:655504154896:web:ffe4403890784721f2c595"
  };
  
  // 🔹 אתחול Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
  
  // 🔹 התחברות עם Google
  export const signInWithGoogle = async () => {
    try {
      if (!auth) {
        console.error("❌ Firebase auth is not initialized.");
        return;
      }
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" }); 
      const result = await signInWithPopup(auth, googleProvider);
      console.log("🔹 Google Sign-In Result:", result);
    } catch (error) {
      console.error("❌ Error signing in:", error);
    }
  };
  
  // 🔹 התחברות עם Email/Password
  export const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(userCredential.user.uid, email);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  
  export const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  
  // 🔹 שמירת המשתמש ב-Firestore אם לא קיים
  const createUserIfNotExists = async (uid: string, email: string) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
  
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: email, 
        balance: 1000, 
      });
    }
  };
  
  // 🔹 יציאה מהמערכת
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  
  export default app;
  