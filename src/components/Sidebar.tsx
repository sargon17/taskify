// mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Sidebar() {
  return (
    <Box
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          p: 2,
          m: 0,
          overflow: "hidden",
          bgcolor: "secondary.light",
        }}
      >
        <Typography
          variant="h1"
          align="left"
          sx={{
            fontWeight: "700",
            fontSize: {
              sm: "1.5rem",
              md: "2rem",
            },
          }}
        >
          Taskify
        </Typography>
      </Box>
    </Box>
  );
}
