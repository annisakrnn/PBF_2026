import fetcher from "@/utils/swr/fetcher";
import TampilanProduk from "@/views/produk";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";


// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Kategori = () => {
  const {push} = useRouter();
  const [products, setProducts] = useState([]);
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // const products = data?.data || [];

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data?.data || []} />
    </div>
  );
};

export default Kategori;