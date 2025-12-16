import { createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AsideMenu from "./components/AsideMenu";

function getLocalVideos() {
  const videos = localStorage.getItem("downloadedVideos");
  return videos ? JSON.parse(videos) : [];
}

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
    loader: getLocalVideos,
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
