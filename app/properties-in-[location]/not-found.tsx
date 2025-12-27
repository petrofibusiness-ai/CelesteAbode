import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
          Location Not Found
        </h1>
        <p className="text-gray-600 mb-8 font-poppins">
          The location page you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties">
            <Button className="bg-[#CBB27A] hover:bg-[#CBB27A]/90 text-white font-poppins">
              View All Properties
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="font-poppins">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

