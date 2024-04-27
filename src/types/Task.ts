export type Task = {
  id: string;
  title: string;
  description: string;
  is_done: boolean;
  due_date: string;
};

export type TaskInput = Pick<Task, "title" | "description" | "due_date">;
