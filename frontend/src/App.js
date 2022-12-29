import { Routes, Route } from "react-router-dom";
import LoginPage from "./containers/account/Login";
import HomePage from "./containers/main/Home";
import ProtectedLayout from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import CreatePost from "./components/createPost";

function App() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="/post" element={<CreatePost />} />
            </Route>
        </Routes>
    );
}

export default App;
