import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App.tsx";
import cookieOptions from "./config/cookieOptions.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={cookieOptions}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster position="top-center" richColors theme="light" />
    </CookiesProvider>
  </StrictMode>,
);
