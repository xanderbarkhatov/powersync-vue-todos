<script setup lang="ts">
import { badgeVariants } from "@/components/ui/badge";
import { useActiveStatus, statuses } from "@/composables/status";

const active = useActiveStatus();
</script>

<template>
  <div class="flex items-center gap-2">
    <RouterLink
      v-for="status in statuses"
      :key="status"
      :to="{ query: { status: status === 'all' ? undefined : status } }"
      :class="
        badgeVariants({
          variant: status === active ? 'default' : 'outline',
        })
      "
    >
      {{ status }}
    </RouterLink>
  </div>
</template>
