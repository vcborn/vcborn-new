import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import nl2br from 'react-nl2br'
import Skew from '@/components/Skew'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Projects() {
  const { t } = useLocale()
  function reveal() {
    var reveals = document.querySelectorAll('.reveal')

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight
      var elementTop = reveals[i].getBoundingClientRect().top
      var elementVisible = 150

      if (
        elementTop < windowHeight - elementVisible &&
        !reveals[i].classList.contains('motion-safe:animate-fadeIn')
      ) {
        reveals[i].classList.add('motion-safe:animate-fadeIn')
        if (reveals[i].classList.contains('opacity-0')) {
          reveals[i].classList.remove('opacity-0')
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', reveal)
  })
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`Projects | ${siteTitle}`}</title>
        <meta name='og:title' content={`${t.PROJECTS} | ${siteTitle}`} />
      </Head>
      <section className='container mx-auto max-w-7xl pt-10 my-24 px-5 motion-safe:animate-fadeIn'>
        <span className='text-gray-500 font-bold text-xl'>
          {t.LANG !== 'English' && t.PROJECTS}
        </span>
        <h2 className='text-6xl font-bold'>Projects</h2>
      </section>
      <Skew
        align='left'
        name='VCLinux'
        desc={t.VCLINUX.DESC}
        link='/projects/vclinux'
        src='/images/projects/vclinux/vclinux.png'
        width={1279}
        height={799}
      />
      <Skew
        align='right'
        name='MCborn'
        desc={t.MCBORN_DESC}
        link='https://mc.vcborn.com'
        src='/images/mcborn.jpg'
        width={1024}
        height={576}
      />
      <Skew
        align='left'
        name='VCast'
        desc={t.VCAST_DESC}
        link='https://podcasters.spotify.com/pod/show/vcborn'
        src='/images/vcast-editing.png'
        width={1024}
        height={576}
      />
      <Skew
        align='right'
        name={t.RESTRICT.TITLE}
        desc={t.RESTRICT.DESC}
        link='/projects/restrict-bot'
        src='/images/projects/restrict/censor.png'
        width={1024}
        height={576}
      />
      <Skew
        align='left'
        name={t.SHAROHO.TITLE}
        desc={t.SHAROHO.DESC}
        link='/projects/sharoho-bot'
        src='/images/projects/sharoho/sharoho.png'
        width={1279}
        height={799}
      />
      <Skew
        align='right'
        name='Shiftium'
        desc={t.SHIFTIUM.DESC}
        link='/projects/shiftium'
        src='/images/projects/shiftium/st-dash.jpg'
        width={1279}
        height={799}
      />
      <Skew
        align='left'
        name='Reamix'
        desc={t.REAMIX.DESC}
        link='/projects/reamix'
        src='/images/projects/reamix/reamix-window.png'
        width={1024}
        height={576}
      />
    </Layout>
  )
}
