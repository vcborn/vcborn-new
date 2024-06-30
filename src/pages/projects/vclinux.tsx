import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { FaDownload, FaWindows, FaTerminal, FaCode } from 'react-icons/fa'
import {
  IoInformationCircle,
  IoCubeOutline,
  IoWarningOutline,
  IoCheckmarkCircle,
  IoHelpCircle,
} from 'react-icons/io5'
import { RxDoubleArrowDown } from 'react-icons/rx'
import nl2br from 'react-nl2br'
import Adsense from '@/components/Adsense'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function VCLinux() {
  const { t } = useLocale()

  const url = {
    name: {
      arm64: 'arm64',
      amd64: 'amd64',
      osdn: 'OSDN(IIJ)',
      osdn2: 'OSDN(JAIST)',
      mirror: 'VCborn Mirror',
      gdrive: 'Google Drive',
      onedrive: 'OneDrive',
      mega: 'MEGA',
    },
    beta3: {
      amd64: {
        osdn: 'https://ftp.iij.ad.jp/pub/osdn.jp/vclinux/78014/vclinux-beta3-amd64.iso',
        osdn2: 'https://ftp.jaist.ac.jp/pub/sourceforge.jp/vclinux/78014/vclinux-beta3-amd64.iso',
        gdrive:
          'https://drive.google.com/file/d/1uH7dF4hKre7ioIo_e5Drt2EcPxv7fAEH/view?usp=share_link',
        mega: 'https://mega.nz/file/lHQBlDRI#KObIXw7yh-XXBFKZhbQ7yC323iOhTlMbBAWFnVBEA7U',
        mirror: 'https://mirror.vcborn.com/vclinux/vclinux-beta3-amd64.iso',
      },
      arm64: {
        osdn: 'https://ftp.iij.ad.jp/pub/osdn.jp/vclinux/78014/vclinux-beta3-arm64.iso',
        osdn2: 'https://ftp.jaist.ac.jp/pub/sourceforge.jp/vclinux/78014/vclinux-beta3-arm64.iso',
        gdrive:
          'https://drive.google.com/file/d/1Q6Yn15F-7UYiCQYVtpj_kGBoPK6wpf0M/view?usp=share_link',
        mega: 'https://mega.nz/file/hXpjyAqa#5XHow8uaxMMLm7CdB8gXxDAmU4ofrJGv-XtRWt_vq8Q',
        mirror: 'https://mirror.vcborn.com/vclinux/vclinux-beta3-arm64.iso',
      },
    },
    beta2: {
      amd64: {
        osdn: 'https://ftp.iij.ad.jp/pub/osdn.jp/vclinux/76664/vclinux-beta2.iso',
        osdn2: 'https://ftp.jaist.ac.jp/pub/sourceforge.jp/vclinux/76664/vclinux-beta2.iso',
        gdrive:
          'https://drive.google.com/file/d/1I1x1whZ-TmevS6wlSFuEsj_2-w-tNetz/view?usp=sharing',
        yoshis: 'https://mirror.yoshis.jp/vclinux/beta2/vclinux-beta2.iso',
        mega: 'https://mega.nz/file/gaRTFT4Y#4OQNa0HAwnFfbNsTzYFJB20ZHOpu_t-6zApLZXRIsi8',
        mirror: 'https://mirror.vcborn.com/vclinux/vclinux-beta2.iso',
      },
    },
    beta1: {
      amd64: {
        osdn: 'https://ftp.iij.ad.jp/pub/osdn.jp/vclinux/76663/vclinux-beta1.iso',
        osdn2: 'https://ftp.jaist.ac.jp/pub/sourceforge.jp/vclinux/76663/vclinux-beta1.iso',
        gdrive:
          'https://drive.google.com/file/d/1GG8DluckSuLkkWdG-Uhvw5Hynb62MtlU/view?usp=sharing',
        mega: 'https://mega.nz/file/cGp0GRbA#rlLG8pU4n7aJc4f8UtzouBuYPpGgaDVEwu0_d5rSaNw',
        mirror: 'https://mirror.vcborn.com/vclinux/vclinux-beta1.iso',
      },
    },
  }

  const [version, setVersion] = useState('select')
  const [arch, setArch] = useState('select')

  function genUrl() {
    const download = document.getElementById('dllink')
    const agree = document.getElementById('agree') as HTMLInputElement
    const version = document.forms.namedItem('selver').version
    const versionValue = version.options[version.selectedIndex].value
    const arch = document.forms.namedItem('selver').arch
    const archValue = arch.options[arch.selectedIndex].value
    const mirror = document.forms.namedItem('selver').mirror
    const mirrorValue = mirror.options[mirror.selectedIndex].value

    if (
      versionValue === 'select' ||
      mirrorValue === 'select' ||
      archValue === 'select' ||
      !agree.checked
    ) {
      download.classList.add('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
      download.setAttribute('href', '#download')
    } else {
      if (download.classList.contains('cursor-not-allowed')) {
        download.classList.remove('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
      }
      if (url[versionValue][archValue] && url[versionValue][archValue][mirrorValue]) {
        download.setAttribute('href', url[versionValue][archValue][mirrorValue])
      } else {
        download.setAttribute('href', '#download')
        download.classList.add('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
      }
    }
    if (versionValue === 'select') {
      arch.classList.add('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
    } else {
      arch.classList.remove('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
    }
    if (versionValue === 'select' || archValue === 'select') {
      mirror.classList.add('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
    } else {
      mirror.classList.remove('cursor-not-allowed', 'pointer-events-none', 'opacity-70')
    }
  }
  return (
    <Layout home>
      <Head>
        <title>{`VCLinux | ${siteTitle}`}</title>
        <meta name='description' content={t.VCLINUX.SHORT_DESC} />
        <meta name='og:title' content={`VCLinux | ${siteTitle}`} />
        <meta name='og:description' content={t.VCLINUX.SHORT_DESC} />
        <meta
          name='og:image'
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/brand/vclinux.png`}
        />
      </Head>
      <div className='bg-[url(/images/projects/vclinux/vclinux.png)] bg-center bg-cover'>
        <div className='relative h-[90vh] flex flex-col justify-center backdrop-blur'>
          <div className='container mx-auto max-w-5xl px-5 text-white'>
            <Image src='/images/logo/vclinux-logo.svg' width={300} height={40} alt='VCLinux Logo' />
            <p className='mt-8 text-2xl font-medium'>{t.VCLINUX.SHORT_DESC}</p>
            <a
              href='#download'
              className='my-6 inline-flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg border-white duration-200 hover:bg-white hover:text-black'
            >
              {t.DOWNLOAD} <FaDownload className='ml-2' />
            </a>
          </div>
          <a href='#intro' className='absolute bottom-6 -translate-x-1/2 left-1/2 opacity-60'>
            <RxDoubleArrowDown color='white' size={40} />
          </a>
        </div>
      </div>
      <main className='container mx-auto max-w-5xl my-20 px-5'>
        <section
          className='my-10 p-6 bg-gradient-to-r from-orange-600 to-yellow-500 text-white'
          id='intro'
        >
          <h3 className='text-3xl font-bold flex flex-row items-center'>
            <IoInformationCircle className='mr-2 text-6xl' />
            {t.VCLINUX.ABOUT}
          </h3>
          <p className='text-lg'>{nl2br(`${t.VCLINUX.ABOUT_C}`)}</p>
        </section>
        <section
          className='my-10 p-6 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white'
          id='features'
        >
          <h3 className='text-3xl font-bold flex flex-row items-center mb-8'>
            <IoCubeOutline className='mr-2 text-6xl' />
            {t.VCLINUX.FEATURES}
          </h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-center text-lg text-black dark:text-white'>
            <div className='bg-white dark:bg-zinc-800 p-5 flex flex-col items-center transform hover:-translate-y-1 hover:shadow-md duration-500'>
              <FaWindows className='text-5xl my-3' />
              <h4 className='text-xl font-bold mb-3'>{t.VCLINUX.FEATURES_1}</h4>
              <p>{t.VCLINUX.FEATURES_1_C}</p>
            </div>
            <div className='bg-white dark:bg-zinc-800 p-5 flex flex-col items-center transform hover:-translate-y-1 hover:shadow-md duration-500'>
              <FaTerminal className='text-5xl my-3' />
              <h4 className='text-xl font-bold mb-3'>{t.VCLINUX.FEATURES_2}</h4>
              <p>{t.VCLINUX.FEATURES_2_C}</p>
            </div>
            <div className='bg-white dark:bg-zinc-800 p-5 flex flex-col items-center transform hover:-translate-y-1 hover:shadow-md duration-500'>
              <FaCode className='text-5xl my-3' />
              <h4 className='text-xl font-bold mb-3'>{t.VCLINUX.FEATURES_3}</h4>
              <p>{t.VCLINUX.FEATURES_3_C}</p>
            </div>
          </div>
        </section>
        <Adsense />
        <section
          className='my-10 p-6 bg-gradient-to-r from-gray-300 to-gray-100 text-black'
          id='caution'
        >
          <h3 className='text-3xl font-bold flex flex-row items-center'>
            <IoWarningOutline className='mr-2 text-6xl' />
            {t.VCLINUX.WARN}
          </h3>
          <ul className='list-disc text-lg font-bold my-5 ml-5'>
            <li>{t.VCLINUX.WARN_1}</li>
            <li dangerouslySetInnerHTML={{ __html: t.VCLINUX.WARN_2 }}></li>
            <li>{t.VCLINUX.WARN_3}</li>
            <li>{t.VCLINUX.WARN_4}</li>
          </ul>
        </section>
        <section
          className='my-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6'
          id='download'
        >
          <div>
            <h3 className='text-3xl font-bold flex flex-row items-center'>
              <FaDownload className='ml-1 mr-4 text-5xl' />
              {t.DOWNLOAD}
            </h3>
            <form className='my-5' name='selver'>
              <div className='flex flex-col md:flex-row gap-2'>
                <select
                  name='version'
                  className='pr-8 flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg bg-transparent text-white border-white duration-200 hover:bg-white hover:text-black focus:ring-0 focus:border-white focus:outline-none'
                  onChange={(e) => {
                    setVersion(e.target.value)
                    genUrl()
                  }}
                  autoComplete='off'
                  value={version}
                >
                  <option value='select' className='text-black'>
                    {t.VCLINUX.VERSION}
                  </option>
                  <option value='beta3' className='text-black'>
                    Beta3
                  </option>
                  <option value='beta2' className='text-black'>
                    Beta2
                  </option>
                  <option value='beta1' className='text-black'>
                    Beta1
                  </option>
                </select>
                <select
                  name='arch'
                  className='pr-8 flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg bg-transparent text-white border-white duration-200 hover:bg-white hover:text-black focus:ring-0 focus:border-white focus:outline-none cursor-not-allowed opacity-70 pointer-events-none'
                  autoComplete='off'
                  onChange={(e) => {
                    setArch(e.target.value)
                    genUrl()
                  }}
                >
                  <option value='select' className='text-black'>
                    {t.VCLINUX.ARCH}
                  </option>
                  {url[version] &&
                    Object.keys(url[version]).map((arch, index) => (
                      <option value={arch} key={index} className='text-black'>
                        {url.name[arch]}
                      </option>
                    ))}
                </select>
                <select
                  name='mirror'
                  className='pr-8 flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg bg-transparent text-white border-white duration-200 hover:bg-white hover:text-black focus:ring-0 focus:border-white focus:outline-none cursor-not-allowed opacity-70 pointer-events-none'
                  autoComplete='off'
                  onChange={() => genUrl()}
                >
                  <option value='select' className='text-black'>
                    {t.VCLINUX.MIRROR}
                  </option>
                  {url[version] &&
                    url[version][arch] &&
                    Object.keys(url[version][arch]).map((mirror, index) => (
                      <option value={mirror} key={index} className='text-black'>
                        {url.name[mirror]}
                      </option>
                    ))}
                </select>
              </div>
              <div className='mt-5 text-lg'>
                <input
                  type='checkbox'
                  className='border-gray-300 duration-200 text-primary focus:ring-primary bg-transparent focus:ring-opacity-50'
                  id='agree'
                  autoComplete='off'
                  onChange={() => genUrl()}
                />
                <label
                  htmlFor='agree'
                  className='ml-2'
                  dangerouslySetInnerHTML={{ __html: t.VCLINUX.AGREE }}
                ></label>
              </div>
            </form>
            <a
              className='inline-flex flex-row items-center border-4 px-4 py-2 font-semibold text-lg bg-transparent text-white border-white duration-200 hover:bg-white hover:text-black focus:ring-0 focus:border-white focus:outline-none cursor-not-allowed opacity-70 umami--click--vclinux-download-button'
              href='#download'
              target='_blank'
              rel='noopener noreferrer'
              id='dllink'
            >
              {t.DOWNLOAD}
              <FaDownload className='ml-2' />
            </a>
          </div>
        </section>
        <Adsense />
        <section
          className='my-10 p-6 bg-gradient-to-r from-lime-600 to-emerald-600 text-white'
          id='requirements'
        >
          <div>
            <h3 className='text-3xl font-bold flex flex-row items-center'>
              <IoCheckmarkCircle className='mr-2 text-6xl' />
              {t.VCLINUX.MIN}
            </h3>
            <table className='border-collapse text-xl'>
              <tbody>
                <tr>
                  <td className='border-r-2 border-white pr-3 py-2'>CPU</td>
                  <td className='pl-3 py-2'>Core 2 Duo {t.VCLINUX.UPTO}</td>
                </tr>
                <tr>
                  <td className='border-r-2 border-white pr-3 py-2'>RAM</td>
                  <td className='pl-3 py-2'>2GB(4GB {t.VCLINUX.UPTO_R})</td>
                </tr>
                <tr>
                  <td className='border-r-2 border-white pr-3 py-2'>DISK</td>
                  <td className='pl-3 py-2'>25GB {t.VCLINUX.UPTO}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section
          className='my-10 p-6 bg-gradient-to-r from-gray-300 to-gray-200 text-black'
          id='support'
        >
          <h3 className='text-3xl font-bold flex flex-row items-center'>
            <IoHelpCircle className='mr-2 text-6xl' />
            {t.VCLINUX.SUPPORT}
          </h3>
          <p className='text-lg' dangerouslySetInnerHTML={{ __html: t.VCLINUX.SUPPORT_C }}></p>
        </section>
      </main>
    </Layout>
  )
}
