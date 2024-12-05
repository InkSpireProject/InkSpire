"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PersonIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export function NewNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const pathname = typeof window !== "undefined" ? usePathname() : null;

  useEffect(() => {
    const updateUserState = async () => {
      try {
        if (isLoaded && isSignedIn && user?.username) {
          console.log("User logged in:", user);
          localStorage.setItem("username", user.username);
        } else {
          console.log("No user logged in");
          localStorage.removeItem("username");
        }
      } catch (err) {
        console.error("Error updating user state:", err);
      }
    };
    updateUserState();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsSticky(true);
      return;
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "w-full transition-all duration-300",
        isSticky
          ? "fixed top-0 left-0 w-full border-b bg-background shadow-sm z-50"
          : "absolute bg-transparent text-white z-50"
      )}
    >
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Inkspire</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex gap-7">
          <Link
            href="/library"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Library
          </Link>
          <Link
            href="/cart"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Cart
          </Link>
          <Link
            href="/admin"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            Admin
          </Link>
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full size-8">
                  <Image
                    src={user.imageUrl}
                    alt="profile-img"
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                  <span className="sr-only">Open user menu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hello {user.username}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user-profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem><SignOutButton/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="hover:text-pink-500 transition-colors duration-200"
            >
              Sign-in
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open mobile menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4">
              <Link href="/library" className="text-sm font-medium">
                Library
              </Link>
              <Link href="/cart" className="text-sm font-medium">
                Cart
              </Link>
              <Link href="/orders" className="text-sm font-medium">
                Orders
              </Link>
              {isSignedIn && (
                <Link href="/profile" className="text-sm font-medium">
                  Profile
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
