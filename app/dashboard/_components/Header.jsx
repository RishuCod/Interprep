'use client'
import { UserButton } from '@clerk/nextjs'
import  Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path=usePathname()

  return (
    <>
    <div className='flex p-2 item-center justify-between bg-secondary shadow-sm '>
      <Link href="/dashboard"><Image src={'/logo.svg'} width={160} height={160} /></Link>
      <UserButton/>
    </div>
  </>
  )
}

export default Header
