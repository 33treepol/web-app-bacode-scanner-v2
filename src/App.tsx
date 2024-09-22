import React from "react";
import { Container, Typography } from "@mui/material";
import CustomQrScanner from "./QrScanner";

function App() {
  const [data, setData] = React.useState<string>("Not Found");

  const handleScan = (result: any) => {
    if (result) {
      setData(result.text);
    } else {
      setData("Not Found");
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <Container style={{ textAlign: "center", paddingTop: "20px" }}>
      <CustomQrScanner onScan={handleScan} onError={handleError} />
      <Typography variant="h6">{data}</Typography>
    </Container>
  );
}

export default App;
