import Head from 'next/head'
import nl2br from 'react-nl2br'
import Layout, { siteTitle } from '@/components/layout'
import { useLocale } from '@/hooks/useLocale'

export default function Custom404() {
  const { t } = useLocale()
  return (
    <Layout home={undefined}>
      <Head>
        <title>{`404 | ${siteTitle}`}</title>
        <meta property='og:image' content={`${process.env.NEXT_PUBLIC_SITE_URL}/images/ogp.jpg`} />
      </Head>
      <article className='pt-10 min-h-screen container mx-auto flex flex-col justify-center items-center text-center px-5 max-w-5xl motion-safe:animate-fadeIn'>
        <h1 className='text-6xl font-bold mb-3'>404 Not Found</h1>
        <p className='text-lg mb-5'>{nl2br(`${t.NOT_FOUND}`)}</p>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<!-- Copyright (c) 2018 Henrique Todrigues \n Released under the MIT License \n URL : https://codepen.io/hjdesigner/pen/jvyJdX -->',
            }}
          />
          <div className='block relative w-[300px] h-[280px] my-10'>
            <div className='coffee-header'>
              <div className='coffee-header__buttons coffee-header__button-one'></div>
              <div className='coffee-header__buttons coffee-header__button-two'></div>
              <div className='coffee-header__display'></div>
              <div className='coffee-header__details'></div>
            </div>
            <div className='coffee-medium'>
              <div className='coffee-medium__exit'></div>
              <div className='coffee-medium__arm'></div>
              <div className='coffee-medium__liquid'></div>
              <div className='coffee-medium__smoke coffee-medium__smoke-one'></div>
              <div className='coffee-medium__smoke coffee-medium__smoke-two'></div>
              <div className='coffee-medium__smoke coffee-medium__smoke-three'></div>
              <div className='coffee-medium__smoke coffee-medium__smoke-for'></div>
              <div className='coffee-medium__cup'></div>
            </div>
            <div className='coffee-footer'></div>
          </div>
        </div>
      </article>
      <style jsx>{`
        .coffee-header {
          width: 100%;
          height: 80px;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #ddcfcc;
          border-radius: 10px;
        }
        .coffee-header__buttons {
          width: 25px;
          height: 25px;
          position: absolute;
          top: 25px;
          background-color: #282323;
          border-radius: 50%;
        }
        .coffee-header__buttons::after {
          content: '';
          width: 8px;
          height: 8px;
          position: absolute;
          bottom: -8px;
          left: calc(50% - 4px);
          background-color: #615e5e;
        }
        .coffee-header__button-one {
          left: 15px;
        }
        .coffee-header__button-two {
          left: 50px;
        }
        .coffee-header__display {
          width: 50px;
          height: 50px;
          position: absolute;
          top: calc(50% - 25px);
          left: calc(50% - 25px);
          border-radius: 50%;
          background-color: #5c79ad;
          border: 5px solid #163469;
          box-sizing: border-box;
        }
        .coffee-header__details {
          width: 8px;
          height: 20px;
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #9b9091;
          box-shadow: -12px 0 0 #9b9091, -24px 0 0 #9b9091;
        }
        .coffee-medium {
          width: 90%;
          height: 160px;
          position: absolute;
          top: 80px;
          left: calc(50% - 45%);
          background-color: #bcb0af;
        }
        .coffee-medium:before {
          content: '';
          width: 90%;
          height: 100px;
          background-color: #776f6e;
          position: absolute;
          bottom: 0;
          left: calc(50% - 45%);
          border-radius: 20px 20px 0 0;
        }
        .coffee-medium__exit {
          width: 60px;
          height: 20px;
          position: absolute;
          top: 0;
          left: calc(50% - 30px);
          background-color: #231f20;
        }
        .coffee-medium__exit::before {
          content: '';
          width: 50px;
          height: 20px;
          border-radius: 0 0 50% 50%;
          position: absolute;
          bottom: -20px;
          left: calc(50% - 25px);
          background-color: #231f20;
        }
        .coffee-medium__exit::after {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          bottom: -30px;
          left: calc(50% - 5px);
          background-color: #231f20;
        }
        .coffee-medium__arm {
          width: 70px;
          height: 20px;
          position: absolute;
          top: 15px;
          right: 25px;
          background-color: #231f20;
        }
        .coffee-medium__arm::before {
          content: '';
          width: 15px;
          height: 5px;
          position: absolute;
          top: 7px;
          left: -15px;
          background-color: #9e9495;
        }
        .coffee-medium__cup {
          width: 80px;
          height: 47px;
          position: absolute;
          bottom: 0;
          left: calc(50% - 40px);
          background-color: #fff;
          border-radius: 0 0 70px 70px / 0 0 110px 110px;
        }
        .coffee-medium__cup::after {
          content: '';
          width: 20px;
          height: 20px;
          position: absolute;
          top: 6px;
          right: -13px;
          border: 5px solid #fff;
          border-radius: 50%;
        }
        @keyframes liquid {
          0% {
            height: 0px;
            opacity: 1;
          }
          5% {
            height: 0px;
            opacity: 1;
          }
          20% {
            height: 62px;
            opacity: 1;
          }
          95% {
            height: 62px;
            opacity: 1;
          }
          100% {
            height: 62px;
            opacity: 0;
          }
        }
        .coffee-medium__liquid {
          width: 6px;
          height: 63px;
          opacity: 0;
          position: absolute;
          top: 50px;
          left: calc(50% - 3px);
          background-color: #74372b;
          animation: liquid 4s 4s linear infinite;
        }
        .coffee-medium__smoke {
          width: 8px;
          height: 20px;
          position: absolute;
          border-radius: 5px;
          background-color: #b3aeae;
        }
        @keyframes smokeOne {
          0% {
            bottom: 20px;
            opacity: 0;
          }
          40% {
            bottom: 50px;
            opacity: 0.5;
          }
          80% {
            bottom: 80px;
            opacity: 0.3;
          }
          100% {
            bottom: 80px;
            opacity: 0;
          }
        }
        @keyframes smokeTwo {
          0% {
            bottom: 40px;
            opacity: 0;
          }
          40% {
            bottom: 70px;
            opacity: 0.5;
          }
          80% {
            bottom: 80px;
            opacity: 0.3;
          }
          100% {
            bottom: 80px;
            opacity: 0;
          }
        }
        .coffee-medium__smoke-one {
          opacity: 0;
          bottom: 50px;
          left: 102px;
          animation: smokeOne 3s 4s linear infinite;
        }
        .coffee-medium__smoke-two {
          opacity: 0;
          bottom: 70px;
          left: 118px;
          animation: smokeTwo 3s 5s linear infinite;
        }
        .coffee-medium__smoke-three {
          opacity: 0;
          bottom: 65px;
          right: 118px;
          animation: smokeTwo 3s 6s linear infinite;
        }
        .coffee-medium__smoke-for {
          opacity: 0;
          bottom: 50px;
          right: 102px;
          animation: smokeOne 3s 5s linear infinite;
        }
        .coffee-footer {
          width: 95%;
          height: 15px;
          position: absolute;
          bottom: 25px;
          left: calc(50% - 47.5%);
          background-color: #163469;
          border-radius: 10px;
        }
        .coffee-footer::after {
          content: '';
          width: 106%;
          height: 26px;
          position: absolute;
          bottom: -25px;
          left: -8px;
          background-color: #000;
        }
      `}</style>
    </Layout>
  )
}
