import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <script
            async
            defer
            data-website-id='d73053b1-dfba-41b5-aa40-1f1cb6c58915'
            src='https://analytics.ja1ykl.com/script.js'
          ></script>
          {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
            <Script
              id='Adsense-id'
              data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
              async={true}
              strategy='beforeInteractive'
              src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
            />
          )}
          <meta name='Hatena::Bookmark' content='nocomment' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
