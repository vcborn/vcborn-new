import Head from 'next/head'
import Link from 'next/link'
import { FaCircleNotch } from 'react-icons/fa'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Join() {
  const { t } = useLocale()

  return (
    <Layout home>
      <Head>
        <title>{`Join | ${siteTitle}`}</title>
        <meta name='og:title' content={`Join | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <section className='container pt-10 mx-auto max-w-7xl mb-20 px-5 motion-safe:animate-fadeIn'>
        <div className='my-24'>
          <span className='text-gray-500 font-bold text-xl'>{t.LANG !== 'English' && t.JOIN}</span>
          <h2 className='text-6xl font-bold'>Join</h2>
        </div>
        <p className='text-lg'></p>
        <p className='my-8 text-xl font-bold'>募集は終了しました。</p>
      </section>
    </Layout>
  )
}
