import Image from 'next/image';
import Link from 'next/link';
import logoVertical from '../../../public/logo-vertical.svg';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-block">
          <Image 
            src={logoVertical} 
            alt="9mayra Logo" 
            width={100} 
            height={60}
            className="transform transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
    </nav>
  );
}
