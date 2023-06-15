import { ReactNode } from "react";
interface IndicatorProps {
  children: ReactNode;
}
export default function Indicator({ children }: IndicatorProps) {
  return <div className="indicator">{children}</div>;
}
