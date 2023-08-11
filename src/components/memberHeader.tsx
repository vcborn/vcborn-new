import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

function Header() {
  return (
    <div className='bg-white dark:bg-zinc-800 text-lg fixed top-0 left-0 right-0 z-40'>
      <header className='mx-6 py-6 md:mx-10 md:py-8 flex flex-row justify-between items-center'>
        <h1 className='text-white'>
          <Link href='/member/'>
            <div className='dark:hidden'>
              <Image src='/images/logo/vcborn-logo.svg' alt='Logo Black' width={194} height={28} />
            </div>
            <div className='hidden dark:block'>
              <Image
                src='/images/logo/vcborn-logo-white.svg'
                alt='Logo White'
                width={194}
                height={28}
              />
            </div>
          </Link>
        </h1>
        <nav>
          <ul className='flex flex-row p-0 text-3xl gap-6'>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/member/profile'>
                <FaUserCircle className='h-7' />
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/member/' onClick={() => signOut()}>
                <FaSignOutAlt className='h-7' />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
