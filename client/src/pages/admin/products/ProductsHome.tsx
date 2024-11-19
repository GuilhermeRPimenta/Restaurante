import { useEffect, useState } from "react";
import AdminProductCard from "../../../components/Admin/Products/AdminProductCard";
import { Product, ProductsByCategory } from "../../../types/Product";
import ButtonLink from "../../../components/Global/ButtonLink";

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
  return (
    <div className="text-center items-center px-2">
      <h2 className="text-4xl font-bold">Produtos</h2>
      <div className="flex w-full mt-6  justify-center gap-2">
        <ButtonLink to={"/admin/products/productCreation"}>
          Criar produto
        </ButtonLink>
      </div>
      {productsByCategory &&
        Object.keys(productsByCategory).map((category) => {
          return (
            <div className="pt-6" key={category}>
              <h3 className="text-3xl font-bold py-2">{category}</h3>
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
