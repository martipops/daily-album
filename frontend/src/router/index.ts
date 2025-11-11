import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@Pages/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@Pages/LoginPage.vue"),
  },
  {
    path: "/home",
    redirect: "/tabs/tab1",
  },
  {
    path: "/callback",
    component: () => import("@Pages/CallbackPage.vue"),
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab2",
      },
      {
        path: "tab1",
        component: () => import("@Pages/Tab1Page.vue"),
      },
      {
        path: "tab2",
        component: () => import("@Pages/Tab2Page.vue"),
      },
      {
        path: "tab3",
        component: () => import("@Pages/Tab3Page.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
