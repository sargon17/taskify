import TasksList from "../components/tasks/TasksList";
import TaskItem from "../components/tasks/TaskItem";
import NewTaskDialog from "../components/tasks/NewTaskDialog";

import Loading from "../components/ui/Loading";
import { Surface, SurfaceHeader } from "../components/ui/Surface";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";

import supabase from "../config/supabaseClient";

import { Task, TaskInput } from "../types/Task";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const [task, setTask] = useState<TaskInput>({
    title: "",
    description: "",
  });

  const [dialogueOpen, setDialogueOpen] = useState(false);
  const handleDialoqueState = () => {
    setDialogueOpen(!dialogueOpen);
  };

  const handleNewTaskSubmit = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title: task.title, description: task.description }])
      .select();

    if (error) throw new Error(error.message);

    setTasks([...(tasks || []), ...data]);
    setTask({
      title: "",
      description: "",
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
    const { data, error } = await supabase.from("tasks").select("*").order("is_done");

    if (error) throw new Error(error.message);

    setTasks(data);
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialoqueState()}
            >
              Add Task
            </Button>
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
      </NewTaskDialog>
    </>
  );
}
