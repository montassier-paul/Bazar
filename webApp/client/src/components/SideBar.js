import React, {useState, useEffect} from 'react'
import Logo from "../images/Bazar_logo.png"
import { IoLogOut } from "react-icons/io5";
import {AiFillPlusCircle}  from "react-icons/ai";
import {FcLike} from "react-icons/fc"
import {CgProfile} from "react-icons/cg"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { loaded } from '../features/loader/loaderSlice';
import axios from 'axios'


const SideBar = () => {

    const url = process.env.REACT_APP_BACKEND_URL
    const [userData, setUserData] = useState({})
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const loader = useSelector(state => state.loader.value)


    const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
    }

    // navigate to Home Page
    const HandleLogoOnclick = () => {
        navigate("/");
    }

    // Like post => request to update database 
    const HandleLikedPostsOnclick = () => {
        navigate("/LikedPosts");
    }

    // navigate to Profile Page
    const HandleProfileOnclick = () => {
        navigate(`/Profile/${user._id}`);
    }

    // navigate to NewPoste Page
    const HandleNewPostOnclick = () => {
        navigate("/NewPost");
    }

    // get use data
    useEffect(() => {
        const fetchUserInfo = async () => {

            const config = {
                headers: {
                Authorization: `Bearer ${String(user.token)}`,
                },
            }
            
            const response = await axios.get(url + '/api/users/' + String(user._id), config)


            setUserData(response.data) 
            dispatch(loaded())
        };
        console.log("reload :")
        console.log(loader)
        fetchUserInfo();
      }, [user, loader]);


    
  return (
    <div className='w-20 h-full bg-white  flex flex-col justify-start tp-3  overflow-hidden overflow-y-auto'>
        
        <div>{loader}</div>
            {/* logo */}
            <div className='flex items-center justify-center cursor-pointer w-full  h-auto hover:scale-125'>
                <img 
                src={Logo} 
                alt="Logo" 
                className="w-14" 
                onClick={HandleLogoOnclick}/>
            </div>

            {/* share new outfit button */}
            <div className= 'w-full flex items-center justify-center mt-5 mb-5 hover:scale-125'>
                <AiFillPlusCircle
                fontSize={32}
                className="cursor-pointer text-gray-600"
                onClick={HandleNewPostOnclick}/>
            </div>

            {/* liked post button */}
            <div className= 'w-full flex items-center justify-center mt-5 hover:scale-125'>
                <FcLike
                fontSize={32}
                className="cursor-pointer text-gray-600"
                onClick={HandleLikedPostsOnclick}/>
            </div>

            <div className='h-52'> 
        </div>
        
        {/* profile picture */}
        <div className="w-full flex items-center justify-center h-auto cursor-pointer hover:scale-125"
        onClick={HandleProfileOnclick}>
            {!userData.profilePicture || userData.profilePicture === " "

            ?<CgProfile fontSize={32}/>
            :
            <img 
            src={userData.profilePicture} 
            alt="Profile Picture" 
            className='rounded-full w-12' 
            />


            }

            
        </div>

        {/* Quit */}
        <div className='w-full flex items-center justify-center pt-10'>
            <IoLogOut
            fontSize={32}
            className="cursor-pointer text-gray-600 pl-2 hover:scale-125"
            onClick={onLogout}
            />
        </div>
        

    </div>
  )
}

export default SideBar