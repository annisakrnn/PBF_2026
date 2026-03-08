import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./produk.module.css";

type ProductType = {
  id: string;
  kategori: string; 
  name: string;
  price: number;
  size: string;
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State khusus refresh
  const router = useRouter();

  // 1. Fungsi Fetch Data 
  const fetchData = async (showFullLoading = false) => {
    if (showFullLoading) setLoading(true);
    setIsRefreshing(true);

    try {
      const response = await fetch("/api/produk");
      const responseData = await response.json();
      setProducts(responseData.data || []);
    } catch (error) {
      console.error("Error fetching produk:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  const handleSelectProduct = (id: string) => {
    router.push(`?id=${id}`, undefined, { shallow: true });
  };

  if (loading) return <p className="text-center py-10 text-slate-500 font-medium">Memuat katalog produk...</p>;

  return (
    <div className="p-5 mt-5">
      {/* 2. Tombol Refresh Data */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-slate-600 font-bold text-sm uppercase tracking-wider">Koleksi Kami</h3>
        <button 
          onClick={() => fetchData()} 
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-blue-300 transition-all disabled:opacity-50"
        >
          {/* Icon Refresh  */}
          <svg 
            className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRefreshing ? "Menyinkronkan..." : "Refresh Data"}
        </button>
      </div>

      <div className={styles.productGrid}>
        {products.map((item: ProductType) => (
          <div 
            key={item.id} 
            className={`${styles.card} hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-100`}
            onClick={() => handleSelectProduct(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1">{item.name}</h2>
            
            <p className="text-xs text-slate-400 italic mb-3">{item.kategori}</p>
            
            <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
              <p className="text-blue-600 font-black text-base">
                Rp {item.price.toLocaleString()}
              </p>
              <button className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold hover:bg-blue-600 hover:text-white transition-colors">
                DETAIL
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !isRefreshing && (
        <p className="text-center text-slate-400 py-10">Data produk kosong.</p>
      )}
    </div>
  );
};

export default Kategori;