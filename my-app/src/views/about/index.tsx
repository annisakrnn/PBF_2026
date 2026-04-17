import Image from "next/image";
import styles from "./about.module.css";

const AboutView = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Tentang Kami</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.textSection}>
          <p className={styles.description}>
            Selamat datang di halaman profil saya. Halaman ini dirancang sebagai bagian dari
            implementasi praktikum pengembangan aplikasi web menggunakan Next.js untuk
            menampilkan informasi mahasiswa secara profesional.
          </p>

          <div className={styles.infoCard}>
            <p className={styles.infoItem}>
              <strong>Nama Mahasiswa</strong> : Annisa Kurniawati
            </p>
            <p className={styles.infoItem}>
              <strong>NIM</strong> : 2341720070
            </p>
            <p className={styles.infoItem}>
              <strong>Program Studi</strong> : D4 Teknik Informatika
            </p>
          </div>
        </div>

        <div className={styles.illustrationWrapper}>
          <Image
            src="/about.png"
            alt="Ilustrasi Profil Mahasiswa"
            width={300}
            height={300}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutView;