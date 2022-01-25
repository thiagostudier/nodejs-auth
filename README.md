# Autenticação com Nodejs
Crud de usuários com autenticação e testes - Node.js

## Comandos 

### Instalar projeto

#### Clonar projeto
- `git clone https://github.com/thiagostudier/nodejs-auth.git`

#### Instalar node-modules
- `yarn install`

Preencha os parâmetros do arquivo ".env" usando como base o ".env-example"

#### Crie o banco de dados da aplicação
- `yarn typeorm migration:run`

#### Rodar testes
- `yarn test`

## Comandos usados na criação do projeto

#### Criar package.json
- `yarn init - y`

#### Instalar typescript
- `yarn add typescript -D`

#### Instalar express

- `yarn add express`
- `yarn add @types/express`

#### Instalar banco de dados
Banco de dados postgres
- `yarn add pg`
Banco de dados para os testes da aplicação
- `yarn add sqlite3 -D`

#### Instalar nodemon
- `yarn add nodemon -D`

#### Instalar jest
- `yarn add jest -D`

#### Crie o banco de dados da aplicação
- `yarn typeorm migration:run`

https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

#### Criar migration
`yarn typeorm migration:create -n CreateUsers`
