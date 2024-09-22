// src/App.tsx

import React, { useState } from "react";
import "./App.css"; // Make sure this path is correct and styles are applied
import QRCodeScanner from "./CustomQrScanner"; // Ensure the import path is correct
import { Box } from "@mui/material";

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleScanResult = (result: string) => {
    setResult(result);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%", // Adjust to 100% to fit better in most cases
          maxWidth: "600px", // Optional: Add a max-width for better layout control
          margin: "0 auto", // Center the box horizontally
        }}
      >
        <QRCodeScanner onResult={handleScanResult} />
      </Box>
      {result && <div>Scanned Result: {result}</div>}
    </div>
  );
};

export default App;
