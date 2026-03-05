import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Register() {
  const router = useRouter()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (nama && email && password) {
      alert('Registrasi berhasil!')
      router.push('/auth/login')
    } else {
      alert('Semua field wajib diisi!')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <div style={styles.field}>
            <label>Nama</label><br />
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={styles.input}
            />
          </div>

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
            Register
          </button>
        </form>

        <p style={{ marginTop: '10px' }}>
          Sudah punya akun?{" "}
          <Link href="/auth/login" style={{ color: 'blue' }}>
            Login
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