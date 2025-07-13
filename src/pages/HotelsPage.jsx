import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HotelsPage = () => {
  const [hotelsArr, setHotelsArr] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    async function getAllData() {
      try {
        const response = await axios.get(`http://localhost:5000/hotels/getAll`, { withCredentials: true });
        setHotelsArr(response.data.allHotels);
        setDataLoading(false);
      } catch (error) {
        console.log(error);
        setDataLoading(false);
      }
    }

    getAllData();
  }, []);

  const handleImageLoad = (url) => {
    setLoadedImages((prev) => new Set(prev).add(url));
  };

  return (
    <>
      <div className="container max-w-screen-xl mt-20 sm:mt-12">
        <h1 className="w-full ml-10 sm:ml-44 mb-10 text-5xl font-bold">All the hotels in top cities</h1>

        <div className="w-full ml-10 sm:ml-44 mb-16 flex flex-wrap gap-5">
          {dataLoading ? (
            <p className="text-xl font-medium">Loading data...</p>
          ) : (
            hotelsArr.map((indihotel) => (
              <div key={indihotel.name} className="flex w-2/5 justify-start gap-5">
                <Link to={`/indihotel/${indihotel.name}`}>
                 
                  {!loadedImages.has(indihotel.images[0]) && (
                    <div className="h-40 w-40 rounded-md mr-5 flex items-center justify-center bg-gray-200 text-gray-500">
                      Loading image...
                    </div>
                  )}
                  <img
                    src={indihotel.images[0]}
                    alt="hotel-img"
                    className="h-40 w-40 rounded-md mr-5"
                    style={{ display: loadedImages.has(indihotel.images[0]) ? "block" : "none" }}
                    onLoad={() => handleImageLoad(indihotel.images[0])}
                  />
                </Link>
                <div className="flex flex-col">
                  <span className="text-lg font-normal">{indihotel.name}</span>
                  <span className="text-md font-semibold">{indihotel.city}</span>
                  <span className="text-md">
                    From <span className="font-semibold">Rs. {indihotel.pricePerNight}</span> For tonight
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
