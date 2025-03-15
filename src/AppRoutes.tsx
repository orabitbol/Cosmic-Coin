import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "./store/userStore";
import GameLobby from "./pages/gameLobby/GameLobby";
import GamePage from "./pages/gamePage/GamePage";
import LoginPage from "./pages/loginPage/LoginPage";
import HistoryPage from "./pages/historyPage/HistoryPage"; 
import AccountPage from "./pages/accountPage/AccountPage"; 

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  return userStore.user ? element : <Navigate to="/login" replace />;
};

const AppRoutes = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={userStore.user ? "/lobby" : "/login"} replace />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lobby" element={<ProtectedRoute element={<GameLobby />} />} />
        <Route path="/game/:id" element={<ProtectedRoute element={<GamePage />} />} />
        <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
        <Route path="/account" element={<ProtectedRoute element={<AccountPage />} />} />
      </Routes>
    </BrowserRouter>
  );
});

export default AppRoutes;
