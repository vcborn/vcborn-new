# VCborn Official Website

Version: `2`

## 使用ライブラリ

- Splide
- Tailwind CSS
- Directus
- Headless UI
- nodemailer
- React Icons
- 他

## 記事の追加・編集
https://console.vcborn.com

## 構造

### emails

HTML メールのテンプレートです。

### public

画像が入ってます。

### src/lib

バックエンドで使用したりするファイルがあります。

### src/components

共通で使用するコンポーネントです。

### src/locales

多言語対応のための ts ファイルが入っています。

### src/pages/\*

ページ単体やページテンプレート等諸々。  
api フォルダはメール送信用と認証に使ってます。

## その他

### カウントダウン

カウントダウンは`src/components/layout.tsx`内で使用可能です。  
`2022/01/10 17:11:00`を好きな日付と時刻に置き換えてください。
