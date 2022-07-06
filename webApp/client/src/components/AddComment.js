import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector} from 'react-redux'


const AddComment = ({postId, updating}) => {

  const url = process.env.REACT_APP_BACKEND_URL

  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    message: '',
    userId: String(user._id), 
    postId: String(postId)
  })

  const { message } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect (() => {

    setFormData((prevState) => ({
      message: '',
      userId: String(user._id), 
      postId: String(postId)
    }
    ))


  },[postId])

  const onSubmit = async(e) => {
    e.preventDefault();

    const config = {
        headers: {
        Authorization: `Bearer ${String(user.token)}`,
        },
            }

      const res = await axios.post(url + '/api/messages/', 
      formData, config)
          
      

      setFormData((prevState) => ({
        message: '',
        userId: String(user._id), 
        postId: String(postId)
      }
      ))

      updating()


  }

  


  return (
    <div className='w-full ml-2 rounded-3xl flex flex-row justify-start' >

        <form onSubmit={onSubmit}>
        <div className='ml-2'>

            <textarea
                rows={2}
                cols={40}
                className="rounded-2xl border-2 pl-2 pr-2 focus:outline-none focus:border-blue-200"
                id="message"
                name="message"
                value={message}
                placeholder="Comment"
                onChange={onChange}
            />

            <div className='flex flex-row justify-end'>
                <div className='bg-red-300 hover:bg-red-400 rounded-2xl  h-6  w-20'>
                    <button type='submit' className='w-full'>
                        Add
                    </button>
                </div>
            </div>

        </div>
        </form>
    </div>
  )
}

export default AddComment