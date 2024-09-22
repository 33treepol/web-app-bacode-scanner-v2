import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { Box } from "@mui/material";

interface CustomQrScannerProps {
  onScan: (result: string) => void;
  onError: (error: Error) => void;
}

const CustomQrScanner: React.FC<CustomQrScannerProps> = ({
  onScan,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<BrowserMultiFormatReader | null>(null);
  const [scannerControls, setScannerControls] =
    useState<IScannerControls | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    setScanner(codeReader);

    return () => {
      if (scannerControls) {
        scannerControls.stop();
      }
    };
  }, [scannerControls]);

  const startScan = () => {
    if (scanner && videoRef.current) {
      scanner.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result, err, controls) => {
          if (result) {
            onScan(result.getText()); // Send result back to App
          }
          if (err) {
            onError(err); // Send error back to App
          }
          setScannerControls(controls);
        }
      );
    }
  };

  const handleTapToFocus = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      if (track) {
        console.log("Tapped to focus");
      }
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>Scan QR/Barcode</h2>
      <video
        ref={videoRef}
        style={{ width: "100%", maxWidth: "400px", height: "auto" }}
        onClick={handleTapToFocus}
      />
      <Box sx={{ mt: 2 }}>
        <button onClick={startScan}>Start Scanning</button>
      </Box>
    </Box>
  );
};

export default CustomQrScanner;
