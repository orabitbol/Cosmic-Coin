import { makeAutoObservable } from "mobx";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

interface Transaction {
  amount: number;
  type: "win" | "loss" | "deposit";
  date: string;
}

class BalanceStore {
  balance: number = 0;
  transactions: Transaction[] = [];
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  async loadBalance(uid: string) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        this.balance = data.balance || 1000;
        this.transactions = data.transactions || [];
      } else {
        console.warn("⚠️ משתמש חדש - יצירת יתרה ראשונית");
        await updateDoc(userRef, { balance: 1000, transactions: [] });
        this.balance = 1000;
        this.transactions = [];
      }
    } catch (error) {
      console.error("❌ Error loading balance:", error);
    }
    this.loading = false;
  }

  async updateBalance(uid: string, amount: number, type: "win" | "loss" | "deposit") {
    if (!uid) return;

    this.balance += amount;
    const transaction: Transaction = {
      amount,
      type,
      date: new Date().toISOString(),
    };

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      balance: this.balance,
      transactions: arrayUnion(transaction),
    });

    this.transactions.push(transaction);
  }

  async addFunds(uid: string, amount: number) {
    await this.updateBalance(uid, amount, "deposit");
  }

  reset() {
    this.balance = 0;
    this.transactions = [];
  }
}

export const balanceStore = new BalanceStore();
