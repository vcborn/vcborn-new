import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FaCircleNotch } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

type Inputs = {
  name: string
  furigana: string
  email: string
  twitter: string
  group: string
  active: string
  departments: Array<string>
  works: string
  message: string
  agree: boolean
}

export default function Join() {
  const { t } = useLocale()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }
    const reCaptchaToken = await executeRecaptcha('joinForm')
    const emailDomain = data.email.split('@')[1]
    const ignoreDomains = ['example.com', 'example.org']
    if (ignoreDomains.includes(emailDomain)) {
      return
    }
    document.getElementById('load').classList.remove('hidden')
    const departments = data.departments.filter(Boolean)
    const mailres = await fetch('/api/join', {
      body: JSON.stringify({
        name: data.name,
        furigana: data.furigana,
        email: data.email,
        twitter: data.twitter,
        group: data.group,
        active: data.active,
        departments: departments,
        works: data.works,
        message: data.message,
        token: reCaptchaToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const { error } = await mailres.json()
    document.getElementById('load').classList.add('hidden')
    if (error) {
      console.log(error)
      Swal.fire({
        title: 'エラー',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#163469',
      })
      return
    } else {
      location.href = '/thanks'
    }
  }

  useEffect(() => {
    const minCheckbox = () => {
      const departments = getValues('departments').filter(Boolean)
      return departments.length != 0
    }
    register('departments', {
      required: true,
      validate: minCheckbox,
    })
  }, [getValues, register])

  return (
    <Layout home>
      <Head>
        <title>{`Join | ${siteTitle}`}</title>
        <meta name='og:title' content={`Join | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <section className='container pt-10 mx-auto max-w-7xl mb-20 px-5 motion-safe:animate-fadeIn'>
        <div className='my-24'>
          <span className='text-gray-500 font-bold text-xl'>{t.LANG !== 'English' && t.JOIN}</span>
          <h2 className='text-6xl font-bold'>Join</h2>
        </div>
        <p className='text-lg'></p>
        <form className='my-10 inline-flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='name'>
              お名前・ユーザー名<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                type='text'
                {...register('name', { required: true })}
                id='name'
                placeholder='山田太郎'
              />
              {errors.name && (
                <span className='text-red-500 font-bold'>このフィールドは必須です</span>
              )}
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='furigana'>
              ふりがな<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                type='text'
                {...register('furigana', {
                  required: true,
                  pattern: /^[ぁ-ん]|-|ー+$/,
                })}
                id='furigana'
                placeholder='やまだたろう'
              />
              {errors.furigana && (
                <span className='text-red-500 font-bold'>このフィールドは必須です</span>
              )}
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='email'>
              メールアドレス<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
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
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='twitter'>
              X(Twitter) ID<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                type='text'
                {...register('twitter', {
                  required: true,
                  pattern: /^(@(\w){1,15}$)/i,
                })}
                id='twitter'
                placeholder='@vcborn_support'
              />
              {errors.twitter && (
                <span className='text-red-500 font-bold'>このフィールドは必須です</span>
              )}
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='group'>
              所属中のグループ
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                type='text'
                {...register('group')}
                id='group'
              />
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='active'>
              平均浮上日数（一週間）<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <select
                {...register('active', { required: true })}
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
              >
                <option value=''>日数を選択してください</option>
                <option value='0日～2日'>0日～2日</option>
                <option value='3日～5日'>3日～5日</option>
                <option value='6日～7日'>6日～7日</option>
              </select>
              {errors.active && (
                <span className='text-red-500 font-bold'>このフィールドは必須です</span>
              )}
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64'>
              希望する部署<span className='text-red-500 font-bold'>*</span>
            </label>
            <div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${0}`)}
                  id='linux'
                  value='Linux開発'
                />
                <label className='text-lg ml-2' htmlFor='linux'>
                  Linux開発
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${1}`)}
                  id='web'
                  value='Web開発'
                />
                <label className='text-lg ml-2' htmlFor='web'>
                  Web開発
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${2}`)}
                  id='software'
                  value='ソフトウェア開発'
                />
                <label className='text-lg ml-2' htmlFor='software'>
                  ソフトウェア開発
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${3}`)}
                  id='bot'
                  value='Bot開発'
                />
                <label className='text-lg ml-2' htmlFor='bot'>
                  Bot開発
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${4}`)}
                  id='design'
                  value='デザイン'
                />
                <label className='text-lg ml-2' htmlFor='design'>
                  デザイン
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${5}`)}
                  id='movie'
                  value='動画制作'
                />
                <label className='text-lg ml-2' htmlFor='movie'>
                  動画制作
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary focus:ring-offset-2 focus:ring-opacity-50'
                  {...register(`departments.${6}`)}
                  id='event'
                  value='MC・イベント'
                />
                <label className='text-lg ml-2' htmlFor='event'>
                  MC・イベント
                </label>
              </div>
              {errors.departments && (
                <span className='text-red-500 font-bold'>少なくとも一つ選択してください</span>
              )}
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='works'>
              実績
            </label>
            <div className='flex flex-col gap-1'>
              <input
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                type='text'
                placeholder='ex. https://github.com/...'
                {...register('works')}
                id='works'
              />
            </div>
          </div>

          <div className='inline-flex flex-col md:flex-row md:items-center md:gap-4'>
            <label className='text-lg md:w-64' htmlFor='message'>
              できること(一言)<span className='text-red-500 font-bold'>*</span>
            </label>
            <div className='flex flex-col gap-1'>
              <textarea
                className='bg-gray-100 border-0 text-lg px-5 py-3 focus:outline-none focus:border-0 focus:ring-black focus:ring-2 duration-200 text-black md:w-[30rem]'
                {...register('message', { required: true })}
                id='message'
              ></textarea>
              {errors.message && (
                <span className='text-red-500 font-bold'>このフィールドは必須です</span>
              )}
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
              <Link href='/privacy' scroll={false}>
                <span className='underline ml-2'>プライバシーポリシー</span>
              </Link>
              をよく読み、同意しました。
            </label>
          </div>
          {errors.agree && (
            <span className='text-red-500 font-bold block'>規約への同意は必須です</span>
          )}

          <button className='mt-10 inline-block py-2 border-4 border-black duration-200 hover:bg-black hover:text-white font-semibold text-lg'>
            送信
          </button>
          <div className='my-5 flex flex-row items-center text-lg hidden' id='load'>
            <FaCircleNotch className='animate-spin text-2xl mr-2 text-primary' />
            <p>送信中です...</p>
          </div>
        </form>
        <div className='my-10'>
          <p className='text-lg'>
            このサイトはreCAPTCHAによって保護されており、Googleの
            <a
              href='https://policies.google.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary dark:text-blue-500 duration-200 hover:opacity-80'
            >
              プライバシーポリシー
            </a>
            と
            <a
              href='https://policies.google.com/terms'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary dark:text-blue-500 duration-200 hover:opacity-80'
            >
              利用規約
            </a>
            が適用されます。
          </p>
        </div>
      </section>
    </Layout>
  )
}
