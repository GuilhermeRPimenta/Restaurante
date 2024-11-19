import { useNavigate } from "react-router-dom";
import Button from "../../Global/Button";
import { Product } from "../../../types/Product";

const AdminProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const redirectToProductId = () => {
    navigate(`/admin/products/${product.id}`);
  };
  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-md w-full mx-auto hover:shadow-md">
      <h3 className="text-2xl bold">{product.name}</h3>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-xl"
      />
      <div>
        <span>Categoria: </span>
        <span>{product.category}</span>
      </div>
      <div>
        <span>Descrição: </span>
        <span>{product.description ? product.description : "NENHUMA"}</span>
      </div>
      <div className="mt-auto">
        <div>
          <span>Preço: </span>
          <span>{`R$${Number(product.price)
            .toFixed(2)
            .replace(".", ",")}`}</span>
        </div>
        <div>
          <span>Id: </span>
          <span>{product.id}</span>
        </div>
      </div>

      <Button onClick={redirectToProductId}>Editar</Button>
    </div>
  );
};

export default AdminProductCard;
