import { computed } from "vue";
import { useRoute } from "vue-router";

export const statuses = ["all", "active", "completed"] as const;

export const useActiveStatus = () => {
  const route = useRoute();

  return computed(
    () => statuses.find((op) => op === route.query.status) ?? "all",
  );
};
