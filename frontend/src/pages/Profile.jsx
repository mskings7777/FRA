// Profile.jsx
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
import { logoutUser, storeInSession } from "../common/Session";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const { userAuth, userAuth: {username, fullname, email, access_token, dob, profile_img, state, district, mobile_no, role} , setUserAuth } = useContext(UserContext) || {};

    const [limit, setLimit] = useState(false);

    console.log(Object.keys(userAuth).length)

    const userAuthThroughServer = (serverRoute, formData) => {

        console.log("working2");

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
    .then(({data}) => {
        console.log(data)
      logoutUser();
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
      console.log(data)
      navigate('/home');
    })
    .catch((err) => {
      console.error("Auth error:", err); // see the whole error in console
      const message = err?.response?.data?.error 
        || err?.message 
        || "Something went wrong. Please try again.";
      toast.error(message);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = "/updateAllUserData";

    // Form Data
    let form = new FormData(document.getElementById("formElement"));
    let formData = {};
    
    for (let [key, value] of form.entries()) {
    formData[key] = value;
    }
    formData["email"] = email;

    console.log("working1");

  userAuthThroughServer(serverRoute, formData);

  }

  useEffect(() => {
    if (Object.keys(userAuth).length > 5){
        setLimit(true);
    }else{
        setLimit(false);
    }
  }, []);


  return (
    <div className="relative">
        {/*  Account Edit Page Start    */}

        <Toaster />
            <section className={` ${(limit) ? "hidden " : "block "}  w-screen h-screen bg-green-900/30  flex justify-center items-center overflow-y-scroll pt-20 `}>
                <form id="formElement" className="rounded-md text-black h-auto w-[35%] space-y-5 pt-5 pb-5 px-10 mt-20 mb-5 overflow-y-scroll">

                    <div className="rounded-md shadow bg-white flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>Mobile No:</div>
                            <input name="mobile_no" className="bg-green-900/30 w-80" type="text" />
                        </div>
                    </div>

                    <div className="rounded-md shadow bg-white flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>DOB:</div>
                            <input name="dob" className="bg-green-900/30 w-80" type="text" />
                        </div>
                    </div>


                    <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>Role Selection:</div>
                            <div><input name="role" className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div>

                    <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>State:</div>
                            <div><input name="state" className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div>

                    <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>District:</div>
                            <div><input name="district" className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div>

                    <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>Profile Image:</div>
                            <div><input name="profile_img" className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div>
                    {/* <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>District:</div>
                            <div><input className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div>
                    <div className="rounded-md shadow bg-white items-center flex justify-center  py-5">
                        <div className="space-y-1.5">
                            <div>District:</div>
                            <div><input className="bg-green-900/30 w-80" type="text" /></div>
                        </div>
                    </div> */}

                    <button onClick={handleSubmit} type='submit' className="w-full hover:opacity-80 cursor-pointer rounded-md shadow bg-white items-center flex justify-center py-5">
                        Submit
                    </button>

                </form>
            </section>

        {/*  Account Edit Page End    */}
    <div className={` ${(limit) ? "block " : "hidden "} bg-green-900/30 text-gray-800 pu-20 pt-15.5`}>
        

      {/* Profile Section */}
      <section className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-5xl p-6 bg-white border-2 border-green-600 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0 text-center">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="rounded-full w-40 h-40 border-4 border-green-600 ring ring-green-300 shadow-md mx-auto"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">USER NAME</h2>
            <p className="text-gray-800 text-sm">Member of Village Community</p>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">👤</span> User Information
            </h3>

            {/* Info Grid */}
            <div className="flex flex-col md:flex-row md:space-x-10 space-y-6 md:space-y-0 text-gray-700">
              {/* Personal Info */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner w-full">
                <p>
                  <strong>Date of Birth:</strong> 15 Jan 2004
                </p>
                <p>
                  <strong>Gender:</strong> Male
                </p>
                <p>
                  <strong>Contact:</strong> +91 9876543210
                </p>
                <p>
                  <strong>Email:</strong> akshat@example.com
                </p>
                <p>
                  <strong>ID Verification:</strong> ✅ Aadhaar Verified
                </p>
              </div>

              {/* Village Info */}
              <div className="bg-gray-50 p-4 rounded-xl shadow-inner w-full">
                <p>
                  <strong>Village:</strong> Siwaha
                </p>
                <p>
                  <strong>Tehsil:</strong> Safidon
                </p>
                <p>
                  <strong>District:</strong> Jind
                </p>
                <p>
                  <strong>State:</strong> Haryana
                </p>
                <p>
                  <strong>Category:</strong> OBC
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mt-6 bg-white shadow-md rounded-lg px-6 py-4 flex flex-wrap justify-center gap-6 text-gray-600 font-medium border-green-600">
        {["personal", "claims", "assets", "dss", "activity"].map((id, i) => (
          <a
            key={i}
            href={`#${id}`}
            className="relative pb-1 hover:text-green-700 transition group"
          >
            {id === "personal" && "Personal Info"}
            {id === "claims" && "FRA Claims"}
            {id === "assets" && "Assets"}
            {id === "dss" && "DSS Recommendations"}
            {id === "activity" && "Activity"}
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-green-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* District Report + Claims */}
      <section className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row gap-6">
        {/* District Report */}
        <div
          id="district-report"
          className="flex-1 bg-white border-2 border-green-600 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            📊 District Claims Report
          </h3>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-green-50 text-gray-800">
              <tr>
                <th className="p-2 border">Tehsil</th>
                <th className="p-2 border">Total Claims</th>
                <th className="p-2 border">Approved</th>
                <th className="p-2 border">Pending</th>
                <th className="p-2 border">Rejected</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Safidon", 120, 80, 30, 10],
                ["Narwana", 95, 60, 25, 10],
                ["Jind City", 110, 70, 30, 10],
                ["Karnal Border", 80, 50, 20, 10],
              ].map(([t, total, a, p, r], i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-2 border">{t}</td>
                  <td className="p-2 border">{total}</td>
                  <td className="p-2 border text-green-600 font-semibold">{a}</td>
                  <td className="p-2 border text-yellow-600 font-semibold">{p}</td>
                  <td className="p-2 border text-red-600 font-semibold">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FRA Claims */}
        <div
          id="claims"
          className="flex-1 bg-white border-2 border-green-600 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            📑 FRA Claim Details
          </h3>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-indigo-50 text-gray-800">
              <tr>
                <th className="p-2 border">Claim ID</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Area (Acres)</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["IFR-12345", "Individual", "3.5", "Approved", "10-Apr-2024"],
                ["CR-56789", "Community", "12.0", "Pending", "22-May-2024"],
                ["IFR-12345", "Individual", "3.5", "Approved", "10-Apr-2024"],
                ["CR-56789", "Community", "12.0", "Pending", "22-May-2024"],
                ["IFR-67890", "Individual", "2.0", "Rejected", "05-Jun-2024"],
                ["CR-98765", "Community", "8.5", "Approved", "15-Jul-2024"],
              ].map(([id, type, area, status, date], i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="p-2 border">{id}</td>
                  <td className="p-2 border">{type}</td>
                  <td className="p-2 border">{area}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      status === "Approved"
                        ? "text-green-600"
                        : status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </td>
                  <td className="p-2 border">{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Assets + DSS */}
      <section className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row gap-6">
        {/* Assets */}
        <div
          id="assets"
          className="flex-1 bg-white border-2 border-green-600 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            🏡 Mapped Assets
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Agricultural Land:</strong> 3 Acres
            </li>
            <li>
              <strong>Water Bodies:</strong> 1 Pond
            </li>
            <li>
              <strong>Forest Cover:</strong> 10 Hectares
            </li>
            <li>
              <strong>Nearby Infrastructure:</strong> Road, School, Health
              Center
            </li>
          </ul>
        </div>

        {/* DSS Recommendations */}
        <div
          id="dss"
          className="flex-1 bg-white border-2 border-green-600 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition"
        >
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            💡 DSS Recommendations
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✅ Eligible for <strong>PM-KISAN</strong>
            </li>
            <li>
              ✅ Eligible for <strong>Jal Jeevan Mission</strong> (suggest
              borewell)
            </li>
            <li>
              ✅ Eligible for <strong>MGNREGA</strong> (farm pond construction)
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600">
          ©️ 2025 FRA Atlas. All Rights Reserved.
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Profile;
