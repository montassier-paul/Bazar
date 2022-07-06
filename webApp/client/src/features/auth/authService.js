import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/auth/'

// Register user
const register = async (userData) => {

  const response = await axios.post(API_URL + "register", userData)
  

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  console.log(response.data)
  

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService