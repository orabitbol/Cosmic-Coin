import { useState, useEffect } from "react";
import { signInWithGoogle, signInWithEmail } from "../../firebase";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import { useNavigate, Link } from "react-router-dom";
import "./login.scss";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.user) {
      navigate("/lobby");
    }
  }, [userStore.user, navigate]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(""); 

    const errorMessage = await signInWithEmail(email, password);
    if (errorMessage) {
      setError(errorMessage); 
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {userStore.user ? (
        <p>אתה כבר מחובר, מעביר ללובי...</p>
      ) : (
        <form onSubmit={handleSignIn} className="login-form">
          <h2>🎮 <span className="neon-text">התחברות</span></h2>
          
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            🚀 {isLoading ? "מתחבר..." : "התחבר"}
          </button>

          <button type="button" onClick={signInWithGoogle} disabled={isLoading}>
            🔵 התחברות עם <b>GOOGLE</b>
          </button>

          <p>אין לך חשבון? <Link to="/signup"> <span className="neon-link">הרשם כאן</span></Link></p>
        </form>
      )}
    </div>
  );
});

export default Login;
