import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@mysten/wallet-kit';

const Nav = () => {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl text-purple-300 font-semibold">
              IDO
            </Link>
            <div className="hidden md:flex space-x-4 text-purple-200">
              <Link href="create" className="text-purple-300">
                Create IDO
              </Link>
              <Link href="fund" className="text-purple-300">
                Fund IDO
              </Link>
              <Link href="transfer" className="text-purple-300">
                Transfer Funds
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-purple-300 focus:outline-none">
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className="">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
