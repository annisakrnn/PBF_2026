import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./produk.module.scss";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  kategori: string;
};

type Props = {
  products: ProductType[];
  isLoading?: boolean;
};

const TampilanProduk = ({ products }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>

      {id && (
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          Produk: {id}
        </p>
      )}

      <div className={styles.produk__content}>
        {products.length > 0 ? (
          <>
            {products.map((product: ProductType) => (
              <Link
                href={`/produk/${product.id}`}
                key={product.id}
                className={styles.produk__content__item}
              >
                <div className={styles.produk__content__item__image}>
                  <Image src={product.image} alt={product.name} width={200} height={200} />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {product.kategori}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;