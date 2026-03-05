import { useRouter } from "next/router";
import React from "react";
import Navbar from "../navbar";
// Menyimpan daftar rute/path yang tidak akan menampilkan Navbar
const disableNavbar = ["/auth/login", "/auth/register"];
type AppShellProps = {
children: React.ReactNode;
};
const AppShell = (props: AppShellProps) => {
const { children } = props;
// Mengambil informasi path URL saat ini
const { pathname } = useRouter();
return (
<main>
{/* Logika kondisional: Render Navbar HANYA JIKA pathname saat ini TIDAK ADA di
dalam array disableNavbar */}
{!disableNavbar.includes(pathname) && <Navbar />}
{children}
<div>
footer
</div>
</main>
);
};
export default AppShell;

