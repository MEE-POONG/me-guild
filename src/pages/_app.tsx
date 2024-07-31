import type { AppProps } from 'next/app';
import '@/sass/globals.scss';
import { Prompt } from 'next/font/google';

const promt = Prompt({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps } :AppProps) {
  return ( 
    <main className={promt.className}>
      <Component {...pageProps} />
    </main>
  );
}
