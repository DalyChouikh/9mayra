import Image from 'next/image';
import pet1 from '../../../public/pet-1.svg';
import pet2 from '../../../public/pet-2-1.svg';

export default function FloatingPets() {
  return (
    <>
      <Image 
        src={pet1}
        alt="Pet 1"
        width={250}
        height={250}
        className="fixed floating opacity-70 -z-10"
        style={{
          top: '0%',
          right: '5%',
          animationDelay: '0.5s'
        }}
      />
      <Image 
        src={pet2}
        alt="Pet 2"
        width={400}
        height={400}
        className="fixed floating opacity-70 -z-10"
        style={{
          bottom: '-10%',
          left: '5%',
          animationDelay: '1.2s',
        }}
      />
    </>
  );
}
