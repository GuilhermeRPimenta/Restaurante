import { Order } from "../../../types/Order";
import Button from "../../Global/Button";

const UpdateOrderCard = ({
  order,
  handleUpdateStatus,
}: {
  order: Order;
  handleUpdateStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-secondary max-w-2xl w-full outline outline-1 outline-black mx-auto">
      <div className="w-full">
        <h4 className="text-md font-bold">
          {order.createdAt.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </h4>
        <h5 className="text-md font-bold">Id: {order.id}</h5>
        <select
          name="status"
          id="status"
          defaultValue={order.status}
          onChange={handleUpdateStatus}
        >
          <option value="PENDENTE">PENDENTE</option>
          <option value="EM_PREPARO">EM PREPARO</option>
          <option value="ENTREGUE">ENTREGUE</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>

        <div className="w-full">
          {order.products?.map((product) => {
            return (
              <div
                key={product.name}
                className="flex border-b border-t items-center border-gray-500"
              >
                <div className="w-1/2 text-left">{product.name}</div>
                <div className="w-1/4 text-left">x{product.quantity}</div>
                <div className="w-1/4 text-left">
                  R$ {Number(product.price) * product.quantity}
                </div>
              </div>
            );
          })}
          <p className="font-bold">Total</p>
          <p className="font-bold text-xl">R$ {order.totalPrice}</p>
        </div>
      </div>
      <Button>Enviar</Button>
    </div>
  );
};

export default UpdateOrderCard;
