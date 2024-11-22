import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../Global/Button";
import { useCart } from "../Global/CartProvider";
import { VscError } from "react-icons/vsc";
import LoadingIcon from "../Global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonLink from "../Global/ButtonLink";
import apiBaseUrl from "../../apiBaseUrl";

const CheckoutModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const cart = useCart();
  const { cartContent, clearCart } = cart;
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "SUCCESS"
  >("FORM");
  const [userNotFound, setUserNotFound] = useState(false);
  const formData = useRef<{
    userId: number | null;
    products: { productId: number; quantity: number }[];
  }>({
    userId: null,
    products: cartContent.map((content) => ({
      productId: content.id,
      quantity: content.quantity,
    })),
  });

  useEffect(() => {
    formData.current = {
      ...formData.current,
      products: cartContent.map((content) => ({
        productId: content.id,
        quantity: content.quantity,
      })),
    };
  }, [cartContent]);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.current = { ...formData.current, userId: Number(e.target.value) };
  };

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.current),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        if (responseJson.errorCode === 6) {
          setUserNotFound(true);
          setPageState("FORM");
          return;
        }
        setPageState("ERROR");
      } else {
        setPageState("SUCCESS");
        clearCart();
      }
    } catch (e) {
      setPageState("ERROR");
    }
  };

  const resetModal = () => {
    setPageState("FORM");
  };

  return (
    <div
      className={`bg-black/70 fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center ${
        !isOpen && "hidden"
      }`}
    >
      <div className="bg-secondary flex flex-col gap-4 rounded-lg p-5">
        {pageState !== "SUCCESS" && (
          <Button
            onClick={() => setIsOpen(false)}
            className="ml-auto h-12 w-12 p-0"
            variant="ghost"
          >
            <IoIosClose className="h-32 w-32" />
          </Button>
        )}

        {pageState === "FORM" && (
          <form className="flex flex-col gap-1" onSubmit={createOrder}>
            <label htmlFor="userId" className="text-md font-bold">
              Insira seu id de usuário:
            </label>
            <input
              id="userId"
              type="number"
              className={`rounded-xl px-2 ${
                userNotFound && "outline-red-500 outline outline-2"
              }`}
              onChange={handleUserIdChange}
            />
            <p className={`text-red-700 ${!userNotFound && "hidden"}`}>
              Usuário não encontrado!
            </p>
            <Button className="mt-3">Pedir</Button>
          </form>
        )}
        {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
        {pageState === "SUCCESS" && (
          <div className="flex flex-col justify-center">
            <FaRegCheckCircle className="text-7xl w-full text-green-300 mb-5" />
            <p className="font-bold text-2xl">Pedido realizado!</p>
            <ButtonLink className="mt-2" to="/">
              Voltar ao cardápio
            </ButtonLink>
          </div>
        )}
        {pageState === "ERROR" && (
          <div className="flex flex-col text-center justify-center">
            <VscError className="text-7xl w-full text-red-500 mb-5" />
            Algo deu errado!
            <div className="flex justify-center">
              <Button className="mt-5" onClick={resetModal}>
                Voltar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
