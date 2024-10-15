export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    children: [],
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    children: [],
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    children: [],
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/user",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
    children: [],
    meta: { layout: "AppLayoutSidebar" },
  },
  {
    path: "/orders",
    name: "OrdersView",
    component: () => import("../views/OrdersView.vue"),
    children: [],
    meta: { layout: "AppLayoutSidebar" },
  },
];
