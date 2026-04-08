"use client";

import { useSession } from "next-auth/react";
import styles from "./profile.module.css";

const HalamanProfile = () => {
  const { data: session, status } = useSession();

  // State loading yang lebih rapi
  if (status === "loading") {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Memuat profil...</p>
      </div>
    );
  }

  // Ambil inisial nama (Contoh: Annisa Kurniawati -> AK)
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const user = session?.user as any;

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.headerDecoration}></div>
        
        <div className={styles.content}>
          <div className={styles.avatar}>
            {getInitials(user?.fullname || user?.name)}
          </div>

          <div className={styles.infoGroup}>
            <span className={styles.badge}>Member Aktif</span>
            <h1 className={styles.fullname}>{user?.fullname || "Pengguna"}</h1>
            <p className={styles.email}>{user?.email}</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>D4 Informatika</span>
              <span className={styles.statLabel}>Program</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>Aktif</span>
              <span className={styles.statLabel}>Status</span>
            </div>
          </div>

          <p className={styles.footerText}>
            Selamat datang kembali! Senang melihat Anda hari ini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HalamanProfile;