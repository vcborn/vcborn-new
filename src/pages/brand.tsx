import Head from 'next/head'
import Asset from '@/components/Asset'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Brand() {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`Brand | ${siteTitle}`}</title>
        <meta name='og:title' content={`Brand | ${siteTitle}`} />
        <meta
          property='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/brand/guideline.png`}
        />
      </Head>
      <article className='container pt-10 mx-auto px-5 max-w-7xl motion-safe:animate-fadeIn'>
        <div className='my-24'>
          <span className='text-gray-500 font-bold text-xl'>{t.LANG !== 'English' && t.BRAND}</span>
          <h1 className='text-6xl font-bold'>Brand</h1>
        </div>
        <section className='my-16'>
          <Asset
            name='VCborn Brand Guidelines'
            link='https://mirror.vcborn.com/assets/brand-guideline.pdf'
            src='/images/brand/guideline.png'
          />
          <Asset
            name='VCborn'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/vcborn-assets.zip'
            src='/images/brand/vcborn.png'
          />
          <Asset
            name='VCLinux'
            desc={t.LOGO_SCREENSHOT}
            link='https://mirror.vcborn.com/assets/vclinux-assets.zip'
            src='/images/brand/vclinux.png'
          />
          <Asset
            name='Reamix'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/reamix-assets.zip'
            src='/images/brand/reamix.jpg'
          />
          <Asset
            name='MCborn'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/mcborn-assets.zip'
            src='/images/brand/mcborn.jpg'
          />
          <Asset
            name='VCMi'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/vcmi-assets.zip'
            src='/images/brand/vcmi.png'
          />
          <Asset
            name='VCborn Blog'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/vcborn-blog-assets.zip'
            src='/images/brand/vcborn-blog.png'
          />
          <Asset
            name='VCFes'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/vcfes-assets.zip'
            src='/images/brand/vcfes.png'
          />
          <Asset
            name='VCast'
            desc={t.LOGO_ICON}
            link='https://mirror.vcborn.com/assets/vcast-assets.zip'
            src='/images/brand/vcast.png'
          />
        </section>
        <section className='my-16'>
          <h2 className='flex flex-wrap gap-4 items-center text-5xl font-bold mb-8'>
            Color{' '}
            <span className='text-gray-500 font-bold text-xl'>
              {t.LANG !== 'English' && t.COLOR}
            </span>
          </h2>
          <div className='flex flex-wrap gap-4'>
            <div className='rounded-md bg-primary text-white inline-block p-6 w-80'>
              <p className='font-bold text-xl pb-12'>VCborn Blue</p>
              <p className='text-lg'>#163469</p>
              <p className='text-lg'>CMYK 79, 50, 0, 59</p>
            </div>
            <div className='rounded-md bg-[#7000aa] text-white inline-block p-6 w-80'>
              <p className='font-bold text-xl pb-12'>VCLinux Purple</p>
              <p className='text-lg'>#7000aa</p>
              <p className='text-lg'>CMYK 34, 100, 0, 33</p>
            </div>
            <div className='rounded-md bg-[#008ea7] text-white inline-block p-6 w-80'>
              <p className='font-bold text-xl pb-12'>VCast Cyan</p>
              <p className='text-lg'>#008ea7</p>
              <p className='text-lg'>CMYK 100, 15, 0, 35</p>
            </div>
            <div className='rounded-md bg-black text-white inline-block p-6 w-80'>
              <p className='font-bold text-xl pb-12'>Black</p>
              <p className='text-lg'>#000000</p>
              <p className='text-lg'>CMYK 0, 0, 0, 100</p>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  )
}
