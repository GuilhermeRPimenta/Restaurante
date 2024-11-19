import { useNavigate } from "react-router-dom";
import Button from "../../../components/Global/Button";
import { useEffect, useState } from "react";
import AdminProductCard from "../../../components/Admin/Products/AdminProductCard";
import { Product, ProductsByCategory } from "../../../types/Product";

const ProductsHome = () => {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetch(
        "http://localhost:8000/api/products",
        { method: "GET" }
      );
      const productsData: Product[] = await fetchedProducts.json();
      const productsByCategory = productsData.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
      }, {} as ProductsByCategory);
      setProductsByCategory(productsByCategory);
    };
    fetchProducts();
  }, []);
  const navigate = useNavigate();
  const redirectToProductCreation = () => {
    navigate("/admin/products/productCreation");
  };
  return (
    <div className="text-center items-center p-2">
      <h2 className="text-2xl font-bold">Produtos</h2>
      <div className="flex w-full mt-5  justify-center gap-2">
        <Button onClick={redirectToProductCreation}>Criar produto</Button>
      </div>
      {productsByCategory &&
        Object.keys(productsByCategory).map((category) => {
          return (
            <div className="pt-6" key={category}>
              <h3 className="text-2xl bold py-2">{category}</h3>
              <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
                {productsByCategory[category]?.map((product) => (
                  <AdminProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsHome;
