// src/components/QRCodeScanner.tsx

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const QRCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader.listVideoInputDevices().then((devices) => {
      if (devices.length > 0) {
        const firstDeviceId = devices[0].deviceId;
        codeReader.decodeFromVideoDevice(
          firstDeviceId,
          videoRef.current!,
          (result, error) => {
            if (result) {
              setResult(result.getText());
            }
            if (error && !(error instanceof NotFoundException)) {
              console.error(error);
            }
          }
        );
      }
    });

    // Clean up the camera stream on component unmount
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }}></video>
      {result && <div>Result: {result}</div>}
    </div>
  );
};

export default QRCodeScanner;
