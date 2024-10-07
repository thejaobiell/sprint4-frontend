import '../styles/reset.css';  
import type { Metadata } from "next";
import Header from './Header/page'; 
import Footer from './Footer/Footer';

export const metadata: Metadata = {
  title: "Diagnoscar"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="tudo">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
