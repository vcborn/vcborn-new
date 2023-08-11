import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Adsense = () => {
  const { asPath } = useRouter()

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [asPath])

  return (
    <div key={asPath}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format='auto'
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot='7131040741'
      />
    </div>
  )
}

export default Adsense
