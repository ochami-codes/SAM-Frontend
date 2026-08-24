"use client"
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-950 px-4 py-6 text-center text-white">
      <Image
        src="/images/brand/secondadvent2.png"
        alt="Second Advent Ministries Logo"
        width={200}
        height={200}
        className="mx-auto h-auto max-w-full"
        priority
      />

      <h1 className="mt-3 text-2xl font-bold text-yellow-400">
        Second Advent Ministries
      </h1>

      <p className="mt-1 text-base text-teal-300">
        Until the World has Heard, Preach the Word!
      </p>
    </header>
  );
}