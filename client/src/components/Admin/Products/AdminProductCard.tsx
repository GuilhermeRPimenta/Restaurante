import { Product } from "../../../types/Product";
import brokenImage from "../../../assets/icons8-broken-image-100.png";
import ButtonLink from "../../Global/ButtonLink";

const AdminProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-md w-full mx-auto hover:shadow-md">
      <h3 className="text-2xl font-bold">{product.name}</h3>
      <img
        src={product.imageUrl || brokenImage}
        alt={`Imagem de ${product.name}`}
        className="w-48 h-48 object-cover rounded-xl"
      />
      <div>
        <span className="font-bold">Categoria: </span>
        <span>{product.category}</span>
      </div>
      <div>
        <span className="font-bold">Descrição: </span>
        <span>{product.description ? product.description : "NENHUMA"}</span>
      </div>
      <div className="mt-auto">
        <div>
          <span className="font-bold">Preço: </span>
          <span>{`R$${Number(product.price)
            .toFixed(2)
            .replace(".", ",")}`}</span>
        </div>
        <div>
          <span className="font-bold">Id: </span>
          <span>{product.id}</span>
        </div>
      </div>

      <ButtonLink to={`/admin/products/${product.id}`}>Editar</ButtonLink>
    </div>
  );
};

export default AdminProductCard;
