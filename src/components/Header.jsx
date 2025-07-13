import React, { useContext, useEffect } from 'react'
import axios from 'axios'

//library imports
import { FaBed, FaPlane, FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineUser,AiOutlinePhone } from "react-icons/ai";

//hook imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signContext } from '../App';
import { addinfo, removeinfo } from '../redux/basicinfoSlice';

export const Header = () => {


 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const {signstate, setSignstate}=useContext(signContext);
 const [updatestate, setUpdatestate]=useState(signstate);
 const navigate=useNavigate();

 const infoobj= useSelector((state)=> state.basicinfo);
 const dispatch=useDispatch();
 
 const logoutFunc=async ()=>
 {
  try
  {
    const response=await axios.get(`http://localhost:5000/auth/logout`, {withCredentials: true});
    localStorage.setItem("signstate", JSON.stringify(false));
    navigate("/");
    setSignstate(false);
    console.log(response); 
    dispatch(removeinfo());
    setUpdatestate(!updatestate);
  }
  catch(error)
  {
   console.error(error);
  }
 }

 const location=useLocation();

 const [activestate, setActiveState]=useState(location.pathname==="/"? 'Stay': (location.pathname==="/about"? 'About': (location.pathname==="/contact"?'Contact': 'Stay')));


  useEffect(()=> {
    
    async function getUserinfo()
    {
      if(signstate)
      {
        const response=await axios.get(`http://localhost:5000/auth/userinfo`,{withCredentials: true});
        let avatarvar=response.data.userinfo.avatar;
        if(response.data.userinfo.avatar===undefined)
        {
          avatarvar="empty";
        }
        const userinfoObj={name: response.data.userinfo.name, email: response.data.userinfo.email, avatar: avatarvar};
        dispatch(addinfo(userinfoObj));
      }
      
    }

    getUserinfo();
    setActiveState(location.pathname==="/"? 'Stay': (location.pathname==="/about"? 'About': (location.pathname==="/contact"?'Contact': 'Stay')));
    
  }, [location.pathname])


  return (
    <div className='w-full h-28 bg-blue-800 flex flex-col justify-evenly text-white'>
    {/* Top Section (Logo & Hamburger Menu) */}
    <div className='w-full flex justify-between items-center px-4 sm:px-8'>
      <Link to="/">
      <span className='text-2xl font-bold ml-10 sm:ml-44 tracking-widest'>FlyInn.com</span>
      </Link>
      {/* Hamburger Menu Icon for Mobile */}
      <div className='sm:hidden'>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes className='text-white text-2xl' /> : <FaBars className='text-white text-2xl' />}
        </button>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex w-1/3 justify-evenly mr-56">
      <Link to="/listproperty">
      <span className='text-white text-sm sm:text-base cursor-pointer'>List your property</span>
      </Link>
       {!infoobj.name &&<> <Link to="/signin"><button className='cursor-pointer text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm text-sm sm:text-base'>
          Register
        </button>
        </Link>
        <Link to="/signin">
        <button className='cursor-pointer text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm text-sm sm:text-base'>
          Sign in
        </button>
        </Link>
        </>
      }
      {
        infoobj.name && <>
        <span className='text-white text-sm sm:text-base ml-3'>Welcome, {infoobj.name}</span>
        <div className={`border-none rounded-full ml-1 mr-3 h-10 w-8`}>
           {infoobj.avatar=="empty"? <AiOutlineUser className='z-10 w-6 h-6'/>: <img className='z-10 w-8 h-8 rounded-full' src={infoobj.avatar} alt="profile_pic"/>}
        </div>
        <button onClick={logoutFunc} className='cursor-pointer text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm text-sm sm:text-base'>
          Sign out
        </button>
        </>
      }
      </div>
    </div>

    {/* Dropdown Menu for Mobile */}
    {isMenuOpen && (
      <div className='sm:hidden bg-blue-800 text-white flex flex-col items-center py-4'>
        <Link to="/listproperty">
        <span className='text-lg mb-4 cursor-pointer'>List your property</span>
        </Link>
       {!infoobj.name && <>
        <Link to="/signin">
        <button className='text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm mb-4'>
          Register
        </button>
        </Link>
        <Link to="/signin">
        <button className='text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm'>
          Sign in
        </button>
        </Link>
        </>
       }
       {
        infoobj.name && <>
        <span className='text-white text-sm sm:text-base ml-3'>Welcome, {infoobj.name}</span>
        <div className={`border-none rounded-full ml-1 mr-3 h-10 w-6`}>
           {infoobj.avatar=="empty"? <AiOutlineUser className='z-10 w-6 h-6'/>: <img className='z-10 w-6 h-6' src={infoobj.avatar} alt="profile_pic"/>}
        </div>
        <button onClick={logoutFunc} className='text-blue-600 bg-white py-1 px-2 border-0 border-white rounded-sm text-sm sm:text-base'>
          Sign out
        </button>
        </>
       }
      </div>
    )}

    {/* Bottom Navigation Buttons for Desktop */}
    <div className='w-full flex justify-start text-lg mt-1 sm:flex'>
      <Link to="/">
      <button className={`cursor-pointer ml-10 sm:ml-52 mr-8 py-1 px-2 ${activestate==="Stay"? 'border-[1px]  border-white rounded-xl': '' } flex items-center justify-center text-sm sm:text-base`}>
        <FaBed className='mr-2' /> Stays
      </button>
      </Link>
      <Link to="/about">
      <button className={`cursor-pointer py-1 px-2 flex mr-8 ${activestate==="About"? 'border-[1px]  border-white rounded-xl': '' } items-center justify-center text-sm sm:text-base`}>
       <AiOutlineUser className='mr-2' /> About us
      </button>
      </Link>
      <Link to="/contact">
      <button className={`cursor-pointer ${activestate==="Contact"? 'border-[1px]  border-white rounded-xl': '' } py-1 px-2 flex items-center justify-center text-sm sm:text-base`}>
       <AiOutlinePhone className='mr-2' /> Contact us
      </button>
      </Link>
    </div>
  </div>
  )
}
