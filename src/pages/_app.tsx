import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import {RecoilRoot} from "recoil";
import {useEffect} from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";


export default function App({ session,Component, pageProps }: AppProps) {
    useEffect(() => {
    TimeAgo.addLocale(en)
    })
  return (
      <SessionProvider session={session}>
          <RecoilRoot>
              {/*Similar to react redux but in this case we are using recoil */}
              <Component {...pageProps} />
          </RecoilRoot>
      </SessionProvider>
  )
}
