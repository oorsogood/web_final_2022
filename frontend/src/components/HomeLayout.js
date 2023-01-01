import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "./AppBar";

function HomeLayout() {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
        ]}
      />
      {outlet}
    </div>
  );
}

export default HomeLayout;
