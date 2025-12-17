import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AsideMenu from "./components/AsideMenu";
import { MusicProvider } from "./contexts/MusicContext";

function Layout() {
  return (
    <div id="App">
      <MusicProvider>
        <AsideMenu />
        <Outlet />
      </MusicProvider>
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
