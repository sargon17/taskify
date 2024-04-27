import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoreHoriz } from "@mui/icons-material";
import Button from "@mui/material/Button";

import Chip from "@mui/material/Chip";

import Popover from "@mui/material/Popover";

import Checkbox from "@mui/material/Checkbox";
import { Tooltip } from "@mui/material";

import { useState } from "react";

import dayjs from "dayjs";

import { Task } from "../../types/Task";

type TaskItemProps = {
  task: Task;
  onTaskCompletion: () => void;
  onTaskDelete: () => void;
};

export default function TaskItem(props: TaskItemProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <Box>
      <Card
        elevation={0}
        sx={{
          bgcolor: "secondary.light",
        }}
      >
        <CardContent
          sx={{
            padding: 1,
            position: "relative",
            "&:last-child": {
              paddingBottom: 1,
            },
            opacity: props.task.is_done ? 0.5 : 1,
            transition: "opacity 0.3s ease-in-out, background-color 0.1s ease-in-out",

            "&:hover": {
              bgcolor: "secondary.main",

              ".more-task-button": {
                opacity: 1,
              },
              ".task-completion": {
                transform: "translateX(0)",
                opacity: 1,
              },
            },
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box
                className="task-completion"
                sx={{
                  transform: "translateX(-100%)",
                  opacity: 0,
                  transition: "transform 0.1s ease-in-out, opacity 0.1s ease-in-out",
                }}
              >
                <Tooltip
                  title={props.task.is_done ? "Mark as incomplete" : "Mark as complete"}
                  placement={"top"}
                >
                  <Checkbox
                    checked={props.task.is_done}
                    onClick={() => props.onTaskCompletion()}
                  />
                </Tooltip>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    fontSize: {
                      sm: "1rem",
                      md: "1.2rem",
                    },

                    textDecoration: props.task.is_done ? "line-through" : "none",
                  }}
                >
                  {props.task.title}
                </Typography>
                <Typography variant="body1">{props.task.description}</Typography>
                <Box>
                  {props.task.due_date && (
                    <Chip
                      label={"Due: " + dayjs(props.task.due_date).format("DD MMM YYYY")}
                      variant="outlined"
                      sx={{
                        bgcolor: "transparent",
                        borderColor: "primary.main",
                        color: "primary.main",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Tooltip
            title={"More"}
            placement={"left"}
          >
            <IconButton
              onClick={() => {
                // props.onTaskDelete();
                setIsMoreOpen(!isMoreOpen);
              }}
              className="more-task-button"
              id={"more-task-button" + props.task.id}
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                opacity: 0,

                "&:hover": {
                  ".more-task-button-icon": {
                    opacity: 1,
                    color: "error.main",
                  },
                },
              }}
            >
              {/* <DeleteIcon
                className="more-task-button-icon"
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
              /> */}
              <MoreHoriz
                className="more-task-button-icon"
                sx={{
                  opacity: 0.5,
                  transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
              />
            </IconButton>
          </Tooltip>
          <Popover
            open={isMoreOpen}
            anchorEl={document.querySelector("#more-task-button" + props.task.id)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClose={() => {
              setIsMoreOpen(false);
            }}
            sx={{
              "& .MuiPaper-root": {
                bgcolor: "background.default",
              },
            }}
          >
            <Box
              sx={{
                padding: 1,
              }}
            >
              <Button
                onClick={() => {
                  props.onTaskDelete();
                  setIsMoreOpen(false);
                }}
                variant="text"
                startIcon={<DeleteIcon />}
                color="error"
              >
                Delete
              </Button>
            </Box>
          </Popover>
        </CardContent>
      </Card>
    </Box>
  );
}
