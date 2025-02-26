import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
    </QueryClientProvider>
  );
}

export default App;
