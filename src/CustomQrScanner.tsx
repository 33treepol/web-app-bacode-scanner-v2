// src/components/QRCodeScanner.tsx

import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

interface QRCodeScannerProps {
  onResult: (result: string) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onResult }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const selectCamera = (devices: MediaDeviceInfo[]) => {
      const rearCamera = devices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear")
      );
      return rearCamera ? rearCamera.deviceId : devices[0].deviceId;
    };

    const startCamera = async () => {
      try {
        const devices = await codeReader.listVideoInputDevices();
        if (devices.length > 0) {
          const deviceId = selectCamera(devices);
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId } },
          });
          setMediaStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
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
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    startCamera();

    // Clean up the camera stream on component unmount
    return () => {
      codeReader.reset();
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [onResult, mediaStream]);

  const toggleTorch = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      if (videoTrack && "applyConstraints" in videoTrack) {
        (videoTrack as any)
          .applyConstraints({
            advanced: [{ torch: !torchOn }],
          })
          .catch((error: any) => {
            console.error("Error applying constraints:", error);
          });
        setTorchOn(!torchOn);
      }
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        autoPlay
      ></video>
      <button onClick={toggleTorch}>
        {torchOn ? "Turn Off Flashlight" : "Turn On Flashlight"}
      </button>
    </div>
  );
};

export default QRCodeScanner;
