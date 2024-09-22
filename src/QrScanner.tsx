import React, { useState } from "react";
import QrReader from "react-qr-scanner";

function App() {
  const [data, setData] = useState("Not Found");

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
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
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
      <p>{data}</p>
    </div>
  );
}

export default App;
