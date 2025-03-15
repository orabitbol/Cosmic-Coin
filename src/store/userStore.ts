import { makeAutoObservable } from "mobx";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

class UserStore {
  user: User | null = null;
  balance: number = 0;
  loading: boolean = true;
  navigate: NavigateFunction | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setNavigator(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  async loadUser(user: User | null) {
    console.log("🔄 loadUser called with:", user);

    if (!user) {
      console.warn("⚠ No user found, staying on login page.");
      this.user = null;
      this.loading = false;
      return;
    }

    this.user = user;
    this.loading = false;
    await this.fetchBalance(user.uid);

    if (this.navigate) {
      console.log("✅ User found, navigating to lobby...");
      this.navigate("/lobby");
    }
  }

  async fetchBalance(uid: string) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        this.balance = userSnap.data().balance;
      } else {
        if (this.user) {
          const userName = this.user.displayName || "User";
          await setDoc(userRef, { name: userName, balance: 1000 });
          this.balance = 1000;
        }
      }
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
    }
  }

  updateBalance(amount: number) {
    if (this.user) {
      this.balance += amount;
      setDoc(doc(db, "users", this.user.uid), { balance: this.balance }, { merge: true });
    }
  }

  logout() {
    auth.signOut().then(() => {
      console.log("👋 User logged out, redirecting to login...");
      this.user = null;
      this.balance = 0;
      if (this.navigate) {
        this.navigate("/login");
      }
    }).catch((error) => {
      console.error("❌ Error logging out:", error);
    });
  }
}

export const userStore = new UserStore();
