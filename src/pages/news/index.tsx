import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'
import { getDirectusClient } from '@/lib/directus'

export const getStaticProps = async (context) => {
  const directus = await getDirectusClient()
  const res = await directus.items('news').readByQuery({
    sort: ['-date_created'],
    filter: {
      draft: false,
    },
  })
  const news = res.data

  return {
    props: { news },
  }
}

const News = (news) => {
  const { t } = useLocale()
  return (
    <Layout home>
      <Head>
        <title>{`News | ${siteTitle}`}</title>
        <meta name='og:title' content={`News | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <section className='container pt-10 mx-auto max-w-7xl px-5' id='news'>
        <div className='my-24'>
          <span className='text-gray-500 font-bold text-xl'>{t.LANG !== 'English' && t.NEWS}</span>
          <h2 className='text-6xl font-bold'>News</h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-9 gap-y-16 mb-24'>
          {news.news.map((item, index) => {
            return (
              <article key={item.id} className='group'>
                <Link
                  className='mx-auto flex flex-col'
                  scroll={false}
                  href={`/news/${item.id}`}
                  locale='ja'
                  passHref
                >
                  <div className='overflow-hidden'>
                    <Image
                      alt={item.id}
                      src={
                        item.thumbnail
                          ? `https://console.vcborn.com/assets/${item.thumbnail}`
                          : '/images/ogp.jpg'
                      }
                      width={640}
                      height={360}
                      className='group-hover:scale-110 duration-300'
                    />
                  </div>
                  <div>
                    <time className='font-semibold text-lg text-gray-600'>
                      {format(new Date(item.date_created), 'yyyy.MM.dd')}
                    </time>
                    <h3 className='font-semibold text-xl'>{item.title}</h3>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
      <Adsense />
    </Layout>
  )
}

export default News
