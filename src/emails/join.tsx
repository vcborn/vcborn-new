import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Link } from '@react-email/link'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'

interface EmailProps {
  type: 'client' | 'admin'
  name: string
  furigana: string
  email: string
  twitter: string
  group?: string
  active: string
  departments: string
  works?: string
  content: string
  ip?: string
}

export const Email: React.FC<Readonly<EmailProps>> = ({
  type = 'client',
  name = '山田太郎',
  furigana = 'やまだたろう',
  email = 'sample@example.com',
  twitter = 'example',
  group = 'なし',
  active = '1日～3日',
  departments = 'Web開発',
  content = 'メッセージ',
  works,
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
                src='https://console.vcborn.com/assets/a4fc9b2d-fa40-4d8b-b063-4ae78b7e1560.png'
                width='200'
                height='45'
                alt='VCborn'
              />
            </Link>
          </Section>
          <Text style={h1}>
            {type === 'client' ? 'ご応募ありがとうございます' : '新規応募がありました'}
          </Text>
          <Text style={heroText}>
            {type === 'client'
              ? 'VCbornにご興味をお寄せいただきありがとうございます。'
              : 'VCbornへ新規応募が届きました。'}
            <br />
            {type === 'client'
              ? 'こちらは入力していただいた応募内容です。'
              : '早めに確認・連絡されることをお勧めします。'}
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
              <Text style={sectionTitle}>Twitter</Text>
              <Link href={`https://twitter.com/${twitter.slice(1)}`}>
                <Text style={sectionText}>{twitter}</Text>
              </Link>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>所属グループ</Text>
              <Text style={sectionText}>{group}</Text>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>平均浮上日数（一週間）</Text>
              <Text style={sectionText}>{active}</Text>
            </Section>
            <Section style={section}>
              <Text style={sectionTitle}>希望部署</Text>
              <Text style={sectionText}>{departments}</Text>
            </Section>
            {works && (
              <Section style={section}>
                <Text style={sectionTitle}>実績</Text>
                {works.startsWith('https://') ? (
                  <Link href={works}>
                    <Text style={sectionText}>{works}</Text>
                  </Link>
                ) : (
                  <Text style={sectionText}>{works}</Text>
                )}
              </Section>
            )}
            <Section style={section}>
              <Text style={sectionTitle}>一言</Text>
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
              <td align='left' valign='top'>
                <Img
                  src='https://console.vcborn.com/assets/a4fc9b2d-fa40-4d8b-b063-4ae78b7e1560.png'
                  width='180'
                  height='40'
                  alt='Slack'
                />
              </td>
              <td align='right' valign='top'>
                <Link href='https://twitter.com/vcborn_support'>
                  <Img
                    src='https://console.vcborn.com/assets/1e5b5dbb-51f4-4797-b4e0-81c7f475377c.png'
                    width='40'
                    height='40'
                    alt='Twitter'
                    style={socialMediaIcon}
                  />
                </Link>
                <Link href='https://www.youtube.com/@vcborn'>
                  <Img
                    src='https://console.vcborn.com/assets/8296b65f-ffef-4847-bf2b-bd0a023604fe.png'
                    width='40'
                    height='40'
                    alt='YouTube'
                    style={socialMediaIcon}
                  />
                </Link>
                <Link href='https://github.com/vcborn'>
                  <Img
                    src='https://console.vcborn.com/assets/d8846c74-d23f-48e3-a358-b0e3638f104a.png'
                    width='40'
                    height='40'
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
