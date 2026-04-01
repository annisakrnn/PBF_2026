import HeroSection from "@/views/produk/HeroSection";
import MainSection from "@/views/produk/MainSection";
import styles from "@/views/produk/produk.module.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TampilanProduk = () => {
  const router = useRouter();
  const { id } = router.query;

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

        <HeroSection />

        <section className="px-5 py-10">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">
              Katalog Produk
            </h2>
          </div>

          {/* <Kategori /> */}

          <div className="my-12"></div>

          <MainSection productId={id} onLogout={handleLogout} />
        </section>
      </div>
    </div>
  );
};

export default TampilanProduk;