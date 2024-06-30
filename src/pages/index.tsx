import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { format } from 'date-fns'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'
import contentfulClient from '@/lib/contentful'
// eslint-disable-next-line import/no-unresolved
import '@splidejs/splide/css/core'
import { TypeNewsSkeleton } from '@/types/contentful'
import { Asset, EntryCollection } from 'contentful'

export const getStaticProps = async (context) => {
  const news = await contentfulClient.getEntries<TypeNewsSkeleton>({
    content_type: 'news',
    order: ['-fields.date_created'],
    limit: 3,
  })

  return {
    props: { news },
  }
}

const Home = ({ news }: { news: EntryCollection<TypeNewsSkeleton, undefined, string> }) => {
  const { t } = useLocale()

  useEffect(() => {
    const header = document.querySelector('header')
    const logo = document.getElementById('logo') as HTMLImageElement
    const height = window.innerHeight
    function checkScroll() {
      if (window.scrollY <= height - 90 && logo && header) {
        header.classList.remove('bg-white')
        header.classList.add('text-gray-200')
        logo.src = '/images/logo/vcborn-logo-white.svg'
        logo.srcset = '/images/logo/vcborn-logo-white.svg 1x, /images/logo/vcborn-logo-white.svg 2x'
      } else if (logo && header) {
        header.classList.add('bg-white')
        header.classList.remove('text-gray-200')
        logo.src = '/images/logo/vcborn-logo.svg'
        logo.srcset = '/images/logo/vcborn-logo.svg 1x, /images/logo/vcborn-logo.svg 2x'
      }
    }
    window.addEventListener('scroll', checkScroll)
  }, [])

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <section className='min-h-screen bg-primary text-white'>
        <div className='px-5 min-h-screen flex items-center max-w-7xl mx-auto'>
          <div className='z-30'>
            <h2 className='text-5xl font-semibold mb-5'>{t.SLOGAN}</h2>
            <p className='mb-48 font-medium md:mb-0 text-xl'>{t.SLOGAN_2}</p>
          </div>
        </div>
        <div className='absolute right-0 min-h-screen clip-triangle bg-[#0a162c] top-0 w-full'></div>
        <div className='absolute right-0 min-h-screen clip-pentagon bg-[#0f2345] top-0 w-full md:w-1/2'></div>
        <div className='absolute -right-[52rem] md:-right-[42rem] lg:-right-96 top-44 md:top-64'>
          <div className='bg-gray-400 aspect-video h-[35rem] -rotate-[40deg]'></div>
        </div>
        <div className='absolute -right-[52rem] md:-right-[42rem] lg:-right-96 top-32 md:top-56'>
          <div className='bg-gray-200 aspect-video h-[35rem] -rotate-[35deg]'></div>
        </div>
        <div className='absolute -right-[52rem] md:-right-[42rem] lg:-right-96 top-24 md:top-48 z-10'>
          <div className='bg-white aspect-video h-[35rem] -rotate-[30deg]'>
            <Image src='/images/off.jpg' width={1280} height={720} alt='Off' />
          </div>
        </div>
      </section>
      <section className='mt-16 mb-28'>
        <h2 className='px-4 flex items-center text-4xl md:text-5xl font-semibold container mx-auto max-w-7xl'>
          Projects{' '}
          <span className='ml-4 text-xl md:text-2xl text-gray-500 font-bold'>
            {t.LANG !== 'English' && t.PROJECTS}
          </span>
        </h2>
        <Splide
          hasTrack={false}
          aria-label='Products'
          options={{
            type: 'loop',
            autoplay: true,
            interval: 8000,
            pagination: false,
          }}
          className='relative mt-16 z-20'
        >
          <SplideTrack className='h-[38rem] object-cover'>
            <SplideSlide className='relative'>
              <Image
                className='slide-img absolute z-0 object-cover object-bottom translate-y-3'
                src='/images/projects/vclinux/vclinux.png'
                alt='VCLinux'
                fill={true}
              />
              <div className='px-4 md:px-24 w-full absolute z-20 bottom-10 flex flex-col md:flex-row justify-between items-start md:items-end text-white'>
                <div>
                  <h3 className='text-5xl font-semibold mb-3'>VCLinux</h3>
                  <p className='text-xl font-medium'>{t.VCLINUX.SHORT_DESC}</p>
                </div>
                <Link
                  scroll={false}
                  href='/projects/vclinux'
                  className='mt-4 border-4 px-4 py-2 font-semibold text-lg border-white inline-block duration-200 hover:bg-white hover:text-black'
                >
                  LEARN MORE
                </Link>
              </div>
            </SplideSlide>
            <SplideSlide className='relative'>
              <Image
                className='slide-img absolute z-0'
                src='/images/mcborn.jpg'
                alt='MCborn'
                fill={true}
                style={{ objectFit: 'cover' }}
              />
              <div className='px-4 md:px-24 w-full absolute z-20 bottom-10 flex flex-col md:flex-row justify-between items-start md:items-end'>
                <div>
                  <h3 className='text-5xl font-semibold mb-3'>MCborn</h3>
                  <p className='text-xl font-medium'>{t.MCBORN_DESC}</p>
                </div>
                <a
                  href='https://mc.vcborn.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
                >
                  LEARN MORE
                </a>
              </div>
            </SplideSlide>
            <SplideSlide className='relative'>
              <Image
                className='slide-img absolute z-0'
                src='/images/vcast-editing.png'
                alt='VCast'
                fill={true}
                style={{ objectFit: 'cover' }}
              />
              <div className='px-4 md:px-24 w-full absolute z-20 bottom-10 flex flex-col md:flex-row justify-between items-start md:items-end text-white'>
                <div>
                  <h3 className='text-5xl font-semibold mb-3'>VCast</h3>
                  <p className='text-xl font-medium'>{t.VCAST_DESC}</p>
                </div>
                <a
                  href='https://podcasters.spotify.com/pod/show/vcborn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 border-4 px-4 py-2 font-semibold text-lg border-white inline-block duration-200 hover:bg-white hover:text-black'
                >
                  LEARN MORE
                </a>
              </div>
            </SplideSlide>
            <SplideSlide className='relative'>
              <Image
                className='slide-img absolute z-0 object-cover'
                src='/images/projects/sharoho/sharoho.png'
                alt='Sharoho'
                fill={true}
              />
              <div className='px-4 md:px-24 w-full absolute z-20 bottom-10 flex flex-col md:flex-row justify-between items-start md:items-end text-white'>
                <div>
                  <h3 className='text-5xl font-semibold mb-3'>{t.SHAROHO.TITLE}</h3>
                  <p className='text-xl font-medium'>{t.SHAROHO.DESC}</p>
                </div>
                <Link
                  scroll={false}
                  href='/projects/sharoho-bot'
                  className='mt-4 border-4 px-4 py-2 font-semibold text-lg border-white inline-block duration-200 hover:bg-white hover:text-black'
                >
                  LEARN MORE
                </Link>
              </div>
            </SplideSlide>
            <SplideSlide className='relative'>
              <Image
                className='slide-img absolute z-0 object-cover'
                src='/images/projects/reamix/reamix-window.png'
                alt='Reamix'
                fill={true}
              />
              <div className='px-4 md:px-24 w-full absolute z-20 bottom-10 flex flex-col md:flex-row justify-between items-start md:items-end'>
                <div>
                  <h3 className='text-5xl font-semibold mb-3'>Reamix</h3>
                  <p className='text-xl font-medium'>{t.REAMIX.DESC}</p>
                </div>
                <Link
                  scroll={false}
                  href='/projects/reamix'
                  className='mt-4 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
                >
                  LEARN MORE
                </Link>
              </div>
            </SplideSlide>
          </SplideTrack>
          <div className='splide__arrows hidden md:block'>
            <button className='splide__arrow splide__arrow--prev absolute top-1/2 -translate-y-1/2 left-8'>
              <MdArrowBackIos size={50} />
            </button>
            <button className='splide__arrow splide__arrow--next absolute top-1/2 -translate-y-1/2 right-8'>
              <MdArrowForwardIos size={50} />
            </button>
          </div>
        </Splide>
      </section>
      <section className='mt-16 mb-28 px-4 max-w-7xl mx-auto'>
        <h2 className='flex items-center text-4xl md:text-5xl font-semibold'>
          News{' '}
          <span className='ml-4 text-xl md:text-2xl text-gray-500 font-bold'>
            {t.LANG !== 'English' && t.NEWS}
          </span>
        </h2>
        <div className='mt-16 flex flex-col gap-5'>
          {news.items.map((item, index) => {
            return (
              index <= 2 && (
                <article key={item.fields.slug}>
                  <Link
                    scroll={false}
                    className='mx-auto flex flex-col gap-8 md:flex-row md:items-center md:mx-0 duration-200 md:hover:bg-gray-100'
                    href={`/news/${item.fields.slug}`}
                    locale='ja'
                    passHref
                  >
                    <div>
                      <Image
                        alt={item.fields.slug}
                        src={
                          item.fields.thumbnail
                            ? `https:${(item.fields.thumbnail as Asset).fields.file.url}`
                            : '/images/ogp.jpg'
                        }
                        width={360}
                        height={180}
                      />
                    </div>
                    <div>
                      <time className='font-semibold text-lg md:text-xl'>
                        {format(new Date(item.fields.date_created), 'yyyy.MM.dd')}
                      </time>
                      <h3 className='font-semibold text-xl md:text-3xl'>{item.fields.title}</h3>
                    </div>
                  </Link>
                </article>
              )
            )
          })}
        </div>
        <Link
          scroll={false}
          href='/news'
          className='mt-12 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
        >
          READ MORE
        </Link>
      </section>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
          <Link href='/brand' scroll={false}>
            <div className='flex justify-between items-center bg-gray-200 duration-200 hover:bg-gray-100 px-12 py-12 h-full'>
              <div>
                <h3 className='text-3xl mb-4'>Brand</h3>
                <p>{t.BRAND_C}</p>
              </div>
              <div className='bg-white rounded-full p-3 ml-4'>
                <MdArrowForwardIos size={40} />
              </div>
            </div>
          </Link>
          <Link href='/join' scroll={false}>
            <div className='flex justify-between items-center bg-gray-200 duration-200 hover:bg-gray-100 px-12 py-12 h-full'>
              <div>
                <h3 className='text-3xl mb-4'>Join</h3>
                <p>{t.JOIN_C}</p>
              </div>
              <div className='bg-white rounded-full p-3 ml-4'>
                <MdArrowForwardIos size={40} />
              </div>
            </div>
          </Link>
          <a href='https://help.vcborn.com' target='_blank' rel='noopener noreferrer'>
            <div className='flex justify-between items-center bg-gray-200 duration-200 hover:bg-gray-100 px-12 py-12 h-full'>
              <div>
                <h3 className='text-3xl mb-4'>Support</h3>
                <p>{t.SUPPORT_C}</p>
              </div>
              <div className='bg-white rounded-full p-3 ml-4'>
                <MdArrowForwardIos size={40} />
              </div>
            </div>
          </a>
          <a href='https://ko-fi.com/vcborn_support' target='_blank' rel='noopener noreferrer'>
            <div className='flex justify-between items-center bg-gray-200 duration-200 hover:bg-gray-100 px-12 py-12 h-full'>
              <div>
                <h3 className='text-3xl mb-4'>Donate</h3>
                <p>{t.DONATE_C}</p>
              </div>
              <div className='bg-white rounded-full p-3 ml-4'>
                <MdArrowForwardIos size={40} />
              </div>
            </div>
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default Home
