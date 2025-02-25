--------------------------------------------------------
                       Teste 
--------------------------------------------------------

CRUD básico para de user e posts.

--------------------------------------------------------
                   Estrutura do Projeto
--------------------------------------------------------

Este projeto foi desenvolvido utilizando **Next.js** e está dividido em três principais seções:

1. **Front-end**:
   - Localização: `app/(locale)`
   - Contém todas as páginas e componentes responsáveis pela interface com o usuário.
   - Utiliza a estrutura de **Rotas** do Next.js baseada em arquivos, com páginas específicas para cada localidade (locale).

2. **Back-end**:
   - Localização: `app/api`
   - Contém os endpoints da API do projeto.
   - Utiliza a funcionalidade de API do Next.js para criação de APIs simples e escaláveis com base em arquivos de rota.

3. **Requisições (Actions)**:
   - Localização: `src/action`
   - Contém funções responsáveis pela comunicação com a API e a lógica de processamento de dados.

--------------------------------------------------------
                Configuração do Docker
--------------------------------------------------------

O projeto foi configurado para rodar facilmente dentro de containers Docker, garantindo um ambiente consistente em todas as máquinas e facilitando o deploy.

--------------------------------------------------------
             Como rodar o projeto com Docker
--------------------------------------------------------

1. **Build da imagem Docker**:
   Na raiz do projeto, execute o comando para construir as imagens do Docker:
   


   docker-compose build

2. **Subir os containers**:
   Em seguida, rode os containers utilizando:

```
   docker-compose up
```

   
Isso iniciará o back-end (API) e o banco de dados PostgreSQL em containers Docker.

3. **Verificar no navegador**:
O projeto estará disponível no navegador em `http://localhost:3000` para o front-end e a API estará acessível na mesma URL para fazer requisições.

--------------------------------------------------------
         Como rodar o projeto localmente
--------------------------------------------------------

Caso prefira rodar o projeto sem Docker, siga os passos abaixo:

1. **Instalar dependências**:
Primeiro, instale as dependências do projeto com o comando:

```
   npm install
```

2. **Rodar o projeto**:
   Para iniciar a aplicação, use os comandos a seguir:

   Para o ambiente de desenvolvimento:

```
   npm run dev
```

   Para o ambiente de produção:

   Primeiro, gere a build de produção:

```
   npm run build
```

   Depois, inicie o servidor de produção:

```
   npm start
```

--------------------------------------------------------
                     Dependências
--------------------------------------------------------

- Next.js
- Prisma
- bcryptjs
- Docker