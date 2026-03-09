import styles from "./produk.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  kategori: string;
};

const TampilanProduk = ({
  products,
  isLoading,
}: {
  products: ProductType[];
  isLoading: boolean;
}) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles["produk__title"]}>Katalog Pilihan</h1>

      <div className={styles["produk__content"]}>
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <div key={index} className={styles["produk__content__skeleton"]}>
              <div
                className={styles["produk__content__skeleton__image"]}
              ></div>

              <div
                className={styles["produk__content__skeleton__details"]}
              >
                <div
                  className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--short"]}`}
                ></div>

                <div
                  className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--medium"]}`}
                ></div>

                <div
                  className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--long"]}`}
                ></div>

                <div
                  className={`${styles["produk__content__skeleton__line"]} ${styles["produk__content__skeleton__line--short"]}`}
                  style={{ marginTop: "auto" }}
                ></div>
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product: ProductType) => (
            <div
              key={product.id}
              className={styles["produk__content__item"]}
            >
              <div
                className={styles["produk__content__item__imageWrapper"]}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
              </div>

              <div
                className={styles["produk__content__item__details"]}
              >
                <p
                  className={styles["produk__content__item__category"]}
                >
                  {product.kategori}
                </p>

                <h4
                  className={styles["produk__content__item__name"]}
                >
                  {product.name}
                </h4>

                <p
                  className={styles["produk__content__item__price"]}
                >
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#666",
            }}
          >
            Belum ada produk yang tersedia saat ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;

