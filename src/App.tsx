import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";

import DetailPage from "./pages/detail";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DetailPage />} path="/detail/:id" />
    </Routes>
  );
}

export default App;
