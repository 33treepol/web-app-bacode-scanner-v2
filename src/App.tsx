// src/App.tsx

import React, { useState } from "react";
import "./App.css";
import QRCodeScanner from "./CustomQrScanner";
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
          width: "50%",
        }}
      >
        <QRCodeScanner onResult={handleScanResult} />
      </Box>
      {result && <div>Scanned Result: {result}</div>}
    </div>
  );
};

export default App;
