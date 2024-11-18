import { useNavigate } from "react-router-dom";
import Button from "../../components/Global/Button";

const Admin = () => {
  const navigate = useNavigate();
  const redirectToProducts = () => {
    navigate("/admin/products");
  };
  return (
    <div className="text-center items-center">
      <h2 className="text-2xl font-bold">Área administrativa</h2>
      <div className="flex w-full mt-5 justify-center gap-2">
        <Button>Pedidos</Button>
        <Button onClick={redirectToProducts}>Produtos</Button>
      </div>
    </div>
  );
};

export default Admin;
