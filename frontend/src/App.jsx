import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from './components/Header';
import { createContext } from "react";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UserAuthForm from "./pages/UserAuthForm";
import { lookInSession } from "./common/Session";
import Filters from "./pages/Filter";
import MapView from "./pages/MapView";

export const UserContext = createContext({})


function App() {

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {

    let userInSession = lookInSession("user"); 
     userInSession ? 
     setUserAuth(JSON.parse(userInSession)) 
     :
     setUserAuth({access_token: null})
  }, []);



  return (
    <Router>
      <UserContext.Provider value={{userAuth, setUserAuth}}> 
      <Routes>
          <Route path="/" element={<Header type='user'/>}>
              <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
              <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/main" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/filter" element={<Filters />} />
              <Route path="/map-data" element={<MapView />} />
          </Route>
      </Routes>
      </UserContext.Provider>
    </Router>

  );
}

export default App;
