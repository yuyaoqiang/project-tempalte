import Home from "@/pages/home/home";
import HomePage from "@/pages/home/HomePage";
import DetailPage from "@/pages/home/DetailPage";
import AboutPage from "@/pages/home/AboutPage";
import ListPage from "@/pages/home/ListPage";
import Login from "@/pages/login/login";
import NotFound from "@/pages/notFound/notFound";

export const routerConfig = [
  // { path: "/auth", component: pages.AuthorizedRoute, auth: true },
  { path: "/", component: HomePage, auth: false },
  { path: "/login", component: Login },
  { path: "/notFound", component: NotFound },
  { path: "/about", component: AboutPage },
  { path: "/list", component: ListPage },
  { path: "/detail", component: DetailPage },
];
