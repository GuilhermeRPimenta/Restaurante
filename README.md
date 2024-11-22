# Restaurante

Implementação de um sistema web para um restaurante. O backend está na pasta **server** e o frontend na pasta **client**.

## Tecnologias

- **Frontend**: React.js, Vite, Tailwind
- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma ORM

## Execução do projeto

### Pré-requisitos

- [Node.js] - Recomenda-se versões 22.x.x LTS.
- [PostgreSQL] - É necessário acesso a um banco PostgreSQL rodando localmente ou remotamente.

### Backend

- Navegue até a pasta **server**
- Crie um arquivo .env e configure suas variáveis de ambiente de acordo com o exemplo:

```
SERVER_PORT=8000
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

**SERVER_PORT** será a porta em que o backend será executado no localhost. <br>
**DATABASE_URL** contém a localização do banco de dados PostgreSQL e seu usuário. No exemplo acima:

- user: nome de usuário
- password: senha do usuário
- localhost: endereço do servidor onde o banco de dados está hospedado. Para um banco de dados local, use localhost.
- 5432: A porta onde o banco de dados PostgreSQL está escutando.
- database: O nome do banco de dados ao qual deseja-se conectar.

Em seguida:

- Instale as dependências com o comando `npm install`
- Crie as tabelas no banco de dados com o comando `npx prisma migrate dev`
- Execute o comando `npm run dev`. Isso irá rodar o backend na porta definida em **SERVER_PORT**, ou na porta 8000 caso essa variável não tenha sido criada.

### Frontend

- Navegue até a pasta **client**
- Crie um arquivo .env e configure suas variáveis de ambiente de acordo com o exemplo:

```
VITE_SERVER_PORT=5000
VITE_API_BASE_URL=http://localhost:8000
```

**VITE_SERVER_PORT** será a porta em que o frontend será executado no localhost. A porta padrão é 5173<br>
**VITE_API_BASE_URL** é o endereço do backend. Lembre-se de colocar a mesma porta definida em SERVER_PORT no arqquivo .env do backend.

- Instale as dependências com o comando `npm install`
- Execute o frontend com o comando `npm run dev`

## Detalhes do projeto

### Backend

Os endpoints retornam erros no formato `{errorCode: number, error: string}`. Em todos os endpoints, `errorCode = 1` representa um erro genérico, enquanto outros valores variam de significado para cada endpoint. Recomenda-se ler a mensagem presente em `error` para entender o que causou o erro.

#### Endpoints

- POST `/api/auth/register` <br>
  Este endpoint é responsável por criar um usuário.<br>
  Deve-se enviar um JSON com o body seguindo o exemplo:

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "Rua Fictícia, 123",
  "phone": "123456789"
}
```

- GET `/api/auth/login/:email` <br>
  Este endpoint é responsável por retornar um usuário a partir de seu e-mail.<br>
  Exemplo de resposta:

```
{
    "id": 14,
    "name": "Guilherme",
    "email": "exemplo@exemplo.com",
    "address": "Avenida Exemplo ",
    "phone": "32900112233"
}
```

- PUT `/api/auth/update/:id` <br>
  Este endpoint é responsável por atualizar os dados de um usuário.<br>
  Deve-se enviar um JSON com o body seguindo o exemplo:

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "Rua Fictícia, 123",
  "phone": "1234567899"
}
```

- POST `/api/products` <br>
  Este endpoint é responsável por criar um produto.<br>
  Deve-se enviar um JSON com o body seguindo o exemplo:

```
{
  "name": "Pizza Calabresa",
  "category": "Prato Principal",
  "price": 29.99,
  "description": "Pizza com calabresa e cebola",
  "imageUrl": "https://example.com/pizza-calabresa.jpg"
}
```

- GET `/api/products/` <br>
  Este endpoint é responsável por obter dados de vários produtos. As seguintes queries são suportadas:
  `category` (categoria); `orderBy` (seleciona o parâmetro utilizado para a ordenação. Possíveis valores: `id`; `name`;`category`; `price`; `description`; `imageUrl`); `orderDirection` (`asc` para ordernação crescente, `desc` para ordenação decrescente); `maxPrice` (preço máximo); `minPrice` (preço mínimo).<br>
  Por padrão, a ordenação se dá por categoria de maneira crescente, sem preço mínimo ou máximo e sem a filtragem por categoria.
  Exemplo de resposta para `localhost:8000/api/products?category=Pizzas%20Doces`:

```
[
    {
        "id": 8,
        "name": "Pizza de Brigadeiro ",
        "price": "44.99",
        "category": "Pizzas Doces",
        "description": "O clássico doce brasileiro que cai bem de qualquer jeito e a qualquer hora está entre as pizzas doces mais vendidas.",
        "imageUrl": "https://www.mavalerio.com.br/wp-content/uploads/2018/12/160722_pizzas-002-v2-500x340.png"
    },
    {
        "id": 9,
        "name": "Pizza de Nutella",
        "price": "48.99",
        "category": "Pizzas Doces",
        "description": "",
        "imageUrl": ""
    }
]
```

- GET `/api/products/:id` <br>
  Este endpoint é reponsável por obter dados de um produto <br>
  Exemplo de resposta:

```
{
  "id": 1,
  "name": "Pizza Margherita",
  "category": "Prato Principal",
  "price": 25.99,
  "description": "Clássica pizza italiana",
  "imageUrl": "https://example.com/image.jpg"
}
```

- PUT `/api/products/:id` <br>
  Este endpoint é responsável por atualizar os dados de um produto <br>
  Deve-se enviar um JSON com o body seguindo o exemplo:

```
{
  "name": "Pizza Margherita",
  "price": 28.99,
  "category": "Prato Principal",
  "description": "Pizza italiana clássica com tomate e manjericão",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

- DELETE `/api/products/:id`
  Este endpoint é responsável por excluir um produto. Não é possível excluir um produto que esteja em um pedido.

- POST `/api/orders`<br>
  Este endpoint é responsável por criar um pedido. <br>
  Deve-se enviar um JSON com o body seguindo o exemplo: <br>

```
{
  "userId": 1,
  "products": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

- GET `/api/orders` <br>
  Este endpoint é responsável por obter todos os pedidos cadastrados <br>
  Exemplo de resposta:

```
[
    {
        "id": 2,
        "totalPrice": "44.99",
        "status": "PENDENTE",
        "createdAt": "2024-11-22T01:46:11.727Z",
        "products": [
            {
                "name": "Pizza de Brigadeiro ",
                "quantity": 1,
                "price": "44.99"
            }
        ]
    },
    {
        "id": 3,
        "totalPrice": "44.99",
        "status": "PENDENTE",
        "createdAt": "2024-11-22T01:49:16.547Z",
        "products": [
            {
                "name": "Pizza de Brigadeiro ",
                "quantity": 1,
                "price": "44.99"
            }
        ]
    }
]
```

- GET `/api/orders/:id` <br>
  Este endpoint é responsável por obter os dados de um pedido <br>
  Exemplo de resposta:

```
{
  "id": 1,
  "totalPrice": 56.99,
  "status": "Pendente",
  "createdAt": "2024-11-06T12:34:56Z",
  "products": [
    {
      "name": "Pizza Margherita",
      "quantity": 2,
      "price": 25.99
    },
    {
      "name": "Coca-Cola",
      "quantity": 1,
      "price": 5.99
    }
  ]
}
```

- PUT `/api/orders/:id` <br>
  Este endpoint é responsável por atualizar o status de um pedido<br>
  Deve-se enviar um JSON com o body seguindo o exemplo:

```
{
  "status": "EM_PREPARO"
}
```

Os possíveis valores para `status` são: `PENDENTE`; `EM_PREPARO`; `ENTREGUE` ; `CANCELADO`

### Frontend

A aplicação oferece uma interface intuitiva e responsiva. Caso a API retorne um erro do usuário, a interface irá indicar o que está errado.
