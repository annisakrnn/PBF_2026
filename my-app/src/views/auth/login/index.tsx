import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import style from './login.module.scss';

const TampilanLogin = () => {
const [isLoading, setIsLoading] = useState(false);
const { push, query } = useRouter();
const callbackUrl: any = query.callbackUrl as string || "/";
const [error, setError] = useState("");
const handleSubmit = async (event: any) => {
event.preventDefault();
setIsLoading(true);
setError("");

// const form = event.currentTarget;
// const formData = new FormData(event.currentTarget);
// const email = formData.get("email") as string;
// const fullname = formData.get("Fullname") as string;
// const password = formData.get("Password") as string;
// if (!email) {
//     setError("Email wajib diisi");
//     return;
//   }

//   if (password.length < 6) {
//     setError("Password minimal 6 karakter");
//     return;
//   }

// const response = await fetch("/api/register", {
// method: "POST",
// headers: {
// "Content-Type": "application/json",
// },
// body: JSON.stringify({ email, fullname, password }),
// });
// if (response.status === 200) {
// form.reset();
// setIsLoading(false);
// push("/auth/login");
// } else {
// setIsLoading(false);
// // Line 34: Perubahan pesan error menjadi lebih spesifik untuk email
// setError(
// response.status === 400 ? "Email already exists" : "An error occurred"
// );
// }
// };
try {
  const res = await signIn("credentials", {
    redirect: false,
    email: event.target.email.value,
    password: event.target.password.value,
    callbackUrl,
  });
  if (!res?.error) {
  // ambil session
  const session = await fetch("/api/auth/session").then(res => res.json());

  setIsLoading(false);

  if (session.user.role === "admin") {
    push("/admin");
  } else {
    push("/");
  }
}else{
    setIsLoading(false);
    setError(res?.error || "Login failed");
  }
} catch (error) {
  setIsLoading(false);
  setError("wrong email or password");
}
};

    return (
        <div className={style.login}>
            {error && <p className={style.login__error}>{error}</p>}
            <h1 className={style.login__title}>Halaman Login</h1>
            <div className={style.login__form}>
            <form onSubmit ={handleSubmit}>
            
            <div className={style.login__form__item}>
                <label 
                    htmlFor="email"
                    className={style.login__form__item__label}
                >
                    Email
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email"
                    className={style.login__form__item__input} 
                />    
            </div>
            <div className={style.login__form__item}>
                <label 
                    htmlFor="Password"
                    className={style.login__form__item__label}
                >
                    Password
                </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    placeholder="Password"
                    className={style.login__form__item__input} 
                />  
            </div>
            <button type="submit" className={style.login__form__item__button} disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
            </button> {""}
            <br /> <br />
            <button 
                type="button"
                onClick={() => signIn("google", { callbackUrl, redirect: false })}
                className={style.login__form__item__button}
            >
                Sign In with Google
            </button>
            </form>
            <br />
            <p className={style.login__form__item__text}>
                Tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
            </p>
        </div>
         </div>
    );
};


export default TampilanLogin;