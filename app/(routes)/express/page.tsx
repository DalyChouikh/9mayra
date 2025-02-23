import Image from "next/image";
import foxAstronaut from "../../../public/fox-astronaut.svg";
import express from "../../../public/express.svg";
import pets from "../../../public/pets.svg";
import Link from "next/link";

export default function ExpressPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={express}
            alt="express"
            width={200}
            height={200}
            className="transform transition-transform duration-300 hover:scale-110 rounded-xl"
          />
          <Link
            href="/subject-choice"
            className="bg-[#FFA987] mt-4 text-white text-2xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] hover: transition-all"
          >
            تعلم 
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            src={foxAstronaut}
            alt="fox-astronaut"
            width={200}
            height={200}
            className="transform transition-transform duration-300 hover:scale-110 rounded-xl"
          />
          <Link
            href="/subject-choice"
            className="bg-[#FFA987] mt-4 text-white text-2xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
          >
            عبر 
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            src={pets}
            alt="pets"
            width={210}
            height={210}
            className="transform transition-transform duration-300 hover:scale-110 rounded-xl"
          />
          <Link
            href="/subject-choice"
            className="bg-[#FFA987] mt-4 text-white text-2xl font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
          >
            تواصل 
          </Link>
        </div>
      </div>
    </div>
  );
}

