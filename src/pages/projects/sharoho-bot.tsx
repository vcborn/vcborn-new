import Head from 'next/head'
import Image from 'next/image'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Sharoho() {
  const { t } = useLocale()
  return (
    <Layout home>
      <Head>
        <title>
          {t.SHAROHO.TITLE} | {siteTitle}
        </title>
        <meta name='description' content={t.SHAROHO.DESC} />
        <meta name='og:title' content={`${t.SHAROHO.TITLE} | ${siteTitle}`} />
        <meta name='og:description' content={t.SHAROHO.DESC} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/projects/sharoho/sharoho.png`}
        />
      </Head>
      <section className='max-w-6xl px-4 mx-auto h-screen flex flex-col items-start justify-center'>
        <h2 className='text-5xl font-semibold mb-5'>{t.SHAROHO.TITLE}</h2>
        <p className='text-2xl font-medium'>{t.SHAROHO.DESC}</p>
        <div className='flex flex-row gap-5'>
          <a
            href='https://discord.com/api/oauth2/authorize?client_id=946798294514937907&permissions=274878015488&scope=bot'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-discord border-4 border-discord text-discord hover:text-white duration-200 text-lg flex flex-row items-center px-6 py-2 mt-5'
          >
            <FaDiscord size={35} />
          </a>
          <a
            href='https://github.com/vcborn/sharoho-bot'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-slate-800 border-4 border-slate-800 text-slate-800 duration-200 text-lg flex flex-row items-center px-6 py-3 mt-5'
          >
            <FaGithub size={30} />
          </a>
        </div>
      </section>
      <main className='container max-w-6xl mx-auto mb-10 px-5 flex flex-col gap-12'>
        <section className='flex flex-col md:flex-row justify-between items-center'>
          <div className='max-w-lg mb-5'>
            <h2 className='text-4xl font-semibold mb-4'>{t.SHAROHO.S1}</h2>
            <p className='text-xl'>{t.SHAROHO.S1_C}</p>
          </div>
          <Image
            src='/images/projects/sharoho/sharoho-today.png'
            alt='Sharoho result'
            width={430}
            height={300}
          />
        </section>
        <section className='flex flex-col md:flex-row justify-between items-center'>
          <div className='max-w-lg mb-5'>
            <h2 className='text-4xl font-semibold mb-4'>{t.SHAROHO.S2}</h2>
            <p className='text-xl max-w-lg'>{t.SHAROHO.S2_C}</p>
          </div>
          <Image
            src='/images/projects/sharoho/sharoho-rank.png'
            alt='Sharoho result'
            width={430}
            height={300}
          />
        </section>
        <section>
          <h2 className='text-4xl font-semibold mb-5'>{t.SHAROHO.INSTALL}</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='bg-gray-100 dark:bg-stone-900 duration-300 p-5'>
              <h3 className='text-xl font-semibold'>{t.SHAROHO.INSTALL_1}</h3>
              <p>{t.SHAROHO.INSTALL_1_C}</p>
            </div>
            <div className='bg-gray-100 dark:bg-stone-900 duration-300 p-5'>
              <h3 className='text-xl font-semibold'>{t.SHAROHO.INSTALL_2}</h3>
              <p>{t.SHAROHO.INSTALL_2_C}</p>
            </div>
            <div className='bg-gray-100 dark:bg-stone-900 duration-300 p-5'>
              <h3 className='text-xl font-semibold'>{t.SHAROHO.INSTALL_3}</h3>
              <p>{t.SHAROHO.INSTALL_3_C}</p>
            </div>
          </div>
        </section>
        <section className='text-center py-10'>
          <h2 className='text-4xl font-semibold mb-5'>{t.SHAROHO.GET}</h2>
          <a
            href='https://discord.com/api/oauth2/authorize?client_id=946798294514937907&permissions=274878015488&scope=bot'
            target='_blank'
            rel='noopener noreferrer'
            className='border-discord border-4 text-discord hover:bg-discord hover:text-white font-semibold duration-200 text-lg inline-flex flex-row items-center mx-5 px-6 py-2 mt-5'
          >
            {t.SHAROHO.DISCORD} <FaDiscord size={25} className='ml-2' />
          </a>
          <a
            href='https://github.com/vcborn/sharoho-bot'
            target='_blank'
            rel='noopener noreferrer'
            className='border-slate-800 border-4 text-slate-800 hover:bg-slate-800 hover:text-white font-semibold duration-200 text-lg inline-flex flex-row items-center mx-5 px-6 py-2 mt-5'
          >
            Github <FaGithub size={23} className='ml-2' />
          </a>
        </section>
      </main>
    </Layout>
  )
}
