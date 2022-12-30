import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import "./App.css";
import HomePage from "./containers/main/Home";
import LoginPage from "./containers/account/Login";
import SettingsPage from "./containers/main/Settings";
import CreatePost from "./components/createPost";

function App() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="posts" element={<CreatePost />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
