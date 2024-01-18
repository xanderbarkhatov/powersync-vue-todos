import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { computed, inject, InjectionKey, Plugin, ref } from "vue";

const user = ref<User | null>();

export const createSupabase = async () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY,
  );

  user.value = await getSupabaseUser(supabase);

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user ?? null;
  });

  return supabase;
};

export const getSupabaseUser = async (supabase: SupabaseClient) => {
  const { data } = await supabase.auth.getSession();

  return data.session?.user ?? null;
};

const key: InjectionKey<SupabaseClient> = Symbol("supabase");

export const SupabasePlugin: Plugin<SupabaseClient> = {
  install: (app, supabase) => {
    app.provide(key, supabase);
  },
};

export const useSupabase = () => {
  const supabase = inject(key);

  if (!supabase) {
    throw new Error("Supabase not found. Did you forget to use the plugin?");
  }

  return supabase;
};

export const useSupabaseUser = () => {
  return computed(() => user.value);
};
