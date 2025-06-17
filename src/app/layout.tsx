import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "../styles/globals.css";
import ClientLayout from "./ClientLayout";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ParentCare - Konsultasi Parenting Digital",
  description: "Platform konsultasi parenting berbasis digital untuk keluarga sehat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id"> 
      <body className={`${inter.variable} bg-gradient-to-r from-[#FFE0D7] to-[#FFB6B9] min-h-screen`}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <ClientLayout>
          {children}
        </ClientLayout>
    </GoogleOAuthProvider>
      </body>
    </html>
  );
}