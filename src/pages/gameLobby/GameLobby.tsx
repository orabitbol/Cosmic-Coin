import { Button, Container, Typography } from "@mui/material";
import GameList from "../../component/gameList.tsx/GameList";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const GameLobby = () => {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <Container>
      <Button className="logout-button" onClick={handleLogout}>
        התנתק
      </Button>
      <Typography variant="h3" gutterBottom>
        לובי המשחקים
      </Typography>
      <GameList />
    </Container>
  );
};

export default GameLobby;
