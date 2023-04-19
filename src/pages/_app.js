import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import '../global.css'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✉️</text></svg>"
        />

        <title>
          Mailsheet : 100 personalized emails from your spreadsheets
        </title>
      </Head>
      <div className="bg-yellow-400 min-h-screen pt-20">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
