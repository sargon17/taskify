// mui
import { Grid } from "@mui/material";

// local types
type DashboardProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export default function Dashboard(props: DashboardProps) {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
        margin: 0,
      }}
    >
      {props.children}
    </Grid>
  );
}
