import React from "react";
import Box from "@mui/material/Box";

type SurfaceProps = {
  children?: React.ReactNode | React.ReactNode[];
};

type SurfaceHeaderProps = {
  children?: React.ReactNode | React.ReactNode[];
};
function Surface(props: SurfaceProps) {
  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", p: 1 }}>
      {props.children}
    </Box>
  );
}

function SurfaceHeader(props: SurfaceHeaderProps) {
  return <Box sx={{ mb: 2 }}>{props.children}</Box>;
}

export { Surface, SurfaceHeader };
