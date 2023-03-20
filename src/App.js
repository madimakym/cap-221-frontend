import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
// import { RegisterPage } from "./features/user";
import { NotFoundPage } from "./features/NotFound";
import { ListPage } from "./features/user/list";
import LoginPage from "./features/auth/login-page";
import { Layout } from "antd";
import HomePage from "./features/dashboard";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import MetierPage from "./features/metier";
import MetierCreatePage from "./features/metier/metier-create";
import MetierEditPage from "./features/metier/metier-edit";
import {GetpaidPage} from "./features/user/getpaid";
import {SuccesspaidPage} from "./features/user/success";
import ArticleCreatePage from "./features/article/article-create";
import ArticlePage from "./features/article";
import ArticleVueClientPage from "./features/article/article-vue-client";
import ArticleLectureClientPage from "./features/article/article-lecture";
import Register1Page from "./features/auth/register/register-1-page";
import Register2Page from "./features/auth/register/register-2-page";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Register1Page />} />
          <Route path="/register/2" element={<Register2Page />} />
          <Route path="/souscription" element={<GetpaidPage />} />
          <Route path="/souscription-effectuee" element={<SuccesspaidPage />} />
          <Route path="/users" element={<ListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<PrivateWrapper />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/metiers" element={<MetierPage />} />
            <Route path="/articles" element={<ArticlePage />} />
            <Route path="/articles-vue-client/:name" element={<ArticleVueClientPage />} />
            <Route path="/metiers/:id" element={<MetierEditPage />} />
            <Route path="/metiers/create" element={<MetierCreatePage />} />
            <Route path="/articles/create" element={<ArticleCreatePage />} />
            <Route path="/articles/create/:id" element={<ArticleCreatePage />} />
            <Route path="/articles/lire-article/:id" element={<ArticleLectureClientPage />} />
            {/* <Route path="/user/:role" element={<UserListPage />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:id/:slug" element={<ProductEdit />} /> */}
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

const PrivateWrapper = ({ auth }) => {
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <TopBar />
        <Content
          className="site-layout-background"
          style={{ margin: "24px 16px", padding: "16px" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
