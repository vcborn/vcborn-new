import Head from 'next/head'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Privacy() {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`${t.PRIVACY} | ${siteTitle}`}</title>
        <meta property='og:title' content={`${t.PRIVACY} | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='container pt-10 mb-20 mx-auto px-5 max-w-7xl motion-safe:animate-fadeIn'>
        <h1 className='text-6xl font-bold my-24'>{t.PRIVACY}</h1>
        <div className='prose lg:prose-xl max-w-none dark:prose-invert'>
          <h2>{t.HANDLING}</h2>
          <p>{t.HANDLING_PP}</p>
          <h3>{t.DEFINITION}</h3>
          <p>{t.DEFINITION_PP}</p>
          <h2>{t.ACQUISITION}</h2>
          <p>{t.ACQUISITION_PP}</p>
          <h3>{t.MANAGEMENT}</h3>
          <p>{t.MANAGEMENT_PP}</p>
          <h3>{t.USE}</h3>
          <div dangerouslySetInnerHTML={{ __html: t.USE_PP }}></div>
          <h3>{t.PROVISION}</h3>
          <div dangerouslySetInnerHTML={{ __html: t.PROVISION_PP }}></div>
          <h3>{t.PROCEDURES}</h3>
          <div dangerouslySetInnerHTML={{ __html: t.PROCEDURES_PP }}></div>
          <h3>{t.REVISION}</h3>
          <p>{nl2br(`${t.REVISION_PP}`)}</p>
        </div>
      </article>
    </Layout>
  )
}
