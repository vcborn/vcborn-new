import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { FaGithub, FaYoutube, FaDiscord } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { IoGlobeSharp } from 'react-icons/io5'
import { useLocale } from '@/hooks/useLocale'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Footer() {
  const { t } = useLocale()
  /*onst [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  useEffect(() => {
    if (darkMode) {
      window.document.documentElement.classList.add('dark')
    } else {
      window.document.documentElement.classList.remove('dark')
    }
  }, [darkMode])*/

  function moveToLangPage() {
    let currentUrl = location.pathname
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
    <footer className='container mx-auto max-w-7xl px-5'>
      <div className='flex flex-col md:items-center md:flex-row justify-between py-10 gap-4'>
        <div className='flex flex-col'>
          <Link href='/' scroll={false}>
            <Image src='/images/logo/vcborn-logo.svg' alt='Logo White' width={250} height={55} />
          </Link>
          <div className='flex flex-row py-5 gap-2'>
            <a
              href='https://twitter.com/vcborn_support'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Twitter'
              className='p-2 text-[1.2rem] group'
            >
              <svg
                width='30'
                viewBox='0 0 1200 1227'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              >
                <path d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z' />
              </svg>
            </a>
            <a
              href='https://www.youtube.com/@vcborn'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Youtube'
              className='p-2 text-[1.2rem] group'
            >
              <FaYoutube
                size={35}
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              />
            </a>
            <a
              href='https://github.com/vcborn'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Github'
              className='p-2 text-[1.2rem] group'
            >
              <FaGithub
                size={35}
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              />
            </a>
            <a
              href='https://discord.gg/2jRRMesqgr'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Discord'
              className='p-2 text-[1.2rem] group'
            >
              <FaDiscord
                size={35}
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              />
            </a>
            <a
              href='https://vcborn.booth.pm'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Booth'
              className='p-2 text-[1.2rem] group'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='35'
                height='35'
                viewBox='0 0 30 29.98'
                fill='white'
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              >
                <path d='M27.27,11.54v-2.31L21.5,0h-1.99l-3.15,7.55L13.27,1.05h-1.73S6.29,13.43,6.29,13.43V1.68H2.73v1.04H0v3.62H2.73v10.45c0,.93,.75,1.68,1.68,1.68h1.78v11.52h3.64v-5.22c0-2.89,2.5-5.23,5.59-5.25h.04c5.06,0,9.16,3.83,9.16,8.54v1.92h2.66v-10.33h2.73v-5.71l-2.73-2.4Z' />
              </svg>
            </a>
          </div>
        </div>
        <div className='font-semibold text-xl flex flex-col items-start md:flex-row gap-10 md:gap-24'>
          <ul className='flex flex-col items-start gap-2'>
            <li className='text-3xl'>About us</li>
            <li className=' text-gray-400 duration-200 hover:text-black'>
              <Link href='/about' scroll={false}>
                {t.WHOAREWE}
              </Link>
            </li>
            <li className='text-gray-400 duration-200 hover:text-black'>
              <Link href='/join' scroll={false}>
                {t.JOIN}
              </Link>
            </li>
            <li className='text-gray-400 duration-200 hover:text-black'>
              <a href='https://ko-fi.com/vcborn_support' target='_blank' rel='noopener noreferrer'>
                {t.DONATE}
              </a>
            </li>
          </ul>
          <ul className='flex flex-col items-start gap-2'>
            <li className='text-3xl font-semibold'>Support</li>
            <li className='text-gray-400 duration-200 hover:text-black'>
              <a href='https://status.vcborn.com' target='_blank' rel='noopener noreferrer'>
                {t.STATUS}
              </a>
            </li>
            <li className='text-gray-400 duration-200 hover:text-black'>
              <Link href='/brand' scroll={false}>
                {t.BRAND}
              </Link>
            </li>
            <li className='text-gray-400 duration-200 hover:text-black'>
              <a href='https://help.vcborn.com' target='_blank' rel='noopener noreferrer'>
                {t.SUPPORT}
              </a>
            </li>
          </ul>
          <ul className='my-auto text-3xl flex flex-col gap-8'>
            <li>
              <a
                href='https://blog.vcborn.com'
                target='_blank'
                rel='noreferrer noopener'
                className='flex items-center gap-2 duration-200 hover:opacity-80'
              >
                VCborn Blog <GoLinkExternal size={20} />
              </a>
            </li>
            <li>
              <a
                href='https://fes.vcborn.com'
                target='_blank'
                rel='noreferrer noopener'
                className='flex items-center gap-2 duration-200 hover:opacity-80'
              >
                VCFes <GoLinkExternal size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className='font-medium text-xl mb-4'>&copy; VCborn</p>
      <div className='flex flex-col items-start md:flex-row justify-between md:items-center font-medium mb-16'>
        <ul className='flex flex-col md:flex-row gap-5'>
          <li>
            <Link href='/tos' scroll={false}>
              {t.TOS}
            </Link>
          </li>
          <li>
            <Link href='/privacy' scroll={false}>
              {t.PRIVACY}
            </Link>
          </li>
          <li>
            <Link href='/policy' scroll={false}>
              {t.POLICY}
            </Link>
          </li>
        </ul>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button
            className='mt-4 md:mt-0 flex items-center gap-2 border-4 border-black pl-2 w-[13.75rem] py-1 text-lg font-semibold duration-200 hover:bg-black hover:text-white'
            aria-label='Switch Language'
          >
            <IoGlobeSharp size={25} />
            <span>{t.LANG}</span>
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
            <Menu.Items className='right-auto origin-bottom absolute mt-2 w-[13.75rem] text-lg font-semibold bg-white border-4 border-black focus:outline-none -top-52'>
              <Menu.Item>
                {({ active }) => (
                  <NextLink href={moveToLangPage()} locale='ja'>
                    <span
                      className={classNames(active && 'bg-black text-white', 'block px-4 py-2')}
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
                      className={classNames(active && 'bg-black text-white', 'block px-4 py-2')}
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
                      className={classNames(active && 'bg-black text-white', 'block px-4 py-2')}
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
                      className={classNames(active && 'bg-black text-white', 'block px-4 py-2')}
                    >
                      한국어
                    </span>
                  </NextLink>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </footer>
  )
}

export default Footer
