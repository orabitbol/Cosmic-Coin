import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { games } from "../../mock/mockdata";


const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find((g) => g.id === id);

  if (!game) {
    return <Typography variant="h5">משחק לא נמצא</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3">{game.name}</Typography>
      <iframe
        src={game.url}
        width="100%"
        height="600px"
        style={{ border: "none", marginTop: "10px" }}
        title={game.name}
      />
    </Container>
  );
};

export default GamePage;
