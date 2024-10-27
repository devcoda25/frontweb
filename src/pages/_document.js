// ** React Import
// ** Next Import
import { Html, Head, Main, NextScript } from 'next/document'

const CustomDocument = () => {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
        <link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6247560589805667"
     crossorigin="anonymous"></script>
       
     
      </body>
    </Html>
  )
}

export default CustomDocument
