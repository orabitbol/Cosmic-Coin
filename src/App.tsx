import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "./firebase";
import { userStore } from "./store/userStore";
import AppRoutes from "./AppRoutes";

const App = observer(() => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed, user:", user); 
      userStore.loadUser(user);
    });
    return () => unsubscribe();
  }, []);

  return <AppRoutes />;
});

export default App;
