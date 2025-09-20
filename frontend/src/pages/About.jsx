import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const About = () => {
    const navigate = useNavigate();
    const { userAuth, userAuth: {username, fullname, email, access_token, dob, profile_img, state, district, mobile_no, role} , setUserAuth } = useContext(UserContext) || {};

    useEffect(() => {
        if (Object.keys(userAuth).length < 1) {
            navigate('/signin');
        }
    }, [userAuth]);

  return (
    <div className="bg-green-900/10 text-gray-800 mt-14.5">

      {/* Hero Section */}
      <section
        className="relative shadow-2xl shadow-green-900/60 bg-[url('https://bigcatsindia.com/wp-content/uploads/2024/10/india-forest.webp')] bg-cover bg-center h-72 flex items-center justify-center"
      >
        <div className="bg-black opacity-80 p-6 rounded-lg text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">About VanSetu</h1>
          <p className="mt-3 text-lg">
            Atlas & WebGIS DSS Portal for Empowering Communities
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-900/10 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            About Our Platform
          </h2>
          <div className="w-24 h-1 bg-green-800 mx-auto mb-6 rounded"></div>

          {/* Intro */}
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Founded in 2025, <span className="font-semibold">VanSetu</span> is
            an Atlas & WebGIS Decision Support System (DSS) created to empower
            forest-dwelling communities and support transparent governance. Our
            platform blends modern technology with inclusivity, giving equal
            access to people, NGOs, and government agencies for better
            decision-making.
          </p>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to democratize access to technology for
                forest-dwelling communities while{" "}
                <span className="font-bold text-black-800">
                  strengthening governance mechanisms.
                </span>{" "}
                We aim to ensure that{" "}
                <span className="font-bold text-black-800">
                  data-driven solutions reduce delays
                </span>
                , eliminate manual errors, and bring transparency to the{" "}
                <span className="font-bold text-black-800">
                  FRA claim process.
                </span>
                <br />
                <br />
                By providing easy-to-use{" "}
                <span className="font-bold text-black-800">
                  dashboards, maps, and analytical tools
                </span>
                , VanSetu enables policymakers, NGOs, and Gram Sabhas to make
                informed decisions that respect both people’s rights and
                ecological balance.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To build a future where forest communities can confidently
                exercise their rights with the help of technology, VanSetu
                envisions becoming a trusted digital backbone for{" "}
                <span className="font-bold text-black-800">
                  fair governance, social justice, and sustainable development
                </span>
                . We aim to create a world where every forest dweller has equal
                access to transparent data.
                <br />
                <br />
                Our long-term vision is to strengthen trust between citizens and
                institutions, reduce conflicts over land and resources, and
                promote sustainable growth.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Key Features
              </h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                <li>
                  Simple online maps to see forest land and community rights
                  clearly.
                </li>
                <li>
                  Smart checking system to quickly find mistakes or missing
                  details in claims.
                </li>
                <li>Helps estimate how much time a claim will take to finish.</li>
                <li>
                  Different dashboards for citizens, NGOs, and government
                  officers.
                </li>
                <li>
                  Easy-to-read charts and reports that explain data clearly.
                </li>
                <li>
                  Works well on mobile phones so people in villages can use it
                  easily.
                </li>
              </ul>
            </div>

            {/* Why Choose */}
            <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                Why choose VanSetu
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Unlike traditional systems,{" "}
                <span className="font-bold text-black-800">
                  VanSetu combines transparency, accessibility, and advanced
                  analytics
                </span>{" "}
                under one platform. Communities gain the ability to track their
                claims, governments reduce administrative burden, and NGOs
                receive reliable insights to guide interventions. Our system is
                built with scalability in mind, ensuring that it adapts to
                evolving policies and local requirements.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-green-800 mb-6">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Transparency
                </h4>
                <p className="text-gray-600">
                  We ensure every claim and process is open and easy to
                  understand for all users.
                </p>
              </div>
              <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Inclusivity
                </h4>
                <p className="text-gray-600">
                  Our platform is designed to be used by citizens, NGOs, and
                  policymakers alike.
                </p>
              </div>
              <div className="bg-white border border-green-800 rounded-lg shadow-md p-6 text-left">
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  Innovation
                </h4>
                <p className="text-gray-600">
                  We use modern tools like AI and GIS to make governance smarter
                  and faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-12 pu-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-600">
          ©️ 2025 VanSetu. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;
