"use client"

import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useState } from 'react'

const SignUp = () => {

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (signUpData.name.trim() ==="" || signUpData.email.trim() === "" || signUpData.password.trim() === ""){
      alert("please enter the data in the field");
      return;
    }
  

    try{
      const result = await axios.post('/api/auth', signUpData)
      // alert(result.data.message)
      console.log(result)

      setSignUpData({
        name: "",
        email: "",
        password: "",
      })


    }catch(error){
      console.log(error)
      return NextResponse.json({message:"failed to create user"})
    }
  }

  return (
    <>

      <div className="mx-auto mt-5 max-w-md border-2 border-slate-200 p-5 rounded-md">
        <div className='mb-5 border-b border-slate-500 pb-2'>
          <h1 className='text-lg font-bold'>Sign Up </h1>
        </div>
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="text" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="example1" className="block w-full rounded-md px-5 py-2 border border-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="John Doe"
            onChange={(e) => {setSignUpData({
              ...signUpData,
              name: e.target.value,
            })}}
            value={signUpData.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="example2" className="block w-full rounded-md px-5 py-2 border border-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="you@email.com" 
            onChange={(e) => {setSignUpData({
              ...signUpData,
              email: e.target.value,
            })}}
            value={signUpData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="example3" className="block w-full rounded-md px-5 py-2 border border-slate-200  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Password" 
            onChange={(e) => {setSignUpData({
              ...signUpData,
              password: e.target.value,
            })}}
            value={signUpData.password}
            />
          </div>
          <button type="submit" className="rounded-lg border border-slate-200  bg-blue-400 hover:bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white  disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Submit</button>
        </form>    
      </div>

      


    </>
  )
}

export default SignUp