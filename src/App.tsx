// src/App.tsx

import React from "react";
import CameraFocus from "./CameraFocus";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container
      disableGutters
      maxWidth={false} // Use maxWidth prop for Container to disable default max-width
      sx={{ p: 0 }} // Optionally add padding styles if needed
    >
      <CameraFocus />
    </Container>
  );
};

export default App;
