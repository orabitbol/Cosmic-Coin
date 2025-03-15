import { makeAutoObservable } from "mobx";
import { auth } from "../firebase";
import { User } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";
import { balanceStore } from "./balanceStore";


class UserStore {
  user: User | null = null;
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

    await balanceStore.loadBalance(user.uid);

    if (this.navigate) {
      console.log("✅ User found, navigating to lobby...");
      this.navigate("/lobby");
    }
  }

  logout() {
    auth.signOut()
      .then(() => {
        console.log("👋 User logged out, redirecting to login...");
        this.user = null;
        balanceStore.reset(); 
        if (this.navigate) {
          this.navigate("/login");
        }
      })
      .catch((error) => {
        console.error("❌ Error logging out:", error);
      });
  }
}

export const userStore = new UserStore();
