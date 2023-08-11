import Head from 'next/head'
import Image from 'next/image'
import { FaGlobe, FaYoutube, FaGithub, FaDiscord } from 'react-icons/fa'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'
import { getDirectusClient } from '@/lib/directus'

type Creator = {
  username: string
  projects: Array<string>
  description: string | null
  homepage: string | null
  twitter: string | null
  youtube: string | null
  github: string | null
  discord: string | null
  avatar: string
}
type PageProps = {
  creators: Creator[]
}

export const getStaticProps = async (context) => {
  const directus = await getDirectusClient()
  const res = await directus.items('members').readByQuery({
    sort: ['username'],
  })
  const creators = res.data

  return {
    props: { creators },
  }
}

const Creators: React.FC<PageProps> = ({ creators }: PageProps) => {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`Who are we | ${siteTitle}`}</title>
        <meta name='og:title' content={`Who are we | ${siteTitle}`} />
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='container pt-10 mx-auto px-5 max-w-7xl motion-safe:animate-fadeIn'>
        <section className='my-24'>
          <span className='text-gray-500 font-bold text-xl'>
            {t.LANG !== 'English' && t.WHOAREWE}
          </span>
          <h1 className='text-6xl font-bold mb-3'>Who are we </h1>
        </section>
        <section className='my-16'>
          <h2 className='text-5xl font-bold my-16 flex flex-wrap gap-4 items-center'>
            Philosophy{' '}
            <span className='text-gray-500 font-bold text-2xl'>
              {t.LANG !== 'English' && t.PHILOSOPHY}
            </span>
          </h2>
          <h3 className='text-4xl font-bold my-8'>{t.SLOGAN}</h3>
          <p className='text-lg font-medium'>{nl2br(t.SLOGAN_SUMMARY)}</p>
        </section>
        <section className='my-16'>
          <h2 className='text-5xl font-bold my-16 flex flex-wrap gap-4 items-center'>
            Creators{' '}
            <span className='text-gray-500 font-bold text-2xl'>
              {t.LANG !== 'English' && t.CREATORS}
            </span>
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {creators.map((item, index) => {
              return (
                <div className='relative shadow-md duration-200 hover:shadow-sm' key={index}>
                  <div className='border-r-[100px] border-b-[100px] border-transparent border-r-primary inline-block absolute right-0'></div>
                  <div className='p-10'>
                    <div className='flex flex-row items-center gap-4'>
                      <div className='relative shrink-0 w-16 h-16 md:h-24 md:w-24 object-cover object-center'>
                        <Image
                          src={`https://console.vcborn.com/assets/${item.avatar}`}
                          fill={true}
                          alt={item.username}
                          className='rounded-full object-cover'
                        />
                      </div>
                      <div>
                        <h3 className='text-xl md:text-2xl font-bold'>{item.username}</h3>
                        <p className='font-medium'>{item.description}</p>
                      </div>
                    </div>
                    <div>
                      <ul className='flex flex-row flex-wrap my-2'>
                        {item.projects.map((project, index) => {
                          return (
                            <li className='font-medium pr-1.5 py-1 whitespace-nowrap' key={index}>
                              {project} {index + 1 !== item.projects.length && '/'}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    <div className='flex flex-row gap-2 my-2 text-lg'>
                      {item.homepage && (
                        <a
                          href={item.homepage}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group'
                        >
                          <div className='m-2 inline-block'>
                            <FaGlobe
                              size={25}
                              className='fill-gray-400 duration-200 group-hover:fill-gray-500'
                            />
                          </div>
                        </a>
                      )}
                      {item.twitter && (
                        <a
                          href={'https://twitter.com/' + item.twitter}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group'
                        >
                          <div className='m-2 inline-block'>
                            <svg
                              width='25'
                              viewBox='0 0 1200 1227'
                              xmlns='http://www.w3.org/2000/svg'
                              className='fill-gray-400 duration-200 group-hover:fill-gray-500'
                            >
                              <path
                                d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                              />
                            </svg>
                          </div>
                        </a>
                      )}
                      {item.youtube && (
                        <a
                          href={item.youtube}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group'
                        >
                          <div className='m-2 inline-block'>
                            <FaYoutube
                              size={25}
                              className='fill-gray-400 duration-200 group-hover:fill-gray-500'
                            />
                          </div>
                        </a>
                      )}
                      {item.github && (
                        <a
                          href={'https://github.com/' + item.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group'
                        >
                          <div className='m-2 inline-block'>
                            <FaGithub
                              size={25}
                              className='fill-gray-400 duration-200 group-hover:fill-gray-500'
                            />
                          </div>
                        </a>
                      )}
                      {item.discord && (
                        <a
                          href={item.discord}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group'
                        >
                          <div className='m-2 inline-block'>
                            <FaDiscord
                              size={25}
                              className='fill-gray-400 duration-200 group-hover:fill-gray-500'
                            />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </article>
    </Layout>
  )
}

export default Creators
