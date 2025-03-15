import { useState } from "react";
import { signUpWithEmail } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./signUpPage.scss";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    try {
      await signUpWithEmail(email, password);
      navigate("/lobby"); 
    } catch (err) {
      setError("שגיאה בהרשמה: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>הרשמה</h2>
      {error && <p className="error">{error}</p>}
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
      <input
        type="password"
        placeholder="אישור סיסמה"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>הרשם</button>
      <p>כבר יש לך חשבון? <a href="/login">התחבר</a></p>
    </div>
  );
};

export default SignUpPage;
