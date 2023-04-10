import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-PT">
      <Head>
      <title>Outono</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="preconnect" href="https://rsms.me/"/>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}