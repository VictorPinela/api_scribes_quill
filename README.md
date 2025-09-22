# 🏰 Scribe's Quill API

Back-end para o gerenciador de fichas de personagens de D&D 5e. Uma API RESTful completa com autenticação JWT, CRUD de personagens e validação de dados.

## 🚀 Deploy Production

**API URL**: `https://api-scribes-quill.onrender.com/`  
**Front-end**: [https://html-scribes-quill.vercel.app](https://html-scribes-quill.vercel.app)

## 📋 Funcionalidades

### 🔐 Autenticação

- [x] Registro de usuários com senha hasheada
- [x] Login com JWT tokens
- [x] Logout com blacklist de tokens
- [x] Middleware de autenticação
- [x] Validação de dados de entrada

### 🧙‍♂️ Personagens

- [x] CRUD completo de fichas de personagem
- [x] Relação User → Character (1:N)
- [x] Validação de regras de D&D 5e
- [x] Campos: atributos, habilidades, inventário, magias
- [x] Cálculos automáticos (CA, PV, modificadores)

### 🛡️ Segurança

- [x] Senhas hasheadas com bcrypt
- [x] Tokens JWT com expiração
- [x] CORS configurado
- [x] Rate limiting básico
- [x] Validação contra NoSQL injection

## 🛠️ Tecnologias

- **Node.js** + Express.js
- **TypeScript** - Tipagem estática
- **MongoDB** + Mongoose - Banco de dados
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **CORS** - Cross-origin requests

## 📦 Estrutura do Projeto

src/

<!-- ├── controllers/ # Lógica de negócio -->

├── models/ # Schemas do MongoDB
├── routes/ # Rotas da API
├── middleware/ # Autenticação e validação
├── utils/ # Funções auxiliares
└── index.ts # Entry point

## 🔧 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/VictorPinela/api_scribes_quill
cd api_scribes_quill

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

### ⚙️ Variáveis de Ambiente locais

- **PORT** - Porta que sera usada para rodar a API
- **MONGODB_URI** - Uri do MongoDB
- **JWT_SECRET** - Senha que sera usada nos tokens JWT
- **JWT_EXPIRES_IN** - Tempo de expiração do token
- **FRONTEND_URL** Url para o Front-End

## 📡 Endpoints da API

### Autenticação

> - [POST /auth/register](#Criar-usuário) - Criar usuário
> - [POST /auth/login](#Login) - Login
> - [POST /auth/logout](#Logout) - Logout
> - [GET /auth/me](#User-atual) - User atual

### Personagens

> - [GET /characters](#GET/characters) - Listar personagens do usuário
> - [POST /characters](#Criar-Personagem) - Criar personagem
> - [GET /characters/:id](#GET/characters/:id) - Buscar personagem
> - [PUT /characters/:id](#PUT/characters/:id) - Atualizar personagem
> - [DELETE /characters/:id](#DELETE/characters/:id) - Deletar personagem

### Usuarios

> - [GET /users](#GET/users) - Listar usuarios
> - [GET /users/:id](#GET/users/:id) - Buscar usuario
> - [PUT /users/:id](#PUT/users/:id) - Atualizar usuario
> - [DELETE /users/:id](#DELETE/users/:id) - Deletar usuario

# 🎯 Exemplo de Request

## Registrar Usuario

Recebe um nome, um email e uma senha pelo body e cria, a partir deles, um usuario novo, retornando os dados do usuario criado

- **HTTP Request**
  `POST https://api-scribes-quill.onrender.com/auth/register`

- **Body**

```javascript
{
    "name": "User",
    "email": "user@email.com",
    "password": "user123"
}
```

- **Success Response:**

  - **Code:** 201 Created <br />
    **Content:** `{ message: "Usuário criado com sucesso", user: Dados user }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ message: "Dados inválidos", errors }`

  - **Code:** 500 Inter Error <br />
    **Content:** `{ message: "Erro ao criar usuário", error: error.message }`

## Login

Recebeum email e senha e realiza uma busca no banco verificando se o email e a senha são validos, retornando os dados do usuario e o token de acesso

- **HTTP Request**
  `POST https://api-scribes-quill.onrender.com/auth/login`

- **Body**

```javascript
{
    "email": "user@email.com",
    "password": "user123"
}
```

- **Success Response:**

  - **Code:** 200 Ok <br />
    **Content:** `{ message: "Login realizado com sucesso", user: Dados user, token: token }`

- **Error Response:**

  - **Code:** 500 Inter Error <br />
    **Content:** `{ message: "Erro no login", error: error.message }`

# Criar Personagem

Recebeum os dados do personagem e cria o mesmo no banco de dados associando ao user logado, **Precisa do token**

- **HTTP Request**
  `POST https://api-scribes-quill.onrender.com/characters`

- **Body**

```javascript
{
    "name": "Personagem",
    "level": 4,
    "class": "Clerigo",
    "race": "Elfo",
    "hp": {
        "current": 30,
        "max": 30,
        "temporary": 0
    }
}
```

- **Success Response:**

  - **Code:** 201 Created <br />
    **Content:** `{ savedCharacter: Personagem criado }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ message: "Erro ao criar personagem", error:  } }`

# 🤝 Contribuição

Fork o projeto
Crie uma branch: git checkout -b feature/nova-feature
Commit: git commit -m 'Add nova feature'
Push: git push origin feature/nova-feature
Abra um Pull Request

# 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

# 🎲 Sobre D&D 5e

Este projeto segue as regras da 5ª edição de Dungeons & Dragons e é compatível com a System Reference Document (SRD).

## Desenvolvido com ❤️ para a comunidade RPGista
