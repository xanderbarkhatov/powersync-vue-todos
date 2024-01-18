<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { useTodos } from "@/composables/todos";

const { createTodo } = useTodos();

const handleAdd = async (e: Event) => {
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const title = String(formData.get("todo")).trim();

  if (!title) return;

  createTodo(title);
  form.reset();
};
</script>

<template>
  <form @submit.prevent="handleAdd">
    <Input
      placeholder="What needs to be done?"
      name="todo"
      autocomplete="off"
    />
  </form>
</template>
