import Image from 'next/image'
import Link from 'next/link'
import nl2br from 'react-nl2br'

const Skew = ({
  align,
  name,
  desc,
  link,
  src,
  width,
  height,
}: {
  align: 'left' | 'right'
  name: string
  desc: string
  link: string
  src: string
  width: number
  height: number
}) => {
  if (align === 'left') {
    return (
      <section className='flex flex-col md:flex-row items-start md:items-center opacity-0 reveal'>
        <div className='-skew-y-6 md:skew-y-0 -translate-y-10 md:translate-y-0 md:-translate-x-20 md:-skew-x-12 overflow-hidden relative w-full md:w-3/5'>
          <Image
            src={src}
            alt={desc}
            width={width}
            height={height}
            className='aspect-video object-cover object-top w-full skew-y-6 md:skew-y-0 md:skew-x-12 translate-y-10 md:translate-y-0 md:translate-x-20'
          />
        </div>
        <div className='duration-200 h-full'>
          <div className='p-5'>
            <h3 className='text-4xl lg:text-5xl font-bold mb-2'>{name}</h3>
            <p className='text-xl font-semibold'>{nl2br(`${desc}`)}</p>
            {link.startsWith('https://') ? (
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
              >
                READ MORE
              </a>
            ) : (
              <Link
                scroll={false}
                href={link}
                className='mt-8 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
              >
                READ MORE
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <section className='flex flex-col md:flex-row items-start md:items-center justify-between opacity-0 reveal'>
        <div className='block md:hidden skew-y-6 overflow-hidden relative w-full'>
          <Image
            src={src}
            alt={desc}
            width={width}
            height={height}
            className='aspect-video object-cover object-top w-full -skew-y-6 translate-y-10'
          />
        </div>
        <div className='duration-200 h-full'>
          <div className='md:ml-12 p-5'>
            <h3 className='text-4xl lg:text-5xl font-bold mb-2'>{name}</h3>
            <p className='text-xl font-semibold'>{nl2br(`${desc}`)}</p>
            {link.startsWith('https://') ? (
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-8 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
              >
                READ MORE
              </a>
            ) : (
              <Link
                scroll={false}
                href={link}
                className='mt-8 border-4 px-4 py-2 font-semibold text-lg border-black inline-block duration-200 hover:bg-black hover:text-white'
              >
                READ MORE
              </Link>
            )}
          </div>
        </div>
        <div className='translate-x-20 -skew-x-12 overflow-hidden relative w-3/5 hidden md:block'>
          <Image
            src={src}
            alt={desc}
            width={width}
            height={height}
            className='aspect-video object-cover object-top w-full skew-x-12 -translate-x-20'
          />
        </div>
      </section>
    )
  }
}

export default Skew
