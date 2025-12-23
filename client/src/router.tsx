import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AsideMenu from "./components/AsideMenu";
import { MusicProvider } from "./contexts/MusicContext";
import ErrorComponent from "./components/ErrorComponent";

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
        errorElement: <ErrorComponent />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
]);
