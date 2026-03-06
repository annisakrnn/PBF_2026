const HeroSection = () => {
  return (
    <section className="py-20 px-5 text-center bg-gradient-to-br from-blue-50 to-blue-200 text-blue-900">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block bg-blue-500/10 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-blue-500/20">
          New Collection 2026
        </span>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800 tracking-tight">
          Promo Spesial Bulan Ini!
        </h1>
        
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Temukan produk impian Anda dengan penawaran yang tidak masuk akal dan kualitas premium.
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all">
            Lihat Katalog
          </button>
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;