import { computed } from "vue";

import {
  usePowerSyncWatchedQuery,
  usePowerSync,
} from "@/composables/powersync";
import { useActiveStatus } from "@/composables/status";
import { TodoRecord } from "@/db/models";
import { useSupabaseUser } from "@/db/supabase";

export const useTodos = () => {
  const db = usePowerSync();
  const user = useSupabaseUser();
  const status = useActiveStatus();

  const todos = usePowerSyncWatchedQuery<TodoRecord>(
    () =>
      `SELECT * FROM todo WHERE owner_id = ? ${status.value === "all" ? "" : "AND completed = ?"} ORDER BY created_at DESC`,
    [user.value?.id, () => (status.value === "active" ? 0 : 1)],
  );

  const createTodo = async (title: string) => {
    if (!user.value) {
      throw new Error("No user logged in");
    }

    await db.execute(
      "INSERT INTO todo (id, created_at, completed, title, owner_id) VALUES (uuid(), datetime('now'), 0, ?, ?)",
      [title, user.value.id],
    );
  };

  const deleteTodo = async (id: string) => {
    await db.execute("DELETE FROM todo WHERE id = ?", [id]);
  };

  const toggleTodo = async (id: string) => {
    await db.execute(
      "UPDATE todo SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END WHERE id = ?",
      [id],
    );
  };

  return {
    todos: computed(() => todos.value),
    createTodo,
    deleteTodo,
    toggleTodo,
  };
};
