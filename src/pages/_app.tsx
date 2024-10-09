import type { AppProps } from 'next/app';
import '@/sass/globals.scss';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return ( 
    <main className={kanit.className}>
      <Component {...pageProps} />
    </main>
  );
}
