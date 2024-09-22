// src/components/QRCodeScanner.tsx

import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

interface QRCodeScannerProps {
  onResult: (result: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onResult }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const selectCamera = (devices: MediaDeviceInfo[]) => {
      // Prefer rear camera
      const rearCamera = devices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear")
      );
      return rearCamera ? rearCamera.deviceId : devices[0].deviceId;
    };

    codeReader.listVideoInputDevices().then((devices) => {
      if (devices.length > 0) {
        const deviceId = selectCamera(devices);
        codeReader.decodeFromVideoDevice(
          deviceId,
          videoRef.current!,
          (result, error) => {
            if (result) {
              onResult(result.getText());
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
  }, [onResult]);

  return (
    <video ref={videoRef} style={{ width: "100%", height: "auto" }}></video>
  );
};

export default QRCodeScanner;
