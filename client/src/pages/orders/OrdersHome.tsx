import { useEffect, useState } from "react";
import apiBaseUrl from "../../apiBaseUrl";
import { Order } from "../../types/Order";
import OrderCard from "../../components/Admin/Orders/OrderCard";
import { VscError } from "react-icons/vsc";
import Button from "../../components/Global/Button";
import LoadingIcon from "../../components/Global/LoadingIcon";

const OrdersHome = () => {
  const [pageState, setPageState] = useState<"LOADING" | "LOADED" | "ERROR">(
    "LOADING"
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "GET",
      });
      const ordersData: Order[] = await response.json();
      const ordersWithFixedDate = ordersData.map((order) => ({
        ...order,
        createdAt: new Date(order.createdAt),
      }));
      ordersWithFixedDate.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setOrders(ordersWithFixedDate);
      setPageState("LOADED");
    } catch (error) {
      setPageState("ERROR");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="flex flex-col h-full text-center w-full justify-center">
      <h2 className="text-4xl font-bold mb-10">Pedidos</h2>

      {pageState === "LOADED" && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-full max-w-2xl">
            <div className="flex w-full font-bold px-8">
              <div className="w-1/2 text-left">Produto</div>
              <div className="w-1/4 text-left">Qnt.</div>
              <div className="w-1/4 text-right">Preço total</div>
            </div>

            <div className="max-w-2xl flex gap-3 flex-col w-full">
              {orders.map((order) => {
                return <OrderCard key={order.id} order={order} />;
              })}
            </div>
          </div>
        </div>
      )}
      {pageState === "LOADING" && (
        <LoadingIcon className="text-7xl w-full mb-5" />
      )}
      {pageState === "ERROR" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          <p className="text-xl font-bold">Algo deu errado!</p>
          <div className="flex justify-center">
            <Button className="mt-5" onClick={fetchOrders}>
              Recarregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersHome;
