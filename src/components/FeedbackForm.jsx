import axios from "axios";



export const FeedbackForm=({hotelname, setIsOpen, rating, setRating, comment, setComment})=>
{
  
    const handleSubmit = async() => {
        
            try
            {
              const response=await axios.post(`https://flyinn-backend.onrender.com/hotels/rateAcc/${hotelname}`, {rating, comment},{withCredentials: true});
              
              console.log(response);
            }
            catch(err)
            {
                console.error(err);
            }
            setIsOpen(false);
          };

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Your Feedback</h2>
    
                <div className="mb-4">
                  <label className="block text-blue-600 font-medium mb-1">Rating (1 to 10)</label>
                  <select
                    className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div className="mb-4">
                  <label className="block text-blue-600 font-medium mb-1">Comment</label>
                  <textarea
                    className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Write your thoughts here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
    
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
    )
}