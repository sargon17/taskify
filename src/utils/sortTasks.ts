import { Task } from "../types/Task";

const sortTasksOptimistically = (tasks: Task[]) => {
  // Sort tasks by is_done and due_date
  return tasks.sort((a, b) => {
    if (a.is_done === b.is_done) {
      return a.due_date > b.due_date ? 1 : -1;
    }
    return a.is_done ? 1 : -1;
  });
};

export { sortTasksOptimistically };
