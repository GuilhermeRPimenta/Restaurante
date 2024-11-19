import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { useParams } from "react-router-dom";

const ProductUpdate = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        {
          method: "GET",
        }
      );
      const productData: Product = await fetchedProduct.json();
      setProduct(productData);
    };
    fetchProduct();
  }, []);
  return (
    <div className="text-center items-center p-2">
      <h2>Editar produto</h2>
      <h3>{product?.id}</h3>
    </div>
  );
};

export default ProductUpdate;
