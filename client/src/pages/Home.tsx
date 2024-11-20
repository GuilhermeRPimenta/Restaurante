import { useEffect, useState } from "react";
import { Product, ProductsByCategory } from "../types/Product";
import LoadingIcon from "../components/Global/LoadingIcon";
import { VscError } from "react-icons/vsc";
import Button from "../components/Global/Button";
import ProductCard from "../components/Home/ProductCard";

const Home = () => {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory | null>(null);
  const [pageState, setPageState] = useState<"LOADING" | "LOADED" | "ERROR">(
    "LOADING"
  );
  const fetchProducts = async () => {
    setPageState("LOADING");
    try {
      const fetchedProducts = await fetch(
        "http://localhost:8000/api/products",
        {
          method: "GET",
        }
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
      setPageState("LOADED");
    } catch (e) {
      setPageState("ERROR");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="text-center items-center px-2">
      <h2 className="text-4xl font-bold mb-10">Cardápio</h2>
      {productsByCategory && pageState === "LOADED" && (
        <div className="grid gap-y-10">
          {Object.keys(productsByCategory).map((category) => {
            return (
              <div key={category}>
                <h3 className="text-3xl font-bold py-2">{category}</h3>
                <div className="grid md:grid-cols-2 gap-3 max-w-3xl">
                  {productsByCategory[category]?.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
      {pageState === "ERROR" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          <p className="text-xl font-bold">Algo deu errado!</p>
          <div className="flex justify-center">
            <Button className="mt-5" onClick={fetchProducts}>
              Recarregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
