import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./features/user";
import { NotFoundPage } from "./features/NotFound";
import { ListPage } from "./features/user/list";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/users" element={<ListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}
export default App;
