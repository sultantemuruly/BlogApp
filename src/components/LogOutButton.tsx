'use client'

import { signOut } from "next-auth/react"

const LogOutButton = () => {
  return (
    <button onClick={() => signOut()} className="hover:underline">
        logout
    </button>
  )
}

export default LogOutButton