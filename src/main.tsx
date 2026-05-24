import { Toaster } from 'react-hot-toast';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <App />

    <Toaster
      position="top-center"
      containerStyle={{
        top: '50%',
      }}
      toastOptions={{
        style: {
          padding: '16px',
          borderRadius: '14px',
          background: '#111',
          color: '#fff',
          fontSize: '14px',
        },
      }}
    />

  </StrictMode>
);