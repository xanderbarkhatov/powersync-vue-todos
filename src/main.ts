import { inject } from "@vercel/analytics";
import { createApp } from "vue";

import App from "@/App.vue";
import "@/assets/index.css";
import { createPowerSync, PowerSyncPlugin } from "@/db/powersync";
import { createSupabase, SupabasePlugin } from "@/db/supabase";
import { createRouter } from "@/router";

const supabase = await createSupabase();

const powerSync = await createPowerSync(supabase);

const router = createRouter(supabase);

createApp(App)
  .use(router)
  .use(SupabasePlugin, supabase)
  .use(PowerSyncPlugin, powerSync)
  .mount("#app");

inject();
