import AppsShell from '@/components/layouts/Apshell';
import Footer from '@/components/layouts/footer';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppsShell>
      <Component {...pageProps} />
      <Footer />
    </AppsShell>
  );
};
