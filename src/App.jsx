import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logOut } from "../Auth-Slice/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const res = authService.getCurrentUser();
    res.then((userData) => {
      if (userData) dispatch(login(userData));
      else dispatch(logOut());
    });
    res.catch((e) => console.log(e));
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
