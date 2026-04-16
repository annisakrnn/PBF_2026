import TampilanProduk from "@/views/produk/index";
import { ProductType } from "../../types/Product.type";

const HalamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        Halaman Produk Server
      </h1>

      <TampilanProduk products={products} isLoading={false}/>
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const respone = await res.json();

  return {
    props: {
      products: respone.data || [],
    },
  };
}