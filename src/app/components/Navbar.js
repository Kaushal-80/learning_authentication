"use client"

import UserContext from '@/context/userContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const Navbar = () => {
    const context = useContext(UserContext);
    const router = useRouter();

    const doLogout = async () => {

      try {
        const result = await axios.post('/api/logout');
        // console.log(result);
        context.setUser(undefined);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <nav className=" h-16 py-2 px-36 flex justify-between items-center">
          <div className="brand">
            <h1 className="text-2xl font-semibold">
              <a href="#!">Authentication system</a>
            </h1>
          </div>
          <div>
            <ul className="flex space-x-5">
              {context.user && (
                <>
                  <li>
                    <Link href={"/"} className="hover:text-blue-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/addProduct" className="hover:text-blue-200">
                      Add Task
                    </Link>
                  </li>
                  <li>
                    <Link href={"/showProduct"} className="hover:text-blue-200">
                      Show Tasks
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            <ul className="flex space-x-3">
              {context.user && (
                <>
                  <li>
                    <Link href={"#!"}>{context.user.name}</Link>
                  </li>
                  <li>
                    <button onClick={doLogout}>Logout</button>
                  </li>
                </>
              )}
    
              {!context.user && (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Signup</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      );
}

export default Navbar