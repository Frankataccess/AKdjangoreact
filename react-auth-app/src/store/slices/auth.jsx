import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [account, setAccount] = useState(null);

  const setAuthTokens = ({ token, refreshToken }) => {
    setToken(token);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ token, refreshToken, account, setAuthTokens, setAccount, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
