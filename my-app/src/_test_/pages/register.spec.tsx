import HalamanAdmin from "@/pages/admin";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("HalamanAdmin Component", () => {
  it("should render admin page correctly", () => {
    render(<HalamanAdmin />);

    // PERBAIKAN: Gunakan getByRole untuk mencari tag <h1> secara spesifik.
    // Ini memastikan kita hanya mengambil judulnya saja.
    const title = screen.getByRole("heading", { name: /halaman admin/i, level: 1 });
    expect(title).toBeInTheDocument();

    // Mengetes isi paragraf (menggunakan sebagian teks yang unik)
    const paragraph = screen.getByText(/Selamat datang di halaman admin!/i);
    expect(paragraph).toBeInTheDocument();

    // Memastikan class CSS "admin" ada pada container utama
    // Kita cek parent dari h1 tersebut
    const container = title.closest('div');
    expect(container).toHaveClass("admin");
  });

  it("should have specific administrative warning text", () => {
    render(<HalamanAdmin />);
    
    // Mengecek teks spesifik tentang keamanan data
    expect(screen.getByText(/menjaga keamaman data pengguna/i)).toBeInTheDocument();
  });
});