import { useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { balanceStore } from "../../store/balanceStore";
import { games } from "../../mock/mockdata";
import { Button, Typography, TextField, Card, CardContent } from "@mui/material";
import "./gamePage.scss";
import { userStore } from "../../store/userStore";

const GamePage = observer(() => {
  const { id } = useParams();
  const game = games.find((g) => g.id === id);
  const [betAmount, setBetAmount] = useState(0);
  const [message, setMessage] = useState("");

  if (!game) {
    return <Typography variant="h4">❌ המשחק לא נמצא</Typography>;
  }

  const handleBet = (win: boolean) => {
    if (betAmount <= 0 || betAmount > balanceStore.balance) {
      setMessage("⚠️ סכום ההימור אינו תקף!");
      return;
    }

    const change = win ? betAmount * 2 : -betAmount;
    balanceStore.updateBalance(userStore.user?.uid || "", change, win ? "win" : "loss");
    setMessage(win ? "🎉 זכית!" : "😢 הפסדת...");
  };

  return (
    <div className="game-page">
      <Typography variant="h3">{game.name}</Typography>
      <img src={game.thumbnail} alt={game.name} className="game-image" />

      <Card className="bet-card">
        <CardContent>
          <Typography variant="h5">💰 יתרה נוכחית: {balanceStore.balance}</Typography>
          <TextField
            type="number"
            label="סכום ההימור"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            fullWidth
          />
          <div className="bet-buttons">
            <Button variant="contained" color="success" onClick={() => handleBet(true)}>
              ✅ זכייה
            </Button>
            <Button variant="contained" color="error" onClick={() => handleBet(false)}>
              ❌ הפסד
            </Button>
          </div>
          {message && <Typography className="message">{message}</Typography>}
        </CardContent>
      </Card>
    </div>
  );
});

export default GamePage;
