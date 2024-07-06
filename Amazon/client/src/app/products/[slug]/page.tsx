import { getProductBySlug } from "@/db/models/product";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import { ObjectId } from "mongodb";

type ProductDetailProps = {
  params: {
    slug: string;
  };
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="my-3 border-t border-gray-400" />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0">
            <ImageGallery
              thumbnail={product.thumbnail}
              images={product.images}
              name={product.name}
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2 text-sm">
                  ({Math.floor(Math.random() * 200) + 1} ratings)
                </span>
              </div>
              <p className="flex mt-2 text-gray-600">{product.description}</p>
              <p className="mt-4 text-3xl font-bold">${product.price}</p>
              <p className="text-gray-600">
                + Additional Shipping & Import Charges
              </p>
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap space-x-2 mb-4">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded border border-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ClientFlashComponent />
              <div className="mt-4">
                <AddToWishlistButton productId={new ObjectId(product._id)} slug={params.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 border-t border-gray-400" />
    </>
  );
}
