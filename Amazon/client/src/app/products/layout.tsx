import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServerProtectedComponents from "@/components/ServerProtectedComponents";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ServerProtectedComponents>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </ServerProtectedComponents>
    </>
  );
};

export default Layout;
