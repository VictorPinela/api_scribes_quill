# 🏰 Scribe's Quill API

Back-end para o gerenciador de fichas de personagens de D&D 5e. Uma API RESTful completa com autenticação JWT, CRUD de personagens e validação de dados.

## 🚀 Deploy Production

**API URL**: `https://api-scribes-quill.herokuapp.com/`  
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
├── controllers/ # Lógica de negócio
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

⚙️ Variáveis de Ambiente locais
PORT=3001
MONGODB_URI=mongodb://localhost:27017/scribesquill
JWT_SECRET=seu_super_secret_jwt
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173

📡 Endpoints da API

Autenticação
POST /auth/register - Criar usuário
POST /auth/login - Login
POST /auth/logout - Logout
GET /auth/me - User atual

Personagens
GET /characters - Listar personagens do usuário
POST /characters - Criar personagem
GET /characters/:id - Buscar personagem
PUT /characters/:id - Atualizar personagem
DELETE /characters/:id - Deletar personagem

🎯 Exemplo de Request
# Registro
curl -X POST https://api-scribes-quill.herokuapp.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Frodo","email":"frodo@shire.com","password":"thering123"}'

# Login
curl -X POST https://api-scribes-quill.herokuapp.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"frodo@shire.com","password":"thering123"}'

# Criar personagem (com token)
curl -X POST https://api-scribes-quill.herokuapp.com/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN_JWT>" \
  -d '{"name":"Aragorn","class":"Ranger","race":"Human","level":5}'

🤝 Contribuição
Fork o projeto
Crie uma branch: git checkout -b feature/nova-feature
Commit: git commit -m 'Add nova feature'
Push: git push origin feature/nova-feature
Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

🎲 Sobre D&D 5e
Este projeto segue as regras da 5ª edição de Dungeons & Dragons e é compatível com a System Reference Document (SRD).

Desenvolvido com ❤️ para a comunidade RPGista