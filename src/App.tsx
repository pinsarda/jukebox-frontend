import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import TablePage from "./pages/table";
import SignupPage from "./pages/signup";
import SearchPage from "./pages/search";
import AlbumPage from "./pages/album";

import LoginPage from "@/pages/login";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import ArtistPage from "./pages/artist";
import FavoritesPage from "./pages/favorites";
import PlaylistPage from "./pages/playlist";

const queryClient = new QueryClient();

const AuthWrapper = () => {
  const is_authenticated = localStorage.getItem("is_authenticated") == "true";
  const location = useLocation();

  return is_authenticated ? (
    <Outlet />
  ) : (
    <Navigate replace state={{ from: location }} to="/login" />
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route element={<DocsPage />} path="/docs" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<SearchPage />} path="/search" />
          <Route element={<AlbumPage />} path="/album/:id/" />
          <Route element={<ArtistPage />} path="/artist/:id/" />
          <Route element={<PlaylistPage />} path="/playlist/:id/" />
          <Route element={<FavoritesPage />} path="/" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
