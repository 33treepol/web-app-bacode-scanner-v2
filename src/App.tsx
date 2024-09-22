// src/App.tsx

import React, { useState } from "react";
import "./App.css";
import QRCodeScanner from "./CustomQrScanner";

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleScanResult = (result: string) => {
    setResult(result);
  };

  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <QRCodeScanner onResult={handleScanResult} />
      {result && <div>Scanned Result: {result}</div>}
    </div>
  );
};

export default App;
