<script setup lang="ts">
import { AvatarIcon } from "@radix-icons/vue";
import { useRouter } from "vue-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSupabase, useSupabaseUser } from "@/db/supabase";

const user = useSupabaseUser();
const supabase = useSupabase();
const router = useRouter();

const handleLogout = async () => {
  await supabase.auth.signOut();
  await router.push("/login");
};
</script>

<template>
  <header class="sticky top-0 z-30 flex h-20 items-center bg-background">
    <div class="ml-auto">
      <DropdownMenu v-if="user">
        <DropdownMenuTrigger>
          <Avatar class="h-8 w-8">
            <AvatarImage
              :src="user.user_metadata.avatar_url"
              :alt="`Avatar for ${user.user_metadata.user_name}`"
            />

            <AvatarFallback>
              <AvatarIcon />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            {{ user.user_metadata.user_name }}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem class="text-destructive" @click="handleLogout">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
