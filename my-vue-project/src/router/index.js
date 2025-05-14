  import { createRouter, createWebHistory } from "vue-router";
  import Layout from "../Layout/LayoutPage.vue";

  const routes = [
    {
      path: "/",
      name: "Layout",
      redirect: "dashboard",//默认加载dashboard页面
      component: Layout,
      children: [
        {
          path: "person",
          name: "Person",
          component: () => import("@/views/PersonPage.vue"),
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/DashboardPage.vue"),
        },
        {
          path: "password",
          name: "Password",
          component: () => import("@/views/PasswordPage.vue"),
        },
        {
          path: "book",
          name: "book",
          component: () => import("@/views/BookPage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/RegiserPage.vue"),
    },
  ];

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  export default router;
