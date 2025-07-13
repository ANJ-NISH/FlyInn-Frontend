import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import { FaHeart, FaPencilAlt } from "react-icons/fa";

import DateRangePicker from '../components/DateRangePicker';
import GuestSelector from '../components/GuestSelector';
import { FeedbackForm } from '../components/FeedbackForm';
import { CommentsSection } from '../components/CommentsSection';


export const HotelDesc = () => {

    const {hotelname}=useParams();

    const [hotelinfo, setHotelinfo]=useState();

    const [isOpen, setIsOpen] = useState(false);

    const [loadedImages, setLoadedImages] = useState(new Set());

    const handleImageLoad = (url) => {
    setLoadedImages((prev) => new Set(prev).add(url));
    };


    const navigate=useNavigate();

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(""); 
    
    const [rating, setRating] = useState('1');
    const [comment, setComment] = useState('');


    const [commentData, setCommentData]=useState([]);
    
    
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    

    useEffect(()=>{
    
        async function getindiinfo()
        {
            try
            {
               const response=await axios.get(`https://flyinn-backend.onrender.com/hotels/getindi/${hotelname}`,{withCredentials: true} );
            //    console.log(response.data.indihotel);
               setHotelinfo(response.data.indihotel);
               setCommentData([response.data.indihotel[0].rating, response.data.indihotel[0].reviews]);
            }
            catch(err)
            {
                console.log(err);
            }
        }

        getindiinfo();
    },[hotelname])

    
    const handleReserve=()=>
    {
        if(endDate==="")
        {
            alert("Please select end date of your stay");
            return;
        }

        navigate('/filldetails', {state: {hotelinfo: hotelinfo, startDate: startDate, endDate: endDate, adults: adults, children: children, rooms: rooms}});
    }

  return (
    <>
    <div className='w-full mt-9'>
               <div className='ml-10 sm:ml-52 w-5/6 flex flex-col sm:flex-row'>
                    <div className='border-4 text-black border-yellow-400 h-14 w-full sm:w-4/12 rounded-lg flex items-center justify-start'>
                         <DateRangePicker today={today} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
                    </div>
                    <div className='border-4 text-black border-yellow-400 h-14 w-full sm:w-4/12 rounded-lg'>
                        <GuestSelector adults={adults} setAdults={setAdults} children={children} setChildren={setChildren}
                        rooms={rooms} setRooms={setRooms}/>
                    </div>
               </div>
     </div>



    <div className="container max-w-screen-xl mt-20 sm:mt-12">

        <div className='flex flex-col'>
            
        <div className="flex">
              {hotelinfo?<h1 className="w-full ml-10 sm:ml-44 mb-2 text-2xl font-semibold">{hotelinfo[0].name}</h1>:<></>}
            <div className="flex justify-between items-center mr-35">
            <FaHeart className="text-2xl text-blue-300 mr-3" />
            <button onClick={handleReserve} className="cursor-pointer text-md text-white bg-blue-500 rounded-md h-12 w-20">Reserve</button>
                </div>
            </div>

            {hotelinfo? <span className='text-md ml-10 sm:ml-44 mb-10'>{hotelinfo[0].address}</span>:<></>}
        </div>
        
        {hotelinfo ? (
  <div className='flex ml-10 sm:ml-44 gap-1'>

    
    <div className="relative h-96 w-auto">
      {!loadedImages.has(hotelinfo[0].images[0]) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-lg">
          Loading image...
        </div>
      )}
      <img
        src={hotelinfo[0].images[0]}
        alt=""
        className="h-96 w-auto object-cover"
        style={{ visibility: loadedImages.has(hotelinfo[0].images[0]) ? "visible" : "hidden" }}
        onLoad={() => handleImageLoad(hotelinfo[0].images[0])}
      />
    </div>

    
    <div className='flex flex-col gap-1 ml-2'>
      {hotelinfo[0].images.slice(1, 4).map((img, idx) => (
        <div key={idx} className="relative h-32 w-48">
          {!loadedImages.has(img) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-sm">
              Loading image...
            </div>
          )}
          <img
            src={img}
            alt=""
            className="h-32 w-48 object-cover"
            style={{ visibility: loadedImages.has(img) ? "visible" : "hidden" }}
            onLoad={() => handleImageLoad(img)}
          />
        </div>
            ))}
            </div>

        </div>
        ) : null}


        {hotelinfo? <div className='flex ml-10 sm:ml-44 text-sm w-3/4 mt-8'>
            {hotelinfo[0].description}
        </div>: <></>
        }
        
        {hotelinfo? <div className='flex justify-between ml-10 sm:ml-44 mt-10'>
            
            <div className='flex flex-col justify-evenly'>
              <span className='text-md font-semibold mb-2'>Most popular facilities</span>
              
              
            <div className='flex flex-col justify-start text-sm mb-5'>
                {hotelinfo[0].facilities.map((facility)=> <span key={facility}>{facility}</span>)}
            </div>
            </div>
            

            <div className='flex flex-col justify-evenly'>
               <button className='flex align-center justify-evenly mr-34 w-56 text-bold rounded-sm px-4 py-2 border-[1px] border-blue-700 text-blue-700'>
              <FaHeart className="text-xl text-blue-300 mr-3" />
                Save the property</button>

                <button onClick={()=> setIsOpen(true)} className='flex  align-center justify-evenly mr-34 w-56 text-bold rounded-sm px-4 py-2 border-[1px] border-blue-700 text-blue-700'>
                <FaPencilAlt className="text-xl text-blue-400 mr-1" />
              Write a review
              </button>
              </div>
        </div>: <></>
        }

       {commentData.length!==0? <CommentsSection commentData={commentData}/>:<></> }

        {isOpen && 
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

          {isOpen && (<FeedbackForm hotelname={hotelname} setIsOpen={setIsOpen} rating={rating} setRating={setRating}
          comment={comment} setComment={setComment}/>)}
        </div>
        }
    </div>
    </>
  )
}
