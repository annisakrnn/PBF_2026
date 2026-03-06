interface MainSectionProps {
  productId: string | string[] | undefined;
  onLogout: () => void;
}

const MainSection = ({ productId, onLogout }: MainSectionProps) => {
  return (
    <section className="p-8 bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 -mt-10 mx-5 relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-8 bg-blue-500 rounded-full"></div>
      </div>
      
      
      <div className="bg-slate-50 p-6 rounded-2xl border-l-8 border-blue-500 mb-8">
        {productId ? (
          <div>
            <p className="text-slate-400 uppercase text-xs font-bold">Identifikasi Produk</p>
            <p className="text-3xl font-mono font-black text-blue-600 mt-1">{productId}</p>
          </div>
        ) : (
          <p className="text-slate-500 italic text-center py-4">
            Silahkan pilih produk melalui daftar atau masukkan ID pada URL.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <span className="block font-bold text-blue-800">Status</span>
          <span className="text-sm text-blue-500 font-medium">Tersedia di Gudang</span>
        </div>
        <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
          <span className="block font-bold text-cyan-800">Kualitas</span>
          <span className="text-sm text-cyan-600 font-medium">Premium Grade A+</span>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-3 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
      >
        Keluar dari Sesi
      </button>
    </section>
  );
};

export default MainSection;