export type Task = {
  id: string;
  title: string;
  description: string;
  is_done: boolean;
};

export type TaskInput = Pick<Task, "title" | "description">;
