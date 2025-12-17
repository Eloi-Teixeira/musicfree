import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AsideMenu from "./components/AsideMenu";

function Layout() {
  return (
    <div id="App">
      <AsideMenu />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);
