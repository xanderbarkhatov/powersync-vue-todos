<script setup lang="ts">
import NewTodo from "@/components/NewTodo.vue";
import TheHeader from "@/components/TheHeader.vue";
import TodoFilters from "@/components/TodoFilters.vue";
import TodoList from "@/components/TodoList.vue";
</script>

<template>
  <TheHeader />

  <main class="pb-6">
    <div class="sticky top-20 z-10 bg-background pt-16">
      <TodoFilters />

      <NewTodo class="relative z-10 mt-4" />

      <div
        class="absolute top-full h-4 w-full bg-gradient-to-b from-background"
      ></div>
    </div>

    <TodoList class="mt-4" />

    <div
      class="fixed inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background"
    ></div>
  </main>
</template>
