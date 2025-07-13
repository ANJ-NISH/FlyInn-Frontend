import React from 'react'
import axios from 'axios'

//hook imports
import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from 'react-redux';
import { addinfo} from '../redux/basicinfoSlice';

// icon imports
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

//library imports
import Cookies from "js-cookie";

// context imports
import { signContext } from '../App';


const clientId = "512005958766-388cges373bovg531vhha2egb23fntlm.apps.googleusercontent.com";

export const Sign = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [name, setName]=useState("");

  const dispatch=useDispatch();


  const {signstate, setSignstate}=useContext(signContext);


  console.log(signstate);
  
  const navigate=useNavigate();



  const handleGoogleLogin = () => {
    window.location.href = "https://flyinn-backend.onrender.com/auth/google"; // Redirect to backend

    localStorage.setItem("signstate", JSON.stringify(true));
    setSignstate(true);
  };

  const loginFunc=async()=>
  {
    try
    {

      const response=await axios.post(`https://flyinn-backend.onrender.com/registerorlogin`,{name, email, password}, {withCredentials: true});
      if(response.status===400)
      {
        alert("Wrong user credentials");
      }
      else
      {
        const userinfoObj={name: response.data.name, email: response.data.email, avatar: "abc"};
        dispatch(addinfo(userinfoObj));
        setSignstate(true);
        localStorage.setItem("signstate", JSON.stringify(true));
        navigate('/');
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  

  return (
    <>
    <div className="h-full flex justify-center items-center mt-10 mb-10 px-4">
  <div className="flex flex-col w-full max-w-md"> 
    <p className="text-xl font-semibold text-left mb-2">
      Sign in or create an account
    </p>
    <p className="text-md mb-5">
      Have an account already?  Then log in, otherwise create an account here only
    </p>
    
    <label htmlFor="name" className="text-md font-semibold mb-1">
      Name
    </label>
    <input 
      type="text" 
      id="name" value={name} onChange={(e)=> {setName(e.target.value)}}
      placeholder="Enter your name" 
      className="p-2 h-10 border-2 border-gray-300 w-full mb-3 rounded-md"
    />

    <label htmlFor="email" className="text-md font-semibold mb-1">
      Email address
    </label>
    <input 
      type="email" 
      id="email" value={email} onChange={(e)=> {setEmail(e.target.value)}}
      placeholder="Enter your email address" 
      className="p-2 h-10 border-2 border-gray-300 w-full mb-3 rounded-md"
    />

    <label htmlFor="password" className="text-md font-semibold mb-1">
      Password
    </label>

    <div className="relative w-full mb-5">
      <input  value={password} onChange={(e)=> {setPassword(e.target.value)}}
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        className="p-2 h-10 w-full border-2 border-gray-300 rounded-md"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
      </span>
    </div>

    <button onClick={loginFunc} className="w-full h-10 py-1 text-white text-md bg-blue-500 rounded-md hover:bg-blue-600 transition">
      Continue with email
    </button>

    <div className="flex justify-center items-center my-4">
      <p className="text-sm">or use</p>
    </div>

    <div className="flex justify-center">
      <div className="p-4 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition">
         <GoogleOAuthProvider clientId={clientId}>
          <FcGoogle className="text-2xl" onClick={handleGoogleLogin}/>
          </GoogleOAuthProvider>
          
      </div>
    </div>
  </div>
</div>

    </>
  )
}
