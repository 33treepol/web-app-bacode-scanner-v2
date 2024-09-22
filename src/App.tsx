// src/App.tsx

import React from "react";
import "./App.css";
import QRCodeScanner from "./CustomQrScanner";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>QR Code Scanner</h1>
      <QRCodeScanner />
    </div>
  );
};

export default App;
