import Link from 'next/link'
import { signOut } from 'next-auth/react'
import React from 'react'


export default function UserMenu() {
  return (
    <div className='UserMenu'>
      <Link href="/hq-settings" >Settings</Link>
      <button onClick={() => signOut({ callbackUrl: "/api/auth/logout" })}>
        Sign Out
      </button>
    </div>
  )
}