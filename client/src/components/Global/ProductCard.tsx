import brokenImage from "../../assets/icons8-broken-image-100.png";
import { Product } from "../../types/Product";
import Button from "./Button";
import { useCart } from "./CartProvider";

const ProductCard = ({ product }: { product: Product }) => {
  const cart = useCart();
  const { cartContent, modifyCart } = cart;

  const productQuantity = cartContent.find(
    (content) => content.id === product.id
  )?.quantity;

  const handleAddProductToCart = () => {
    modifyCart({
      ...product,
      quantity: productQuantity ? productQuantity + 1 : 1,
    });
  };

  const handleRemoveProductFromCart = () => {
    modifyCart({
      ...product,
      quantity: productQuantity ? productQuantity - 1 : 0,
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-sm w-full mx-auto hover:shadow-md">
      <h4 className="text-2xl font-bold">{product.name}</h4>
      <img
        src={product.imageUrl || brokenImage}
        alt={`Imagem de ${product.name}`}
        className="w-48 h-48 object-cover rounded-xl"
      />
      {product.description && (
        <div>
          <span>{product.description}</span>
        </div>
      )}

      <div className="mt-auto">
        <div className="text-2xl font-bold">
          <span>{`R$ ${Number(product.price)
            .toFixed(2)
            .replace(".", ",")}`}</span>
        </div>
        <p>Pedido:</p>
        <div className="flex gap-2 justify-center items-center">
          <Button
            className="w-10 aspect-square text-4xl rounded-full"
            onClick={handleRemoveProductFromCart}
          >
            -
          </Button>
          <span className="font-bold flex items-start justify-center align-top w-6">
            {productQuantity || 0}
          </span>
          <Button
            className="w-10 aspect-square text-4xl rounded-full"
            onClick={handleAddProductToCart}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
