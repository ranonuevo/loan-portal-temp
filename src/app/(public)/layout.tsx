import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { ConfirmServiceProvider } from "@/hooks/confirm";
import "../globals.css";


const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: "--font-sans"
})


export const metadata: Metadata = {
  title: "Loan App Demo",
  description: "Loan App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable}`}>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ConfirmServiceProvider>
          {children}
        </ConfirmServiceProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
