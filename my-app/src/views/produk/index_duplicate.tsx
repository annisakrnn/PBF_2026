import { useRouter } from "next/router";
import { useEffect, useState } from "react";


type ProductType = {
  id: string;
  name: string;
  brand: string;     
  kategory: string;  
  price: number;
  image: string;     
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const router = useRouter();

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

  if (loading) return <p className="text-center py-10 text-slate-500 font-medium italic">Menyinkronkan koleksi sepatu...</p>;

  return (
    <div className="p-5 mt-5 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-slate-800 font-black text-2xl uppercase tracking-tighter">Koleksi Sepatu</h3>
          <p className="text-slate-400 text-xs">Menampilkan {products.length} produk terbaru</p>
        </div>
        <button 
          onClick={() => fetchData()} 
          disabled={isRefreshing}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-transparent rounded-full text-xs font-bold text-white hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg shadow-blue-100"
        >
          <svg 
            className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {isRefreshing ? "Updating..." : "Refresh Catalog"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item: ProductType) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-500"
            onClick={() => handleSelectProduct(item.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Bagian Gambar Sepatu */}
            <div className="relative h-56 bg-slate-50 overflow-hidden">
              <img 
                src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                {item.brand}
              </span>
            </div>

            <div className="p-5">
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                {item.name}
              </h2>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Harga</p>
                  <p className="text-blue-600 font-black text-lg">
                    Rp {item.price?.toLocaleString()}
                  </p>
                </div>
                <button className="bg-slate-50 text-slate-900 px-4 py-2 rounded-xl font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                  BELI
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !isRefreshing && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-medium">Belum ada produk di database Anda.</p>
        </div>
      )}
    </div>
  );
};

export default Kategori;