import React, {useState} from 'react';

import axios from 'axios';

//library imports
import { MdCheck } from "react-icons/md";

export const ListProperty=()=>
{
     
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [propertyData, setPropertydata]=useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    facilities: "",
    description: "",
    price: "",
    rooms: "",
  });

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleUpload = async(e) => {
    
    e.preventDefault();
    setIsUploading(true);

    const finalForm = new FormData();
    Object.keys(propertyData).forEach(key => {
      finalForm.append(key,propertyData[key]);
    });
    Array.from(images).forEach(image => finalForm.append('images', image));

    try
    {
      const response=await axios.post(`http://localhost:5000/accommodation/upload`, finalForm, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response);
      alert('Accommodation uploaded successfully!');
      setPropertydata({
        name: "",
        type: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        facilities: "",
        description: "",
        price: "",
        rooms: "",
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    catch(error)
    {
      console.log(error);
    }
    finally {
      setIsUploading(false);
    }
  };

  const handleDatachange=(e)=>
  {
    setPropertydata({...propertyData, [e.target.name]: e.target.value});
  }

    return (<>

    <div className='w-full mt-20 sm:mt-12 overflow-hidden'>
        <div className='w-full ml-10 sm:ml-52 mb-10 text-5xl font-bold'>
          List with peace of mind
        </div>
        <div className='w-full ml-10 sm:ml-52 mb-16 flex flex-wrap gap-5'> 
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
               <MdCheck className='text-xl mr-2'/>
               <p>
               <span className='text-xl font-semibold'>Damage payments</span> <br />
               Our damage program covers your property in case of damages.
               </p>
           </div>
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
              <MdCheck className='text-xl mr-2'/>
               <p> 
                <span className='text-xl font-semibold'>Get paid and secure your finances</span> <br />
                Get guaranteed payouts and fraud protection through Payments by Booking.com.
                </p>
           </div>
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
              <MdCheck className='text-xl mr-2'/>
               <p> 
                <span className='text-xl font-semibold'>Your own house rules</span> <br />
                Communicate your house rules to potential guests who must agree in order to book.
                </p>
           </div>
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
              <MdCheck className='text-xl mr-2'/>
               <p> 
                <span className='text-xl font-semibold'>Verified guests</span> <br />
                We verify guests' email addresses and credit cards for partners on Payments by Booking.com.
                </p>
           </div>
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
              <MdCheck className='text-xl mr-2'/>
               <p> 
                <span className='text-xl font-semibold'>Choose how you prefer to receive bookings</span> <br />
                Either by letting guests book instantly or by reviewing booking requests before accepting them.
                </p>
           </div>
           <div className='flex items-start w-full sm:w-[40%] gap-1'>
              <MdCheck className='text-xl mr-2'/>
               <p> 
                <span className='text-xl font-semibold'>Robust support</span> <br />
                 Access support in 45 languages and manage your property through Pulse, our app for partners like you.
                </p>
           </div>
        </div>
        <div className='w-full ml-10 sm:ml-52 mb-8 text-3xl font-bold'>
          Fill the form to list your property
        </div>
        

        {isUploading && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white px-6 py-4 rounded shadow text-center">
              <p className="text-blue-600 text-lg font-semibold">Uploading, please wait...</p>
            </div>
          </div>
        )}
        {/* property form */}

      
      
      <form onSubmit={handleUpload} className='max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg'>
    <h2 className='text-3xl font-semibold text-blue-500 mb-6 text-center'>Add Property Details</h2>

    <div className='grid grid-cols-1 gap-6'>
        <div>
            <label htmlFor='nproperty' className='block text-lg font-medium text-blue-500'>Name of the Property</label>
            <input type='text' id='nproperty' name='name' value={propertyData.name} onChange={handleDatachange} className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>

        <div>
            <label className='block text-lg font-medium text-blue-500'>Type of Property</label>
            <select value={propertyData.type} onChange={handleDatachange} name='type' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none'>
                <option value=''>Select an option</option>
                <option value='Hotel'>Hotel</option>
                <option value='Resort'>Resort</option>
                <option value='Villa'>Villa</option>
                <option value='Hostel'>Hostel</option>
            </select>
        </div>

        <div>
            <label className='block text-lg font-medium text-blue-500'>Address</label>
            <input type='text' value={propertyData.address} onChange={handleDatachange} name='address' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        <div>
            <label className='block text-lg font-medium text-blue-500'>City</label>
            <input type='text' value={propertyData.city} onChange={handleDatachange} name='city' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
        <div>
            <label className='block text-lg font-medium text-blue-500'>State</label>
            <input type='text' value={propertyData.state} onChange={handleDatachange} name='state' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        <div>
            <label className='block text-lg font-medium text-blue-500'>Country</label>
            <input type='text' value={propertyData.country} onChange={handleDatachange} name='country' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
        <div>
            <label className='block text-lg font-medium text-blue-500'>PIN Code</label>
            <input type='text' value={propertyData.pin} onChange={handleDatachange} name='pin' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
    </div>

    <div className='mt-4'>
        <label className='block text-lg font-medium text-blue-500'>Facilities Available</label>
        <input type='text' value={propertyData.facilities} onChange={handleDatachange} name='facilities' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
    </div>

    <div className='mt-4'>
        <label className='block text-lg font-medium text-blue-500'>Enter Description</label>
        <textarea value={propertyData.description} onChange={handleDatachange} name='description' className='w-full border border-blue-500 rounded-md p-4 h-28 mt-2 focus:ring-2 focus:ring-blue-500 outline-none'></textarea>
        </div>

    <div className='mt-4'>
        <label className='block text-lg font-medium text-blue-500'>Upload Images</label>
        <input type='file' multiple onChange={handleFileChange} className='w-full border border-blue-500 p-3 rounded-md mt-2' />
    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
        <div>
            <label className='block text-lg font-medium text-blue-500'>Price per Day/Night</label>
            <input type='text' value={propertyData.price} onChange={handleDatachange} name='price' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
        <div>
            <label className='block text-lg font-medium text-blue-500'>Available Rooms</label>
            <input type='text' value={propertyData.rooms} onChange={handleDatachange} name='rooms' className='w-full border border-blue-500 rounded-md h-12 px-4 mt-2 focus:ring-2 focus:ring-blue-500 outline-none' />
        </div>
    </div>

    <div className='mt-6 flex justify-center'>
        <button type='submit' className='bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition text-lg font-medium'>Submit</button>
    </div>
</form>
    </div>
    </>)
}