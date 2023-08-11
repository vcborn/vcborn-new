import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import { FaEnvelope, FaIdCard, FaUser } from 'react-icons/fa'
import Footer from '@/components/Footer'
import Header from '@/components/memberHeader'

const Profile: React.FC = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  if (session) {
    return (
      <div className='bg-white dark:bg-zinc-800 dark:text-white'>
        <Head>
          <title>プロフィール | VCborn DEV</title>
          <meta name='robots' content='noindex' />
        </Head>
        <Header />
        <main>
          <article className='mt-20'>
            <div className='py-5 px-7 container mx-auto max-w-4xl min-h-[65vh]'>
              <h2 className='my-6 text-2xl font-bold'>プロフィール</h2>
              <h4 className='flex flex-row items-center pl-2 border-l-4 text-lg font-bold border-primary my-4'>
                <FaUser className='mr-2' /> ユーザー名
              </h4>
              <p>{session.user.name ? session.user.name : '不明'}</p>
              <h4 className='flex flex-row items-center pl-2 border-l-4 text-lg font-bold border-primary my-4'>
                <FaEnvelope className='mr-2' /> メールアドレス
              </h4>
              <p>{session.user.email ? session.user.email : '不明'}</p>
              <h4 className='flex flex-row items-center pl-2 border-l-4 text-lg font-bold border-primary my-4'>
                <FaIdCard className='mr-2' /> ユーザーID
              </h4>
              <p>{session.user.id ? session.user.id : '不明'}</p>
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

export default Profile
