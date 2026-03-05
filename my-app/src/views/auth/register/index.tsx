import Link from 'next/link';

const TampilanRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 shadow-xl rounded-lg bg-white w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Register</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Fullname</label>
          <input type="text" placeholder="John Doe" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" placeholder="email@example.com" className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Daftar
        </button>
        
        <p className="mt-4 text-center text-sm">
          Sudah punya akun? <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;