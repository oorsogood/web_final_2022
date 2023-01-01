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
                    { label: "Home", path: "home" },
                    { label: "Create Post", path: "create" },
                    { label: "My Account", path: "myaccount" },
                    { label: "My Posts", path: "myposts" },
                    { label: "My Map", path: "mymap" },
                    { label: "Saved Posts", path: "savedposts" },
                ]}
            />
            {outlet}
        </div>
    );
};

export default ProtectedLayout;
