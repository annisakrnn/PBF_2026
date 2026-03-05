import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email && password) {
      localStorage.setItem('token', 'user-login')
      router.push('/produk')
    } else {
      alert('Email dan Password wajib diisi!')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div style={styles.field}>
            <label>Email</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label>Password</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p>
  Belum punya akun?{" "}
  <Link href="/auth/register" style={{ color: 'blue' }}>
    Register
  </Link>
</p>
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
    padding: '20px',
    width: '300px',
  },
  field: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '5px',
    border: '1px solid black',
  },
  button: {
    width: '100%',
    padding: '5px',
    border: '1px solid black',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
}