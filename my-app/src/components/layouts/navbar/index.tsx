"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Script from 'next/dist/client/script';
import Image from "next/image";
import styles from './navbar.module.css';


const Navbar = () => {
  // Menggunakan destructuring yang lebih bersih
  const { data: session, status } = useSession();

  return (
    
    <nav className={styles.navbar}>
      {/* <div className={styles.navbar__brand}>
        MyApp
      </div> */}
      <div className={styles.navbar__brand} id="title"></div>
      <Script id="title-script" strategy="lazyOnload">
        {'document.getElementById("title").textContent = "MyApp";'}
      </Script>
      <div className={styles.navbar__right}>
        {status === "authenticated" ? (
          <>
            <div className={styles.navbar__user}>
              {/* Optional chaining agar tidak crash jika data belum load */}
              Welcome. {session.user?.fullname}
              {session?.user?.image && (
                // <img
                //   src={session.user.image}
                //   alt={session.user.fullname}
                //   className={styles.navbar__user__image}
                // />
                <Image
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn(undefined, { callbackUrl: "/profile" })}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;