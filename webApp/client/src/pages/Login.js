// add Bazar Logo

import React, {useEffect, useState} from 'react'
import BackgroundImage from "../images/background.jpg"
import { Link } from 'react-router-dom'
import Logo from '../images/Bazar_logo.png'
import { login, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const Login = () => {




  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }
    

    return (
      <section class="h-screen">
  <div class="px-6 h-full text-gray-800">
    <div
      class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src={BackgroundImage}
          class="w-auto max-h-screen"
          alt="Sample image"
        />
      </div>
      <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 ">


        <div class="w-full h-auto flex justify-center items-center">
          <img
              src={Logo}
              class="w-20 h-auto"
              alt="Sample image"
          />
        </div>
        <form onSubmit={onSubmit}>
          

          <div class="mb-6">
            <input
              type="email"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              name="email"
              value={email}
              placeholder="Email address"
              onChange={onChange}
            />
          </div>

          <div class="mb-6">
            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div class="flex justify-between items-center mb-6">
            <a href="#!" class="text-gray-800">Forgot password?</a>
          </div>

          <div class="text-center lg:text-left">
            <button
              type="submit"
              class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            
            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?   
              <Link to="/Register">              
              <a
                class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-2"
                >Register</a>   
              </Link>         
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
)
}

 

export default Login