import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "./firebase";
import { userStore } from "./store/userStore";
import AppRoutes from "./AppRoutes";
import { CircularProgress, Container } from "@mui/material";
import './app.scss'
const App = observer(() => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      userStore.loadUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (userStore.loading) {
    return (
      <Container className="loading-container">
        <CircularProgress size={50} />
        <p>טוען נתונים...</p>
      </Container>
    );
  }

  return <AppRoutes />;
});

export default App;
