import Head from 'next/head'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Policy() {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`${t.POLICY} | ${siteTitle}`}</title>
        <meta name='og:title' content={`${t.POLICY} | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='container pt-10 mb-20 mx-auto px-5 max-w-7xl motion-safe:animate-fadeIn'>
        <h1 className='text-6xl font-bold my-24'>{t.POLICY}</h1>
        <div className='prose lg:prose-xl max-w-none dark:prose-invert'>
          <h2>{t.ToU4W}</h2>
          <p>{t.ToU4W_SP}</p>

          <h2>{t.COOKIE}</h2>
          <p>{t.COOKIE_SP}</p>

          <h2>{t.AD}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.AD_SP }}></p>

          <h2>{t.ANALYTICS}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.ANALYTICS_SP }}></p>

          <h2>{t.DISCLAIMER}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.DISCLAIMER_SP }}></p>

          <h2>{t.REVISION}</h2>
          <p>{nl2br(`${t.REVISION_SP}`)}</p>
        </div>
      </article>
    </Layout>
  )
}
