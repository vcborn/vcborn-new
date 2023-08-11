import Head from 'next/head'
import Image from 'next/image'
import { FaChevronRight, FaGithub } from 'react-icons/fa'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Shiftium() {
  const { t } = useLocale()
  return (
    <Layout home>
      <Head>
        <title>Shiftium | {siteTitle}</title>
        <meta name='description' content={t.SHIFTIUM.DESC} />
        <meta name='og:title' content={`Shiftium | ${siteTitle}`} />
        <meta name='og:description' content={t.SHIFTIUM.DESC} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/projects/st-crop.jpg`}
        />
      </Head>
      <section className='h-[60vh] flex flex-col items-center justify-center'>
        <Image src='/images/logo/shiftium.svg' alt='Shiftium Logo' width={128} height={128} />
        <h2 className='mt-10 text-3xl font-semibold mb-5'>Shiftium</h2>
        <p className='text-xl'>{t.SHIFTIUM.DESC}</p>
        <a
          href='#github'
          className='mt-8 flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white'
        >
          Github <FaChevronRight className='ml-2' />
        </a>
      </section>
      <main className='container max-w-5xl mx-auto prose lg:prose-lg dark:prose-invert mb-10 px-5'>
        <section>
          <h2>{t.SHIFTIUM.FEATURES}</h2>
          <div dangerouslySetInnerHTML={{ __html: t.SHIFTIUM.FEATURES_C }}></div>
        </section>
        <section>
          <h2>{t.SHIFTIUM.SCREEN}</h2>
          <p>{t.SHIFTIUM.SCREEN_C}</p>
          <h3>{t.SHIFTIUM.SCREEN_LOGIN}</h3>
          <Image
            src='/images/projects/shiftium/st-login.jpg'
            alt='Login'
            width={984}
            height={738}
          />
          <h3>{t.SHIFTIUM.SCREEN_DASH}</h3>
          <Image
            src='/images/projects/shiftium/st-dash.jpg'
            alt='Dashboard'
            width={984}
            height={738}
          />
          <h3>{t.SHIFTIUM.SCREEN_ADMIN}</h3>
          <Image
            src='/images/projects/shiftium/st-admin.jpg'
            alt='Admin'
            width={984}
            height={738}
          />
        </section>
        <section>
          <h2>{t.SHIFTIUM.ISSUE}</h2>
          <div dangerouslySetInnerHTML={{ __html: t.SHIFTIUM.ISSUE_C }}></div>
        </section>
        <section id='github'>
          <h2>{t.SHIFTIUM.REPO}</h2>
          <p>{nl2br(`${t.SHIFTIUM.REPO_C}`)}</p>
          <a
            href='https://github.com/vcborn/shiftium'
            className='inline-flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-black duration-200 hover:bg-black hover:text-white no-underline'
          >
            <FaGithub size={25} className='mr-2' />
            Github
          </a>
        </section>
      </main>
    </Layout>
  )
}
