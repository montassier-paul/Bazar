import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'
import { toast } from 'react-toastify'




const ButtonTopBar = () => {

  const url = process.env.REACT_APP_BACKEND_URL
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const [search, setSearch] = useState("")

  // update search text when message is wrote
  const onChange = (e) => {

    setSearch(e.target.value)
  }

  // request tags wrote in search bar. If tag exists, navigate to corresponding 
  // search Page. If note, inform the user
  const onSubmit = async(e) => {
    e.preventDefault();

    const config = {
      headers: {
      Authorization: `Bearer ${String(user.token)}`,
      },
  }  

    const response = await axios.get(url + "/api/tags/get/" + String(search), config)

    // if tag searched doesn't exist
    if(response.data[0] == undefined){
      setSearch("")
      toast("The Tag you are looking for does not exist")
    }
    // if exist
    if(response.data[0]._id){
      setSearch("")
      navigate(`/Search/${response.data[0]._id}`);
    }

    else{
      setSearch("")


    }

  }


  return (
    <div className='flex h-full p-1  mt-2'>

      <form onSubmit={onSubmit}>
      
        <div className='mt-2'>
            <input 
            class="text-center
            shadow w-25 focus:outline-2 outline-blue-500/50" 
            id="search" 
            name="search"
            type="text" 
            value={search}
            onChange={onChange}
            placeholder="Search ..."
            />

      
            
        </div>    

      </form>   
    </div>
  )
}

export default ButtonTopBar