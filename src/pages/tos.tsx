import Head from 'next/head'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function TOS() {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`${t.TOS} | ${siteTitle}`}</title>
        <meta name='og:title' content={`${t.TOS} | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='container pt-10 mb-20 mx-auto px-5 max-w-7xl motion-safe:animate-fadeIn'>
        <h1 className='text-6xl font-bold my-24'>{t.TOS}</h1>
        <div className='prose lg:prose-xl max-w-none dark:prose-invert'>
          <h2>{t.DISCLAIMER}</h2>
          <p>{t.TOS_DISCLAIMER}</p>

          <h2>{t.LICENSES}</h2>
          <h3>VCLinux</h3>
          <p dangerouslySetInnerHTML={{ __html: t.LICENSE_VCLINUX }}></p>
        </div>
      </article>
    </Layout>
  )
}
