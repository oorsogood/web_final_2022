import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "./AppBar";

function ProtectedLayout() {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <AppBar
                pages={[
                    { label: "Settings", path: "settings" },
                    { label: "Posts", path: "posts" }
                ]}
            />
            {outlet}
        </div>
    );
};

export default ProtectedLayout;