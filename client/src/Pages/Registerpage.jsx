import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Registerpage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try{
      await axios.post('/register',{
        name,
        email,
        password,
      })
      alert('Registration Successfull');
      navigate('/login');
     
    } catch(error) {
        console.log("An error occured while sending user's registration data to the server", error);
    }

  }

  if(redirect){
    <Navigate to={'/login'}/>
  }

  return (
    <div className='mt-4 grow flex items-center justify-around mb-64'>
      <div>
        <h1 className='text-4xl text-center'>Register</h1>
        <form className='max-w-lg mx-auto mt-3' onSubmit={registerUser}>
          <input type="text" name="" id="" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
          <input type="email" name="" id="" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" name="" id="" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='login mt-2'>Register</button>
        </form>
        <div className='py-2 text-center text-gray-600'>
          Already a member ? <Link className='text-black underline' to={'/login'}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Registerpage
