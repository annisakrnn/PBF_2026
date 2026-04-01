import TampilanProduk from "@/views/produk/index";
import { ProductType } from "../../types/Product.type";

const HalamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
        <h1>Halaman Produk Static</h1>
        {/* <TampilanProduk products={products} /> */}
        <TampilanProduk products={products} isLoading={false} />
    </div>
    );
};

export default HalamanProdukStatic;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/produk");
  const response: {data: ProductType[]} = await res.json();
  return{
    props: {
        products: response.data,
    }
}
  }
