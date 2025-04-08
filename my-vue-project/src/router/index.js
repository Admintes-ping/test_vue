import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login", // 自动重定向到 /login
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
  {
    path: "/dashboard",
    name: "Layout",
    component: () => import("@/Layout/LayoutPage.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/DashboardPage.vue"),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
