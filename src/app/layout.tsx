"use client";
import React, { useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { NewNavbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* <div className="flex">
            <Navbar />
          </div> */}
          <div className="bg-green-500">
            <NewNavbar />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
