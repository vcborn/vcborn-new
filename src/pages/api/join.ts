import { render } from '@react-email/render';
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'
import requestIp from 'request-ip'
import Email from '@/emails/join'
import { LimitChecker } from '@/lib/limitChecker'

const limitChecker = LimitChecker()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
        title: '新規応募',
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
            name: 'X(Twitter)',
            value: `[${req.body.twitter}](https://x.com/${req.body.twitter.slice(1)})`,
          },
          {
            name: '所属中のグループ',
            value: `${req.body.group || "なし"}`,
          },
          {
            name: '平均浮上日数',
            value: `${req.body.active}`,
          },
          {
            name: '入りたい部署',
            value: `${req.body.departments.join(', ')}`,
          },
          {
            name: '実績',
            value: `${req.body.works || "なし"}`
          },
          {
            name: '一言',
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
    twitter: req.body.twitter,
    group: req.body.group,
    active: req.body.active,
    works: req.body.works,
    departments: req.body.departments.join(', '),
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
      from: '"VCborn 応募受付" <support@vcborn.com>',
      to: "support@vcborn.com",
      subject: "【管理者確認】新規応募がありました",
      html: hostMessage
    })
    await transporter.sendMail({
      from: '"VCborn 応募受付" <support@vcborn.com>',
      to: req.body.email,
      subject: "【VCborn】ご応募ありがとうございます",
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
