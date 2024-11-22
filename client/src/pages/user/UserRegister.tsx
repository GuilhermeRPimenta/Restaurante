import React, { useState } from "react";
import Button from "../../components/Global/Button";
import LoadingIcon from "../../components/Global/LoadingIcon";
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonLink from "../../components/Global/ButtonLink";
import apiBaseUrl from "../../apiBaseUrl";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "USER_CREATED"
  >("FORM");
  const [createdUserId, setCreatedUserId] = useState<number>();
  const [responseError, setResponseError] = useState<number>();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        if (responseJson.errorCode === 1 || responseJson.errorCode === 7)
          setPageState("ERROR");
        else setPageState("FORM");
        setResponseError(responseJson.errorCode);
      } else {
        setCreatedUserId(responseJson.id);
        setPageState("USER_CREATED");
      }
    } catch (e) {
      setPageState("ERROR");
    }
  };

  const resetPage = () => {
    setCreatedUserId(undefined);
    setPageState("FORM");
    setResponseError(undefined);
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="flex flex-col h-full text-center w-full justify-center px-4">
      <h2 className="text-4xl font-bold mb-10">Cadastro de usuário</h2>
      {pageState === "FORM" && (
        <form
          className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-4xl w-full mx-auto"
          onSubmit={createUser}
        >
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="name">
              Nome
            </label>
            <input
              className={`rounded-xl px-2 ${
                responseError === 2 && "outline-red-500 outline outline-2"
              }`}
              type="text"
              id="name"
              value={formData.name}
              onChange={handleFormChange}
            />
            {responseError === 2 && (
              <p className="text-red-500">Este campo não pode ser vazio!</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              className={`rounded-xl px-2 ${
                (responseError === 3 || responseError === 6) &&
                "outline outline-red-500 outline-2"
              }`}
              type="text"
              id="email"
              value={formData.email}
              onChange={handleFormChange}
            />
            {responseError === 3 && (
              <p className="text-red-500">Insira um e-mail válido!</p>
            )}
            {responseError === 6 && (
              <p className="text-red-500">Este e-mail já está cadastrado!</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="address">
              Endereço
            </label>
            <input
              className={`rounded-xl px-2 ${
                responseError === 4 && "outline-red-500 outline outline-2"
              }`}
              type="text"
              id="address"
              value={formData.address}
              onChange={handleFormChange}
            />
            {responseError === 4 && (
              <p className="text-red-500">Este campo não pode ser vazio!</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="phone">
              {"Telefone com DDD (opcional)"}
            </label>
            <input
              className={`rounded-xl px-2 ${
                responseError === 5 && "outline-red-500 outline outline-2"
              }`}
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleFormChange}
            />
            {responseError === 5 && (
              <p className="text-red-500">Insira um telefone válido!</p>
            )}
          </div>

          <Button>Enviar</Button>
        </form>
      )}
      {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
      {pageState === "USER_CREATED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Usuário criado!</p>
          <p>{`Seu id de usuário: ${createdUserId}`}</p>
          <div className="flex justify-center">
            <Button className="mt-5" onClick={resetPage}>
              Voltar
            </Button>
          </div>
        </div>
      )}
      {pageState === "ERROR" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          <p className="text-xl font-bold">Algo deu errado!</p>
          {responseError === 7 && (
            <div>
              Um ou mais parâmetros foram enviados com mais de 255 caracteres!
            </div>
          )}
          <div className="flex justify-center">
            <Button className="mt-5" onClick={resetPage}>
              Criar novo usuário
            </Button>
          </div>
        </div>
      )}
      <div className="flex mt-5 justify-center">
        <ButtonLink className="w-fit" to="/user">
          Voltar à tela de usuário
        </ButtonLink>
      </div>
    </div>
  );
};

export default UserRegister;
