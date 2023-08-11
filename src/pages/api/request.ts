import axios from 'axios'

const handler = async (req, res) => {
  const hookUrl = process.env.DISCORD_WEBHOOK
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  }
  const postData = {
    username: '各種サービス申請',
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
    console.log(hookUrl)
    await axios.post(hookUrl, postData, config)
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default handler
