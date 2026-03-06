import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
import MainSection from "./MainSection";
import styles from './produk.module.css';

const TampilanProduk = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <HeroSection />
        <MainSection productId={id} onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default TampilanProduk;