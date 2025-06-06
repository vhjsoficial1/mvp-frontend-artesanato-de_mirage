import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("artesao/cadastro", "routes/artesao/cadastro.tsx"),
  route("produto/cadastro", "routes/produto/cadastro.tsx"),
] satisfies RouteConfig;

