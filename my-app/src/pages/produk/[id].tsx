// pages/produk/[id].tsx
import { ProductType } from "@/types/Product.type"; // ✅ WAJIB
import DetailProduk from "@/views/DetailProduct";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  // Digunakan jika ingin menggunakan client-side rendering (SWR)
  // const { query } = useRouter();
  // const { data, error } = useSWR(
  //   query.id ? `/api/produk/${query.id}` : null,
  //   fetcher
  // );

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;


// --- ALTERNATIF: SERVER SIDE RENDERING (SSR) ---

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/produk/${params.id}`);
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}