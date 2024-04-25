import Box from "@mui/material/Box";
type TaskListProps = {
  children?: React.ReactNode | React.ReactNode[];
};
export default function TasksList(props: TaskListProps) {
  return (
    <Box
      sx={{
        height: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        marginY: 1,
        borderRadius: 1,
      }}
    >
      {props.children}
    </Box>
  );
}
