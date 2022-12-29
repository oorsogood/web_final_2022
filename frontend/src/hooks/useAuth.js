import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // check user status
    const login = async (data) => {
        setUser(data);
        navigate("/dashboard/posts", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    // change login state when user change
    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
