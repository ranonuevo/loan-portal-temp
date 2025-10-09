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
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} text-base text-system-black`}>
      <body
        className={`${poppins.className} antialiased`}
      >
        <ConfirmServiceProvider>
          {children}
        </ConfirmServiceProvider>
        <Toaster 
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "rounded-xl shadow-lg border border-white/10 bg-gradient-to-br from-orange-500 to-pink-500 text-white",
              title: "text-white font-semibold text-lg",
              description: "text-white/90",
              actionButton: "bg-white/15 hover:bg-white/25 text-white",
              cancelButton: "bg-white text-gray-900",
              closeButton: "text-white/80 hover:text-white",
            }
          }}
        />
      </body>
    </html>
  );
}
