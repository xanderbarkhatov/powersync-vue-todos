import { SupabaseClient } from "@supabase/supabase-js";
import { createRouter as create, createWebHistory } from "vue-router";

import { getSupabaseUser } from "@/db/supabase";

export const createRouter = (supabase: SupabaseClient) => {
  const router = create({
    history: createWebHistory(),
    routes: [
      {
        path: "/",
        component: () => import("@/pages/HomePage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/login",
        component: () => import("@/pages/LoginPage.vue"),
      },
    ],
  });

  router.beforeEach(async (to) => {
    const user = await getSupabaseUser(supabase);

    if (to.meta.auth && !user) {
      return { path: "/login" };
    }

    if (user && to.path === "/login") {
      return { path: "/" };
    }
  });

  return router;
};

declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean;
  }
}
