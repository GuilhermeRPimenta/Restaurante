import { useEffect, useRef, useState } from "react";
import ButtonLink from "../components/Global/ButtonLink";
import { useCart } from "../components/Global/CartProvider";
import ProductCard from "../components/Global/ProductCard";
import { ProductsByCategory } from "../types/Product";
import Button from "../components/Global/Button";

const Checkout = () => {
  const cart = useCart();
  const { cartContent, clearCart } = cart;
  const [productsByCategory] = useState<ProductsByCategory>(
    cartContent.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as ProductsByCategory)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col h-full text-center w-full justify-center pb-16">
      <h2 className="text-4xl font-bold mb-10">Finalizar pedido</h2>
      <h3 className="text-2xl font-bold">Revise seu pedido:</h3>
      <div className="grid gap-y-10">
        {Object.keys(productsByCategory).map((category) => {
          return (
            <div key={category}>
              <h3 className="text-3xl font-bold py-2">{category}</h3>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 2xl:grid-cols-4  max-w-3xl xl:max-w-6xl 2xl:max-w-max">
                {productsByCategory[category]?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 mt-6 items-center">
        <Button className="w-full max-w-96">Finalizar</Button>
        <ButtonLink variant="desctructive" className="w-full max-w-96" to="/">
          Voltar ao cardápio
        </ButtonLink>
      </div>
    </div>
  );
};

export default Checkout;
