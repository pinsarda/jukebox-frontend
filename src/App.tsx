import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


import LoginPage from "@/pages/login";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

const queryClient = new QueryClient()

const AuthWrapper = () => {
  const is_authenticated = (localStorage.getItem('is_authenticated') == 'true');
  const location = useLocation();

  return is_authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AuthWrapper />} >
          <Route element={<DocsPage />} path="/docs" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
          <Route element={<AboutPage />} path="/" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
