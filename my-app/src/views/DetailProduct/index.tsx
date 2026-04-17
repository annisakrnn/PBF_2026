// views/DetailProduct/index.tsx
import Image from "next/image";
import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
      <h1 className={styles.title}>Detail Produk</h1>
      <div className={styles.produkdetail}>
        <div className={styles.produkdetail__image}>
          <Image
            src={products?.image || "/default-product-image.png"}
            alt={products?.name}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.produkdetail__info}>
          <h1 className={styles.produkdetail__name}>{products?.name}</h1>
          <p className={styles.produkdetail__category}>{products?.kategori}</p>
          <p className={styles.produkdetail__price}>
            Rp {products?.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;