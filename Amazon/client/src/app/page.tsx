import { ProductModel, getProducts } from "@/db/models/product";
import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ProductCards from "@/components/ProductCards";
import ClientFlashComponent from "@/components/ClientFlashComponent";

const fetchProducts = async (page = 1, limit = 8) => {
  const fetchedProduct = await getProducts((page - 1) * limit, limit);
  return fetchedProduct;
};

const Home = async () => {
  const initialProducts = await fetchProducts();

  return (
    <>
      <Navbar />
      <Carousel />
      <section className="mt-8">
        <hr className="my-8 border-gray-400" />
        <h2 className="text-2xl font-bold text-center mb-8">Products</h2>
        <ClientFlashComponent />
        <ProductCards initialProducts={initialProducts} />
        <div className="flex justify-center mt-4">
          <Link href="/products" className="bg-emerald-400 text-white py-2 px-5 rounded hover:bg-emerald-700">
              See More
          </Link>
        </div>
        <hr className="my-8 border-gray-400" />
      </section>
      <Footer />
    </>
  );
};

export default Home;
