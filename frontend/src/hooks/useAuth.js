import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // check user status
  const login = async (data) => {
    setUser(data);
    navigate("/dashboard/home", { replace: true });
  };

  const logout = async () => {
    const result = await axios.post("./api/auth/signout");
    console.log(result.data["message"]);
    setUser(null);
    navigate("/", { replace: true });
  };

  const signup = async () => {
    navigate("/login", { replace: true });
  };

  // change login state when user change
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      signup,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
