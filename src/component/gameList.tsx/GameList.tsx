import { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { games } from "../../mock/mockdata";
import "./gameList.scss";

const GameList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("הכל");

  const filteredGames = games.filter(
    (game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "הכל" || game.category === category)
  );

  return (
    <div className="game-list">
      <TextField
        label="חפש משחק..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-filter"
      >
        <MenuItem value="הכל">📌 הכל</MenuItem>
        <MenuItem value="קלפים">🃏 קלפים</MenuItem>
        <MenuItem value="מזל">🎲 מזל</MenuItem>
        <MenuItem value="קלאסי">💎 קלאסי</MenuItem>
      </Select>

      <Grid container spacing={3} className="games-grid">
        {filteredGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card className="game-card">
              <CardActionArea component={Link} to={game.url}>
                <CardMedia component="img" height="180" image={game.thumbnail} alt={game.name} className="game-image" />
                <CardContent>
                  <Typography variant="h6" className="game-title">{game.name}</Typography>
                  <Typography variant="body2" className="game-description">{game.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GameList;
