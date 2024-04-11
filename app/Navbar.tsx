import React from 'react'
import Link from "next/link"
import { AiFillBug } from "react-icons/ai";
const Navbar = () => {

    const links = [
        {
            label : "Dashboard",
            href : '/'
        },
        {
            label : "Issues",
            href : "/issues"
        }
    ]

  return (
    <div className='flex space-x-6 border-b h-14 items-center px-6 mb-5'>
      <Link href='/'> <AiFillBug/> </Link>
      <ul className='flex space-x-6'>
        
        {links.map(link => (
            <Link key={link.href} className='text-slate-500 hover:text-slate-800 transition-colors' href={link.href}> {link.label} </Link>
        ))}
        
      </ul>
    </div>
  )
}

export default Navbar
