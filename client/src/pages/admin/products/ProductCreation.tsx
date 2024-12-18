import { useState } from "react";
import LoadingIcon from "../../../components/Global/LoadingIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../../../components/Global/Button";
import { VscError } from "react-icons/vsc";
import { Product } from "../../../types/Product";
import ButtonLink from "../../../components/Global/ButtonLink";
import apiBaseUrl from "../../../apiBaseUrl";

const ProductCreation = () => {
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: number | undefined;
    description: string;
    imageUrl: string;
  }>({
    name: "",
    category: "",
    price: undefined,
    description: "",
    imageUrl: "",
  });

  const [pageState, setPageState] = useState<
    "FORM" | "LOADING" | "ERROR" | "PRODUCT_CREATED"
  >("FORM");
  const [createdProduct, setCreatedProduct] = useState<Product>();
  const [responseError, setResponseError] = useState<number>();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]:
        e.target.id === "price" ? parseFloat(e.target.value) : e.target.value,
    }));
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        if (responseJson.errorCode === 1 || responseJson.errorCode === 9)
          setPageState("ERROR");
        else setPageState("FORM");
        setResponseError(responseJson.errorCode);
      } else {
        setCreatedProduct(responseJson);
        setPageState("PRODUCT_CREATED");
      }
    } catch (e) {
      setPageState("ERROR");
    }
  };

  const resetPage = () => {
    setCreatedProduct(undefined);
    setPageState("FORM");
    setResponseError(undefined);
    setFormData({
      name: "",
      category: "",
      price: undefined,
      description: "",
      imageUrl: "",
    });
  };

  return (
    <div className="flex flex-col h-full text-center w-full justify-center">
      <h2 className="text-4xl font-bold mb-10">Cadastro de produto</h2>
      {pageState === "FORM" && (
        <form
          className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-4xl w-full mx-auto"
          onSubmit={createProduct}
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
            <label className="text-md font-bold" htmlFor="category">
              Categoria
            </label>
            <input
              className={`rounded-xl px-2 ${
                responseError === 3 && "outline outline-red-500 outline-2"
              }`}
              type="text"
              id="category"
              value={formData.category}
              onChange={handleFormChange}
            />
            {responseError === 3 && (
              <p className="text-red-500">Este campo não pode ser vazio!</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="description">
              Descrição (opcional)
            </label>
            <input
              className={`rounded-xl px-2`}
              type="text"
              id="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="price">
              Preço
            </label>
            <input
              className={`rounded-xl px-2 ${
                (responseError === 4 || responseError === 5) &&
                "outline-red-500 outline outline-2"
              }`}
              type="number"
              id="price"
              step={0.01}
              value={formData.price}
              onChange={handleFormChange}
            />
            {responseError === 4 && (
              <p className="text-red-500">Este campo não pode ser vazio!</p>
            )}
            {responseError === 5 && (
              <p className="text-red-500">Preço não pode ser negativo!</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md font-bold" htmlFor="imageUrl">
              URL de imagem (opcional)
            </label>
            <input
              className={`rounded-xl px-2 ${
                (responseError === 6 || responseError === 7) &&
                "outline-red-500 outline outline-2"
              }`}
              type="text"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleFormChange}
            />
            {responseError === 6 && (
              <p className="text-red-500">URL inválida!</p>
            )}
            {responseError === 7 && (
              <p className="text-red-500">Esta não é uma URL de uma imagem!</p>
            )}
            {responseError === 8 && (
              <p className="text-red-500">Insira uma URL!</p>
            )}
          </div>

          <Button>Enviar</Button>
        </form>
      )}
      {pageState === "LOADING" && <LoadingIcon className="text-7xl w-full" />}
      {pageState === "PRODUCT_CREATED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Produto criado!</p>
          <div>
            <span className="text-primary">Id do produto: </span>
            <span>{`${createdProduct?.id}`}</span>
          </div>
          <div>
            <span className="text-primary">Nome: </span>
            <span>{`${createdProduct?.name}`}</span>
          </div>
          <div>
            <span className="text-primary">Preço: </span>
            <span>{`R$${Number(createdProduct?.price)
              .toFixed(2)
              .replace(".", ",")}`}</span>
          </div>

          <div>
            <span className="text-primary">Descrição: </span>
            <span>{`${createdProduct?.description}`}</span>
          </div>
          <div>
            <span className="text-primary">URL da imagem: </span>
            <a
              className="text-blue-500 underline"
              href={`${createdProduct?.imageUrl}`}
            >{`${createdProduct?.imageUrl}`}</a>
          </div>
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
          Algo deu errado!
          {responseError === 9 && (
            <div>
              Um ou mais parâmetros foram enviados com mais de 255 caracteres!
            </div>
          )}
          <div className="flex justify-center">
            <Button className="mt-5" onClick={resetPage}>
              Voltar
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <ButtonLink to="/admin/products" className="mt-5">
          Voltar à tela de produtos
        </ButtonLink>
      </div>
    </div>
  );
};

export default ProductCreation;
