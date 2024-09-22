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
  const [focusArea, setFocusArea] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

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
              if (error && !(error instanceof NotFoundException)) {
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

      setFocusArea({
        x: x - focusArea.width / 2,
        y: y - focusArea.height / 2,
        width: focusArea.width,
        height: focusArea.height,
      });

      // Note: Direct focus adjustment isn't possible, but we can use this area for custom logic
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
          pointerEvents: "none", // Allow touch events to pass through to video
        }}
      >
        <div
          style={{
            position: "absolute",
            border: "2px solid red",
            width: `${focusArea.width}px`,
            height: `${focusArea.height}px`,
            left: `${focusArea.x}px`,
            top: `${focusArea.y}px`,
            pointerEvents: "none", // Make sure the box doesn't capture touch events itself
          }}
        />
      </div>
    </Container>
  );
};

export default CustomQrScanner;
