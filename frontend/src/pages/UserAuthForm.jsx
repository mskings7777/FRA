import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios";
import { storeInSession } from '../common/Session'
import { useContext } from 'react'
import { UserContext } from '../App'


export default function UserAuthForm({type}) {

    const navigate = useNavigate();

    const { userAuth, userAuth: {username, fullname, email, access_token, dob, profile_img, state, district, mobile_no, role} , setUserAuth } = useContext(UserContext) || {};

    // console.log(userAuth);

    const userAuthThroughServer = (serverRoute, formData) => {

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
    .then(({data}) => {
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);

      if(userAuth){ 
          navigate('/profile');
      }
      
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

    let serverRoute = type === "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // Form Data
    let form = new FormData(document.getElementById("formElement"));
    let formData = {};

    for(let [key, value] of form.entries()){
      formData[key] = value;
    }

    // form Validation

    let {fullname, email, password} = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be atleast 3 letters long")
      } 
    }
 
  if (!email.length) {
      return toast.error("Enter Email")
  }

  if (!emailRegex.test(email)) {
      return toast.error("Email is invalid")
  }

  if (!passwordRegex.test(password)) {
      return toast.error("password should be 6 to 20 letters long with atleast 1 numerical, 1 uppercase, 1 lowercase letters")
  }

  userAuthThroughServer(serverRoute, formData);

  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-green-900/30'>
        <Toaster />
        <section className=''>
            <form id="formElement" className='space-y-5'>
            <h1 className='text-4xl text-green-900/60 flex justify-center'>WELCOME TO VANSETU </h1>
            <div className='w-96 h-auto p-8 ml-0.5 rounded-lg shadow-lg shadow-gray-400 bg-white space-y-5'>
                {   type === 'sign-up' &&
                    <div><input name='fullname' className='w-full bg-green-900/10 p-2 rounded-md focus:outline-none text-zinc-500' placeholder='Full Name' type="text" /></div>
                }
                <div><input name='email' className='w-full bg-green-900/10 p-2 rounded-md focus:outline-none text-zinc-500' placeholder='Email' type="email" /></div>
                <div><input name='password' className='w-full bg-green-900/10 p-2 rounded-md focus:outline-none text-zinc-500' placeholder='Password' type="password" /></div>
                <div className='flex'>
                    <button onClick={handleSubmit} type='submit' className='h-12 bg-green-900/30 rounded-full text-start px-4 hover:opacity-70 cursor-pointer uppercase'>
                        {type.replace("-"," ")}
                    </button>
                    <div className='text-sm text-zinc-500 px-7'>
                        {
                      type === 'sign-up' ? 
                      <>
                       <p>Already have an account</p>
                       <Link to='/signin' className='underline hover:text-black cursor-pointer'>
                        sign in
                       </Link>
                      </>
                      : 
                      <> 
                      <p>Create an account</p>
                      <Link to='/signup' className='underline hover:text-black cursor-pointer'>
                       sign up
                      </Link>
                      </>
                    }
                    </div>
                </div>
            </div>
            </form>
        </section>
    </div>
  )
}
