"use client"
import UserContext from "@/context/userContext";
import { useContext } from "react";

export default function Home() {

  const context = useContext(UserContext);

  return (
   <>
    <div>HEllo world</div>
    {context.user && (
        <>
          <p>{context.user.name}</p>
          <p>{context.user.email}</p>

        </>
      )
    }


   </>
  );
}
