<script setup lang="ts">
import { AvatarRoot } from "radix-vue";

import { cn } from "@/lib/utils";

import { avatarVariant } from ".";

interface Props {
  size?: NonNullable<Parameters<typeof avatarVariant>[0]>["size"];
  shape?: NonNullable<Parameters<typeof avatarVariant>[0]>["shape"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
  shape: "circle",
});
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
