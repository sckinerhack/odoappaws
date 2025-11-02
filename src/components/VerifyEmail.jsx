import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { confirmSignup, resendVerification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from navigation state or prompt user
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      return setError("Please enter your email address.");
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await confirmSignup(email, code);
      setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.name === "CodeMismatchException") {
        setError("Invalid verification code. Please try again.");
      } else if (error.name === "ExpiredCodeException") {
        setError("Verification code has expired. Please request a new one.");
      } else if (error.name === "NotAuthorizedException") {
        setError("User is already confirmed or code is invalid.");
      } else {
        setError("Failed to verify email: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      return setError("Please enter your email address.");
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resendVerification(email);
      setMessage("Verification code sent! Please check your email.");
    } catch (error) {
      if (error.name === "LimitExceededException") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Failed to send verification code: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify Your Email</h2>
        <p>Please enter the verification code sent to your email.</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleVerify}>
          {!location.state?.email && (
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
          )}
          {location.state?.email && <p className="email-display">{email}</p>}
          <div className="form-group">
            <label>Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Enter verification code"
              maxLength={6}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="button-group" style={{ marginTop: "15px" }}>
          <button
            onClick={handleResendCode}
            disabled={loading}
            className="btn-secondary"
          >
            {loading ? "Sending..." : "Resend Code"}
          </button>
          <button onClick={() => navigate("/login")} className="btn-link">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
