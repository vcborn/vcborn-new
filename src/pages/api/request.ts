import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
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
  const hookUrl = process.env.DISCORD_WEBHOOK
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }
  const clientIp = requestIp.getClientIp(req) || 'IP_NOT_FOUND'
  const postData = {
    username: 'VCborn Transfer',
    content: '',
    embeds: [
      {
        title: '利用申請',
        color: 1455209,
        description: '',
        timestamp: '',
        author: {
          name: '',
        },
        image: '',
        thumbnail: '',
        footer: '',
        fields: [
          {
            name: '名前・ユーザー名',
            value: `${req.body.name}`,
          },
          {
            name: 'メールアドレス',
            value: `${req.body.email}`,
          },
          {
            name: '希望するユーザー名',
            value: `${req.body.username}`,
          },
          {
            name: '希望するパスワード',
            value: `${req.body.pass}`,
          },
          {
            name: '利用サービス',
            value: `${req.body.services}`,
          },
          {
            name: '名刺',
            value: `${req.body.card}`,
          }
        ],
      },
    ],
  }

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
    console.log(hookUrl)
    await axios.post(hookUrl, postData, config)
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default handler
