import TampilanProduk from "@/views/produk/index";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
const { products } = props;
return (
<div>
<h1>Halaman Produk Static</h1>
<TampilanProduk products={products} />
</div>
);
};
export default halamanProdukStatic;

export async function getStaticProps() {
const res = await fetch('http://127.0.0.1:3001/api/produk');
// const response: ProductType[] = await res.json();
const response: { data: ProductType[] } = await res.json();
// console.log("Data produk yang diambil dari API:", response);
return {
props: {
products: response.data,
},
revalidate: 10, // Opsi ini memungkinkan halaman untuk di-regenerate setiap 10 detik (jika ada permintaan baru) 
}
}