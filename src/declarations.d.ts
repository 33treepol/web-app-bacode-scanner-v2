declare module "react-qr-scanner" {
  import { ComponentType } from "react";

  interface QrReaderProps {
    delay?: number;
    onError?: (error: Error) => void;
    onScan?: (data: { text: string } | null) => void;
    style?: React.CSSProperties;
  }

  const QrReader: ComponentType<QrReaderProps>;
  export default QrReader;
}
