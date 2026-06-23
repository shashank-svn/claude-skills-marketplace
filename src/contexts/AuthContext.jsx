import { createContext, useContext, useState, useEffect } from "react";
import { mockApi } from "../services/mockApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const user = mockApi.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { user } = await mockApi.login(email, password);
    setCurrentUser(user);
  };

  const signup = async (name, email, password, role) => {
    const { user } = await mockApi.signup(name, email, password, role);
    setCurrentUser(user);
  };

  const updateUser = async (updates) => {
    const updatedUser = await mockApi.updateUser(currentUser.id, updates);
    setCurrentUser(updatedUser);
  };

  const logout = () => {
    mockApi.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, signup, logout, loading, updateUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
