# MVP Frontend Artesanato de Mirage

## Descrição do Projeto

Este projeto é o frontend de um MVP (Produto Mínimo Viável) para uma plataforma de artesanato, com foco em conectar artesãos e consumidores. Ele permite o cadastro e login de artesãos, bem como o cadastro e listagem de produtos artesanais.

## Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **React Router:** Biblioteca para roteamento de componentes na aplicação React.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **TailwindCSS:** Framework CSS utilitário para estilização rápida e responsiva.
- **Vite:** Ferramenta de build frontend que oferece uma experiência de desenvolvimento rápida.

## Funcionalidades

- **Autenticação de Artesão:**
  - Cadastro de novos artesãos.
  - Login de artesãos existentes.
- **Gestão de Produtos:**
  - Cadastro de novos produtos artesanais.
  - Listagem de todos os produtos disponíveis.

## Estrutura do Projeto

```
mvp-frontend-artesanato-de_mirage/
├── public/                   # Arquivos estáticos (favicon, etc.)
├── app/                      # Código fonte da aplicação
│   ├── components/           # Componentes reutilizáveis (Navbar, Footer, Layout, Perfil)
│   ├── routes/               # Rotas da aplicação (home, artesao, produto)
│   │   ├── artesao/          # Rotas de autenticação de artesão (cadastro, login)
│   │   └── produto/          # Rotas de gestão de produtos (cadastro, produtos)
│   ├── services/             # Serviços para comunicação com a API (autenticação, produtos)
│   │   ├── auth/             # Serviços de autenticação
│   │   └── produtos/         # Serviços de produtos
│   ├── app.css               # Estilos globais da aplicação
│   ├── root.tsx              # Componente raiz da aplicação
│   └── routes.ts             # Definição de rotas (pode ser usado pelo React Router)
├── Dockerfile                # Configuração para Docker
├── package.json              # Dependências e scripts do projeto
├── package-lock.json         # Bloqueio de dependências
├── react-router.config.ts    # Configuração do React Router
├── tsconfig.json             # Configuração do TypeScript
└── vite.config.ts            # Configuração do Vite
```

## Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o npm instalados em sua máquina.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd mvp-frontend-artesanato-de_mirage
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

### Execução em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`.

### Construção para Produção

Para criar uma build otimizada para produção:

```bash
npm run build
```

Os arquivos de build serão gerados no diretório `build/`.

### Execução em Modo de Produção

Para iniciar o servidor de produção (após a build):

```bash
npm start
```

### Implantação com Docker

Para construir e executar a aplicação usando Docker:

1.  **Construa a imagem Docker:**

    ```bash
    docker build -t mvp-frontend-artesanato-de-mirage .
    ```

2.  **Execute o contêiner:**

    ```bash
    docker run -p 3000:3000 mvp-frontend-artesanato-de-mirage
    ```

O aplicativo estará acessível em `http://localhost:3000`.


