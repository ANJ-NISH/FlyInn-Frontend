import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

//library imports
import { FaBed} from 'react-icons/fa';
import { Link } from 'react-router-dom';

//component imports
import DateRangePicker from '../components/DateRangePicker';
import GuestSelector from '../components/GuestSelector';
import ImageCarousel from '../components/ImageCarousel';

export const StayHome = () => {

const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
const [startDate, setStartDate] = useState(today);
const [endDate, setEndDate] = useState("");  


const [adults, setAdults] = useState(2);
const [children, setChildren] = useState(0);
const [rooms, setRooms] = useState(1);

const citiesarr=["Delhi", "Gurugram", "Noida", "Jaipur", "Mumbai", "Rishikesh", "Goa", 
  "Varanasi", "Agra", "Greater Noida", "Udaipur", "Jodhpur"];

const [inputCities, setInputCities]=useState([]);  

const [selectedCity, setSelectedCity]=useState("");

const navigate=useNavigate();

const handleCityInput=(e)=>
  {
    const tofind=e.target.value;

    setSelectedCity(tofind);

    if(tofind==="")
    {
      setInputCities([]);
      return;
    }
    const extractCities=citiesarr.filter((city)=> city.toLowerCase().startsWith(tofind.toLowerCase()));

    setInputCities(extractCities);
  } 

const searchFunc=()=>
  {
    if(selectedCity==="" || (startDate==="" || endDate===""))
    {
      alert("Please select all the reservation options");
      return;
    }

    navigate('/searchresult', {state: selectedCity});
  }  

  return (
    <>
    <div className='w-full mt-20 sm:mt-12'>
        <div className='ml-10 sm:ml-36 flex flex-col'>
           <div className='text-4xl font-extrabold tracking-wide'>
            Find your next stay
           </div>
           <div className='text-xl font-medium tracking-wide mt-4'>
             Search deals on hotels, villas, and much more...
           </div>
        </div>
        <div className='w-full mt-9'>
           <div className='ml-10 sm:ml-36 w-5/6 flex flex-col sm:flex-row'>
                <div className='border-4 border-yellow-400 h-14 w-full sm:w-3/12 flex items-center justify-start rounded-lg'>
                     <FaBed className='mr-2 ml-4' />
                    <input type="text" value={selectedCity} onChange={(e)=> handleCityInput(e)} className='border-none outline-none placeholder:text-black'  name="" id="" placeholder='Where are you going?'/>
                </div>
                <div className='border-4 text-black border-yellow-400 h-14 w-full sm:w-4/12 rounded-lg flex items-center justify-start'>
                     <DateRangePicker today={today} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
                </div>
                <div className='border-4 text-black border-yellow-400 h-14 w-full sm:w-4/12 rounded-lg'>
                    <GuestSelector adults={adults} setAdults={setAdults} children={children} setChildren={setChildren}
                    rooms={rooms} setRooms={setRooms}/>
                </div>
                <div className='border-4 border-yellow-400 h-14 w-full sm:w-1/12 rounded-lg'>
                  <button onClick={searchFunc} className='cursor-pointer text-xl bg-blue-500 w-full h-full text-white m-0 p-2 border-none rounded-md'>Search</button>
                </div>
           </div>
        </div>
         
        {inputCities.length>0? <div className='w-full mt-2'>
          <div className='ml-10 sm:ml-36 z-10 w-full sm:w-3/12 flex flex-col border-[1px] shadow-md rounded-md'>
           {inputCities.map((city)=> <span key={city} onClick={()=> {setSelectedCity(city); setInputCities([]);}} className='text-md border-b-[1px] px-3 py-2 rounded-md'>{city}</span>)}
          </div>
          </div>:<></>}

  <div className="w-full mt-20 mb-10">
  <div className="ml-10 sm:ml-36 w-5/6 flex flex-col gap-4">
    <span className="text-2xl font-semibold mb-2 text-black">
      Trending destinations
    </span>

    {/* First Row */}
    <div className="flex flex-wrap justify-center sm:justify-between gap-4 mb-12">
      <Link to="/searchresult" state={`Jaipur`} className="h-64 w-full sm:w-[48%] object-cover rounded-lg">
      <img
        src="../public/trenddest/jaipur.png"
        alt="Amer Fort"
        
      />
      </Link>
      
      <Link to="/searchresult" state={`Delhi`} className="h-64 w-full sm:w-[48%] object-cover rounded-lg">
      <img
        src="../public/trenddest/delhi.png"
        alt="Humayun's Tomb"
      />
      </Link>
      
    </div>
    
     {/* Second Row */}
    <div className="flex flex-wrap justify-center sm:justify-between gap-4">
    <Link to="/searchresult" state={`Agra`} className="h-64 w-full sm:w-[32%] object-cover rounded-lg">
    <img
        src="../public/trenddest/agra.png"
        alt="Taj Mahal"
      />
    </Link>
      
    <Link to="/searchresult" state={`Udaipur`} className="h-64 w-full sm:w-[32%] object-cover rounded-lg">
    <img
        src="../public/trenddest/udaipur.png"
        alt="Pichola Lake"
      />
    </Link>
      
    <Link to="/searchresult" state={`Jodhpur`} className="h-64 w-full sm:w-[32%] object-cover rounded-lg">
      <img
        src="../public/trenddest/jodhpur.png"
        alt="Jodhpur Fort"
      />
      </Link>
    </div>
  </div>
</div>

<div className='w-full mt-24 mb-24'>
<div className="ml-10 sm:ml-36 w-5/6 flex flex-col gap-2">
<span className="text-2xl font-semibold mb-2 text-black">
      Browse by property type
    </span>

    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      
      <div className='h-52 w-[48%] sm:w-[24%] flex flex-col justify-start'>
      <Link to="/allhotels">
      <img
        src="../public/property/hotel.png"
        alt="hotel"
        className="h-full w-full object-cover rounded-lg"
      />
      </Link>
      <span className='text-md mt-3 font-medium text-black'>Hotels</span>
      
      </div>
      
      
      <div className='h-52 w-[48%] sm:w-[24%] flex flex-col justify-start'>
        <Link to="/allresorts">
        <img
        src="../public/property/resort.png"
        alt="resort"
        className="h-full w-full object-cover rounded-lg"
      />
        </Link>
      <span className='text-md mt-3 font-medium text-black'>Resorts</span>
      </div>
      
      <div className='h-52 w-[48%] sm:w-[24%] flex flex-col justify-start'>
      <Link to="/allvillas">
      <img
        src="../public/property/villas.png"
        alt="villas"
        className="h-full w-full object-cover rounded-lg"
      />
      </Link>
      <span className='text-md mt-3 font-medium text-black'>Villas</span>
      </div>

      <div className='h-52 w-[48%] sm:w-[24%] flex flex-col justify-start'>
      <Link to="/allhostels">
      <img
        src="../public/property/hostels.png"
        alt="hostel"
        className="h-full w-full object-cover rounded-lg"
      />
      </Link>
      <span className='text-md mt-3 font-medium text-black'>Hostels</span>
      </div>
    </div>
</div>
</div>

<div className="ml-10 sm:ml-36 w-5/6 flex flex-col mt-16 mb-10">
<span className="text-2xl font-semibold mb-2 text-black">
      Explore India
  </span>
<ImageCarousel/>
</div>

    </div>
    </>
  )
}