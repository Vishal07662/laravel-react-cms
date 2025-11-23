// import Cart from "./pages/Cart";

import AuthAdmin from './components/auth/AuthAdmin';

import AdminDashBoard from "./pages/Dashboard";
import AdminLogin from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import PageForm from "./pages/PageForm";
import AdminPageList from "./pages/PageList";
import PostForm from "./pages/PostForm";
import AdminPostList from "./pages/PostList";

const routes = [
  // Admin routes
  { path: "/", element: <AdminLogin/> },
  { path: "dashboard", element: (
    <AuthAdmin>
      <AdminDashBoard/>
    </AuthAdmin>
  ) },
  { path: "posts", element: (
    <AuthAdmin>
      <AdminPostList/>
    </AuthAdmin>
  )},
  { path: "posts/create", element: (
    <AuthAdmin>
      <PostForm/>
    </AuthAdmin>
  )},
  { path: "posts/edit/:id", element: (
    <AuthAdmin>
      <PostForm />
    </AuthAdmin>
  )},
  { path: "pages", element: (
    <AuthAdmin>
      <AdminPageList/>
    </AuthAdmin>
  )},
  { path: "pages/create", element: (
    <AuthAdmin>
      <PageForm/>
    </AuthAdmin>
  )},
  { path: "pages/edit/:id", element: (
    <AuthAdmin>
      <PageForm />
    </AuthAdmin>
  )},
  {
    path: "*",
    element: (
      <PageNotFound />
    )
  }

];

export default routes;
