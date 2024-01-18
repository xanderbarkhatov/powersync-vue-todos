<script setup lang="ts">
import { GithubLogoIcon } from "@radix-icons/vue";

import { Button } from "@/components/ui/button";
import { useSupabase } from "@/db/supabase";

const supabase = useSupabase();

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="flex h-svh items-center justify-center">
    <div>
      <h1 class="text-center text-xl font-semibold">Continue with</h1>

      <div class="mt-2 w-64">
        <Button variant="outline" class="w-full" @click="handleLogin">
          <GithubLogoIcon class="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
    </div>
  </div>
</template>
