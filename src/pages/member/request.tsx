import { useSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaEnvelope, FaFileAlt, FaCloud, FaCircleNotch } from 'react-icons/fa'
import Footer from '@/components/Footer'
import Header from '@/components/memberHeader'

type Inputs = {
  services: Array<string>
  name: string
  username: string
  email: string
  pass: string
  agree: boolean
  card: boolean
}

const Request: React.FC = () => {
  const { data: session, status } = useSession()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    document.getElementById('load').classList.remove('hidden')
    const services = data.services.filter(Boolean)
    const pass = data.pass ? data.pass : 'なし'
    const card = data.card ? '希望する' : '希望しない'
    const hookres = await fetch('/api/request', {
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        username: data.username,
        pass: pass,
        services: services,
        card: card,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const { hookerror } = await hookres.json()
    if (hookerror) {
      console.log(hookerror)
      return
    }
    location.href = '/member'
  }

  useEffect(() => {
    const minCheckbox = () => {
      const services = getValues('services').filter(Boolean)
      return services.length != 0
    }
    register('services', {
      required: true,
      validate: minCheckbox,
    })
  }, [getValues, register])

  if (status === 'loading') {
    return null
  }

  if (session) {
    return (
      <div className='bg-white dark:bg-zinc-800 dark:text-white'>
        <Head>
          <title>利用申請 | VCborn DEV</title>
          <meta name='robots' content='noindex' />
        </Head>
        <Header />
        <section className='container pt-32 mx-auto max-w-6xl mb-20 px-5 motion-safe:animate-fadeIn'>
          <div className='py-5 px-2'>
            <h3 className='text-4xl font-bold'>利用申請</h3>
            <form className='my-10 inline-flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='inline-flex flex-col'>
                <label className='text-lg' htmlFor='name'>
                  お名前・ユーザー名
                  <span className='text-red-500 font-bold'>*</span>
                </label>
                <input
                  className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-96'
                  type='text'
                  {...register('name', { required: true })}
                  id='name'
                  placeholder='VCborn'
                />
                {errors.name && (
                  <span className='text-red-500 font-bold'>このフィールドは必須です</span>
                )}
              </div>

              <div className='inline-flex flex-col'>
                <label className='text-lg' htmlFor='email'>
                  メールアドレス<span className='text-red-500 font-bold'>*</span>
                </label>
                <input
                  className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-96'
                  type='email'
                  {...register('email', {
                    required: true,
                    pattern:
                      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  })}
                  id='email'
                  placeholder='sample@example.com'
                />
                {errors.email && (
                  <span className='text-red-500 font-bold'>このフィールドは必須です</span>
                )}
              </div>

              <div className='inline-flex flex-col'>
                <label className='text-lg' htmlFor='username'>
                  希望するユーザー名
                  <span className='text-red-500 font-bold'>*</span>
                </label>
                <input
                  className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-96'
                  type='text'
                  {...register('username', {
                    required: true,
                  })}
                  id='username'
                  placeholder='vcborn'
                />
                {errors.username && (
                  <span className='text-red-500 font-bold'>このフィールドは必須です</span>
                )}
              </div>

              <div className='inline-flex flex-col'>
                <label className='text-lg' htmlFor='pass'>
                  希望するパスワード（8～32文字）
                </label>
                <p>パスワードを入力しない場合、こちらで自動生成したものを送ります。</p>
                <input
                  className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-96'
                  type='password'
                  {...register('pass', {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/i,
                  })}
                  id='pass'
                />
                {errors.pass && (
                  <span className='text-red-500 font-bold'>
                    半角6~12文字英大文字・小文字・数字それぞれ１文字以上含む必要があります
                  </span>
                )}
              </div>

              <div className='inline-flex flex-col'>
                <label className='text-lg'>
                  利用するサービス
                  <span className='text-red-500 font-bold'>*</span>
                </label>
                <div>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${0}`)}
                      id='mail'
                      value='メール'
                    />
                    <label className='text-lg ml-2' htmlFor='mail'>
                      メール
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${1}`)}
                      id='cloud'
                      value='NextCloud'
                    />
                    <label className='text-lg ml-2' htmlFor='cloud'>
                      NextCloud
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${2}`)}
                      id='wiki'
                      value='Wiki'
                    />
                    <label className='text-lg ml-2' htmlFor='wiki'>
                      Wiki
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${3}`)}
                      id='blog'
                      value='ブログ'
                    />
                    <label className='text-lg ml-2' htmlFor='blog'>
                      ブログ
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${4}`)}
                      id='directus-news'
                      value='Directus(News)'
                    />
                    <label className='text-lg ml-2' htmlFor='directus-news'>
                      Directus（ニュース記事管理）
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${5}`)}
                      id='directus-support'
                      value='Directus(Support)'
                    />
                    <label className='text-lg ml-2' htmlFor='directus-support'>
                      Directus（サポート記事管理）
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${6}`)}
                      id='directus-member'
                      value='Directus(Member)'
                    />
                    <label className='text-lg ml-2' htmlFor='directus-member'>
                      Directus（メンバー情報管理）
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${7}`)}
                      id='youtube'
                      value='YouTube'
                    />
                    <label className='text-lg ml-2' htmlFor='youtube'>
                      YouTube
                    </label>
                  </div>

                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                      {...register(`services.${8}`)}
                      id='chatwoot'
                      value='Chatwoot'
                    />
                    <label className='text-lg ml-2' htmlFor='chatwoot'>
                      Chatwoot（サポート）
                    </label>
                  </div>
                </div>
                {errors.services && (
                  <span className='text-red-500 font-bold'>少なくとも一つ選択してください</span>
                )}
              </div>

              <div className='inline-flex flex-col'>
                <span className='text-lg'>名刺</span>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                    id='card'
                    {...register('card')}
                  />
                  <label className='text-lg ml-2' htmlFor='card'>
                    名刺を希望します
                  </label>
                </div>
              </div>

              <div className='mt-10 flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  id='privacy'
                  {...register('agree', { required: true })}
                />
                <label className='text-lg' htmlFor='privacy'>
                  <Link href='/privacy'>
                    <span className='underline ml-2'>プライバシーポリシー</span>
                  </Link>
                  をよく読み、同意しました。
                </label>
              </div>
              {errors.agree && (
                <span className='text-red-500 font-bold block'>規約への同意は必須です</span>
              )}

              <button className='inline-block text-black py-2 border-black border-4 font-bold duration-200 hover:bg-black hover:text-white'>
                送信
              </button>
              <div className='my-5 flex flex-row items-center text-lg hidden' id='load'>
                <FaCircleNotch className='animate-spin text-2xl mr-2 text-primary' />
                <p>送信中です...</p>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    )
  } else {
    void signIn()
  }
}

export default Request
