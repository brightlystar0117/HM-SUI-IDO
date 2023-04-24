import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center">
            Introducing IDO on SUI Blockchain
          </h1>
          <p className="text-lg mb-4 mt-4 text-center">
            Be a part of something big: our IDO on the Sui network!
          </p>
          <div className="flex justify-center w-full">
            <Link
              href="/create"
              className="bg-purple-200 text-black py-2 px-4 rounded-lg text-center hover:bg-purple-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
