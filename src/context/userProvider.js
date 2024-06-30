"use client"

import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import axios from 'axios'
import { NextResponse } from 'next/server'

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(undefined);



  useEffect(() => {
    async function load() {
      try {
        const response = await axios.get('/api/current');
        const loggedUser = await response.data
        // console.log(loggedUser)
        if (loggedUser.status === 401) {
          setUser(undefined);
        } else {
          setUser({ ...loggedUser });
        }

      } catch (error) {
        console.log(error.message)
        setUser(undefined);
        return NextResponse.json({message: "No user is LoggedIn"})
      }
    }

    load()
  }, [])




  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider