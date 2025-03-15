import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Typography variant="h3">ברוכים הבאים ל-Crown Coins</Typography>
      <Button variant="contained" color="primary" component={Link} to="/lobby">
        כניסה ללובי המשחקים
      </Button>
    </Container>
  );
};

export default Home;
