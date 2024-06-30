"use client"

import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/userContext';

const Login = () => {
  const router = useRouter()
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loginData.email.trim() === "" || loginData.password.trim() === ""){
      alert("please enter the data in the field");
      return;
    }

    try {
      await axios.post('/api/login',loginData).
      then((response) => {
        context.setUser(response.data)
        router.push('/');
      })
      
      // context.setLoginData(response.user);
    } catch (error) {
      console.log(error.response?.data?.message);
      return NextResponse.json({message:"error in login"},{status: 500})
    }
  }

  return (
    <>

      <div className="mx-auto mt-5 max-w-md border-2 border-slate-200 p-5 rounded-md">
        <div className='mb-5 border-b border-slate-500 pb-2'>
          <h1 className='text-lg font-bold'>Login </h1>
        </div>
        <form action="" className="space-y-5" onSubmit={handleLogin}>
        
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="example2" className="block w-full rounded-md px-5 py-2 border border-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="you@email.com" 
            onChange={(event) => setLoginData({
              ...loginData,
              email: event.target.value,
            })}
            value={loginData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="example3" className="block w-full rounded-md px-5 py-2 border border-slate-200  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Password" 
            onChange={(event) => setLoginData({
              ...loginData,
              password: event.target.value,
            })}
            value={loginData.password}
            />
          </div>
          <button type="submit" className="rounded-lg border border-slate-200  bg-blue-400 hover:bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white  disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Submit</button>
        </form>    
      </div>

      


    </>
  )
}

export default Login