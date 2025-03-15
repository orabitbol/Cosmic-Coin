import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { games } from "../../mock/mockdata";


const GameList = () => {
  return (
    <Grid container spacing={2}>
      {games.map((game) => (
        <Grid item xs={12} sm={6} md={4} key={game.id}>
          <Card>
            <CardActionArea component={Link} to={`/game/${game.id}`}>
              <CardMedia component="img" height="140" image={game.thumbnail} alt={game.name} />
              <CardContent>
                <Typography variant="h6">{game.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GameList;
