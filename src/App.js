import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./features/register";
import { NotFoundPage } from "./features/NotFound";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}
export default App;
