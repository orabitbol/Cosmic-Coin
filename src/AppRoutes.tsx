import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import GameLobby from "./pages/gameLobby/GameLobby";
import GamePage from "./pages/gamePage/GamePage";
import LoginPage from "./pages/loginPage/LoginPage";
import AccountPage from "./pages/accountPage/AccountPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";


const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby" element={<GameLobby />} />
      <Route path="/game/:id" element={<GamePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
