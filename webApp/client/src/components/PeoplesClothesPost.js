import React from 'react'
import {GiClothes}  from "react-icons/gi";
import {BsPeopleFill}  from "react-icons/bs";

const PeoplesClothesPost = ({updatePage}) => {

  // onclick force search page to reload users tagged
  const HandlePeopleOnClick = () => {
    updatePage(false)
  }

  // onclick force search page to reload posts tagged
  const HandleClotheOnClick = () => {
    updatePage(true)
  }

  
  return (
    <div className='h-96 w-56 bg-white m-1 rounded-3xl flex flex-col justify-start'>
        <div className='h-1/2 flex justify-center items-center' onClick={HandleClotheOnClick}>
            <GiClothes fontSize={50} className="cursor-pointer hover:scale-125"/>
        </div>         
        <div className='h-1/2 flex justify-center items-center' onClick={HandlePeopleOnClick}>
            <BsPeopleFill fontSize={50} className="cursor-pointer hover:scale-125"/>
        </div>

      
    </div>
  )
}

export default PeoplesClothesPost
