import { useLocation } from "react-router-dom";
import ButtonLink from "../Global/ButtonLink";
import { useCart } from "../Global/CartProvider";

const Footer = () => {
  const location = useLocation();
  const cart = useCart();
  const { cartContent } = cart;
  const total = cartContent.reduce((acc, product) => {
    const val = Number(product.price) * product.quantity;
    return acc + val;
  }, 0);
  const hiddenFooter = total === 0;
  const numberOfItems = cartContent.reduce((acc, content) => {
    return acc + content.quantity;
  }, 0);
  return (
    <footer
      className={`bg-gray-100 p-2 flex gap-2 items-center justify-center fixed z-[10] w-full transition-all duration-200 ${
        hiddenFooter ? "bottom-[-5rem]" : "bottom-0"
      }`}
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="font-bold mx-auto ">
        <p>{`${numberOfItems} ${numberOfItems === 1 ? "item" : "itens"}`}</p>
        <p className="whitespace-nowrap">{`Total: R$ ${total
          .toFixed(2)
          .replace(".", ",")}`}</p>
      </div>
      {location.pathname === "/" && (
        <ButtonLink className="px-8 md:px-32 mx-auto " to="/checkout">
          Finalizar
        </ButtonLink>
      )}
    </footer>
  );
};

export default Footer;
