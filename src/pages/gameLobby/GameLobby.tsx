import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import { balanceStore } from "../../store/balanceStore";
import { Button, Typography, Container } from "@mui/material";
import { logout } from "../../firebase";

import "./gameLobby.scss";
import GameList from "../../component/gameList.tsx/GameList";

const GameLobby = observer(() => {
  return (
    <Container className="lobby-container">
      <div className="lobby-header">
        <Typography variant="h3">🎮 לובי המשחקים</Typography>
        
        {/* ✅ הוספת יתרת המשתמש */}
        <Typography variant="h6" className="balance-info">
          💰 יתרה: {balanceStore.balance} מטבעות
        </Typography>

        {/* ✅ כפתור לטעינת מטבעות */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => balanceStore.updateBalance(userStore.user?.uid || "", 500, "deposit")}
        >
          💰 הטען 500 מטבעות
        </Button>

        {/* ✅ כפתור להתנתקות */}
        <Button className="logout-button" onClick={logout}>
          ⬅️ התנתק
        </Button>
      </div>
      
      <GameList />
    </Container>
  );
});

export default GameLobby;
