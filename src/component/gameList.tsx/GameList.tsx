import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { games } from "../../mock/mockdata";
import "./gameList.scss"; 

const GameList = () => {
  return (
    <Grid container spacing={3} className="games-grid">
      {games.map((game) => (
        <Grid item xs={12} sm={6} md={4} key={game.id}>
          <Card className="game-card">
            <CardActionArea component={Link} to={`/game/${game.id}`}>
              <CardMedia component="img" height="180" image={game.thumbnail} alt={game.name} className="game-image" />
              <CardContent>
                <Typography variant="h6" className="game-title">{game.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;
