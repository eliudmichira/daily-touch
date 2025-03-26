import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductDetail } from "../components/ProductDetail";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
        <p className="mt-4 text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
} 