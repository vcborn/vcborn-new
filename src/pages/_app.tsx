import '@/styles/global.css'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReactAppzi from 'react-appzi'
// eslint-disable-next-line import/no-named-as-default
import CookieConsent from 'react-cookie-consent'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { end } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/500.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/500.css'
import '@fontsource/noto-sans-kr/700.css'

export default function App({ Component, pageProps }) {
  const { t } = useLocale()
  const router = useRouter()
  const countdownEnd = new Date(end + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)
  const today = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)
  const diff = (countdownEnd.getTime() - today.getTime()) / 1000
  useEffect(() => {
    if (diff < 0) {
      ReactAppzi.initialize('qgRff')
    }
  }, [diff])
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<!--  \n\
          __      _______ _                      \n\
          \\ \\    / / ____| |                     \n\
           \\ \\  / / |    | |__   ___  _ __ _ __  \n\
            \\ \\/ /| |    | '_ \\ / _ \\| '__| '_ \\ \n\
             \\  / | |____| |_) | (_) | |  | | | |\n\
              \\/   \\_____|_.__/ \\___/|_|  |_| |_|\n\
              \n\
                                                 \n\
                                       -->",
        }}
      ></div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        language='ja'
        scriptProps={{
          async: true,
          defer: false,
          appendTo: 'body',
        }}
      >
        <AnimatePresence mode='wait' initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </GoogleReCaptchaProvider>
      <CookieConsent
        location='none'
        disableStyles={true}
        buttonText={t.COOKIE_BUTTON}
        buttonClasses='bg-primary text-white px-4 py-2 duration-300 hover:opacity-80'
        containerClasses='items-center fixed inset-x-4 bottom-3 p-4 flex flex-wrap gap-4 justify-between z-[2147483001] bg-gray-100 dark:bg-gray-800 text-black dark:text-white w-auto'
      >
        {t.COOKIE_TEXT}
        <Link href='/privacy' className='text-primary dark:text-blue-400 hover:font-bold'>
          {t.COOKIE_LINK}
        </Link>
      </CookieConsent>
    </SessionProvider>
  )
}
