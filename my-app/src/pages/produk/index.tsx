import HeroSection from "@/views/produk/HeroSection";
import Kategori from "@/views/produk/index";
import MainSection from "@/views/produk/MainSection";
import styles from "@/views/produk/produk.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TampilanProduk = () => {
  const router = useRouter();
  const { id } = router.query;

  // Proteksi Halaman
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* 1. Bagian Banner Atas */}
        <HeroSection />

        {/* 2. Label Instruksi & Katalog */}
        <section className="px-5 py-10">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">
              Katalog Produk
            </h2>
          </div>

          {/* DAFTAR PRODUK (Kategori) */}
          <Kategori />

          {/* Jarak antara List dan Detail */}
          <div className="my-12"></div>

          {/* 3. Detail Produk Terpilih & Logout (Diletakkan di bawah list) */}
          <MainSection productId={id} onLogout={handleLogout} />
        </section>
      </div>
    </div>
  );
};

export default TampilanProduk;