// src/CameraFocus.tsx

import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

const CameraFocus: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    getCameraStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const rect = overlayRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setFocusPoint({ x, y });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {focusPoint && (
          <div
            style={{
              position: "absolute",
              top: focusPoint.y,
              left: focusPoint.x,
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid red",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default CameraFocus;
