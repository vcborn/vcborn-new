import { Container, Html, Img, Head, Link, Preview, Section, Text } from '@react-email/components'
import * as React from 'react'

interface EmailProps {
  type: 'client' | 'admin'
  name: string
  furigana: string
  email: string
  subject: string
  content: string
  ip?: string
}

const Email = ({
  type = 'client',
  name = '山田太郎',
  furigana = 'やまだたろう',
  email = 'sample@example.com',
  subject = 'ご質問・お問い合わせ',
  content = 'メッセージ',
  ip,
}: EmailProps) => {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com/' />
        <link rel='preconnect' href='https://fonts.gstatic.com/' crossOrigin='' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500,700&amp;display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Poppins:400,500,700&amp;display=swap'
        />
      </Head>
      <Preview>Confirm your email address</Preview>
      <Section style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Link href='https://vcborn.com'>
              <Img
                src='https://images.ctfassets.net/s2zt25idp87p/4bYij62XDbFt8sJZ9Rfzex/c66a91f68e9b54cf70eae93cd61f10d5/logo.png?h=200'
                width='200'
                height='45'
                alt='VCborn'
              />
            </Link>
          </Section>
          <Text style={h1}>
            {type === 'client' ? 'お問い合わせ内容の確認' : 'お問い合わせ内容の確認'}
          </Text>
          <Text style={heroText}>
            {type === 'client'
              ? 'お問い合わせありがとうございます。'
              : '新規問い合わせがありました。'}
            <br />
            {type === 'client' ? 'お問い合わせ内容はこちらです。' : '容はこちらです。'}
          </Text>

          <Section style={form}>
            <Section style={section}>
              <Text style={sectionTitle}>お名前</Text>
              <Text style={sectionText}>
                {name} ({furigana})
              </Text>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>メールアドレス</Text>
              <Text style={sectionText}>{email}</Text>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>お問い合わせ項目</Text>
              <Text style={sectionText}>{subject}</Text>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>お問い合わせ内容</Text>
              <Text style={sectionText}>{content}</Text>
            </Section>
            {type === 'admin' && ip && (
              <Section style={section}>
                <Text style={sectionTitle}>IPアドレス</Text>
                <Link href={`https://ipinfo.io/${ip}`}>
                  <Text style={sectionText}>{ip}</Text>
                </Link>
              </Section>
            )}
          </Section>

          <Text style={text}>
            このメールは送信専用アドレスから送信されています。
            <br />
            このメールに心当たりがない場合、<Link href='https://help.vcborn.com'>サポート</Link>
            よりお知らせください。
          </Text>

          <table style={footerLogos} border={0} cellPadding='0' cellSpacing='10' align='left'>
            <tr>
              <td align='left' valign='middle'>
                <Img
                  src='https://images.ctfassets.net/s2zt25idp87p/4bYij62XDbFt8sJZ9Rfzex/c66a91f68e9b54cf70eae93cd61f10d5/logo.png?h=180'
                  width='180'
                  height='40'
                  alt='VCborn'
                />
              </td>
              <td align='right' valign='middle'>
                <Link href='https://twitter.com/vcborn_support'>
                  <Img
                    src='https://images.ctfassets.net/s2zt25idp87p/13ScfNJiReJ7pHjPQdXyE1/8891833448f5e35113186ca87623086c/logo-black.png?h=40'
                    width='30'
                    height='30'
                    alt='X'
                    style={socialMediaIcon}
                  />
                </Link>
                <Link href='https://www.youtube.com/@vcborn'>
                  <Img
                    src='https://images.ctfassets.net/s2zt25idp87p/7GkoXNCFPXie2TWeVQFIFL/9ddea47762a4e18aa00329e36ad2fa79/youtube-logo.png?w=40'
                    width='43'
                    height='30'
                    alt='YouTube'
                    style={socialMediaIcon}
                  />
                </Link>
                <Link href='https://github.com/vcborn'>
                  <Img
                    src='https://images.ctfassets.net/s2zt25idp87p/6xezkzT9GB2Y39eXgcM9nt/70d240374facdaa0e13191dc3aee719d/github-mark.png'
                    width='30'
                    height='30'
                    alt='GitHub'
                    style={socialMediaIcon}
                  />
                </Link>
              </td>
            </tr>
          </table>

          <Section style={footerText}>
            <Link
              style={footerLink}
              href='https://blog.vcborn.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Blog
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href='https://help.vcborn.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Support
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href='https://vcborn.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Privacy Policy
            </Link>
            <Text style={footerText}>© 2023 VCborn.</Text>
          </Section>
        </Container>
      </Section>
    </Html>
  )
}

const footerText = {
  fontSize: '13px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
}

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
}

const footerLogos = {
  marginBottom: '32px',
  width: '100%',
}

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '32px',
}

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "'Poppins', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
}

const logoContainer = {
  marginTop: '32px',
}

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
}

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
}

const form = {
  backgroundColor: '#f5f4f5',
  padding: '10px 30px',
}

const section = {
  marginBottom: '10px',
}

const sectionTitle = {
  fontSize: '22px',
  fontWeight: '500',
}

const sectionText = {
  fontSize: '18px',
}

const text = {
  color: '#444',
  fontSize: '14px',
  lineHeight: '24px',
}

export default Email
