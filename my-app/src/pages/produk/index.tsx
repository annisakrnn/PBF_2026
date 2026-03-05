import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Produk() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/auth/login')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Halaman Produk</h2>

        <ul style={styles.list}>
          <li>
            <Link href="/produk/1" style={styles.link}>
              Produk 1
            </Link>
          </li>
          <li>
            <Link href="/produk/2" style={styles.link}>
              Produk 2
            </Link>
          </li>
          <li>
            <Link href="/produk/3" style={styles.link}>
              Produk 3
            </Link>
          </li>
        </ul>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    border: '2px solid black',
    padding: '25px',
    width: '350px',
    textAlign: 'center' as const,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  button: {
    padding: '6px 12px',
    border: '1px solid black',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
}