import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";

import { Button } from "@mui/material";

type NewTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children?: React.ReactNode | React.ReactNode[];
};

export default function NewTaskDialog(props: NewTaskDialogProps) {
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "sm",
        },
      }}
    >
      <DialogTitle>New Task</DialogTitle>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          padding: 2,
        }}
      >
        {props.children}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          padding: 2,
        }}
      >
        <Button
          onClick={() => {
            props.onClose();
          }}
          variant="text"
          color="error"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.onSubmit();
          }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}
