import Navbar from "@/components/layouts/navbar";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, signOut, useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("Navbar Component Coverage", () => {
  it("should handle Sign In interaction", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });
    render(<Navbar />);
    
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);
    
    // Memastikan fungsi signIn dipanggil saat tombol diklik
    expect(signIn).toHaveBeenCalled();
  });

  it("should handle Sign Out interaction", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { fullname: "User Test", image: "/test.png" } },
      status: "authenticated",
    });
    render(<Navbar />);
    
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    // Memastikan fungsi signOut dipanggil saat tombol diklik
    expect(signOut).toHaveBeenCalled();
  });
});