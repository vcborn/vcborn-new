import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'
import { useLocale } from '@/hooks/useLocale'

const Asset = ({
  name,
  desc,
  link,
  src,
}: {
  name: string
  desc?: string
  link: string
  src: string
}) => {
  const { t } = useLocale()
  return (
    <div className='flex justify-between flex-col md:flex-row mb-8'>
      <div>
        <h3 className='text-3xl font-bold my-5'>{name}</h3>
        {desc && <p className='text-lg my-5'>{desc}</p>}
        <a
          href={link}
          download
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex flex-row items-center border-4 border-black font-semibold text-lg px-5 py-1 duration-200 hover:bg-black hover:text-white'
        >
          {t.DOWNLOAD}
          <FaDownload className='ml-2' />
        </a>
      </div>
      <div className='mt-5 md:h-64'>
        <Image src={src} alt={`${name} Logo`} width={455} height={256} />
      </div>
    </div>
  )
}

export default Asset
