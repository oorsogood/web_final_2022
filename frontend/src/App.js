import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import "./App.css";
import LoginPage from "./containers/account/Login";
import SignUpPage from "./containers/account/SignUp";
import CreatePost from "./components/createPost";
import Home from "./containers/main/Home";
import MyAccount from "./containers/settings/MyAccount";
import MyPosts from "./containers/settings/MyPosts";
import SavedPosts from "./containers/settings/SavedPosts";
import MyMap from "./containers/main/MyMap";
import PostDetails from "./containers/main/PostDetails";

function App() {
    return (
        <Routes>
            <Route element={<HomeLayout />}>
                <Route path="/" element={<Home myPost={false} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="home" element={<Home myPost={false} />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="myaccount" element={<MyAccount />} />
                <Route path="myposts" element={<MyPosts />} />
                <Route path="savedposts" element={<SavedPosts />} />
                <Route path="mymap" element={<MyMap />} />
                <Route path="posts/:postId" element={<PostDetails />} />
            </Route>
        </Routes>
    );
}

export default App;
