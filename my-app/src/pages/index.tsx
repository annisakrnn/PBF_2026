import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>

      <h1>Praktikum Next.js Pages Router</h1>
      <br />
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  );
}