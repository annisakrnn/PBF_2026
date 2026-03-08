import styles from "./produk.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>New Collection 2026</span>
        <h1 className={styles.heroTitle}>Promo Spesial Bulan Ini!</h1>
        <p className={styles.heroDescription}>
          Temukan produk impian Anda dengan penawaran yang tidak masuk akal dan kualitas premium.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryButton}>Lihat Katalog</button>
          <button className={styles.secondaryButton}>Pelajari Lebih Lanjut</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;