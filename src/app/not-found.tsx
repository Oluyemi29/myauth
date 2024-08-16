"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="animate-pulse text-center">
        <h2 className="font-bold text-black text-3xl">Not Found</h2>
        <p className="font-semibold text-black">
          Could not find requested resource
        </p>
        <Link href="/" className="text-blue-700">
          Return Home
        </Link>
      </div>
    </div>
  );
}
