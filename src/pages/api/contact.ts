import { render } from '@react-email/render';
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'
import requestIp from 'request-ip'
import Email from '@/emails/contact'
import { LimitChecker } from '@/lib/limitChecker'

const limitChecker = LimitChecker()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "https://help.vcborn.com");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Type", "application/json");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  const token = req.body.token
  const origin = req.headers.host
  const hostname = origin.replace(/https:\/\//, '')
  if (process.env.NODE_ENV !== "development") {
    const recaptchaRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_PRIVATE_KEY}&response=${token}`,
      },
    )
    const recaptchaResult = await recaptchaRes.json()
    if (!recaptchaResult.success && recaptchaResult.hostname !== hostname) {
      return res.status(401).json({
        error: `reCaptcha認証に失敗しました`,
      })
    }
  }
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS,
    },
  });
  const clientIp = requestIp.getClientIp(req) || 'IP_NOT_FOUND'
  const htmlMsg = req.body.message.replace(/\n/g, '<br>')

  const hookUrl = process.env.DISCORD_WEBHOOK
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }
  const postData = {
    username: 'VCborn Transfer',
    content: null,
    attachments: [],
    embeds: [
      {
        title: '新規お問い合わせ',
        color: 1455209,
        fields: [
          {
            name: '名前',
            value: `${req.body.name}(${req.body.furigana})`,
          },
          {
            name: 'メールアドレス',
            value: `${req.body.email}`,
          },
          {
            name: 'お問い合わせ項目',
            value: `${req.body.subject}`,
          },
          {
            name: 'お問い合わせ内容',
            value: `${req.body.message}`,
          },
          {
            name: 'IP',
            value: `[${clientIp}](https://ipinfo.io/${clientIp})`,
          },
        ],
      },
    ],
  }

  const msgData = {
    name: req.body.name,
    furigana: req.body.furigana,
    email: req.body.email,
    subject: req.body.subject,
    content: htmlMsg,
    ip: clientIp
  }
  const hostMessage = render(Email({ ...msgData, type: "admin" }))
  const clientMessage = render(Email({ ...msgData, type: "client" }))

  try {
    await limitChecker.check(res, 2, clientIp)
  } catch (error) {
    console.log(error)
    return res.status(429).json({
      text: `レート制限中です`,
      clientIp: clientIp,
    })
  }


  try {
    await transporter.sendMail({
      from: '"VCborn サポート" <support@vcborn.com>',
      to: "support@vcborn.com",
      subject: "【管理者確認】新規お問い合わせがありました",
      html: hostMessage
    })
    await transporter.sendMail({
      from: '"VCborn サポート" <support@vcborn.com>',
      to: req.body.email,
      subject: "【VCborn】お問い合わせを受け付けました",
      html: clientMessage
    })
    await axios.post(hookUrl, postData, config)
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default handler
