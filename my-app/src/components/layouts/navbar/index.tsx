"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from './navbar.module.css';

const Navbar = () => {
  // Menggunakan destructuring yang lebih bersih
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__brand}>
        MyApp
      </div>

      <div className={styles.navbar__right}>
        {status === "authenticated" ? (
          <>
            <div className={styles.navbar__user}>
              {/* Optional chaining agar tidak crash jika data belum load */}
              Welcome, {(session?.user as any)?.fullname || session?.user?.name}
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