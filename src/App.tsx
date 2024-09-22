import React from "react";
import { Container, Typography } from "@mui/material";
import CustomQrScanner from "./CustomQrScanner";

function App() {
  const [data, setData] = React.useState<string>("Not Found");

  const handleScan = (result: string) => {
    setData(result); // Update the scanned result in state
  };

  const handleError = (error: Error) => {
    console.error("QR Scan Error:", error); // Log or handle the error
  };

  return (
    <Container style={{ textAlign: "center", paddingTop: "20px" }}>
      <CustomQrScanner onScan={handleScan} onError={handleError} />
      <Typography variant="h6">Scanned Data: {data}</Typography>
    </Container>
  );
}

export default App;
