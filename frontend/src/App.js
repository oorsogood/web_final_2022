import { Routes, Route } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import HomeLayout from "./components/HomeLayout";
import "./App.css";
import LoginPage from "./containers/account/Login";
import SignUpPage from "./containers/account/SignUp";
import CreatePost from "./containers/main/CreatePost";
import Home from "./containers/main/Home";
import MyPosts from "./containers/main/MyPosts";
import MyMap from "./containers/main/MyMap";
import PostDetails from "./containers/main/PostDetails";

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home myPost={false} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Route>
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="home" element={<Home myPost={false} />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="myposts" element={<MyPosts />} />
        <Route path="mymap" element={<MyMap />} />
        <Route path="posts/:postId" element={<PostDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
