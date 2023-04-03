import '../global.style.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <title>Outono</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Component {...pageProps} />
      <Analytics/>
    </SessionContextProvider>
  )
}
export default MyApp;

