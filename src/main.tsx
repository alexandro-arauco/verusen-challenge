import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./context/DataContext.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <DataProvider>
            <Provider>
              <App />
            </Provider>
          </DataProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
