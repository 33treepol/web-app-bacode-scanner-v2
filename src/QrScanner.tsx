import React, { useState } from "react";
import QrReader from "react-qr-scanner";

interface CustomQrScannerProps {
  onScan: (result: any) => void;
  onError: (error: any) => void;
}

const CustomQrScanner: React.FC<CustomQrScannerProps> = ({
  onScan,
  onError,
}) => {
  const [boxPosition, setBoxPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    setBoxPosition({ left: x, top: y });

    // Additional logic to adjust focus or processing based on (x, y) can go here
  };

  return (
    <div style={{ position: "relative", width: "500px", height: "500px" }}>
      <QrReader
        delay={300}
        onError={onError}
        onScan={onScan}
        style={{ width: "100%", height: "100%" }}
      />
      <div
        onTouchStart={handleTouch}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none", // Allow touch events to pass through to QrReader
        }}
      >
        {boxPosition && (
          <div
            style={{
              position: "absolute",
              border: "2px solid red",
              width: "100px", // Adjustable
              height: "100px", // Adjustable
              left: boxPosition.left - 50, // Center box on touch point
              top: boxPosition.top - 50, // Center box on touch point
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomQrScanner;
