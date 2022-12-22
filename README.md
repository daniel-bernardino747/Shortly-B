![shortly-banner](https://user-images.githubusercontent.com/106272711/209136857-90518f9b-ad4e-4d3c-b20b-c9c4e1d50667.jpg)

<div>
  <h1 align="left">Shortly-API</h1>
  <img alt="os-linux" src="https://img.shields.io/static/v1?label=os&message=Linux&color=459a2b&style=flat-square&logo=ghost" />
  <img alt="npm-8.15.0" src="https://img.shields.io/static/v1?label=npm&message=8.15.0&color=459a2b&style=flat-square" />
  <a href="https://github.com/daniel-bernardino747/Shortly-B/blob/main/LICENCE">
    <img alt="licence-MPL" src="https://img.shields.io/static/v1?label=licence&message=MPL&color=459a2b&style=flat-square" />
  </a>  
</div>
______

Um projeto Back-End implementando, modelando e criando um banco de dados relacional (**PostgreSQL**) de um sistema encurtador de URL chamado _**Shortly: Links que cabem no seu bolso?**_

<div>
  <a href="https://code.visualstudio.com/">
    <img alt="vscode-icon" src="https://img.shields.io/static/v1?label=using&message=vscode&color=0176c6&logo=visual%20studio" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="typescript-icon" src="https://img.shields.io/static/v1?label=using&message=typescript&color=2f74c0&logo=typescript" />
  </a>
  <a href="https://www.prisma.io/">
    <img alt="typescript-icon" src="https://img.shields.io/static/v1?label=using&message=prisma&color=2d3748&logo=prisma" />
  </a>
</div>
______

<h4 align="center"> 
	:heavy_check_mark: Shortly-API :raised_hands: Finalizado :heavy_check_mark:
</h4>

<p align="center">
 <a href="#Shortly-API">Início</a> •
 <a href="#Requisitos">Começando</a> • 
 <a href="#Tecnologias">Tecnologias</a> • 
 <a href="#contribuicao">Contribuição</a> • 
 <a href="#licenc-a">Licença</a> • 
 <a href="#autor">Autor</a>
</p>
______

## Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

Clone este repositório
```bash
git clone <https://github.com/daniel-bernardino747/Shortly-B>
```

Acesse a pasta do projeto no terminal/cmd
```bash
cd Shortly-B
```

Instale as dependências
```bash
npm install
```
_____

### Atenção :heavy_exclamation_mark:
Antes de iniciar sua aplicação, crie o arquivo `.env`:
```bash
touch .env
```

e configure as variáveis de ambiente descritas em `.env.example`.
```properties
DATABASE_URL = # URL que o Prisma utiliza para fazer a conexão com o banco de dados, em caso de dúvidas: <https://www.prisma.io/docs/concepts/database-connectors/postgresql>
PORT = # Coloque a porta que deseja para rodar seu servidor. Recomenda-se: 4000
HASH = # Número utilizado pela lib bcryptjs para definir o tamanho da criptografia. Recomenda-se: 8
KEY_JWT = # Key secreta utilizada para a criptografia do token com JWT. Recomenda-se usar UUID aleatório em <https://www.uuidgenerator.net/>
TIME_EXPIRES_IN = # Tempo de expiração do token em vercel/ms. Recomenda-se: 30m
```

Para fazer isso rapidamente, acesse a pasta com seu editor de código.
```bash
code .
```
_____

Execute a aplicação em modo de desenvolvimento
```bash
npm run start:dev
```

Em caso de sucesso, está mensagem aparecerá:
```
🌀 started server in door: 4000
```

### Tecnologias

🛠 As seguintes ferramentas foram usadas na construção do projeto:

- [Prisma](https://www.prisma.io/)
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

Bibliotecas utilizadas para padronização e/ou facilitação:

- [Husky](https://typicode.github.io/husky/#/)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Tsconfig Paths](https://github.com/dividab/tsconfig-paths#readme)

---

### Autor

<a href="https://github.com/daniel-bernardino747">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/106272711?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Daniel Bernardino</b></sub>
</a>


Feito com ❤️ por Dan 👋🏽 Entre em contato!

[![Instagram Badge](https://img.shields.io/badge/-@daniel_bernardino-c55180?style=flat-square&labelColor=c55180&logo=instagram&logoColor=white&link=https://www.instagram.com/daniel__bernardino/)](https://www.instagram.com/daniel__bernardino/) 
[![Linkedin Badge](https://img.shields.io/badge/-danielbernardinodesouza-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/danielbernardinodesouza/)](https://www.linkedin.com/in/danielbernardinodesouza/) 
[![Gmail Badge](https://img.shields.io/badge/-dn.danielbernardino@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:dn.danielbernardino@gmail.com)](mailto:dn.danielbernardino@gmail.com)
