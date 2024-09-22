import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Container, Typography } from "@mui/material";

interface CustomQrScannerProps {
  onScan: (result: string) => void;
  onError: (error: Error) => void;
}

const CustomQrScanner: React.FC<CustomQrScannerProps> = ({
  onScan,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [boxPosition, setBoxPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let currentStream: MediaStream | null = null;

    const startScan = async () => {
      try {
        if (videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          currentStream = stream;
          videoRef.current.srcObject = stream;
          await new Promise<void>((resolve) => {
            videoRef.current!.onloadedmetadata = () => resolve();
          });

          videoRef.current!.play();

          codeReader.decodeFromVideoDevice(
            null,
            videoRef.current,
            (result, error) => {
              if (result) {
                onScan(result.getText());
              }
              if (error) {
                onError(error);
              }
            }
          );
        }
      } catch (err) {
        onError(err as Error);
      }
    };

    startScan();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      codeReader.reset();
    };
  }, [onScan, onError]);

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;

      setBoxPosition({ left: x, top: y });

      // Adjust camera focus or processing logic here if needed
    }
  };

  return (
    <Container
      style={{ position: "relative", width: "500px", height: "500px" }}
    >
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        onTouchStart={handleTouch}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
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
    </Container>
  );
};

export default CustomQrScanner;
