import { format } from 'date-fns'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'
import contentfulClient from '@/lib/contentful'
import { TypeNewsSkeleton } from '@/types/contentful'
import { Asset, EntryCollection } from 'contentful'

export const getStaticProps = async (context) => {
  const news = await contentfulClient.getEntries({
    content_type: 'news',
    order: ['-fields.date_created'],
  })

  return {
    props: { news },
  }
}

const News = ({ news }: { news: EntryCollection<TypeNewsSkeleton, undefined, string> }) => {
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
          {news.items.map((item, index) => {
            return (
              <article key={item.fields.slug} className='group'>
                <Link
                  className='mx-auto flex flex-col'
                  scroll={false}
                  href={`/news/${item.fields.slug}`}
                  locale='ja'
                  passHref
                >
                  <div className='overflow-hidden'>
                    <Image
                      alt={item.fields.slug}
                      src={
                        item.fields.thumbnail
                          ? `https:${(item.fields.thumbnail as Asset).fields.file.url}`
                          : '/images/ogp.jpg'
                      }
                      width={640}
                      height={360}
                      className='group-hover:scale-110 duration-300'
                    />
                  </div>
                  <div>
                    <time className='font-semibold text-lg text-gray-600'>
                      {format(new Date(item.fields.date_created), 'yyyy.MM.dd')}
                    </time>
                    <h3 className='font-semibold text-xl'>{item.fields.title}</h3>
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
