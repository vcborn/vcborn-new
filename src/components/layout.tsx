import { motion, useAnimation } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useLocale } from '@/hooks/useLocale'

export const siteTitle = 'VCborn'
export const end = '2022/12/25 22:30:00'

export default function Layout({ children, home }) {
  const { t } = useLocale()
  const countdownEnd = new Date(end + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)
  const router = useRouter()
  const today = new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)
  const diff = (countdownEnd.getTime() - today.getTime()) / 1000
  const controls = useAnimation()
  useEffect(() => {
    const loading = document.getElementById('loading')
    if (loading && loading.style.transform !== 'translateX(100%) translateZ(0px)') {
      controls
        .start({
          x: '0',
          transition: {
            duration: 0.6,
          },
        })
        .then(() => {
          controls
            .start({
              x: '100%',
              transition: {
                duration: 0.6,
                delay: 1.0,
              },
            })
            .then(() => {
              controls.stop()
            })
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 100)
        })
    }
  }, [controls])

  return (
    <div>
      {diff > 0 ? (
        <main className='h-screen bg-black text-white flex flex-col justify-center items-center'>
          <Image
            src='/images/logo/vcborn-icon.svg'
            width={220}
            height={120}
            alt='VCborn Icon'
            className='mb-12'
          />
          <h2 className='text-5xl font-medium mb-5'>もう少しだけお待ちください。</h2>
          <p className='text-xl'>
            サイトをアップデート中です。YouTubeで配信中のVCFes終了後にまたお越しください。
          </p>
        </main>
      ) : (
        <div className='block overflow-x-hidden relative'>
          <Head>
            <link rel='icon' href='/favicon.ico' />
            <meta name='viewport' content='width=device-width,initial-scale=1'></meta>
            <meta name='description' content={t.OFFICIAL} />
            <meta name='og:title' content={siteTitle} />
            <meta name='og:description' content={t.OFFICIAL} />
            <meta property='og:type' content='website' />
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@vcborn_support' />
          </Head>
          <Header />
          <motion.div
            initial={{ x: '-100%' }}
            animate={controls}
            transition={{
              duration: 6.0,
              ease: 'easeInOut',
            }}
            className='bg-primary h-full w-full fixed z-[100] top-0'
            id='loading'
          >
            <div className='h-screen flex items-center justify-center'>
              <Image
                src='/images/loading.gif'
                alt='loading bar'
                width={104}
                height={2}
                className=''
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, ease: 'easeInOut', duration: 0.15 }}
          >
            <main className={`relative ${router.pathname !== '/' && 'pt-24'}`}>{children}</main>
            <Footer />
          </motion.div>
        </div>
      )}
    </div>
  )
}
