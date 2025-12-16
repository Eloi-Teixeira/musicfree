import { createBrowserRouter, Outlet, useLoaderData } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AsideMenu from "./components/AsideMenu";

function getLocalVideos() {
  try {
    const videos = localStorage.getItem("downloadedVideos");
    return videos ? JSON.parse(videos) : [];
  } catch {
    return [];
  }
}

function Layout() {
  const data = useLoaderData();

  return (
    <div id="App">
      <AsideMenu />
      <Outlet context={{ videos: data }} />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      console.log("Layout Loader Executado!", getLocalVideos());
      return getLocalVideos();
    },
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
