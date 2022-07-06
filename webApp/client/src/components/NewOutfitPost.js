import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const NewOutfitPost = () => {

  let navigate = useNavigate(); 

  const HandleOnclick = () => {
    navigate("/NewPost");
}

  


  return (
    <>
    <div className='h-96 w-56 bg-black m-1 rounded-3xl group'>
      <div className="bg-white w-full opacity-100 
         h-full object-cover rounded-3xl group-hover:opacity-60 cursor-pointer active:bg-gray-600"
         onClick={HandleOnclick}>     
      </div>

      
    </div>



    </>

  )
}

export default NewOutfitPost