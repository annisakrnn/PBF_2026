import { useRouter } from 'next/router';

export default function CategorySlug() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Daftar Parameter URL</h1>

      {slug ? (
        <ul>
          {slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}