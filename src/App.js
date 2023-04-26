import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
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
import { GetpaidPage } from "./features/user/getpaid";
import { SuccesspaidPage } from "./features/user/success";
import ArticlePage from "./features/article";
import PostPage from "./features/article/post-page";
import Register1Page from "./features/auth/register/register-1-page";
import Register2Page from "./features/auth/register/register-2-page";
import SendResetPassword from "./features/auth/send-reset-password";
import ResetPassword from "./features/auth/reset-password";
import ContactPage from "./features/contact";
import PostsPage from "./features/article/posts-page";

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
          <Route path="/send-reset-password" element={<SendResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route element={<PrivateWrapper />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/metiers" element={<MetierPage />} />
            <Route path="/articles" element={<ArticlePage />} />
            <Route path="/posts/:id" element={<PostsPage />} />
            <Route path="/metiers/:id" element={<MetierEditPage />} />
            <Route path="/metiers/create" element={<MetierCreatePage />} />
            <Route path="/post/:id" element={<PostPage />} />
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
