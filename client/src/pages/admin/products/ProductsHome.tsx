import { useNavigate } from "react-router-dom";
import Button from "../../../components/Global/Button";

const ProductsHome = () => {
  const navigate = useNavigate();

  const redirectToProductCreation = () => {
    navigate("/admin/products/productCreation");
  };
  return (
    <div className="text-center items-center">
      <h2 className="text-2xl font-bold">Produtos</h2>
      <div className="flex w-full mt-5 justify-center gap-2">
        <Button onClick={redirectToProductCreation}>Criar produto</Button>
      </div>
    </div>
  );
};

export default ProductsHome;
