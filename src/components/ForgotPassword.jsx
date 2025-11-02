import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { resetPassword, confirmResetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Password reset code sent! Check your email.");
      setCodeSent(true);
    } catch (error) {
      if (error.name === "UserNotFoundException") {
        setError("No account found with this email.");
      } else if (error.name === "LimitExceededException") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send reset code: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await confirmResetPassword(email, code, newPassword);
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.name === "CodeMismatchException") {
        setError("Invalid verification code.");
      } else if (error.name === "ExpiredCodeException") {
        setError("Verification code has expired. Please request a new one.");
        setCodeSent(false);
      } else if (error.name === "InvalidPasswordException") {
        setError("Password does not meet requirements: " + error.message);
      } else {
        setError("Failed to reset password: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {!codeSent ? (
          <form onSubmit={handleSendCode}>
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
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter verification code"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <button
              type="button"
              onClick={() => setCodeSent(false)}
              className="btn-secondary"
              style={{ marginTop: "10px" }}
            >
              Back
            </button>
          </form>
        )}

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
