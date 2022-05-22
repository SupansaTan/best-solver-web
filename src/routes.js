import RootPage from "./pages/root/root";
import IntegralPage from "./pages/integral/integral";

const routes = [
  { path: '/root', exact: true, name: 'Root', component: RootPage },
  { path: '/integral', exact: true, name: 'Integral', component: IntegralPage },
]

export default routes;