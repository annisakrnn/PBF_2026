import HalamanAdmin from "@/pages/admin";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("HalamanAdmin Component", () => {
  it("should render admin page correctly", () => {
    render(<HalamanAdmin />);

    // PERBAIKAN: Gunakan getByRole untuk mencari <h1> secara spesifik
    // Ini memastikan kita mengambil Judul, bukan teks di dalam paragraf
    const title = screen.getByRole("heading", { name: /halaman admin/i, level: 1 });
    expect(title).toBeInTheDocument();

    // Mengetes isi paragraf
    const paragraph = screen.getByText(/Selamat datang di halaman admin/i);
    expect(paragraph).toBeInTheDocument();

    // Memastikan class CSS "admin" ada pada kontainer
    const container = title.closest('div');
    expect(container).toHaveClass("admin");
  });

  it("should have specific administrative warning text", () => {
    render(<HalamanAdmin />);
    
    expect(screen.getByText(/menjaga keamaman data pengguna/i)).toBeInTheDocument();
  });
});