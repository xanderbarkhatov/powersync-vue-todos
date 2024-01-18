<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { TrashIcon } from "@radix-icons/vue";
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";

import VoidSVG from "@/components/VoidSVG.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useTodos } from "@/composables/todos";

const { todos, deleteTodo, toggleTodo } = useTodos();

// a hack to not animate on first fetch
const ready = ref(false);

watchOnce(todos, () => {
  ready.value = true;
});
</script>

<template>
  <div v-if="ready" v-auto-animate="{ duration: 100 }">
    <div v-if="!todos.length" class="py-6">
      <div class="flex items-center justify-center">
        <VoidSVG width="50%" />
      </div>
    </div>

    <ul v-else v-auto-animate="{ duration: 100 }" class="space-y-1 px-1">
      <li v-for="todo in todos" :key="todo.id" class="w-full">
        <div class="flex w-full items-center justify-between gap-3">
          <div class="flex flex-1 items-center gap-3">
            <Checkbox
              :id="todo.id"
              :checked="!!todo.completed"
              @update:checked="toggleTodo(todo.id)"
            />

            <label :for="todo.id" :class="{ 'line-through': todo.completed }">
              {{ todo.title }}
            </label>
          </div>

          <Button
            size="icon"
            variant="link"
            class="-mr-3 shrink-0 text-destructive"
            @click="deleteTodo(todo.id)"
          >
            <TrashIcon class="h-4 w-4" />
          </Button>
        </div>
      </li>
    </ul>
  </div>
</template>
