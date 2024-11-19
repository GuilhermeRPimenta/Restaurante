import ButtonLink from "../../components/Global/ButtonLink";

const Admin = () => {
  return (
    <div className="text-center items-center">
      <h2 className="text-4xl font-bold">Área administrativa</h2>
      <div className="flex w-full mt-5 justify-center gap-2">
        <ButtonLink to="/">Pedidos</ButtonLink>
        <ButtonLink to="/admin/products">Produtos</ButtonLink>
      </div>
    </div>
  );
};

export default Admin;
