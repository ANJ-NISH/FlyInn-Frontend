import { useState } from "react";


import { MdCheck } from 'react-icons/md';

export const AccommodationCard = ({ indiacc, handleAvailability }) => {
    
    const [loadedImages, setLoadedImages] = useState(new Set());

    const handleImageLoad = (url) => {
    setLoadedImages((prev) => new Set(prev).add(url));
    };

  
    return (
      <div className='mb-3 border-[1px] border-gray-300 rounded-lg'>
        <div className='m-3 flex'>
        {(!loadedImages.has(indiacc.images[0])) && (
            <div className='w-56 h-56 rounded-md flex items-center justify-center bg-gray-200 text-gray-500'>
            Loading image...
            </div>
        )}
          <img
                src={indiacc.images[0]}
                className='w-56 h-56 rounded-md'
                style={{ display: loadedImages.has(indiacc.images[0]) ? 'block' : 'none' }}
                onLoad={() => handleImageLoad(indiacc.images[0])}
                alt={indiacc.name}
            />
          <div className='flex flex-col mx-12'>
            <span className='text-2xl text-blue-600 font-medium mb-2'>{indiacc.name}</span>
            <span className='text-xs mb-5'>{indiacc.address}</span>
            <div className='flex'>
              <div className='flex flex-col justify-evenly'>
                {indiacc.facilities.map((fac, idx) => (
                  <div key={idx} className='flex mb-1 font-medium mr-28'>
                    <MdCheck style={{ color: 'green', fontSize: '12px' }} />
                    <span className='text-sm text-green-900 ml-2'>{fac}</span>
                  </div>
                ))}
              </div>
              <div className='flex flex-col justify-evenly'>
                <span className='text-xl font-medium'>Rs. {indiacc.pricePerNight}</span>
                <button
                  onClick={() => handleAvailability(indiacc.name)}
                  className='border-[1px] border-blue-500 bg-blue-500 text-md cursor-pointer
                  py-1 px-3 rounded-md w-40 h-8 text-white'
                >
                  {`See availability  >`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  