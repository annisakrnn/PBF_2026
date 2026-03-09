import TampilanProduk from "@/views/produk";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Kategori = () => {
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  const products = data?.data || [];

  if (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
  }

  return (
    <div>
      <TampilanProduk isLoading={isLoading} products={products} />
    </div>
  );
};

export default Kategori;