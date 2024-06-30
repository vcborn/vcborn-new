import { format } from 'date-fns'
import { GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'
import contentfulClient from '@/lib/contentful'
import { TypeNewsSkeleton } from '@/types/contentful'
import { Asset, Entry } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

const Post = ({ article }: { article: Entry<TypeNewsSkeleton> }) => {
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`${article.fields.title} | ${siteTitle}`}</title>
        <meta name='og:title' content={`${article.fields.title} | ${siteTitle}`} />
        <meta
          property='og:image'
          content={
            article.fields.thumbnail
              ? `https:${(article.fields.thumbnail as Asset).fields.file.url}`
              : `${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`
          }
        />
      </Head>
      <div className='mb-24 pt-10 px-5 container max-w-7xl mx-auto grid grid-cols-3 gap-5 motion-safe:animate-fadeIn'>
        <div className='col-span-3 md:col-span-1'>
          <h2 className='text-5xl font-bold mb-5'>News</h2>
          <Link
            href='/news'
            scroll={false}
            className='text-lg font-semibold border-4 py-2 border-black block text-center duration-200 hover:bg-black hover:text-white'
          >
            一覧へ戻る
          </Link>
        </div>
        <article className='col-span-3 md:col-span-2 pt-10 max-w-4xl'>
          {article.fields.thumbnail && (
            <Image
              src={`https:${(article.fields.thumbnail as Asset).fields.file.url}`}
              alt={article.fields.title as string}
              className='mb-5'
              width={856}
              height={482}
            />
          )}
          <h1 className='text-4xl font-bold mb-3'>{article.fields.title as string}</h1>
          <time className='text-gray-500 text-lg mb-8 block'>
            {format(new Date(article.fields.date_created as string), 'yyyy.MM.dd')}
          </time>
          <div className='prose lg:prose-xl dark:prose-invert'>
            {documentToReactComponents(article.fields.content as Document)}
          </div>
        </article>
      </div>
      <Adsense />
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await contentfulClient.getEntries<TypeNewsSkeleton>({ content_type: 'news' })

  const paths = posts.items.map((post) => ({
    params: { slug: post.fields.slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const article = await contentfulClient.getEntries<TypeNewsSkeleton>({
    content_type: 'news',
    'fields.slug': context.params.slug,
  })

  if (!article || !article.items.length || !article.items[0]) {
    return {
      notFound: true,
    }
  }

  return {
    props: { article: article.items[0] },
  }
}
