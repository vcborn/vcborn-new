import Head from 'next/head'
import { HiCheck } from 'react-icons/hi'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'

export default function Thanks() {
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`送信完了 | ${siteTitle}`}</title>
        <meta name='robots' content='noindex' />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='h-[80vh] flex flex-col justify-center items-center container text-center mx-auto px-5 max-w-4xl motion-safe:animate-fadeIn'>
        <HiCheck size={100} className='mx-auto mb-10' />
        <h1 className='text-4xl font-bold mb-3'>送信完了</h1>
        <div className='prose-lg lg:prose-xl dark:prose-invert'>
          <p>
            参加申し込み有難うございました。
            <br />
            承認された場合、VCbornからTwitterのDMで連絡をいたします。
            <br />
            <a
              href='https://twitter.com/vcborn_support'
              rel='noopener noreferrer'
              target='_blank'
              className='underline'
            >
              @vcborn_support
            </a>
            をフォローされていない場合はメールで連絡をいたします。
          </p>
        </div>
        <Adsense />
      </article>
    </Layout>
  )
}
