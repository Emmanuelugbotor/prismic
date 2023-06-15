import { ReactNode } from "react";
import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
