import { Menu, Transition } from '@headlessui/react'
import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { IoCloseSharp, IoGlobeSharp } from 'react-icons/io5'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setCookie('NEXT_LOCALE', router.locale)
  }, [router.locale])

  function moveToLangPage() {
    let currentUrl = router.pathname
    const regex = new RegExp('/(?:[ce]n|ko)')
    if (regex.test(currentUrl)) {
      currentUrl = currentUrl.slice(3)
    }
    return currentUrl
  }

  const NextLink = ({ href, locale, children, ...rest }) => (
    <Link href={href} locale={locale} {...rest} scroll={false} passHref>
      {children}
    </Link>
  )

  return (
    <div className='dark:bg-zinc-800 text-lg fixed top-0 left-0 right-0 z-40'>
      <header
        className={`transition-all duration-200 px-6 py-3 md:px-10 md:py-6 flex flex-row justify-between items-center relative ${
          router.pathname !== '/' ? 'bg-white' : 'text-gray-200'
        }`}
      >
        <Link href='/' className='h-8 w-36 md:h-12 md:w-48 relative' scroll={false}>
          <Image
            id='logo'
            src={
              router.pathname !== '/'
                ? '/images/logo/vcborn-logo.svg'
                : '/images/logo/vcborn-logo-white.svg'
            }
            alt='VCborn'
            fill={true}
          />
        </Link>
        <HiOutlineMenuAlt3 className='text-5xl invisible' />
        <HiOutlineMenuAlt3
          className='text-5xl md:hidden'
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div
          className={`top-0 -right-1 w-[80vw] bg-primary pt-20 pl-16 text-white fixed h-full z-50 ease-in-out duration-300 ${
            showSidebar ? 'translate-x-0 ' : 'translate-x-full'
          }`}
        >
          <div>
            <button
              className='flex text-5xl text-white cursor-pointer fixed right-10 top-6 z-50'
              aria-label='Show Sidebar'
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <IoCloseSharp />
            </button>
          </div>
          <ul className='flex flex-col gap-6 text-3xl font-semibold'>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/' scroll={false}>
                Home
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/news' scroll={false}>
                News
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/projects' scroll={false}>
                Projects
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/about' scroll={false}>
                Who are we
              </Link>
            </li>
          </ul>
        </div>
        <nav className='hidden md:block font-semibold'>
          <ul className='flex flex-row items-center gap-6'>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/' scroll={false}>
                Home
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/news' scroll={false}>
                News
              </Link>
            </li>
            <li className='duration-200 hover:opacity-70'>
              <Link href='/projects' scroll={false}>
                Projects
              </Link>
            </li>
            <li className='flex'>
              <Menu as='div'>
                <Menu.Button
                  className='flex duration-200 hover:opacity-70'
                  aria-label='Switch Language'
                >
                  <IoGlobeSharp size={25} />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute top-20 right-8 text-right bg-white text-black w-32'>
                    <Menu.Item>
                      {({ active }) => (
                        <NextLink href={moveToLangPage()} locale='ja'>
                          <span
                            className={classNames(
                              active && 'bg-black text-white',
                              'block px-4 py-2',
                            )}
                          >
                            日本語
                          </span>
                        </NextLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <NextLink href={moveToLangPage()} locale='en'>
                          <span
                            className={classNames(
                              active && 'bg-black text-white',
                              'block px-4 py-2',
                            )}
                          >
                            English
                          </span>
                        </NextLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <NextLink href={moveToLangPage()} locale='cn'>
                          <span
                            className={classNames(
                              active && 'bg-black text-white',
                              'block px-4 py-2',
                            )}
                          >
                            简体中文
                          </span>
                        </NextLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <NextLink href={moveToLangPage()} locale='ko'>
                          <span
                            className={classNames(
                              active && 'bg-black text-white',
                              'block px-4 py-2',
                            )}
                          >
                            한국어
                          </span>
                        </NextLink>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
