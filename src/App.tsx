import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { Container, Typography } from "@mui/material";

function App() {
  const [data, setData] = useState<string>("Not Found");

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
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{
          width: "500px",
          height: "500px",
          border: "2px solid black",
          margin: "auto",
        }}
      />
      <Typography variant="h6">{data}</Typography>
    </Container>
  );
}

export default App;
