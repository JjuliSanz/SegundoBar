import Cart from "@/components/Cart";
import Navbar from "@/components/ui/Navbar";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
