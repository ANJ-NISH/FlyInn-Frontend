import { MdCheckCircle } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

import { useState } from 'react';

export const FillDetails=()=>
{

   const [detailsstate, setDetails]=useState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      country: "",
   });

    const {hotelinfo, startDate, endDate, adults, children, rooms}=useLocation().state;

    const [year, month, day]=startDate.split('-');

    const nstartDate=new Date(`${year}-${month}-${day}`);

    const navigate=useNavigate();

    const fstartDate= nstartDate.toLocaleDateString('en-GB',{
      day: '2-digit',
      month:'short',
      year: 'numeric'
    });

    const fendDate=endDate.toLocaleDateString('en-GB',{
      day: '2-digit',
      month:'short',
      year: 'numeric'
    });

    function getNightsBetweenDates(startDateStr, endDateStr) {
      const start = new Date(startDateStr);
      const end = new Date(endDateStr);
    
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
    
      const millisecondsPerNight = 1000 * 60 * 60 * 24;
    
      const nights = (end - start) / millisecondsPerNight;
    
      return nights;
    }

    const noofnights=getNightsBetweenDates(nstartDate, endDate);

    const totalprice=noofnights*adults* hotelinfo[0].pricePerNight+ noofnights*children* (hotelinfo[0].pricePerNight/2);

    const handleSubmit=()=>
    {
      if(detailsstate.firstname==="" || detailsstate.lastname==="" || detailsstate.email===""
      || detailsstate.country==="" || detailsstate.phone===""
      )
      {
        alert("Please fill all the required details");
        return;
      }

      navigate('/confirmpage', {state: {hotelinfo: hotelinfo, startDate: startDate, endDate: endDate, adults: adults, children: children, rooms: rooms}});
    }

    return<>
    <div className='flex items-center w-full mt-10 mb-10'>
       <div className='flex items-center ml-32'>
       <MdCheckCircle size={24} color="blue" />
       <span className='mx-2'>Your Selection</span>
       </div>
       <div className='w-1/5 h-[1px] border-[1px] border-gray-500 m-0 ml-4'>
       </div>
       <div className='flex items-center ml-4'>
       <div className='h-5 w-6 rounded-full bg-blue-600 text-white p-2 flex items-center'>
         <span>2</span>
       </div>
       <span className='mx-2'>Your Details</span>
       </div>
       <div className='w-1/5 h-[1px] border-[1px] border-gray-500 m-0 ml-4'>
       </div>
       <div className='flex items-center ml-4'>
       <div className='h-5 w-6 rounded-full border-2 border-gray-500 p-2 flex items-center'>
         <span>3</span>
       </div>
       <span className='mx-2'>Finish Booking</span>
       </div>
    </div>


    <div className='w-full flex'>
       <div className='ml-32 w-2/7 flex flex-col'>
        <div className='p-3 border-[1px] border-gray-300 flex flex-col justify-evenly mb-5'>
          <span className='text-xs mb-2'>{hotelinfo[0].type}</span>
          <span className='text-md font-medium mb-2'>{hotelinfo[0].name}</span>
          <span className='text-sm mb-2'>{hotelinfo[0].address}</span>
          <ul className='flex flex-wrap justify-start mb-2 list-disc'>
            {hotelinfo[0].facilities.map((indiface)=> {return(<li className='text-xs m-3' key={indiface}>{indiface}</li>)})}
          </ul>
        </div> 

        <div className='p-3 border-[1px] border-gray-300 flex flex-col justify-evenly mb-5'>
           <span className='mb-2 text-md font-medium'>Your booking details</span>
           <div className='flex mb-4'>
               <div className='flex flex-col justify-evenly mr-14'>
                  <span className='text-sm text-normal mb-1'>Check-in</span>
                  <span className='font-medium mb-1'>{fstartDate}</span>
                  <span className='text-sm text-gray-500'>From 2:00 PM</span>
               </div>
               <div className='flex flex-col justify-evenly'>
                  <span className='text-sm text-normal mb-1'>Check-out</span>
                  <span className='font-medium mb-1'>{fendDate}</span>
                  <span className='text-sm text-gray-500'>Untill 11:00 AM</span>
               </div>
           </div>
           <span className='text-sm'>Total length of stay:</span>
           <span className='mb-5 font-medium'>{noofnights} {noofnights===1? 'night': 'nights'}</span>

           <div className='flex flex-col justify-evenly'>
              <span className='mb-2 font-normal text-sm'>You selected</span>
              <span className='mb-1 font-medium text-md'>{`${rooms} rooms for ${adults} adults and ${children} children`}</span>
              <span className='text-blue-500'>change your selection</span>
           </div>
        </div>

        <div className='p-3 border-[1px] border-gray-300 flex bg-blue-50 justify-between items-center mb-5'>
         
         <span className='text-2xl font-semibold'>Price</span>
         <div className='flex flex-col justify-evenly'>
            <span className='text-2xl font-semibold'>Rs. {totalprice}</span>
            <span className='text-md font-normal text-gray-400'>Rs. {noofnights*adults* hotelinfo[0].pricePerNight} ({noofnights}*{adults}*{hotelinfo[0].pricePerNight} for adults)</span>
            <span className='text-md font-normal text-gray-400'>Rs. {noofnights*children* (hotelinfo[0].pricePerNight/2)} ({noofnights}*{children}* {(hotelinfo[0].pricePerNight/2)} for child/children)</span>
         </div>

        </div>
       </div>
       
       <div className='flex flex-col ml-5 w-4/7'>

       <div className='w-full h-96 p-3 border-[1px] border-gray-300 flex flex-col justify-evenly'>
           <span className='text-md font-medium'>Enter your details</span>
           <div className='flex w-full'>
             <div className='flex flex-col mr-5 w-2/5'>
               <label htmlFor="" className='text-sm font-normal mb-1'>First name*</label>
               <input type="text" value={detailsstate.firstname} onChange={(e)=> setDetails({...detailsstate, firstname: e.target.value})} className='border-[1px] border-gray-700 p-2 rounded-sm h-9'/>
             </div>
             <div className='flex flex-col w-2/5'>
               <label htmlFor="" className='text-sm font-normal mb-1'>Last name*</label>
               <input type="text" value={detailsstate.lastname}
               onChange={(e)=> setDetails({...detailsstate, lastname: e.target.value})}
                className='border-[1px] border-gray-700 p-2 rounded-sm h-9'/>
             </div>
           </div>
           <div className='w-2/5 flex flex-col'>
               <label htmlFor="" className='text-sm font-normal mb-1'>Email address*</label>
               <input type="email" value={detailsstate.email}
               onChange={(e)=> setDetails({...detailsstate, email: e.target.value})}
               className='border-[1px] border-gray-700 p-2 rounded-sm h-9'/>
           </div>
           <div className='w-2/5 flex flex-col'>
               <label htmlFor="" className='text-sm font-normal mb-1'>Phone number*</label>
               <input type="number" value={detailsstate.phone}
               onChange={(e)=> setDetails({...detailsstate, phone: e.target.value})}
                className='border-[1px] border-gray-700 p-2 rounded-sm h-9'/>
           </div>
           <div className='w-2/5 flex flex-col'>
               <label htmlFor="" className='text-sm font-normal mb-1'>Country/Region*</label>
               <select name="" id="" value={detailsstate.country}
               onChange={(e)=> setDetails({...detailsstate, country: e.target.value})}
                className='border-[1px] border-gray-700 p-2 rounded-sm h-9'>
                  <option value="" default>Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Germany">Germany</option>
                  <option value="Nepal">Nepal</option>
                  <option value="UK">UK</option>
               </select>
           </div>
       </div>

         <div className='flex justify-end mt-5'>
            <button onClick={handleSubmit}
            className='h-12 w-44 cursor-pointer rounded-sm text-white text-md font-medium bg-blue-500 px-3 py-2'>Next: Final details {`>`}</button>
         </div>
       </div>
      
    </div>
    </>
}