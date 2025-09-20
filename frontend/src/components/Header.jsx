import React, { useContext, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import UserNavigationalPanel from './UserNavigationalPanel'

export default function Header() {
  const navigate = useNavigate();
  const { userAuth, userAuth: {username, fullname, email, profile_img , access_token} , setUserAuth } = useContext(UserContext) || {};


  // const [showNavbar, setShowNavbar] = useState(true);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const handleUserNavPanel = () => {
    setUserNavPanel(currentVal => !currentVal);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  }

  return (
    <>
      <header className="fixed z-30 h-14 top-0 flex items-center w-screen px-40 shadow-md shadow-zinc-500 bg-white">
        {/* Logo */}
        <div className="text-4xl cursor-default">VanSetu</div>

        {/* Nav Links */}
        <div className="cursor-not-allowed flex flex-grow justify-center space-x-6">
          {[
            { to: "/home", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/profile", label: "Profile" },
            { to: "/main", label: "Main" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-4 px-6 font-medium transition-colors duration-300 ${
                  isActive ? "text-black" : "text-zinc-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Auth Links */}
        
        <div className="flex space-x-6">
          {
             userAuth && access_token ?
             <>
                <div onBlur={handleBlur} onClick={handleUserNavPanel} className={`flex items-center ${(userAuth) ? "" : "space-x-2"} `}>
              <button className='w-10 h-10 xs:fixed xs:left-3 xs:top-2'>
                <img className='w-full h-full object-cover rounded-full' src={profile_img ? profile_img : ``} alt="" />
              </button>

              {
                userNavPanel
                ?
                <UserNavigationalPanel size={3} elements={["accounts-create", `profile-user/${username}`, "settings-setting"]} />
                :
                ""
              }
               </div>
                {/* <button
                  onClick={() => {
                    setUserAuth(null);
                    sessionStorage.removeItem("user");
                  }}
                  className="py-2 px-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                >
                  Log out
                </button> */}
             </>
             :
          [
            { to: "/signin", label: "Log in" },
            { to: "/signup", label: "Sign up" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-4 px-2 font-medium transition-colors duration-300 ${
                  isActive ? "text-black" : "text-zinc-500 hover:text-black"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </header>
      <Outlet />
    </>
  );
}
