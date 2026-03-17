import type { Metadata } from "next";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "404 Page Not Found | Celeste Abode",
  description:
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Visit our homepage to explore properties and real estate insights.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
