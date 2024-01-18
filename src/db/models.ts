export type TodoRecord = {
  id: string;
  title: string;
  created_at: string;
  completed: 1 | 0;
  owner_id: string;
};
