import Link from 'next/link'
import React from 'react'

const Header = async () => {

  return (
    <header className='bg-blue-800 p-4 px-10'>
        <nav className='flex justify-between items-center'>
            <Link href='/' className='text-2xl font-bold'>
                My Blogs
            </Link>

            <ul className='flex space-x-4'>
                <li>
                    <Link href='/blogs' className='hover:underline'>
                        Blogs
                    </Link>
                </li>
                <li>
                    <Link href='/api/auth/signin' className='hover:underline'>
                    login
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header