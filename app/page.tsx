import Image from "next/image";
import kmayra from "../public/9mayra-01.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center z-99 justify-center min-h-screen">
      <h1 className="mt-6 text-[50px] leading-[50px]">
        مرحباً تسنيم، انا قميرة
      </h1>
      <Image src={kmayra} alt="9mayra" width={413} height={312} className="floating" />
      <Link
        href="express"
        className="bg-[#FFA987] mb-6 text-white text-[50px] font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#FF8A75] transition-all"
      >
        واصل
      </Link>
    </div>
  );
}
