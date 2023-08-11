import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type React from 'react'
import { FaEnvelope, FaPenNib } from 'react-icons/fa'
import { SiGitea, SiBitwarden, SiDirectus, SiWikipedia } from 'react-icons/si'
import Footer from '@/components/Footer'
import Header from '@/components/memberHeader'

const Home: React.FC = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (session) {
    return (
      <div className='bg-white dark:bg-zinc-800 dark:text-white'>
        <Head>
          <title>ホーム | VCborn DEV</title>
          <meta name='robots' content='noindex' />
        </Head>
        <Header />
        <main className='container mx-auto max-w-5xl'>
          <article className='block mt-20'>
            <div className='py-5 px-7 container mx-auto max-w-4xl'>
              <h3 className='text-3xl font-bold my-6'>各種サービス</h3>
              <div className='inline-flex flex-row gap-2 text-xl text-white'>
                <a
                  href={'https://email.vcborn.com'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <FaEnvelope />
                </a>
                <a
                  href={'https://git.vcborn.com'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <SiGitea />
                </a>
                <a
                  href={'https://pass.vcborn.com'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <SiBitwarden />
                </a>
                <a
                  href={'https://console.vcborn.com'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <SiDirectus />
                </a>
                <a
                  href={'https://wiki.vcborn.com'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <SiWikipedia />
                </a>
                <a
                  href={'https://blog.vcborn.com/login_80857'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-primary rounded-full inline-block p-3 duration-200 hover:opacity-70'
                >
                  <FaPenNib />
                </a>
              </div>
              <h3 className='text-3xl font-bold my-6'>申請</h3>
              <p className='text-lg'>
                各サービスの利用申請は
                <Link href='/member/request' className='text-blue-600 underline'>
                  こちら
                </Link>
              </p>
              <h3 className='text-3xl font-bold my-6'>アカウント</h3>
              <h4 className='text-2xl font-bold my-4'>Misskey</h4>
              <p className='text-lg'>
                メールアドレス：
                <code>{'support@vcborn.com'}</code>
              </p>
              <p className='text-lg'>
                パスワード：
                <code>{'vcborn2021'}</code>
              </p>
              <h4 className='text-2xl font-bold my-4'>FTP</h4>
              <p className='text-lg'>
                ホスト：
                <code>{'ftp.vcborn.com'}</code>
              </p>
              <p className='text-lg'>
                ポート：
                <code>{21}</code>
              </p>
              <p className='text-lg'>
                ユーザー名：
                <code>{'vcborn@vcborn.com'}</code>
              </p>
              <p className='text-lg'>
                パスワード：
                <code>{'T@Y(@kd&_56O'}</code>
              </p>
              <h3 className='text-3xl font-bold my-6'>グループ内規約</h3>
              <iframe
                className='w-full h-[1000px]'
                src='https://docs.google.com/document/d/e/2PACX-1vTov3O88Ybz0oi-7ND-LPJtHkpM1lE4LqJ7wye9orbf10X10BB8JgEmdWjyacnuLxppDLdoQVH7wy1W/pub?embedded=true'
              ></iframe>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    )
  } else {
    void signIn()
  }
}

export default Home
