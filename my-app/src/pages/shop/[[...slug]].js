import { useRouter } from 'next/router';

const HalamanToko = () => {
    const { query } = useRouter();
    const { slug } = query;

    return (
        <div>
            <h1>Halaman Toko</h1>

            <p>
                Kategori:{" "}
                {Array.isArray(slug) && slug.length > 0
                    ? slug[0]
                    : "Semua Kategori"}
            </p>

            <p>
                Toko:{" "}
                {Array.isArray(slug)
                    ? slug.join("-")
                    : "Semua Toko"}
            </p>
        </div>
    );
};

export default HalamanToko;