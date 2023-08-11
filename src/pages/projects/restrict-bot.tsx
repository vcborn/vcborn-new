import Head from 'next/head'
import Image from 'next/image'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Restrict() {
  const { t } = useLocale()
  return (
    <Layout home>
      <Head>
        <title>
          {t.RESTRICT.TITLE} | {siteTitle}
        </title>
        <meta name='description' content={t.RESTRICT.DESC} />
        <meta name='og:title' content={`${t.RESTRICT.TITLE} | ${siteTitle}`} />
        <meta name='og:description' content={t.RESTRICT.DESC} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/slides/censor-example.jpg`}
        />
      </Head>
      <section className='max-w-6xl px-4 mx-auto h-screen flex flex-col items-start justify-center'>
        <h2 className='text-5xl font-semibold mb-5'>{t.RESTRICT.TITLE}</h2>
        <p className='text-2xl font-medium'>{t.RESTRICT.DESC}</p>
        <div className='flex flex-row gap-5'>
          <a
            href='https://discord.com/api/oauth2/authorize?client_id=957285414182477834&permissions=75792&scope=bot'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-discord border-4 border-discord text-discord hover:text-white duration-200 text-lg flex flex-row items-center px-6 py-2 mt-5'
          >
            <FaDiscord size={35} />
          </a>
          <a
            href='https://github.com/vcborn/restrict-bot'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:bg-slate-800 border-4 border-slate-800 text-slate-800 duration-200 text-lg flex flex-row items-center px-6 py-3 mt-5'
          >
            <FaGithub size={30} />
          </a>
        </div>
      </section>
      <main className='container max-w-6xl mx-auto mb-10 px-5 flex flex-col gap-12'>
        <section className='flex flex-col justify-center items-center text-center'>
          <h2 className='text-4xl font-semibold mb-4'>{t.RESTRICT.S1}</h2>
          <p className='text-xl mb-5'>{nl2br(t.RESTRICT.S1_C)}</p>
          <Image
            src='/images/projects/restrict/censor.png'
            alt='Sharoho result'
            width={1000}
            height={600}
          />
        </section>
        <section className='flex flex-col justify-center items-center text-center'>
          <h2 className='text-4xl font-semibold mb-4'>{t.RESTRICT.S2}</h2>
          <p className='text-xl mb-5'>{nl2br(t.RESTRICT.S2_C)}</p>
          <Image
            src='/images/projects/restrict/censor-config.png'
            alt='Sharoho result'
            width={800}
            height={500}
          />
        </section>
        <section className='text-center py-10'>
          <h2 className='text-4xl font-semibold mb-5'>{t.SHAROHO.GET}</h2>
          <a
            href='https://discord.com/api/oauth2/authorize?client_id=957285414182477834&permissions=75792&scope=bot'
            target='_blank'
            rel='noopener noreferrer'
            className='border-discord border-4 text-discord hover:bg-discord hover:text-white font-semibold duration-200 text-lg inline-flex flex-row items-center mx-5 px-6 py-2 mt-5'
          >
            {t.SHAROHO.DISCORD} <FaDiscord size={25} className='ml-2' />
          </a>
          <a
            href='https://github.com/vcborn/restrict-bot'
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
