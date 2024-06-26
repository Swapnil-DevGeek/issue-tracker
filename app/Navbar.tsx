"use client";

import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';

const Navbar = () => {

    const currentPath = usePathname();

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
    <div className='flex space-x-6 border-b h-14 items-center px-6 mb-2'>
      <Link href='/'> <AiFillBug/> </Link>
      <ul className='flex space-x-6'>

        {links.map(link => (
            <Link key={link.href} className={
                classNames({
                    'text-zinc-900' :  link.href === currentPath,
                    'text-zinc-500' : link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors' : true
                })
            }
            href={link.href}> {link.label} </Link>
        ))}
        
      </ul>
    </div>
  )
}

export default Navbar
