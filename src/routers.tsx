import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import NotFound from "@/pages/notFound/notFound";
export const routerConfig = [
  // { path: "/auth", component: pages.AuthorizedRoute, auth: true },
  { path: "/", component: Home, auth: false },
  { path: "/login", component: Login },
  { path: "/notFound", component: NotFound }
];
