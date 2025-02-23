import Image from "next/image";
import math from "../../../public/math.svg";
import arabic from "../../../public/arabic.svg";
import science from "../../../public/science.svg";
import sports from "../../../public/sports.svg";
import Link from "next/link";

const subjects = [
  { name: "رياضيات", image: math },
  { name: "عربية", image: arabic },
  { name: "علوم", image: science },
  { name: "رياضة", image: sports },
];

export default function SubjectSelection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center">
      <h1 className="text-3xl font-bold mb-8 mt-8">! إختر  المادة المناسبة</h1>
      <div className="grid grid-cols-2 gap-x-[180px] gap-y-12">
        {subjects.map((subject) => (
          <div key={subject.name} className="flex flex-col items-center">
              <Link href="/quiz">
              <Image
                src={subject.image}
                alt={subject.name}
                width={180}
                height={180}
                className="mb-4 transform transition-transform duration-300 hover:scale-110 rounded-xl hover:cursor-pointer"
              />
              </Link>
            <span className="text-2xl font-semibold">{subject.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
