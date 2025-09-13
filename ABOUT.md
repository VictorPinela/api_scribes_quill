
## **2. ABOUT.md para o GitHub**

```markdown
# 🏰 Scribe's Quill - Backend API

## 📖 Sobre o Projeto

O **Scribe's Quill** é o back-end de um sistema completo para gerenciamento de fichas de personagens de Dungeons & Dragons 5ª edição. Esta API fornece todas as operações necessárias para criar, gerenciar e autenticar usuários e seus personagens.

## 🎯 Objetivo

Facilitar a vida de jogadores de D&D 5e oferecendo uma plataforma digital para gerenciar fichas de personagens de forma intuitiva, segura e seguindo as regras oficiais do jogo.

## ✨ Destaques Técnicos

- **TypeScript** para type safety e melhor desenvolvimento
- **Arquitetura RESTful** com endpoints bem definidos
- **Autenticação JWT** com sistema de logout eficiente
- **Validação de dados** robusta e descriptiva
- **MongoDB** com Mongoose para flexibilidade de dados
- **CORS configurado** para integração com front-end
- **Deploy no Heroku** com configuração de produção

## 🏗️ Arquitetura

API RESTful → MongoDB → Front-end React

## 🔐 Segurança Implementada

- Hash de senhas com bcryptjs
- Tokens JWT com expiração e blacklist
- Validação contra injection attacks
- Sanitização de dados de entrada
- CORS configurado para domínios específicos

## 📊 Status do Projeto

**✅ Funcionalidades Concluídas:**
- [x] Sistema de autenticação completo
- [x] CRUD de personagens
- [x] Validação de regras de D&D
- [x] Deploy em produção
- [x] Integração com front-end

**🚀 Em Desenvolvimento:**
- [ ] Sistema de magias completo
- [ ] Inventário e equipamento
- [ ] Calculadora de combate
- [ ] Exportação de fichas em PDF

## 🌐 Links Importantes

- **Front-end**: [https://html-scribes-quill.vercel.app](https://html-scribes-quill.vercel.app)
- **API Production**: `https://api-scribes-quill.herokuapp.com/`
- **Repositório Front-end**: [github.com/seu-usuario/html_scribes_quill](https://github.com/seu-usuario/html_scribes_quill)

## 🛠️ Stack Tecnológica

- **Runtime**: Node.js
- **Framework**: Express.js
- **Linguagem**: TypeScript
- **Database**: MongoDB + Mongoose
- **Autenticação**: JWT + bcryptjs
- **Deploy**: Heroku
- **Monitoramento**: Heroku Logs

## 📈 Próximas Etapas

1. Implementar sistema completo de magias
2. Adicionar calculadora de combate em tempo real
3. Criar sistema de exportação/importação de fichas
4. Adicionar suporte para multiclasse
5. Implementar real-time updates com WebSockets

## 🤝 Contribuições

Contribuições são bem-vindas! Este é um projeto de código aberto desenvolvido como TCC de Engenharia de Software.

---

*"Que seus dados sejam sempre altos! 🎲"*