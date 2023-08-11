import { format } from 'date-fns'
import { GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'
import { getDirectusClient } from '@/lib/directus'

const Post = (props) => {
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`${props.article.title} | ${siteTitle}`}</title>
        <meta name='og:title' content={`${props.article.title} | ${siteTitle}`} />
        <meta
          property='og:image'
          content={
            props.article.thumbnail
              ? `https://console.vcborn.com/assets/${props.article.thumbnail}`
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
          {props.article.thumbnail && (
            <Image
              src={`https://console.vcborn.com/assets/${props.article.thumbnail}`}
              alt={props.article.title}
              className='mb-5'
              width={856}
              height={482}
            />
          )}
          <h1 className='text-4xl font-bold mb-3'>{props.article.title}</h1>
          <time className='text-gray-500 text-lg mb-8 block'>
            {format(new Date(props.article.date_created), 'yyyy.MM.dd')}
          </time>
          <div
            dangerouslySetInnerHTML={{ __html: props.article.content }}
            className='prose lg:prose-xl dark:prose-invert'
          />
        </article>
      </div>
      <Adsense />
    </Layout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const directus = await getDirectusClient()
  const slugs = await directus.items('news').readByQuery({
    fields: ['id'],
  })

  const paths = slugs.data.map((slug) => ({
    params: { slug: slug.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const directus = await getDirectusClient()
  const article = await directus.items('news').readOne(context.params.slug)

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: { article },
  }
}
