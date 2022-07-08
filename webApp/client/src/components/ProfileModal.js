import { Modal, useMantineTheme } from "@mantine/core";
import {useEffect, useState} from "react"; 
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import {load} from "../features/loader/loaderSlice"


function ProfileModal({ modalOpened, setModalOpened, profileData }) {

  const url = process.env.REACT_APP_BACKEND_URL
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    tag1: '',
    tag2: '',
    tag3: '',
    desc:' ',
    userId:" "

  })

  const [coverPicture, setCoverPicture] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const {username, tag1, tag2, tag3, desc} = formData

  // modify setForm data with profile data
  useEffect( () => {
    if(profileData.username){
      setFormData((prevState) => ({
        ...prevState,
        username: profileData.username,
        desc:profileData.descprofile,
        userId: profileData._id

      }))
    }

  }, [profileData])


  // update form informations
  const onChange = (e) => {

    console.log({
      "userId" : String(profileData._id),
      "profilePicture": profilePicture
    })


    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // if load profile image
  const onProfileChange = (e) => {
    const [file] = e.target.files;
    setProfilePicture(file)

  };

  // if load cover image
  const onCoverChange = (e) => {
    const [file] = e.target.files;
    setCoverPicture(file)

  };



  // Update database with new user data
  const onSubmit = async(e) => {
    e.preventDefault();
    const config = {
        headers: {
        Authorization: `Bearer ${String(user.token)}`,
        },
    }
    // send formData
    const res1 = await axios.put(url + '/api/users/' + String(user._id),formData,
    config)

    // update tag database
    if(formData.tag1.length > 0 &  profileData.tags[0] !== formData.tag1  ){
      const res2 = await axios.put(url + "/api/tags/addtopeople/" + String(formData.tag1),{
        "userId" : String(profileData._id),
      }, config)
      if(profileData.tags[0]){
        const res3 = await axios.put(url + "/api/tags/removetopeople/" + String(profileData.tags[0]),{
        "userId" : String(profileData._id),}, 
      config)

      }

    }

    if(formData.tag2.length > 0 &  profileData.tags[1] !== formData.tag2  ){
      const res4 = await axios.put(url + "/api/tags/addtopeople/" + String(formData.tag2),{
        "userId" : String(profileData._id),
      }, 
      config)

      if(profileData.tags[1] ){
        const res5 = await axios.put(url + "/api/tags/removetopeople/" + String(profileData.tags[1]),{
        "userId" : String(profileData._id),
      }, 
      config)

      }
    }


    if(formData.tag3.length > 0 &  profileData.tags[2] !== formData.tag3 ){
      const res6 = await axios.put(url + "/api/tags/addtopeople/" + String(formData.tag3),{
        "userId" : String(profileData._id),
      }, 
      config)
      

      if(profileData.tags[2]){
        const res7 = await axios.put(url + "/api/tags/removetopeople/" + String(profileData.tags[2]),{
        "userId" : String(profileData._id),
      }, 
      config)

      }

    }

    // load profile picture
    if(profilePicture){
      const res7 = await axios.put(url + "/api/users/profilePicture/" + String(user._id),{
      "userId" : String(profileData._id),
      "profilePicture": profilePicture
     },

      {
        headers: {
        Authorization: `Bearer ${String(user.token)}`,
        "Content-Type": "multipart/form-data"

        },
            }
      )

      dispatch(load())

    }

    // load cover Picture
    if(coverPicture){
      const res7 = await axios.put(url + "/api/users/coverPicture/" + String(user._id),{
      "userId" : String(profileData._id),
      "coverPicture": coverPicture
      }, 
      {
        headers: {
        Authorization: `Bearer ${String(user.token)}`,
        "Content-Type": "multipart/form-data"
        },
            }
        )

    }

    
    onClose()

  }

  // Reset modal data when modal closed
  const onClose = () => {
    setFormData({
      username: '',
      tag1: '',
      tag2: '',
      tag3: '',
      desc:' ',
    })
    setProfilePicture()
    setCoverPicture()
    setModalOpened(false)
  }

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={onClose}
    >
      <form 
      className="flex flex-col justify-start space-y-5"
      onSubmit={onSubmit}>
        <div className="flex w-full justify-center items-center">
          <h3>Update your profile</h3>
        </div>

        <div className="">
          {profileData.username
          ?<input
            type="text"
            className="text-center
            shadow w-25 focus:outline-2 outline-blue-500/50"
            id="username"
            name="username"
            value={username}
            placeholder={profileData.username}
            onChange={onChange}
          />
          :<input
            type="text"
            className="text-center
            shadow w-25 focus:outline-2 outline-blue-500/50"
            id="username"
            name="username"
            value={username}
            placeholder="username"
            onChange={onChange}
          />
          }
        </div>

        <div className="flex justify-between w-full">
          {/* new tags input */}
          <div className='flex h-full'>
              <div className='pr-3'>
              {profileData.tags[0]
                ?<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag1" 
                    name="tag1"
                    value={tag1}
                    placeholder={profileData.tags[0]}
                    onChange={onChange}
                />
                  :<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag1" 
                    name="tag1"
                    value={tag1}
                    placeholder="New tag"
                    onChange={onChange}
                  />
                }
              </div>
              <div className='pr-3'>
              {profileData.tags[1]
                ?<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag2" 
                    name="tag2"
                    value={tag2}
                    placeholder={profileData.tags[1]}
                    onChange={onChange}
                />
                  :<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag2" 
                    name="tag2"
                    value={tag2}
                    placeholder="New tag"
                    onChange={onChange}
                  />
                }
              </div>
              <div className='pr-3'>
              {profileData.tags[2]
                ?<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag3" 
                    name="tag3"
                    value={tag3}
                    placeholder={profileData.tags[2]}
                    onChange={onChange}
                />
                  :<input
                    type="text"
                    class="text-center
                    shadow w-25 focus:outline-2 outline-blue-500/50" 
                    id="tag3" 
                    name="tag3"
                    value={tag3}
                    placeholder="New tag"
                    onChange={onChange}
                  />
                }
              </div>
              
          </div>
        </div>

        <div className="">
        {profileData.desc
                ?<textarea
                rows={3}
                cols={50}
                maxlength="200"
                className="shadow focus:outline-2"
                type="text" 
                id="desc" 
                name="desc"
                value={desc}
                placeholder={profileData.desc}
                onChange={onChange}
              />
                :<textarea
                rows={3}
                cols={50}
                maxlength="200"
                className="shadow focus:outline-2"
                type="text" 
                id="desc" 
                name="desc"
                value={desc}
                placeholder="Describe yourself in less than 200 characters"
                onChange={onChange}
              />
                }
          
        </div>



        <div className="flex flex-col justify-start space-y-5 ">
          <div className="">
            <h1>Profile Image</h1>
            <input 
            type="file" 
            name="Profile Image" 
            className="cursor-pointer"
            onChange={onProfileChange} />
          </div>
          <div className="">
            <h1>Cover Image</h1>
            <input 
            type="file" 
            name="Profile Image" 
            className="cursor-pointer"
            onChange={onCoverChange}/>
          </div>
        </div>
           
        <div className="flex justify-center items-center">
          <div className='bg-orange-300 hover:bg-orange-400 rounded-2xl mt-2 h-6  w-20'>
              <button type='submit' className='w-full'>
                  Update
              </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ProfileModal;