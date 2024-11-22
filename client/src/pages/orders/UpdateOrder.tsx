import { useParams } from "react-router-dom";
import apiBaseUrl from "../../apiBaseUrl";
import { useEffect, useRef, useState } from "react";
import { Order } from "../../types/Order";
import UpdateOrderCard from "../../components/Admin/Orders/UpdateOrderCard";
import LoadingIcon from "../../components/Global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonLink from "../../components/Global/ButtonLink";
import { VscError } from "react-icons/vsc";

const UpdateOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const formStatus = useRef({ status: "PENDENTE" });
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "ORDER_UPDATED" | "ORDER_NOT_FOUND"
  >("FORM");
  const [order, setOrder] = useState<Order>();
  const fetchOrder = async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/orders/${orderId}`, {
        method: "GET",
      });
      const orderData = await response.json();
      const orderDataWithDate: Order = {
        ...orderData,
        createdAt: new Date(orderData.createdAt),
      };
      if (!response.ok) {
        if (response.status === 404 && orderData.errorCode === 3) {
          setPageState("ORDER_NOT_FOUND");
          return;
        }
        setPageState("ERROR");
        return;
      }

      setOrder(orderDataWithDate);
      formStatus.current = { status: orderDataWithDate.status };
      setPageState("FORM");
    } catch (error) {
      setPageState("ERROR");
    }
  };
  const updateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formStatus.current),
      });
      if (!response.ok) {
        setPageState("ERROR");
        return;
      }
      setPageState("ORDER_UPDATED");
    } catch (error) {
      setPageState("ERROR");
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formStatus.current = { status: e.target.value };
  };
  return (
    <div className="flex flex-col h-full text-center w-full justify-center">
      <h2 className="text-4xl font-bold mb-10">Edição de pedido</h2>
      {order && pageState === "FORM" && (
        <form onSubmit={updateOrder}>
          <UpdateOrderCard
            order={order}
            handleUpdateStatus={handleChangeStatus}
          />
        </form>
      )}
      {pageState === "LOADING" && (
        <LoadingIcon className="text-7xl w-full mb-5" />
      )}
      {pageState === "ORDER_UPDATED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Pedido atualizado!</p>
          <div className="flex justify-center">
            <ButtonLink className="w-fit" to="/admin/orders">
              Voltar à pagina de pedidos
            </ButtonLink>
          </div>
        </div>
      )}
      {pageState === "ORDER_NOT_FOUND" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          Pedido não encontrado!
        </div>
      )}
    </div>
  );
};

export default UpdateOrder;
