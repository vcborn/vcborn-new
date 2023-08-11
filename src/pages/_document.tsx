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
            data-website-id='aaaac897-65a5-40c4-be64-62f96ea83415'
            src='https://analytics.vcborn.com/umami.js'
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
