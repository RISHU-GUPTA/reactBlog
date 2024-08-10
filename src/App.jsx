import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentuser()
      .then((res) => {
        console.log(" cuurent user",res)
        if (res) {
         
          dispatch(login({ userData: res }));
        } else {
          dispatch(logout());
        }
      })
      .finally((a) => {
        setLoading(false);
      });
  }, []);

  return !loading ? ( 
  <div className="min-h-screen min-w-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header/>
        <div className="min-h-[40rem]">
        <Outlet/>
        </div>
        <Footer/>
      </div>
  </div>
  ): 'Loading....'
}

export default App;
