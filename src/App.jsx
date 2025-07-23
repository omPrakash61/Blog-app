import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logOut } from "../Auth-Slice/authSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
