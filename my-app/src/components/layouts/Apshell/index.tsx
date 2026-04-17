import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";

// Menyimpan daftar rute/path yang tidak akan menampilkan Navbar
const disableNavbar = ["/auth/login", "/auth/register", "/404"];

type AppShellProps = {
  children: React.ReactNode;
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Navbar = dynamic(() => import("../navbar"), {
  ssr: false,
  loading: () => <p>Loading Navbar...</p>,
});

const AppShell = (props: AppShellProps) => {
  const { children } = props;

  // Mengambil informasi path URL saat ini
  const { pathname } = useRouter();

  return (
    <main className={roboto.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}

      {children}

      <div>
        footer
      </div>
    </main>
  );
};

export default AppShell;