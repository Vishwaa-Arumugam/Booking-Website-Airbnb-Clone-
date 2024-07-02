import React, { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

function Loginpage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

  async function handleUserLogin(e){
      e.preventDefault();
      console.log(email,password,);
      try{
        const {data} = await axios.post('/login', {
          email,
          password,
        })
        console.log(data);
        setUser(data);
        alert('Login successfull');
        navigate("/");
        
      } catch(error) {
        console.log("An error occured when sending login credentials to the server", error);
      }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around mb-64'>
      <div>
        <h1 className='text-4xl text-center'>Login</h1>
        <form className='max-w-lg mx-auto mt-3' onSubmit={handleUserLogin}>
          <input type="email" name="" id="" placeholder='Email ID' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" name="" id="" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit' className='login mt-2'>Login</button>
        </form>
        <div className='py-2 text-center text-gray-600'>
          Don't have an account yet ? <Link className='text-black underline' to={'/register'}>
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
