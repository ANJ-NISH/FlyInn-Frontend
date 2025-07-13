
export const CommentsSection=({commentData})=>
{


    return(
        <>
        <div className='w-full mt-5'>
          
        <div className='ml-10 sm:ml-44 w-5/6 flex justify-between'>
            <h2 className="text-xl font-semibold">Comments</h2>
           <h3 className="text-lg font-semibold mr-24">Overall Rating: <span className="text-white border-[1px]
           border-blue-600 bg-blue-600 p-2 px-1 rounded-sm">{commentData[0]}
            </span></h3>
        </div>
         

         <div className="ml-10 sm:ml-44 w-5/6 mt-8 mb-5 flex flex-col justify-evenly">
            {commentData[1].map((indiComment, index)=> <div key={index} className="border-[1px] bg-gray-100 flex flex-col mb-8 p-5 justify-evenly border-gray-300 w-5/6 rounded-md">
                <div className="flex justify-between">
                    <span className="text-md text-blue-500">@{indiComment.username.split(' ').join('').toLowerCase()}</span>
                    <span>
                        <span className="font-medium">{indiComment.rating>= 9?`Wonderful`: (indiComment.rating>=8? `Very Good`:
                          (indiComment.rating>=7?`Good`: `Pleasant`)
                        )}</span>
                        <span className="text-white border-[1px] border-blue-600  text-lg font-semibold
                        bg-blue-600 p-2 rounded-sm ml-2">{indiComment.rating}</span>
                    </span>
                </div>

               <div className="text-md w-2/3 mt-5">
                 {indiComment.comment}
               </div>
            </div>)}
         </div>

        </div>
        
        </>
    )
}