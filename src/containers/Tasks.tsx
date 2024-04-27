//react
import { useEffect, useState } from "react";

//db
import supabase from "../config/supabaseClient";

//mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// UI components
import Loading from "../components/ui/Loading";
import { Surface, SurfaceHeader } from "../components/ui/Surface";

// Specific UI components
import TasksList from "../components/tasks/TasksList";
import TaskItem from "../components/tasks/TaskItem";
import NewTaskDialog from "../components/tasks/NewTaskDialog";

// types
import { Task } from "../types/Task";

// utils & helpers
import { sortTasksOptimistically } from "../utils/sortTasks";
import dayjs from "dayjs";

// local types
type TaskInput = Pick<Task, "title" | "description" | "due_date">;

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  // task input state
  const [task, setTask] = useState<TaskInput>({
    title: "",
    description: "",
    due_date: new Date().toISOString(),
  });

  const [dialogueOpen, setDialogueOpen] = useState(false);

  // dialogue
  const handleDialoqueState = () => {
    setDialogueOpen(!dialogueOpen);
  };

  const handleNewTaskSubmit = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ ...task }])
      .select();

    if (error) throw new Error(error.message);

    // adding the new task to the tasks array optimistically to avoid a network request
    setTasks(sortTasksOptimistically([...(tasks || []), data[0]]));

    setTask({
      title: "",
      description: "",
      due_date: new Date().toISOString(),
    });

    handleDialoqueState();
  };

  const handleTaskCompletion = async ({ id, is_done }: Pick<Task, "id" | "is_done">) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_done: is_done })
      .eq("id", id)
      .select("*");

    if (error) throw new Error(error.message);

    console.log(data);

    const updatedTasks = tasks?.map((task) => (task.id === id ? data[0] : task));

    setTasks(updatedTasks || []);
  };

  const handleTaskDelete = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw new Error(error.message);

    const updatedTasks = tasks?.filter((task) => task.id !== id);

    setTasks(updatedTasks || []);
  };

  const getAllTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*").order("is_done").order("due_date");

    if (error) throw new Error(error.message);

    setTasks(data);
  };

  const handleDeleteAllDoneTasks = async () => {
    const { error } = await supabase.from("tasks").delete().eq("is_done", true);

    if (error) throw new Error(error.message);

    // removing all done tasks from the tasks array optimistically to avoid a network request
    const updatedTasks = tasks?.filter((task) => !task.is_done);

    setTasks(updatedTasks || []);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Surface>
        <SurfaceHeader>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "flex-start",
              color: "text.primary",
            }}
          >
            <Box>
              <Typography variant="h4">Tasks</Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",

                  fontSize: {
                    sm: "1rem",
                    md: "1.25rem",
                  },
                }}
              >
                Here are your tasks
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              {tasks && tasks.length > 0 && tasks.some((task) => task.is_done) && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteAllDoneTasks()}
                >
                  {" "}
                  Delete All Done
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDialoqueState()}
              >
                Add Task
              </Button>
            </Box>
          </Box>
        </SurfaceHeader>
        <TasksList>
          {tasks ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskCompletion={() => {
                  handleTaskCompletion({ id: task.id, is_done: !task.is_done });
                }}
                onTaskDelete={() => {
                  handleTaskDelete(task.id);
                }}
              />
            ))
          ) : (
            <Loading />
          )}
        </TasksList>
      </Surface>
      <NewTaskDialog
        open={dialogueOpen}
        onClose={() => handleDialoqueState()}
        onSubmit={() => {
          handleNewTaskSubmit();
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          placeholder="Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          value={task.title || ""}
        />
        <TextField
          label="Description"
          variant="outlined"
          placeholder="Description"
          multiline
          rows={4}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          value={task.description || ""}
        />
        <DatePicker
          value={dayjs(task.due_date ? task.due_date : new Date())}
          onChange={(date) => setTask({ ...task, due_date: date?.toISOString() || "" })}
          label="Due Date"
          format="dddd, MMMM D, YYYY"
        />
      </NewTaskDialog>
    </>
  );
}
