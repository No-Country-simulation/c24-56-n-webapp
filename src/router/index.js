import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tasks from "@/views/Tasks.vue";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/tasks", component: Tasks },
  { path: "/dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;