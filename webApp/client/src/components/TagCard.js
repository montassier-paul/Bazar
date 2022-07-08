import React from 'react'
import { useNavigate } from 'react-router-dom';

const TagCard = ({tag}) => {

    let navigate = useNavigate();

    // Navigate to corresponding search page
    const HandleTagOnclick = () => {
      navigate(`/Search/${tag._id}`);
    }

  return (
    <div className='flex justify-center items-center mr-1 ml-1 bg-slate-100 
    rounded h-6 pr-1 pl-1 cursor-pointer'
    onClick={HandleTagOnclick}>
        {tag.name}
    </div>
  )
}

export default TagCard