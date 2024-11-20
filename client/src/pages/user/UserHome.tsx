import { useState } from "react";
import Button from "../../components/Global/Button";
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonLink from "../../components/Global/ButtonLink";

const UserHome = () => {
  const [pageState, setPageState] = useState<
    "LOGIN" | "LOADING" | "FORM" | "USER_UPDATED" | "ERROR" | "USER_NOT_FOUND"
  >("LOGIN");
  const [responseError, setResponseError] = useState<number | null>(null);
  const [loginFormData, setLoginFormData] = useState<{ email: string }>({
    email: "",
  });
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
  }>({ id: "", name: "", email: "", address: "", phone: "" });
  const resetPage = () => {
    setUser({ id: "", name: "", email: "", address: "", phone: "" });
    setLoginFormData({ email: "" });
    setResponseError(null);
    setPageState("LOGIN");
  };
  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({ email: e.target.value });
  };
  const handleLogin = async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(
        `http://localhost:8000/api/auth/login/${loginFormData.email}`,
        {
          method: "GET",
        }
      );
      const fetchedUser = await response.json();
      setUser(fetchedUser);
      if (response.status === 404 && fetchedUser.errorCode === 3) {
        setPageState("USER_NOT_FOUND");
        return;
      }
      setPageState("FORM");
    } catch (error) {
      setPageState("ERROR");
    }
  };
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user !== null)
      setUser((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
  };
  const handleUpdateUser = async function name() {
    try {
      setPageState("LOADING");
      const response = await fetch(
        `http://localhost:8000/api/auth/update/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const responseJson = await response.json();
      if (!response.ok) {
        if (responseJson.errorCode === 1) setPageState("ERROR");
        else setPageState("FORM");
        setResponseError(responseJson.errorCode);
      } else {
        setPageState("USER_UPDATED");
      }
    } catch (error) {
      setPageState("ERROR");
    }
  };
  return (
    <div className="flex flex-col h-full text-center w-full justify-center px-4">
      <h2 className="text-4xl font-bold mb-10">Usuário</h2>
      {pageState === "LOGIN" && (
        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-4xl w-full mx-auto"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col w-full">
              <label className="text-md font-bold" htmlFor="name">
                Email
              </label>
              <input
                className={`rounded-xl px-2 ${
                  responseError === 2 && "outline-red-500 outline outline-2"
                }`}
                type="text"
                id="name"
                value={loginFormData.email}
                onChange={handleLoginFormChange}
              />
              {responseError === 2 && (
                <p className="text-red-500">Este campo não pode ser vazio!</p>
              )}
            </div>
            <Button>Entrar</Button>
          </form>
          <div className="flex flex-col gap-2 justify-center mt-5">
            <p className="text-md font-bold">Não possui uma conta?</p>
            <div className="flex justify-center">
              <ButtonLink to="/user/register">Cadastre-se</ButtonLink>
            </div>
          </div>
        </div>
      )}
      {pageState === "FORM" && (
        <div className="flex flex-col justify-center">
          <form
            className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-4xl w-full mx-auto"
            onSubmit={handleUpdateUser}
          >
            <div className="flex flex-col w-full">
              <input type="hidden" value={user ? user.id : ""}></input>
              <div>
                <span className="text-md font-bold">Id: </span>
                <span>{user.id}</span>
              </div>
              <label className="text-md font-bold" htmlFor="name">
                Nome
              </label>
              <input
                className={`rounded-xl px-2 ${
                  responseError === 2 && "outline-red-500 outline outline-2"
                }`}
                type="text"
                id="name"
                value={user ? user.name : ""}
                onChange={handleUserFormChange}
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
                value={user ? user.email : ""}
                onChange={handleUserFormChange}
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
                value={user ? user.address : ""}
                onChange={handleUserFormChange}
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
                value={user ? user.phone : ""}
                onChange={handleUserFormChange}
              />
              {responseError === 5 && (
                <p className="text-red-500">Insira um telefone válido!</p>
              )}
            </div>

            <Button>Enviar</Button>
          </form>
          <div className="flex justify-center mt-5">
            <Button onClick={resetPage}>Voltar</Button>
          </div>
        </div>
      )}
      {pageState === "USER_UPDATED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Usuário atualizado!</p>
          <div className="flex justify-center mt-5">
            <Button onClick={resetPage}>Voltar</Button>
          </div>
        </div>
      )}
      {pageState === "USER_NOT_FOUND" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          Usuário não encontrado!
          <div className="flex gap-2 justify-center mt-5">
            <Button onClick={resetPage}>Voltar</Button>
          </div>
        </div>
      )}
      {pageState === "ERROR" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          Algo deu errado!
          <div className="flex gap-2 justify-center mt-5">
            <Button onClick={resetPage} className="w-fit h-fit">
              Voltar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
