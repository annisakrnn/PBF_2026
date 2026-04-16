"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./editor.module.scss";

export default function EditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (session.user.role !== "editor") {
      router.push("/unauthorized");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>📝 Editor Page</h1>

      <div className={styles.userInfo}>
        <p>Halo, {session?.user?.fullname}</p>
        <p>Role: {session?.user?.role}</p>
      </div>

      <div className={styles.menu}>
        <h3>Menu Editor</h3>
        <ul>
          <li>Buat Artikel</li>
          <li>Edit Artikel</li>
          <li>Kelola Konten</li>
        </ul>
      </div>
    </main>
  );
}