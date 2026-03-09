import TampilanProduk from "@/views/produk";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

const Kategori = () => {
  const [products, setProducts] = useState([]);
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);
  // useEffect(() => {
  //   fetch("/api/produk")
  //     .then((response) => response.json())
  //     .then((responsedata) => {
  //       // Mengambil data dari properti 'data' sesuai struktur API
  //       setProducts(responsedata.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching produk:", error);
  //     });
  // }, []);

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data || []} />
    </div>
  );
};

export default Kategori;