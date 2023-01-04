import { Navigate, useOutlet } from "react-router-dom";
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
          { label: "My Posts", path: "myposts" },
          { label: "My Map", path: "mymap" },
        ]}
      />
      {outlet}
    </div>
  );
}

export default ProtectedLayout;
