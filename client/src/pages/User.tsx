import React, { useState } from "react";
import Button from "../components/Global/Button";

const User = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Usuário</h2>
      <h3 className="text-xl font-bold">Cadastro de usuário</h3>
      <form
        className="flex flex-col gap-2 items-center p-2 bg-gray-100 rounded-xl"
        onSubmit={createUser}
      >
        <div className="flex flex-col">
          <label htmlFor="name">Nome</label>
          <input
            className="rounded-xl px-2"
            type="text"
            id="name"
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">E-mail</label>
          <input
            className="rounded-xl px-2"
            type="text"
            id="email"
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address">Endereço</label>
          <input
            className="rounded-xl px-2"
            type="text"
            id="address"
            onChange={handleFormChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone">Telefone</label>
          <input
            className="rounded-xl px-2"
            type="text"
            id="phone"
            onChange={handleFormChange}
          />
        </div>

        <Button>Enviar</Button>
      </form>
    </div>
  );
};

export default User;
