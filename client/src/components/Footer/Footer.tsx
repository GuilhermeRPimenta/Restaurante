import ButtonLink from "../Global/ButtonLink";
import { useCart } from "../Global/CartProvider";

const Footer = () => {
  const cart = useCart();
  const total = cart.cartContent.reduce((acc, product) => {
    const val = Number(product.price) * product.quantity;
    return acc + val;
  }, 0);
  const hiddenFooter = total === 0;
  return (
    <footer
      className={`bg-gray-100 p-2 flex gap-2 items-center justify-center fixed z-[10] w-full transition-all duration-200 ${
        hiddenFooter ? "bottom-[-5rem]" : "bottom-0"
      }`}
    >
      <div className="font-bold mx-auto w-28 md:w-72">{`Total: R$${total
        .toFixed(2)
        .replace(".", ",")}`}</div>
      <ButtonLink className="px-8 md:px-32 mx-auto lg:px-48" to="/checkout">
        Finalizar
      </ButtonLink>
    </footer>
  );
};

export default Footer;
