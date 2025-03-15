import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import "./account.scss";

const Account = observer(() => {
  const { user, balance, logout } = userStore;
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <Container className="account-container">
      {user ? (
        <>
          <Typography variant="h3">שלום, {user.displayName || "משתמש"}</Typography>
          <Typography variant="h5">יתרתך: {balance} מטבעות</Typography>
          <Button className="logout-button" onClick={handleLogout}>
            התנתק
          </Button>
        </>
      ) : (
        <Typography variant="h5">נא להתחבר</Typography>
      )}
    </Container>
  );
});

export default Account;
