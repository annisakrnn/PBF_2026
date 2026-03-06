import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const TampilanLogin = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('token', 'ini-adalah-token-dummy-123');
      setLoading(false);
      push('/produk');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    
      <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-100 w-full max-w-md border border-blue-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800">Selamat Datang</h1>
          <p className="text-blue-400 mt-2">Silakan login ke akun Anda</p>
        </div>
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="group">
            <label className="text-sm font-semibold text-blue-700 ml-1">Username</label>
            <input 
              type="text" 
              placeholder="Masukkan username" 
              className="w-full mt-1 border-2 border-blue-100 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all bg-blue-50/30"
            />
          </div>
          
          <div className="group">
            <label className="text-sm font-semibold text-blue-700 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full mt-1 border-2 border-blue-100 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all bg-blue-50/30"
            />
          </div>
        </div>

        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-blue-300 shadow-lg shadow-blue-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          ) : "Masuk Sekarang"}
        </button> 

        <div className="mt-8 pt-6 border-t border-blue-50 text-center">
          <p className="text-blue-400 text-sm mb-2">
            Belum memiliki akun?
          </p>
          <Link 
            href="/auth/register" 
            className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TampilanLogin;