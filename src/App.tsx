import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

import Tasks from "./containers/Tasks";

import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#077187",
      contrastText: "#ECFBFE",
    },
    secondary: {
      light: "#FFE2D6",
      main: "#FFD4C2",
      dark: "#FFC6AD",
      contrastText: "#521800",
    },

    background: {
      default: "#FFF1EB",
      paper: "#FFE2D6",
    },
    text: {
      primary: "#521800",
      secondary: "#52180099",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard>
          <Grid
            item
            xs={0}
            sm={3}
            md={2}
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={10}
          >
            <Tasks />
          </Grid>
        </Dashboard>
      </ThemeProvider>
    </>
  );
}

export default App;
