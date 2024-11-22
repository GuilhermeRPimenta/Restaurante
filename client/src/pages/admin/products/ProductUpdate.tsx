import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { useParams } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import Button from "../../../components/Global/Button";
import { FaRegCheckCircle } from "react-icons/fa";
import ButtonLink from "../../../components/Global/ButtonLink";
import LoadingIcon from "../../../components/Global/LoadingIcon";
import apiBaseUrl from "../../../apiBaseUrl";

const ProductUpdate = () => {
  const { productId } = useParams<{ productId: string }>();
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    price: number | undefined;
    description: string | undefined;
    imageUrl: string | undefined;
  }>({
    name: "",
    category: "",
    price: undefined,
    description: "",
    imageUrl: "",
  });
  const [pageState, setPageState] = useState<
    | "FORM"
    | "LOADING"
    | "ERROR"
    | "PRODUCT_UPDATED"
    | "PRODUCT_DELETED"
    | "PRODUCT_NOT_FOUND"
  >("FORM");
  const [product, setProduct] = useState<Product | null>(null);
  const [responseError, setResponseError] = useState<number>();
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]:
        e.target.id === "price" ? parseFloat(e.target.value) : e.target.value,
    }));
  };
  const fetchProduct = async () => {
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/products/${productId}`, {
        method: "GET",
      });
      const productData = await response.json();
      if (!response.ok) {
        if (response.status === 404 && productData.errorCode === 3) {
          setPageState("PRODUCT_NOT_FOUND");
          return;
        }
        setPageState("ERROR");
        return;
      }

      setProduct(productData);
      setFormData({ ...productData, price: Number(productData.price) });
      setPageState("FORM");
    } catch (e) {
      setPageState("ERROR");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPageState("LOADING");
      const response = await fetch(`${apiBaseUrl}/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseJson = await response.json();
      if (!response.ok) {
        if (responseJson.errorCode === 1) setPageState("ERROR");
        else setPageState("FORM");
        setResponseError(responseJson.errorCode);
      } else {
        setProduct(responseJson);
        setPageState("PRODUCT_UPDATED");
      }
    } catch (e) {
      setPageState("ERROR");
    }
  };

  const deleteProduct = async () => {
    try {
      setPageState("LOADING");
      await fetch(`${apiBaseUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      setPageState("PRODUCT_DELETED");
    } catch (e) {
      setPageState("ERROR");
    }
  };
  return (
    <div className="text-center items-center p-2">
      <h2 className="text-4xl font-bold">Edição de produto</h2>
      <h3 className="text-3xl font-bold mt-2 mb-5">{product?.name}</h3>
      {pageState === "FORM" && (
        <form
          className="flex flex-col gap-2 items-center p-2 bg-secondary rounded-xl max-w-4xl w-full mx-auto"
          onSubmit={updateProduct}
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
      {pageState === "LOADING" && (
        <LoadingIcon className="text-7xl w-full mb-5" />
      )}
      {pageState === "PRODUCT_UPDATED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Produto atualizado!</p>
          <div>
            <span className="text-primary">Id do produto: </span>
            <span>{`${product?.id}`}</span>
          </div>
          <div>
            <span className="text-primary">Nome: </span>
            <span>{`${product?.name}`}</span>
          </div>
          <div>
            <span className="text-primary">Preço: </span>
            <span>{`R$${Number(product?.price)
              .toFixed(2)
              .replace(".", ",")}`}</span>
          </div>

          <div>
            <span className="text-primary">Descrição: </span>
            <span>{`${product?.description}`}</span>
          </div>
          <div>
            <span className="text-primary">URL da imagem: </span>
            <a
              className="text-blue-500 underline"
              href={`${product?.imageUrl}`}
            >{`${product?.imageUrl}`}</a>
          </div>
          <div className="flex justify-center"></div>
        </div>
      )}
      {pageState === "PRODUCT_DELETED" && (
        <div className="flex flex-col justify-center">
          <FaRegCheckCircle className="text-7xl w-full text-green-500 mb-5" />
          <p>Produto excluído!</p>
        </div>
      )}
      {pageState === "ERROR" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          Algo deu errado!
          <div className="flex gap-2 justify-center mt-5">
            <Button className="w-fit h-fit" onClick={fetchProduct}>
              Tentar novamente
            </Button>
          </div>
        </div>
      )}
      {pageState === "PRODUCT_NOT_FOUND" && (
        <div className="flex flex-col text-center justify-center">
          <VscError className="text-7xl w-full text-red-500 mb-5" />
          Produto não encontrado!
        </div>
      )}
      {(pageState === "FORM" || pageState === "PRODUCT_UPDATED") && (
        <div className="flex justify-center mt-5">
          <Button variant="desctructive" onClick={deleteProduct}>
            Excluir produto
          </Button>
        </div>
      )}

      <div className="flex justify-center mt-5">
        <ButtonLink to="/admin/products">Voltar à tela de produtos</ButtonLink>
      </div>
    </div>
  );
};

export default ProductUpdate;
