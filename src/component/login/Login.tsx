import { useState, useEffect } from "react";
import { signInWithGoogle, signInWithEmail } from "../../firebase";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import { useNavigate, Link } from "react-router-dom"; 
import "./login.scss";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.user) {
      navigate("/lobby"); 
    }
  }, [userStore.user, navigate]);

  const handleSignIn = async () => {
    await signInWithEmail(email, password);
  };

  console.log("user: ", userStore.user);

  return (
    <div className="login-container">
      {userStore.user ? (
        <p>אתה כבר מחובר, מעביר ללובי...</p>
      ) : (
        <>
          <h2>התחבר או הירשם</h2>
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>התחבר</button>
          <button onClick={signInWithGoogle}>התחברות עם Google</button>

          <p>אין לך חשבון? <Link to="/signup">הרשם כאן</Link></p>
        </>
      )}
    </div>
  );
});

export default Login;
