import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaWindows, FaApple } from 'react-icons/fa'
import { SiDebian } from 'react-icons/si'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Reamix() {
  const { t } = useLocale()
  const { locale } = useRouter()
  const latest = '2.0.0'
  const latest_deb = latest.replace('-', '~')
  return (
    <Layout home>
      <Head>
        <title>{`Reamix | ${siteTitle}`}</title>
        <meta name='description' content={t.REAMIX_DESC} />
        <meta name='og:title' content={`Reamix | ${siteTitle}`} />
        <meta name='og:description' content={t.REAMIX_DESC} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/brand/reamix.jpg`}
        />
      </Head>
      <div className='py-32 relative overflow-hidden flex flex-col items-center justify-center px-4'>
        <p className='text-5xl font-semibold'>{t.REAMIX.SHORT_DESC}</p>
        <p className='mt-7 mb-8 text-3xl'>{t.REAMIX_DESC} </p>
        <a
          href='#download'
          className='mb-10 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
        >
          {t.REAMIX.DL}
        </a>
        <div className='dark:hidden shadow-xl'>
          <Image
            src='/images/projects/reamix/reamix-window.png'
            alt='Reamix Windowed Screenshot'
            width={1130}
            height={600}
            className='rounded-lg object-cover object-left'
          />
        </div>
        <div className='hidden dark:block shadow-xl'>
          <Image
            src='/images/projects/reamix/reamix-window-dark.png'
            alt='Reamix Windowed Screenshot(Dark)'
            width={1130}
            height={600}
            className='rounded-lg object-cover object-left'
          />
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          className='absolute bottom-0 left-0 w-full origin-center transform scale-110'
        >
          <path
            fill='#163469'
            fillOpacity='1'
            d='M0,64L80,85.3C160,107,320,149,480,154.7C640,160,800,128,960,96C1120,64,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
          ></path>
        </svg>
      </div>
      <main className='relative overflow-hidden'>
        <div className='bg-primary text-white'>
          <div className='container mx-auto max-w-6xl py-7 px-5 z-50'>
            <h2 className='text-5xl font-semibold mb-12'>{t.REAMIX.FEATURES}</h2>
            <section className='flex flex-col md:flex-row items-center justify-between my-10'>
              <div className='block md:hidden dark:hidden'>
                <Image
                  src='/images/projects/reamix/rmx-simple.png'
                  alt='Reamix UI'
                  width={500}
                  height={300}
                  className='rounded-lg object-cover object-left'
                />
              </div>
              <div className='hidden dark:block dark:md:hidden'>
                <Image
                  src='/images/projects/reamix/rmx-simple-dark.png'
                  alt='Reamix UI(Dark)'
                  width={500}
                  height={300}
                  className='rounded-lg object-cover object-left'
                />
              </div>
              <div className='flex flex-col justify-center my-5'>
                <h3 className='text-3xl font-semibold'>{t.REAMIX.SIMPLE}</h3>
                <p className='my-3 text-xl'>{nl2br(t.REAMIX.SIMPLE_C)}</p>
              </div>
              <div className='hidden md:block dark:hidden'>
                <Image
                  src='/images/projects/reamix/rmx-simple.png'
                  alt='Reamix UI'
                  width={500}
                  height={300}
                  className='rounded-lg object-cover object-left'
                />
              </div>
              <div className='hidden dark:md:block'>
                <Image
                  src='/images/projects/reamix/rmx-simple-dark.png'
                  alt='Reamix UI(Dark)'
                  width={500}
                  height={300}
                  className='rounded-lg object-cover object-left'
                />
              </div>
            </section>
            <section className='flex flex-col md:flex-row items-center justify-between my-10'>
              <div className='block dark:hidden'>
                <Image
                  src='/images/projects/reamix/rmx-extension.png'
                  alt='Reamix Extension'
                  width={500}
                  height={300}
                  className='rounded-lg object-cover object-left'
                />
              </div>
              <div className='hidden dark:block'>
                <Image
                  src='/images/projects/reamix/rmx-extension-dark.png'
                  alt='Reamix Extension(Dark)'
                  width={500}
                  height={300}
                  className='rounded-lg'
                />
              </div>
              <div className='flex flex-col justify-center my-5'>
                <h3 className='text-3xl font-semibold'>{t.REAMIX.EXT}</h3>
                <p className='my-3 text-xl'>{nl2br(t.REAMIX.EXT_C)}</p>
              </div>
            </section>
          </div>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          className='transform scale-110'
        >
          <path
            fill='#163469'
            fillOpacity='1'
            d='M0,128L80,154.7C160,181,320,235,480,245.3C640,256,800,224,960,218.7C1120,213,1280,235,1360,245.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z'
          ></path>
        </svg>
        <section className='container mx-auto max-w-6xl px-4 my-12' id='download'>
          <h2 className='text-5xl font-semibold mb-6'>{t.DOWNLOAD}</h2>
          <p className='text-2xl mb-6'>{t.REAMIX.DL_TODAY}</p>
          {locale === 'ja' && (
            <div className='flex flex-row flex-wrap gap-4'>
              <a href='https://snapcraft.io/reamix' rel='noopener noreferrer' target='_blank'>
                <Image
                  alt='Snap Store から入手ください'
                  src='https://snapcraft.io/static/images/badges/jp/snap-store-black.svg'
                  width={182}
                  height={56}
                />
              </a>
              <a
                href='https://www.microsoft.com/store/apps/9NN8XPM2RN2G'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  alt='Microsoftから入手'
                  src='https://get.microsoft.com/images/ja-jp%20dark.svg'
                  width={155}
                  height={56}
                />
              </a>
            </div>
          )}
          {locale === 'en' && (
            <div className='flex flex-row flex-wrap gap-4'>
              <a href='https://snapcraft.io/reamix' rel='noopener noreferrer' target='_blank'>
                <Image
                  alt='Get it from the Snap Store'
                  src='https://snapcraft.io/static/images/badges/en/snap-store-black.svg'
                  width={182}
                  height={56}
                />
              </a>
              <a
                href='https://www.microsoft.com/store/apps/9NN8XPM2RN2G'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  alt='Get it from Microsoft'
                  src='https://get.microsoft.com/images/en-us%20dark.svg'
                  width={155}
                  height={56}
                />
              </a>
            </div>
          )}
          {locale === 'cn' && (
            <div className='flex flex-row flex-wrap gap-4'>
              <a href='https://snapcraft.io/reamix' rel='noopener noreferrer' target='_blank'>
                <Image
                  alt='安装软体敬请移驾 Snap Store'
                  src='/images/projects/reamix/snap-store-black-cn.svg'
                  width={182}
                  height={56}
                />
              </a>
              <a
                href='https://www.microsoft.com/store/apps/9NN8XPM2RN2G'
                rel='noopener noreferrer'
                target='_blank'
              >
                <Image
                  alt='Microsoft获取'
                  src='https://get.microsoft.com/images/zh-cn%20dark.svg'
                  width={155}
                  height={56}
                />
              </a>
            </div>
          )}
          <div className='flex flex-wrap gap-5 my-5'>
            <a
              href={`https://mirror.vcborn.com/reamix/${latest}/reamix_${latest}_setup.exe`}
              download
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
            >
              <FaWindows size={20} className='mr-2' />
              {t.REAMIX.DL_WIN}
            </a>
            <a
              href={`https://mirror.vcborn.com/reamix/${latest}/reamix_${latest}_x64.dmg`}
              download
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
            >
              <FaApple size={20} className='mr-2' />
              {t.REAMIX.DL_MAC}
            </a>
            <a
              href={`https://mirror.vcborn.com/reamix/${latest}/reamix_${latest_deb}_amd64.deb`}
              download
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
            >
              <SiDebian size={20} className='mr-2' />
              {t.REAMIX.DL_LINUX}
            </a>
          </div>
          <div className='flex gap-5 my-5'>
            <a
              href='https://nightly.link/vcborn/reamix/workflows/build-dev/dev'
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
            >
              {t.REAMIX.DEV}
            </a>
            <a
              href='https://mirror.vcborn.com/reamix/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
            >
              {t.REAMIX.OLD}
            </a>
          </div>
        </section>
      </main>
    </Layout>
  )
}
