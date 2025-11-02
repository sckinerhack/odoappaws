import { createContext, useContext, useEffect, useState } from "react";
import {
  signUp,
  signIn,
  signOut,
  resetPassword,
  confirmSignUp,
  resendSignUpCode,
  getCurrentUser,
  fetchUserAttributes,
} from "aws-amplify/auth";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check current authenticated user
  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      setCurrentUser({
        username: user.username,
        userId: user.userId,
        email: attributes.email,
        emailVerified: attributes.email_verified === "true",
      });
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signup = async (email, password) => {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: false,
      },
    });
    return { isSignUpComplete, userId, nextStep };
  };

  // Confirm sign up with verification code
  const confirmSignup = async (email, code) => {
    return await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  };

  // Login function
  const login = async (email, password) => {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    // After successful sign in, fetch user data
    if (isSignedIn) {
      await checkUser();
    }

    return { isSignedIn, nextStep };
  };

  // Logout function
  const logout = async () => {
    await signOut();
    setCurrentUser(null);
  };

  // Reset password function
  const resetPasswordRequest = async (email) => {
    return await resetPassword({
      username: email,
    });
  };

  // Confirm reset password with code
  const confirmResetPassword = async (email, code, newPassword) => {
    const { confirmResetPassword } = await import("aws-amplify/auth");
    return await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  };

  // Resend verification code
  const resendVerification = async (email) => {
    return await resendSignUpCode({
      username: email,
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  const value = {
    currentUser,
    signup,
    confirmSignup,
    login,
    logout,
    resetPassword: resetPasswordRequest,
    confirmResetPassword,
    resendVerification,
    checkUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
