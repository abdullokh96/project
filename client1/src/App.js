import "./App.css";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import Header from "./components/header/header";
import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { getMeReduxServices } from "./redux/services";
import { useSelector, useDispatch } from "react-redux";
import React, {useEffect} from 'react'
import Post from "./components/post/Post";

function App() {

  const {user} = useSelector(state => state.authReducer)
  console.log(user);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMeReduxServices())
  }, [])



  return (
    <div className="App">
      <Header />
      {/* <Register />
      <Login />
      <Home /> */}
      <Container maxWidth='lg'>
        <Routes>
          <Route path="/" element={user.fullName?<Home/>:<Register/>} />
          <Route path="/auth/register" element={user.fullName?<Navigate to='/' replace />:<Register/>} />
          <Route path="/auth/sign-in" element={user.fullName?<Navigate to='/' replace />:<Login/>} />
          <Route path="/posts" element={<Post/>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
