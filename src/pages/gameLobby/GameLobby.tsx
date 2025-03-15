import { Button, Container, Typography } from "@mui/material";
import GameList from "../../component/gameList.tsx/GameList";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./gameLobby.scss";

const GameLobby = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <div className="lobby-page">
      <Container className="lobby-container">
        <Typography variant="h3" gutterBottom className="lobby-title">
          🎮 לובי המשחקים
        </Typography>

        <GameList />

        <Button className="logout-button" onClick={handleLogout}>
          ⬅️ התנתק
        </Button>
      </Container>
    </div>
  );
};

export default GameLobby;
