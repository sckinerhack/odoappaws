import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const { isSignedIn, nextStep } = await login(email, password);

      // Check if user needs to confirm sign up
      if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        setError(
          "Please verify your email before logging in. Check your inbox for the verification code."
        );
        navigate("/verify-email", { state: { email } });
        return;
      }

      // Check if email is verified (Amplify auto-checks this)
      if (isSignedIn) {
        navigate("/");
      }
    } catch (error) {
      if (error.name === "UserNotConfirmedException") {
        setError(
          "Please verify your email before logging in. Check your inbox for the verification code."
        );
        navigate("/verify-email", { state: { email } });
      } else if (error.name === "NotAuthorizedException") {
        setError("Incorrect email or password.");
      } else if (error.name === "UserNotFoundException") {
        setError("No account found with this email.");
      } else {
        setError("Failed to log in: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
