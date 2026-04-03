// pages/produk/[id].tsx
import fetcher from "@/utils/swr/fetcher";
import DetailProduk from "@/views/DetailProduct";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

const HalamanProduk = () => {
  const { query } = useRouter();

  const { data, error, isLoading } = useSWR(
    query.id ? `/api/products/${query.id}` : null,
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;
  if (!data) return <p>Product not found</p>;

  return <DetailProduk products={data.data} />;
};

export default HalamanProduk;

// Fungsi Server-Side Rendering (SSR)
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Mengambil ID/Slug produk dari parameter URL
  const id = params?.produk;

  try {
    const res = await fetch(`http://localhost:3001/api/produk/${id}`);
    const response = await res.json();

    // Pastikan struktur data sesuai dengan yang dikirim oleh API Anda
    return {
      props: {
        product: response.data || null,
      },
    };
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);

    return {
      props: {
        product: null,
      },
    };
  }
};