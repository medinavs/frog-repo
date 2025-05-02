# 🐸 Frog Challenge - Sistema de Cadastro de Empresas com NestJS e SQLite

Este é um projeto de exemplo construído com NestJS e SQLite, com foco em demonstrar habilidades de backend para uma vaga de desenvolvedor. O sistema permite cadastrar empresas.

---

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Tipagem estática moderna para JavaScript
- **SQLite** - Banco de dados leve e simples para desenvolvimento local
- **TypeORM** - ORM para gerenciar entidades e migrações
- **class-validator** - Validação de dados com decorators

---

## 🧰 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/frogsummit/frog-challenge-1
cd frog-challenge-1
```

2. Instale as dependências:

```bash
npm install
```

3. Rode as migrações (se estiver usando migrations) ou deixe o TypeORM sincronizar:

```bash
npm run start
```

---

## ▶️ Como Rodar

```bash
# Ambiente de desenvolvimento
npm run start:dev

# Acesse a aplicação
http://localhost:3000
```

---

## 📬 Detalhamento de Rota

### 📌 Criar uma nova empresa

**Endpoint**

```
POST /company
```

**Descrição**

Cria uma nova empresa no sistema com nome, e-mail e CNPJ.

**Exemplo de requisição**

```json
{
  "name": "TechWave Solutions",
  "email": "contato@techwave.com.br",
  "cnpj": "12345678000195"
}
```

**Resposta de sucesso (201 Created)**

```json
{
  "id": 4,
  "name": "TechWave Solutions",
  "email": "contato@techwave.com.br",
  "cnpj": "12345678000195",
  "createdAt": "2025-05-02T13:23:53.000Z",
  "updatedAt": "2025-05-02T13:23:53.000Z"
}
```

**Validações**

- O `email` deve ser válido
- O `cnpj` deve conter apenas números e ter 14 dígitos
- O `name` é obrigatório

**Possíveis erros**

- `400 Bad Request`: Invalid Fields
- `400 Bad Request`: Company already exists

---

## ✅ Funcionalidades

- Cadastro de empresas

---

## 📝 To-Do 1

### 🚀 Desafio: Criar uma Rota para Cadastrar Funcionários

A tarefa é criar uma nova rota para cadastrar funcionários no sistema. Cada **funcionário** precisa obrigatoriamente ter uma **empresa**, e uma **empresa** pode ter **vários funcionários**. O funcionário deve ter as seguintes informações obrigatórias:

- **Nome**
- **Email**
- **Telefone**
- **Data de Nascimento**
- **Cidade/Estado**

#### Requisitos:

1. **Validação de Idade**: O funcionário não pode ser menor de 18 anos na data do cadastro. A data de nascimento fornecida deve ser verificada para garantir que o funcionário tenha pelo menos 18 anos.

2. **Validação dos Campos**:

   - **Nome**: Obrigatório.
   - **Email**: Obrigatório, deve ser um email válido.
   - **Telefone**: Obrigatório, deve ter um formato válido.
   - **Data de Nascimento**: Obrigatória.
   - **Cidade/Estado**: Obrigatório, deve ser um par de strings representando a cidade e o estado.

3. **Relacionamento com Empresa**:

   - Cada funcionário deve estar vinculado a uma **empresa**.
   - A **empresa** do funcionário deve ser passada como um identificador (ID) na requisição.

#### Endpoints:

**Endpoint**: `POST /employee`

**Exemplo de Requisição**:

```json
{
  "name": "João Silva",
  "email": "joao.silva@empresa.com",
  "phone": "11987654321",
  "birthdate": "2000-01-01",
  "city": "São Paulo",
  "state": "SP",
  "companyId": 1
}
```

**Resposta de Sucesso (201 Created)**:

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao.silva@empresa.com",
  "phone": "11987654321",
  "birthdate": "2000-01-01",
  "city": "São Paulo",
  "state": "SP",
  "companyId": 1,
  "createdAt": "2025-05-02T13:23:53.000Z",
  "updatedAt": "2025-05-02T13:23:53.000Z"
}
```

**Possíveis erros**:

* `400 Bad Request`: Missing required fields.
* `400 Bad Request`: Employee is under 18 years old.
* `400 Bad Request`: Company not found (if the `companyId` does not exist).

---

## 📝 To-Do 2

### 🚀 Desafio: Criar uma Rota para Listar Funcionários de uma Empresa

A tarefa é criar uma nova rota no **controller da empresa** que receba o **ID de uma empresa** e retorne todos os **funcionários** vinculados a ela. Caso a empresa não tenha funcionários cadastrados, a resposta deve ser uma lista vazia.

#### Requisitos:

1. **Validação do ID da Empresa**: O ID da empresa deve ser validado para garantir que existe uma empresa cadastrada com esse ID.

2. **Retorno da Lista de Funcionários**: A resposta deve incluir todos os funcionários vinculados à empresa informada. Caso a empresa não tenha funcionários cadastrados, deve ser retornada uma lista vazia.

#### Endpoints:

**Endpoint**: `GET /company/:companyId/employees`

- **Parâmetro**:

  - `companyId` (path parameter): O **ID** da empresa para buscar os funcionários.

**Exemplo de Requisição**:

```
GET /company/1/employees
```

**Exemplo de Resposta de Sucesso (200 OK)**:

Caso a empresa tenha funcionários:

```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao.silva@empresa.com",
    "phone": "11987654321",
    "birthdate": "2000-01-01",
    "city": "São Paulo",
    "state": "SP",
    "companyId": 1,
    "createdAt": "2025-05-02T13:23:53.000Z",
    "updatedAt": "2025-05-02T13:23:53.000Z"
  },
  {
    "id": 2,
    "name": "Maria Oliveira",
    "email": "maria.oliveira@empresa.com",
    "phone": "11987654322",
    "birthdate": "1995-03-10",
    "city": "São Paulo",
    "state": "SP",
    "companyId": 1,
    "createdAt": "2025-05-02T13:23:53.000Z",
    "updatedAt": "2025-05-02T13:23:53.000Z"
  }
]
```

Caso a empresa não tenha funcionários:

```json
[]
```

#### Possíveis erros:

- `400 Bad Request`: Invalid company ID.
- `404 Not Found`: Company not found (if no company exists with the provided ID).

---

## 📄 Licença

MIT © 2025 - Frog Summit
