import Kategori from '@/pages/produk';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as swr from "swr";
// Import useRouter jika perlu melakukan pengecekan push/back
import { useRouter } from 'next/router';


// 1. Mock Next.js Router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


// 2. Mock SWR
jest.mock('swr');


describe('Product Page (Kategori)', () => {
  const mockData = {
    data: [
      {
        id: "1",
        name: "heels clarissa",
        price: 800000,
        image: "https://...",
        kategori: "sepatu wanita",
      },
    ],
  };


  beforeEach(() => {
    // Berikan implementasi default untuk useRouter agar tidak error
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
      query: {},
      asPath: '',
    });
  });


  it("renders product page with data", () => {
    (swr.default as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });


    render(<Kategori />);
    expect(screen.getByText(/heels clarissa/i)).toBeInTheDocument();
  });


  it("renders skeleton when loading", () => {
    (swr.default as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });


    const { container } = render(<Kategori />);
    const skeleton = container.querySelector('[class*="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });
});

