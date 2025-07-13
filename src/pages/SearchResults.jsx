import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Slider} from '@mui/material';
import { AccommodationCard } from '../components/AccommodationCard';

export const SearchResults=()=>
{
    const [value, setValue] = useState([0, 8000]); // Default range

    const [accs, setAccs]=useState([]);

    const [duplaccs, setDuplaccs]=useState([]);

    const [ratingFilter, setRatingFilter] = useState([]);

    const [hotelcheck, setHotelcheck]=useState(false);
    const [hostelcheck, setHostelcheck]=useState(false);
    const [villacheck, setVillacheck]=useState(false);
    const [resortcheck, setResortcheck]=useState(false);

    const [accArr, setAccarr]=useState([]);

    const handleHotel=()=>
    {
      if(hotelcheck && !hostelcheck && !villacheck && !resortcheck)
      {
        let newAccarr=accArr.filter((ele)=> ele!=='Hotel');
        setAccarr(newAccarr);
        setAccs(duplaccs);
        return;
      }
      let newAccs;
      if(!hotelcheck)
      {
        setAccarr([...accArr, 'Hotel']);

        newAccs=duplaccs.filter((indiacc)=> accArr.includes(indiacc.type) || indiacc.type==='Hotel');
      }

      if(hotelcheck)
      {
        let newAccarr=accArr.filter((ele)=> ele!=='Hotel');
        setAccarr(newAccarr);

        newAccs=duplaccs.filter((indiacc)=> (accArr.includes(indiacc.type) && indiacc.type!=='Hotel'));
      }
      
      // console.log(newAccs);
      setAccs(newAccs);
    }

    const handleVilla=()=>
    {
        if(!hotelcheck && !hostelcheck && villacheck && !resortcheck)
            {
              let newAccarr=accArr.filter((ele)=> ele!=='Villa');
              setAccarr(newAccarr);
              setAccs(duplaccs);
              return;
            }
            let newAccs;
            if(!villacheck)
            {
              setAccarr([...accArr, 'Villa']);
      
              newAccs=duplaccs.filter((indiacc)=> accArr.includes(indiacc.type) || indiacc.type==='Villa');
            }
      
            if(villacheck)
            {
              let newAccarr=accArr.filter((ele)=> ele!=='Villa');
              setAccarr(newAccarr);
      
              newAccs=duplaccs.filter((indiacc)=> (accArr.includes(indiacc.type) && indiacc.type!=='Villa'));
            }
            
            // console.log(newAccs);
            setAccs(newAccs);
    }

    const handleResort=()=>
    {
        if(!hotelcheck && !hostelcheck && !villacheck && resortcheck)
            {
              let newAccarr=accArr.filter((ele)=> ele!=='Resort');
              setAccarr(newAccarr);
              setAccs(duplaccs);
              return;
            }
            let newAccs;
            if(!resortcheck)
            {
              setAccarr([...accArr, 'Resort']);
      
              newAccs=duplaccs.filter((indiacc)=> accArr.includes(indiacc.type) || indiacc.type==='Resort');
            }
      
            if(resortcheck)
            {
              let newAccarr=accArr.filter((ele)=> ele!=='Resort');
              setAccarr(newAccarr);
      
              newAccs=duplaccs.filter((indiacc)=> (accArr.includes(indiacc.type) && indiacc.type!=='Resort'));
            }
            
            // console.log(newAccs);
            setAccs(newAccs);
    }

    const handleHostel=()=>
        {
            if(!hotelcheck && hostelcheck && !villacheck && !resortcheck)
                {
                  let newAccarr=accArr.filter((ele)=> ele!=='Hostel');
                  setAccarr(newAccarr);
                  setAccs(duplaccs);
                  return;
                }
                let newAccs;
                if(!hostelcheck)
                {
                  setAccarr([...accArr, 'Hostel']);
          
                  newAccs=duplaccs.filter((indiacc)=> accArr.includes(indiacc.type) || indiacc.type==='Hostel');
                }
          
                if(hostelcheck)
                {
                  let newAccarr=accArr.filter((ele)=> ele!=='Hostel');
                  setAccarr(newAccarr);
          
                  newAccs=duplaccs.filter((indiacc)=> (accArr.includes(indiacc.type) && indiacc.type!=='Hostel'));
                }
                
                // console.log(newAccs);
                setAccs(newAccs);
        }

    const navigate=useNavigate();

    const [dduplaccs, setDduplAccs]=useState([]);

    const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);

    let freshAcc=[];
    freshAcc = dduplaccs.filter((ele) => ele.pricePerNight <= newValue[1] && ele.pricePerNight >= newValue[0] &&
    (ratingFilter.length === 0 || ratingFilter.some((r) => ele.rating >= r))
    );
    // console.log(freshAcc);
    
    setDuplaccs(freshAcc);
    handleRangeChange(freshAcc);
    
    };

    const handleRangeChange=(freshAcc)=>
    {
      let ffresh=[];
      ffresh = freshAcc.filter(
        (ele) =>
          (accArr.length === 0 || accArr.includes(ele.type)) &&
          (ratingFilter.length === 0 || ratingFilter.some((r) => ele.rating >= r))
      );
      
      setAccs(ffresh);
    }

    const city=useLocation().state;
     useEffect(()=>{
       
        async function fetchResult()
        {
          try
          {
            const response=await axios.get(`https://flyinn-backend.onrender.com/accommodation/searchresult/${city}`, {withCredentials: true});
            // console.log(response);
            setAccs(response.data.cityAccommodations);
            setDuplaccs(response.data.cityAccommodations);
            setDduplAccs(response.data.cityAccommodations);
          }
          catch(err)
          {
            console.error(err);
          }
        }

        fetchResult();
     },[city]);

    
    const handleAvailability=(hotelname)=>
    {
      navigate(`/indihotel/${hotelname}`);
    }

    useEffect(() => {
      let freshAcc = dduplaccs.filter(
        (ele) =>
          ele.pricePerNight <= value[1] &&
          ele.pricePerNight >= value[0] &&
          (ratingFilter.length === 0 || ratingFilter.some((r) => ele.rating >= r))
      );
    
      let ffresh = freshAcc.filter(
        (ele) => accArr.length === 0 || accArr.includes(ele.type)
      );
    
      setDuplaccs(freshAcc);
      setAccs(ffresh);
    }, [ratingFilter]);
   
    return <>
    <div className='ml-24 mt-15 mb-10 flex w-full'>
        <div className='w-1/5 h-[500px] flex flex-col justify-evenly mr-10 rounded-md'>
             <span className='m-4 font-medium'>Filter by: </span>
             <div className='border-[1px] border-gray-300 flex flex-col justify-evenly'>
                <span className='m-4 font-medium'>Your budget (per night)</span>
                <span className='mx-4 m-2'>Rs. {value[0]} - Rs.{value[1]}</span>
                <div className='m-3 mx-4'>
                <Slider
                    value={value}
                    onChange={(e, newValue)=>{handleChange((newValue))}}
                    valueLabelDisplay="auto"
                    min={0}
                    max={8000}
                    step={100}
                />
                </div>
             </div>
             <div className='border-[1px] border-gray-300 flex flex-col justify-evenly'>
                <span className='mx-4 m-2 font-medium'>Property type</span>
                <div className='flex flex-col justify-evenly mb-2'>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' value={hotelcheck} 
                        onChange={(e)=> {setHotelcheck(e.target.checked); handleHotel();}}/>
                        <span>Hotels</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' value={villacheck} 
                        onChange={(e)=> {setVillacheck(e.target.checked); handleVilla();}}/>
                        <span>Villas</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' value={resortcheck} 
                        onChange={(e)=> {setResortcheck(e.target.checked); handleResort();}}/>
                        <span>Resorts</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' value={hostelcheck} 
                        onChange={(e)=> {setHostelcheck(e.target.checked); handleHostel();}}/>
                        <span>Hostels</span>
                    </div>
                </div>
             </div>

             <div className='border-[1px] border-gray-300 flex flex-col justify-evenly'>
                <span className='mx-4 m-2 font-medium'>Review score</span>
                <div className='flex flex-col justify-evenly mb-2'>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' checked={ratingFilter.includes(9)}
                          onChange={(e) => {
                            const newVal = 9;
                            setRatingFilter((prev) =>
                              e.target.checked ? [...prev, newVal] : prev.filter((r) => r !== newVal)
                            );
                          }}/>
                        <span>Wonderful: 9+</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' checked={ratingFilter.includes(8)}
                          onChange={(e) => {
                            const newVal = 8;
                            setRatingFilter((prev) =>
                              e.target.checked ? [...prev, newVal] : prev.filter((r) => r !== newVal)
                            );
                          }}/>
                        <span>Very Good: 8+</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' checked={ratingFilter.includes(7)}
                          onChange={(e) => {
                            const newVal = 7;
                            setRatingFilter((prev) =>
                              e.target.checked ? [...prev, newVal] : prev.filter((r) => r !== newVal)
                            );
                          }}/>
                        <span>Good: 7+</span>
                    </div>
                    <div className='flex justify-start ml-4'>
                        <input type="checkbox" className='mr-2' checked={ratingFilter.includes(6)}
                        onChange={(e) => {
                          const newVal = 6;
                          setRatingFilter((prev) =>
                            e.target.checked ? [...prev, newVal] : prev.filter((r) => r !== newVal)
                          );
                        }}/>
                        <span>Pleasant: 6+</span>
                    </div>
                </div>
             </div>
        </div>
        <div className='w-3/5 flex flex-col'>
            <span className='text-2xl my-5'>{city}</span>
           {accs.length>0? <div className='flex flex-col justify-evenly'>
                {accs.map((indiacc)=> {return(
                    <AccommodationCard key={indiacc.name} indiacc={indiacc} handleAvailability={handleAvailability}/>
                    )} )}
            </div> : <div>No Accommodation found for selected filters</div>
           }
        </div>
    </div>
    </>
}